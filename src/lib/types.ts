export type AssetType = "BRL" | "USD" | "CRYPTO" | "ALL";

export interface Asset {
  name: string;
  symbol: string;
  currency: "USD" | "BRL" | "CRYPTO";
  price: number;
  openPrice: number;
  highPrice: number;
  lowPrice: number;
}

export interface ChartDataPoint {
  date: string;
  value: number;
}
