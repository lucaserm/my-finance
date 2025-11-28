"use client";

import { PortfolioChart } from "@/components/dashboard/portfolio-chart";
import { RecentTransactions } from "@/components/dashboard/recent-transactions";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { TopAssets } from "@/components/dashboard/top-assets";
import { Sidebar } from "@/components/sidebar";
import { useTransaction } from "@/hooks/queries/use-transaction";
import { generatePortfolioHistory, mockPortfolio } from "@/lib/mock-data";

export default function DashboardPage() {
  const { data } = useTransaction();

  const portfolioHistory = generatePortfolioHistory();

  const totalPortfolioValue = mockPortfolio.reduce(
    (sum, item) => sum + item.currentValue,
    0,
  );

  const totalProfit = mockPortfolio.reduce((sum, item) => sum + item.profit, 0);

  const portfolioChangePercent =
    (totalProfit / (totalPortfolioValue - totalProfit)) * 100;

  const monthlyIncome =
    (data?.transactions
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + t.amountInCents, 0) || 0) / 100;

  const monthlyExpenses =
    (data?.transactions
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + t.amountInCents, 0) || 0) / 100;

  const totalBalance = monthlyIncome - monthlyExpenses + totalPortfolioValue;

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 overflow-auto p-6">
        <div className="mx-auto max-w-7xl space-y-6">
          <div>
            <h1 className="font-bold text-2xl text-foreground">Dashboard</h1>
            <p className="text-muted-foreground">
              Visão geral das suas finanças
            </p>
          </div>

          <StatsCards
            totalBalance={totalBalance}
            monthlyIncome={monthlyIncome}
            monthlyExpenses={monthlyExpenses}
            portfolioValue={totalPortfolioValue}
            portfolioChange={portfolioChangePercent}
          />

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <PortfolioChart data={portfolioHistory} />
            </div>
            <div>
              <TopAssets portfolio={mockPortfolio} />
            </div>
          </div>

          <RecentTransactions transactions={data?.transactions ?? []} />
        </div>
      </main>
    </div>
  );
}
