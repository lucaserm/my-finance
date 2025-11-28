"use client";

import { useState } from "react";

import { AllocationChart } from "@/components/portfolio/allocation-chart";
import { AssetDetailChart } from "@/components/portfolio/asset-detail-chart";
import { PortfolioSummary } from "@/components/portfolio/portfolio-summary";
import { PortfolioTable } from "@/components/portfolio/portfolio-table";
import { Sidebar } from "@/components/sidebar";
import { generateAssetHistory, mockPortfolio } from "@/lib/mock-data";
import type { PortfolioItem } from "@/lib/types";

export default function PortfolioPage() {
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(
    mockPortfolio[0] || null,
  );

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 overflow-auto p-6">
        <div className="mx-auto max-w-7xl space-y-6">
          <div>
            <h1 className="font-bold text-2xl text-foreground">Portfólio</h1>
            <p className="text-muted-foreground">
              Acompanhe seus investimentos e rendimentos
            </p>
          </div>

          <PortfolioSummary portfolio={mockPortfolio} />

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              {selectedItem && (
                <AssetDetailChart
                  item={selectedItem}
                  chartData={generateAssetHistory(selectedItem.asset.price)}
                />
              )}
            </div>
            <div>
              <AllocationChart portfolio={mockPortfolio} />
            </div>
          </div>

          <PortfolioTable
            portfolio={mockPortfolio}
            onSelect={setSelectedItem}
            selectedId={selectedItem?.id}
          />
        </div>
      </main>
    </div>
  );
}
