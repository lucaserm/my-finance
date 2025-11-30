"use client";

import { PortfolioChart } from "@/components/dashboard/portfolio-chart";
import { RecentTransactions } from "@/components/dashboard/recent-transactions";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { TopAssets } from "@/components/dashboard/top-assets";
import { usePortfolioItems } from "@/hooks/queries/use-portfolio-items";
import { useStocks } from "@/hooks/queries/use-stocks";
import { useTransaction } from "@/hooks/queries/use-transaction";
import { generatePortfolioHistory, mockPortfolio } from "@/lib/mock-data";

export default function DashboardPage() {
  const { data: transaction } = useTransaction();
  const { data: portfolio } = usePortfolioItems();
  const { data: stocks } = useStocks({
    params:
      portfolio?.portfolioItems.map((item) => ({
        symbol: item.assetSymbol,
        currency: item.assetCurrency,
      })) || [],
  });

  const portfolioHistory = generatePortfolioHistory();

  const totalPortfolioValue =
    portfolio?.portfolioItems.reduce(
      (sum, item) => sum + item.totalInvestedInCents / 100,
      0,
    ) || 0;

  // const totalProfit = portfolio?.portfolioItems.reduce((sum, item) => {
  //   const stock = stocks?.stocks.find((stock) =>
  //     stock.symbol.includes(item.assetSymbol),
  //   );

  //   return sum + (item.profit || 0);
  // }, 0);

  // const portfolioChangePercent =
  //   (totalProfit / (totalPortfolioValue - totalProfit)) * 100;

  const monthlyIncome =
    (transaction?.transactions
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + t.amountInCents, 0) || 0) / 100;

  const monthlyExpenses =
    (transaction?.transactions
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + t.amountInCents, 0) || 0) / 100;

  const totalBalance = monthlyIncome - monthlyExpenses + totalPortfolioValue;

  return (
    <main className="flex-1 overflow-auto p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        <div>
          <h1 className="font-bold text-2xl text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Visão geral das suas finanças</p>
        </div>

        <StatsCards
          totalBalance={totalBalance}
          monthlyIncome={monthlyIncome}
          monthlyExpenses={monthlyExpenses}
          portfolioValue={totalPortfolioValue}
          portfolioChange={0}
        />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <PortfolioChart data={portfolioHistory} />
          </div>
          <div>
            <TopAssets portfolio={mockPortfolio} />
          </div>
        </div>

        <RecentTransactions transactions={transaction?.transactions ?? []} />
      </div>
    </main>
  );
}
