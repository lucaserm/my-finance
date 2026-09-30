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

    if (!response.ok) {
      return {
        stock: null,
      };
    }

    const { stocks, crypto } = await response.json();
    const stock = stocks[0];
    if (!stock) return { stock: null };

    return {
      stock: {
        name: stock.name,
        symbol: stock.symbol,
        currency: stock.currency,
        price: stock.price,
        openPrice: stock.openPrice,
        highPrice: stock.highPrice,
        lowPrice: stock.lowPrice,
        dayChange: stock.dayChange,
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
