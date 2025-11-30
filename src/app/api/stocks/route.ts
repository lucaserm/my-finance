import { NextResponse } from "next/server";
import yahooFinance from "yahoo-finance2";
import z from "zod";

import { currenciesSchema } from "@/schemas/currency";

const bodySchema = z.object({
  params: z
    .object({
      symbol: z.string(),
      currency: currenciesSchema,
    })
    .array(),
});

export async function POST(request: Request) {
  const body = await request.json();
  const { params } = bodySchema.parse(body);

  if (!params || params.length === 0) {
    return new NextResponse(
      JSON.stringify({
        error: 'Parâmetros "symbol" e "currency" são obrigatórios.',
      }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  const exec: Promise<any>[] = [];

  params.forEach((param) => {
    const symbolsBRL = `${param.symbol.toUpperCase()}.SA`;
    const symbolsUSD = `${param.symbol}`;

    if (param.currency === "BRL") {
      exec.push(yahooFinance.quote(symbolsBRL, { return: "array" }));
    }

    if (param.currency === "USD") {
      exec.push(yahooFinance.quote(symbolsUSD, { return: "array" }));
    }
  });

  try {
    const stocksResult: Array<{
      name: string;
      symbol: string;
      currency: string;
      price: number;
      openPrice: number;
      highPrice: number;
      lowPrice: number;
      dayChange?: number;
    }> = [];

    const cryptoResult: Array<{ price: number }> = [];

    const fetchAll = await Promise.all(exec);

    await Promise.all(
      fetchAll.map(async (res) => {
        if (params[0].currency !== "CRYPTO") {
          if (!res || res.length === 0) return;
          res.forEach((res2: any) => {
            stocksResult.push({
              name: res2.longName,
              symbol: res2.symbol,
              currency: res2.currency,
              price: res2.regularMarketPrice
                ? res2.regularMarketPrice.toFixed(2)
                : undefined,
              openPrice: res2.regularMarketOpen
                ? res2.regularMarketOpen.toFixed(2)
                : undefined,
              highPrice: res2.regularMarketDayRange
                ? res2.regularMarketDayRange.high.toFixed(2)
                : undefined,
              lowPrice: res2.regularMarketDayRange
                ? res2.regularMarketDayRange.low.toFixed(2)
                : undefined,
              dayChange: res2.regularMarketChange
                ? res2.regularMarketChange.toFixed(2)
                : undefined,
            });
          });
          return;
        }

        const apiUrl = `https://api.coingecko.com/api/v3/simple/price?ids=${params[0].symbol}&vs_currencies=brl,usd`;
        const result = await fetch(apiUrl);
        const data = await result.json();
        cryptoResult.push({
          price: data[`${params[0].symbol.toLowerCase()}`].brl,
        });
      })
    );

    return NextResponse.json(
      {
        stocks: stocksResult,
        crypto: cryptoResult,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erro ao buscar dados da ação:", error);
    return new NextResponse(
      JSON.stringify({
        error: "Erro ao buscar dados da ação. Tente novamente mais tarde.",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
