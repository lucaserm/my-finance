export type AssetType = "BRL" | "USD" | "CRYPTO";

export interface Asset {
  id: string;
  symbol: string;
  name: string;
  type: AssetType;
  price: number;
  change24h: number;
  changePercent24h: number;
  logo?: string;
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

export interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  type: "bill" | "income" | "investment" | "reminder";
  amount?: number;
}

export interface ChartDataPoint {
  date: string;
  value: number;
}
