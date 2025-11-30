import type { Currency } from "@/schemas/currency";

interface GetStocksProps {
  params: {
    symbol: string;
    currency: Currency;
  }[];
}

export interface Stock {
  name: string;
  symbol: string;
  currency: Currency;
  price: number;
  openPrice: number;
  highPrice: number;
  lowPrice: number;
  dayChange?: number;
}

interface StockData {
  stocks: Stock[];
  crypto?: {
    price?: number;
  };
}

export const getStocks = async ({
  params,
}: GetStocksProps): Promise<StockData> => {
  if (!params || params.length === 0) {
    throw new Error('Parâmetros "symbol" e "currency" são obrigatórios.');
  }

  try {
    const response = await fetch(`/api/stocks`, {
      method: "POST",
      body: JSON.stringify({ params }),
    });

    if (!response.ok) {
      return {
        stocks: [],
      };
    }

    const { stocks, price } = await response.json();

    return {
      stocks: stocks.map((stock: Stock) => ({
        name: stock.name,
        currency: stock.currency,
        symbol: stock.symbol,
        price: stock.price,
        openPrice: stock.openPrice,
        highPrice: stock.highPrice,
        lowPrice: stock.lowPrice,
        dayChange: stock.dayChange ? stock.dayChange : undefined,
      })),
      crypto: {
        price: price ? Number.parseFloat(price) : undefined,
      },
    };
  } catch (error) {
    console.error("Erro ao buscar dados da ação:", error);
    throw new Error(
      "Erro ao buscar dados da ação. Tente novamente mais tarde."
    );
  }
};
