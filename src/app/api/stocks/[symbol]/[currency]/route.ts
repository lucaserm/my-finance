import yahooFinance from "yahoo-finance2";

export async function GET(
  request: Request,
  context: { params: { symbol: string; currency: string } }
) {
  const { params } = context;
  const { symbol, currency } = await params; // Aguarde a extração dos parâmetros

  let symbolFormatted = symbol.toUpperCase();
  if (currency === "BRL") {
    symbolFormatted = symbol + ".SA";
  }

  try {
    const stockData = await yahooFinance.quote(symbolFormatted);

    const {
      currency = "USD", // Valor padrão para a moeda
      regularMarketPrice = 0, // Preço atual
      regularMarketOpen = 0, // Preço de abertura
      regularMarketDayHigh = 0, // Preço máximo do dia
      regularMarketDayLow = 0, // Preço mínimo do dia
    } = stockData;

    return new Response(
      JSON.stringify({
        symbol,
        currency,
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
  } catch {
    return new Response(
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
