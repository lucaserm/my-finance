import type { Transaction } from "@/schemas/transaction";
import { formatDate } from "@/utils/formatDate";

import type { Asset, ChartDataPoint, PortfolioItem } from "./types";

export const mockAssets: Asset[] = [
  {
    symbol: "PETR4",
    currency: "BRL",
    price: 38.45,
    highPrice: 39.0,
    lowPrice: 37.5,
    openPrice: 38.0,
  },
  {
    symbol: "VALE3",
    currency: "BRL",
    price: 62.3,
    highPrice: 39.0,
    lowPrice: 37.5,
    openPrice: 38.0,
  },
  {
    symbol: "ITUB4",
    currency: "BRL",
    price: 32.15,
    highPrice: 39.0,
    lowPrice: 37.5,
    openPrice: 38.0,
  },
  {
    symbol: "BBDC4",
    currency: "BRL",
    price: 12.8,
    highPrice: 39.0,
    lowPrice: 37.5,
    openPrice: 38.0,
  },
  {
    symbol: "AAPL",
    currency: "USD",
    price: 189.25,
    highPrice: 39.0,
    lowPrice: 37.5,
    openPrice: 38.0,
  },
  {
    symbol: "GOOGL",
    currency: "USD",
    price: 141.8,
    highPrice: 39.0,
    lowPrice: 37.5,
    openPrice: 38.0,
  },
  {
    symbol: "MSFT",
    currency: "USD",
    price: 378.9,
    highPrice: 39.0,
    lowPrice: 37.5,
    openPrice: 38.0,
  },
  {
    symbol: "TSLA",
    currency: "USD",
    price: 248.5,
    highPrice: 39.0,
    lowPrice: 37.5,
    openPrice: 38.0,
  },
  {
    symbol: "BTC",
    currency: "CRYPTO",
    price: 67450.0,
    highPrice: 39.0,
    lowPrice: 37.5,
    openPrice: 38.0,
  },
  {
    symbol: "ETH",
    currency: "CRYPTO",
    price: 3520.0,
    highPrice: 39.0,
    lowPrice: 37.5,
    openPrice: 38.0,
  },
  {
    symbol: "SOL",
    currency: "CRYPTO",
    price: 145.8,
    highPrice: 39.0,
    lowPrice: 37.5,
    openPrice: 38.0,
  },
  {
    symbol: "ADA",
    currency: "CRYPTO",
    price: 0.45,
    highPrice: 39.0,
    lowPrice: 37.5,
    openPrice: 38.0,
  },
];

export const mockPortfolio: PortfolioItem[] = [
  {
    id: "1",
    asset: mockAssets[0],
    quantity: 100,
    purchasePrice: 35.0,
    purchaseDate: "2024-01-15",
    currentValue: 3845.0,
    profit: 345.0,
    profitPercent: 9.86,
  },
  {
    id: "2",
    asset: mockAssets[4],
    quantity: 10,
    purchasePrice: 175.0,
    purchaseDate: "2024-02-20",
    currentValue: 1892.5,
    profit: 142.5,
    profitPercent: 8.14,
  },
  {
    id: "3",
    asset: mockAssets[8],
    quantity: 0.5,
    purchasePrice: 45000.0,
    purchaseDate: "2023-11-10",
    currentValue: 33725.0,
    profit: 11225.0,
    profitPercent: 49.89,
  },
  {
    id: "4",
    asset: mockAssets[10],
    quantity: 25,
    purchasePrice: 95.0,
    purchaseDate: "2024-03-05",
    currentValue: 3645.0,
    profit: 1270.0,
    profitPercent: 53.47,
  },
];

export const mockTransactions: Transaction[] = [
  {
    id: "1",
    userId: "user-123",
    type: "income",
    // category: "Salário",
    description: "Salário mensal",
    amountInCents: 8500,
    transactedAt: new Date("2024-11-05"),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    userId: "user-123",
    type: "expense",
    // category: "Moradia",
    description: "Aluguel",
    amountInCents: 2500.0,
    transactedAt: new Date("2024-11-10"),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "3",
    userId: "user-123",
    type: "expense",
    // category: "Alimentação",
    description: "Supermercado",
    amountInCents: 850.0,
    transactedAt: new Date("2024-11-12"),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "4",
    userId: "user-123",
    type: "income",
    // category: "Freelance",
    description: "Projeto web",
    amountInCents: 3200.0,
    transactedAt: new Date("2024-11-15"),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "5",
    userId: "user-123",
    type: "expense",
    // category: "Transporte",
    description: "Combustível",
    amountInCents: 350.0,
    transactedAt: new Date("2024-11-18"),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "6",
    userId: "user-123",
    type: "expense",
    // category: "Lazer",
    description: "Cinema e restaurante",
    amountInCents: 280.0,
    transactedAt: new Date("2024-11-20"),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "7",
    userId: "user-123",
    type: "income",
    // category: "Dividendos",
    description: "Dividendos PETR4",
    amountInCents: 450.0,
    transactedAt: new Date("2024-11-22"),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "8",
    userId: "user-123",
    type: "expense",
    // category: "Saúde",
    description: "Farmácia",
    amountInCents: 180.0,
    transactedAt: new Date("2024-11-25"),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export const generatePortfolioHistory = (): ChartDataPoint[] => {
  const data: ChartDataPoint[] = [];
  let value = 35000;
  const today = new Date();

  for (let i = 90; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    value = value + (Math.random() - 0.45) * 800;
    data.push({
      date: formatDate(date, { locale: "pt-BR", format: "iso" }),
      value: Math.max(value, 30000),
    });
  }
  return data;
};

export const generateAssetHistory = (basePrice: number): ChartDataPoint[] => {
  const data: ChartDataPoint[] = [];
  let price = basePrice * 0.85;
  const today = new Date();

  for (let i = 30; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    price = price + (Math.random() - 0.48) * (basePrice * 0.02);
    data.push({
      date: formatDate(date, { locale: "pt-BR", format: "iso" }),
      value: Math.max(price, basePrice * 0.7),
    });
  }
  return data;
};
