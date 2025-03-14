import { NextResponse } from "next/server";
import yahooFinance from "yahoo-finance2";

export async function GET(request: Request) {
  // Extract query parameters from the URL
  const url = new URL(request.url);
  const symbol = url.searchParams.get("symbol");
  const currency = url.searchParams.get("currency");

  // Validate required parameters
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

  // Format the symbol based on the currency
  let symbolFormatted = symbol.toUpperCase();
  if (currency === "BRL") {
    symbolFormatted = symbol + ".SA";
  }

  try {
    // Fetch stock data from Yahoo Finance
    const stockData = await yahooFinance.quote(symbolFormatted);

    // Destructure the required fields from the stock data
    const {
      currency: stockCurrency = "USD", // Default to USD if not provided
      regularMarketPrice = 0, // Current price
      regularMarketOpen = 0, // Opening price
      regularMarketDayHigh = 0, // Daily high price
      regularMarketDayLow = 0, // Daily low price
    } = stockData;

    // Return the response with the stock data
    return new NextResponse(
      JSON.stringify({
        symbol,
        currency: stockCurrency,
        price: regularMarketPrice.toFixed(2),
        openPrice: regularMarketOpen.toFixed(2),
        highPrice: regularMarketDayHigh.toFixed(2),
        lowPrice: regularMarketDayLow.toFixed(2),
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
