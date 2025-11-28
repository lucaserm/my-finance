export type Currency = "USD" | "BRL" | "CRYPTO" | "ALL";

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
  dayChange: number;
}

export interface StockData {
  stock: Stock | null;
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
    const response = await fetch(
      `/api/stocks?symbol=${symbol}&currency=${currency}`
    );

    if (!response.ok) {
      return {
        stock: null,
      };
    }

    const { name, price, openPrice, highPrice, lowPrice, dayChange } =
      await response.json();

    return {
      stock: {
        name,
        symbol,
        currency,
        price: Number.parseFloat(Number.parseFloat(price).toFixed(2)),
        openPrice: Number.parseFloat(Number.parseFloat(openPrice).toFixed(2)),
        highPrice: Number.parseFloat(Number.parseFloat(highPrice).toFixed(2)),
        lowPrice: Number.parseFloat(Number.parseFloat(lowPrice).toFixed(2)),
        dayChange: Number.parseFloat(Number.parseFloat(dayChange).toFixed(2)),
      },
    };
  } catch (error) {
    console.error("Erro ao buscar dados da ação:", error);
    throw new Error(
      "Erro ao buscar dados da ação. Tente novamente mais tarde."
    );
  }
};
