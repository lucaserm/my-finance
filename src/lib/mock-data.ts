import type { Transaction } from "@/schemas/transaction";

import type {
  Asset,
  CalendarEvent,
  ChartDataPoint,
  PortfolioItem,
} from "./types";

export const mockAssets: Asset[] = [
  {
    id: "1",
    symbol: "PETR4",
    name: "Petrobras",
    type: "BRL",
    price: 38.45,
    change24h: 0.85,
    changePercent24h: 2.26,
    logo: "🛢️",
  },
  {
    id: "2",
    symbol: "VALE3",
    name: "Vale",
    type: "BRL",
    price: 62.3,
    change24h: -1.2,
    changePercent24h: -1.89,
    logo: "⛏️",
  },
  {
    id: "3",
    symbol: "ITUB4",
    name: "Itaú Unibanco",
    type: "BRL",
    price: 32.15,
    change24h: 0.45,
    changePercent24h: 1.42,
    logo: "🏦",
  },
  {
    id: "4",
    symbol: "BBDC4",
    name: "Bradesco",
    type: "BRL",
    price: 12.8,
    change24h: -0.15,
    changePercent24h: -1.16,
    logo: "🏦",
  },
  {
    id: "5",
    symbol: "AAPL",
    name: "Apple",
    type: "USD",
    price: 189.25,
    change24h: 2.3,
    changePercent24h: 1.23,
    logo: "🍎",
  },
  {
    id: "6",
    symbol: "GOOGL",
    name: "Alphabet",
    type: "USD",
    price: 141.8,
    change24h: -0.95,
    changePercent24h: -0.67,
    logo: "🔍",
  },
  {
    id: "7",
    symbol: "MSFT",
    name: "Microsoft",
    type: "USD",
    price: 378.9,
    change24h: 4.5,
    changePercent24h: 1.2,
    logo: "💻",
  },
  {
    id: "8",
    symbol: "TSLA",
    name: "Tesla",
    type: "USD",
    price: 248.5,
    change24h: -5.2,
    changePercent24h: -2.05,
    logo: "🚗",
  },
  {
    id: "9",
    symbol: "BTC",
    name: "Bitcoin",
    type: "CRYPTO",
    price: 67450.0,
    change24h: 1250.0,
    changePercent24h: 1.89,
    logo: "₿",
  },
  {
    id: "10",
    symbol: "ETH",
    name: "Ethereum",
    type: "CRYPTO",
    price: 3520.0,
    change24h: -45.0,
    changePercent24h: -1.26,
    logo: "⟠",
  },
  {
    id: "11",
    symbol: "SOL",
    name: "Solana",
    type: "CRYPTO",
    price: 145.8,
    change24h: 8.5,
    changePercent24h: 6.19,
    logo: "◎",
  },
  {
    id: "12",
    symbol: "ADA",
    name: "Cardano",
    type: "CRYPTO",
    price: 0.45,
    change24h: 0.02,
    changePercent24h: 4.65,
    logo: "₳",
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

export const mockCalendarEvents: CalendarEvent[] = [
  {
    id: "1",
    title: "Pagamento Aluguel",
    date: "2025-11-28",
    type: "bill",
    amount: 2500,
  },
  {
    id: "2",
    title: "Receber Salário",
    date: "2025-11-05",
    type: "income",
    amount: 8500,
  },
  {
    id: "3",
    title: "Dividendos VALE3",
    date: "2025-11-10",
    type: "investment",
    amount: 320,
  },
  {
    id: "4",
    title: "Cartão de Crédito",
    date: "2025-11-15",
    type: "bill",
    amount: 1850,
  },
  { id: "5", title: "Revisar Portfólio", date: "2025-11-01", type: "reminder" },
  { id: "6", title: "Internet", date: "2025-11-20", type: "bill", amount: 150 },
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
      date: date.toISOString().split("T")[0],
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
      date: date.toISOString().split("T")[0],
      value: Math.max(price, basePrice * 0.7),
    });
  }
  return data;
};
