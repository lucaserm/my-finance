import { NextResponse } from "next/server";
import yahooFinance from "yahoo-finance2";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const symbol = url.searchParams.get("symbol")?.toUpperCase();
  const currency = url.searchParams.get("currency")?.toUpperCase();

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

  const symbolBRL = `${symbol}.SA`;
  const symbolUSD = symbol;

  const exec = [];

  if (currency === "BRL") {
    exec.push(yahooFinance.quote(symbolBRL));
  }

  if (currency === "USD") {
    exec.push(yahooFinance.quote(symbolUSD));
  }

  if (currency === "ALL") {
    exec.push(yahooFinance.quote(symbolBRL));
    exec.push(yahooFinance.quote(symbolUSD));
  }

  try {
    const results = await Promise.all(exec);

    const formatStock = (data: any) => {
      return {
        name: data.longName,
        symbol: data.symbol,
        currency: data.currency,
        price: data.regularMarketPrice.toFixed(2),
        openPrice: data.regularMarketOpen.toFixed(2),
        highPrice: data.regularMarketDayRange.high.toFixed(2),
        lowPrice: data.regularMarketDayRange.low.toFixed(2),
        dayChange: Math.round(data.regularMarketChange.toFixed(2)),
      };
    };

    if (currency === "ALL") {
      return NextResponse.json(
        {
          brl: formatStock(results[0]),
          usd: formatStock(results[1]),
        },
        { status: 200 }
      );
    }

    return NextResponse.json(formatStock(results[0]), { status: 200 });
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
