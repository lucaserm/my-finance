import yahooFinance from "yahoo-finance2";

interface GetStockProps {
  symbol: string;
  currency: string;
}

export const getStock = async ({ symbol, currency }: GetStockProps) => {
  if (!symbol || !currency) {
    throw new Error('Parâmetros "symbol" e "currency" são obrigatórios.');
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

    return {
      symbol,
      currency: stockCurrency,
      price: stockCurrentPrice.toFixed(2),
      openPrice: stockOpeningPrice.toFixed(2),
      highPrice: stockDailyHighPrice.toFixed(2),
      lowPrice: stockDailyLowPrice.toFixed(2),
    };
  } catch (error) {
    console.error("Erro ao buscar dados da ação:", error);
    throw new Error(
      "Erro ao buscar dados da ação. Tente novamente mais tarde."
    );
  }
};
