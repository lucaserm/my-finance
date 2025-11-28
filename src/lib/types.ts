export type AssetType = "BRL" | "USD" | "CRYPTO" | "ALL";

export interface Asset {
  name: string;
  symbol: string;
  currency: "USD" | "BRL" | "ALL" | "CRYPTO";
  price: number;
  openPrice: number;
  highPrice: number;
  lowPrice: number;
  // name: string;
  // change24h: number;
  // changePercent24h: number;
  // logo?: string;
}

export interface PortfolioItem {
  id: string;
  asset: Asset;
  quantity: number;
  purchasePrice: number;
  purchaseDate: string;
  currentValue: number;
  profit: number;
  profitPercent: number;
}

export interface ChartDataPoint {
  date: string;
  value: number;
}
