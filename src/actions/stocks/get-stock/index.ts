import type { Currency } from "@/schemas/currency";

interface GetStockProps {
  symbol: string;
  currency: Currency;
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

export interface StockData {
  stock: Stock | null;
  crypto?: {
    price?: number;
  };
}

export const getStock = async ({
  symbol,
  currency,
}: GetStockProps): Promise<StockData> => {
  symbol = symbol.toUpperCase();
  if (!symbol || !currency) {
    throw new Error('Parâmetros "symbol" e "currency" são obrigatórios.');
  }

  try {
    const response = await fetch(`/api/stocks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ params: [{ symbol, currency }] }),
    });

    const { stocks, crypto } = await response.json();

    if (!response.ok) {
      return {
        stock: null,
      };
    }

    console.log(stocks);

    return {
      stock: {
        name: stocks[0].name,
        symbol,
        currency,
        price: stocks[0].price,
        openPrice: stocks[0].openPrice,
        highPrice: stocks[0].highPrice,
        lowPrice: stocks[0].lowPrice,
        dayChange: stocks[0].dayChange ? stocks[0].dayChange : undefined,
      },
      crypto: {
        price: crypto[0]?.price ? crypto[0].price : undefined,
      },
    };
  } catch (error) {
    console.error("Erro ao buscar dados da ação:", error);
    throw new Error(
      "Erro ao buscar dados da ação. Tente novamente mais tarde."
    );
  }
};
