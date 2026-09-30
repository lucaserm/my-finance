import { NextResponse } from "next/server";
import yahooFinance from "yahoo-finance2";
import z from "zod";

import { currenciesSchema } from "@/schemas/currency";

const CACHE_TTL_MS = 60_000;

const bodySchema = z.object({
  params: z.object({
    symbol: z.string().trim().min(1).max(40),
    currency: currenciesSchema,
  }).array().min(1).max(100),
});

type StockQuote = {
  name: string;
  symbol: string;
  currency: "USD" | "BRL" | "CRYPTO";
  price: number;
  openPrice?: number;
  highPrice?: number;
  lowPrice?: number;
  dayChange?: number;
};
type QuoteResponse = { stocks: StockQuote[]; crypto: Array<{ price: number }> };

const quoteCache = new Map<string, { expiresAt: number; value: QuoteResponse }>();
const pendingQuotes = new Map<string, Promise<QuoteResponse>>();
const numberOrUndefined = (value: unknown) =>
  typeof value === "number" && Number.isFinite(value) ? value : undefined;

function cacheKey(params: Array<{ symbol: string; currency: string }>) {
  return params.map(({ symbol, currency }) => `${currency}:${symbol.trim().toUpperCase()}`).sort().join(",");
}

async function fetchQuotes(params: Array<{ symbol: string; currency: "USD" | "BRL" | "CRYPTO" }>): Promise<QuoteResponse> {
  const brlSymbols = [...new Set(params.filter((p) => p.currency === "BRL").map((p) => `${p.symbol.toUpperCase()}.SA`))];
  const usdSymbols = [...new Set(params.filter((p) => p.currency === "USD").map((p) => p.symbol.toUpperCase()))];
  const cryptoSymbols = [...new Set(params.filter((p) => p.currency === "CRYPTO").map((p) => p.symbol.toLowerCase()))];

  // `quote` accepts an array: this turns N stock requests into at most two calls.
  const cryptoRequest: Promise<Record<string, { brl?: number }>> =
    cryptoSymbols.length
      ? fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${encodeURIComponent(cryptoSymbols.join(","))}&vs_currencies=brl`).then(async (response) => {
          if (!response.ok) throw new Error(`CoinGecko returned ${response.status}`);
          return response.json() as Promise<Record<string, { brl?: number }>>;
        })
      : Promise.resolve({});

  const [brlQuotes, usdQuotes, cryptoPrices] = await Promise.all([
    brlSymbols.length ? yahooFinance.quote(brlSymbols, { return: "array" }) : [],
    usdSymbols.length ? yahooFinance.quote(usdSymbols, { return: "array" }) : [],
    cryptoRequest,
  ]);

  const stocks = [...brlQuotes, ...usdQuotes].flatMap((quote: any): StockQuote[] => {
    const price = numberOrUndefined(quote.regularMarketPrice);
    if (price === undefined) return [];
    const range = quote.regularMarketDayRange;
    return [{
      name: quote.longName ?? quote.shortName ?? quote.symbol,
      symbol: quote.symbol,
      currency: quote.currency === "BRL" ? "BRL" : "USD",
      price,
      openPrice: numberOrUndefined(quote.regularMarketOpen) ?? price,
      highPrice: numberOrUndefined(range?.high) ?? price,
      lowPrice: numberOrUndefined(range?.low) ?? price,
      dayChange: numberOrUndefined(quote.regularMarketChange),
    }];
  });
  const crypto = cryptoSymbols.flatMap((symbol) => {
    const price = numberOrUndefined(cryptoPrices[symbol]?.brl);
    if (price === undefined) return [];
    stocks.push({ name: symbol.toUpperCase(), symbol: symbol.toUpperCase(), currency: "CRYPTO", price });
    return [{ price }];
  });
  return { stocks, crypto };
}

async function getQuotes(params: Array<{ symbol: string; currency: "USD" | "BRL" | "CRYPTO" }>) {
  const key = cacheKey(params);
  const cached = quoteCache.get(key);
  if (cached && cached.expiresAt > Date.now()) return cached.value;
  const pending = pendingQuotes.get(key);
  if (pending) return pending;
  const request = fetchQuotes(params).then((value) => {
    quoteCache.set(key, { value, expiresAt: Date.now() + CACHE_TTL_MS });
    return value;
  }).finally(() => pendingQuotes.delete(key));
  pendingQuotes.set(key, request);
  return request;
}

export async function POST(request: Request) {
  try {
    const { params } = bodySchema.parse(await request.json());
    return NextResponse.json(await getQuotes(params));
  } catch (error) {
    console.error("Unable to fetch market quotes:", error);
    const message = error instanceof Error ? error.message : "Unknown quote provider error";
    const rateLimited = /429|too many requests|rate limit/i.test(message);
    return NextResponse.json(
      { error: rateLimited ? "Quote provider is rate-limiting requests. Please retry shortly." : "Unable to fetch market quotes." },
      { status: rateLimited ? 503 : 500, headers: rateLimited ? { "Retry-After": "60" } : undefined },
    );
  }
}
