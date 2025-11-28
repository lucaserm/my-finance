import { NextResponse } from "next/server";
import yahooFinance from "yahoo-finance2";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const symbol = url.searchParams.get("symbol");
  const currency = url.searchParams.get("currency");

  if (!symbol || !currency) {
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

  let symbolFormatted = symbol.toUpperCase();
  if (currency === "BRL") {
    symbolFormatted = `${symbol}.SA`;
  }

  try {
    const stockData = await yahooFinance.quote(symbolFormatted);
    const {
      currency: stockCurrency = "USD",
      regularMarketPrice: stockCurrentPrice = 0,
      regularMarketOpen: stockOpeningPrice = 0,
      regularMarketDayHigh: stockDailyHighPrice = 0,
      regularMarketDayLow: stockDailyLowPrice = 0,
    } = stockData;

    return new NextResponse(
      JSON.stringify({
        symbol,
        currency: stockCurrency,
        price: stockCurrentPrice.toFixed(2),
        openPrice: stockOpeningPrice.toFixed(2),
        highPrice: stockDailyHighPrice.toFixed(2),
        lowPrice: stockDailyLowPrice.toFixed(2),
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
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
