"use client";

import { useEffect, useState } from "react";

import { AllocationChart } from "@/components/portfolio/allocation-chart";
import { AssetDetailChart } from "@/components/portfolio/asset-detail-chart";
import { PortfolioSummary } from "@/components/portfolio/portfolio-summary";
import { PortfolioTable } from "@/components/portfolio/portfolio-table";
import { usePortfolioItems } from "@/hooks/queries/use-portfolio-items";
import { generateAssetHistory } from "@/lib/mock-data";
import type { PortfolioItem } from "@/schemas/portfolio-item";

export default function PortfolioPage() {
  const { data, isPending } = usePortfolioItems();
  const [selectedItem, setSelectedItem] = useState<PortfolioItem>();

  useEffect(() => {
    setSelectedItem(data?.portfolioItems[0]);
  }, [data]);

  if (isPending && !data) {
    return <div>Loading...</div>;
  }

  return (
    <main className="flex-1 overflow-auto p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        <div>
          <h1 className="font-bold text-2xl text-foreground">Portfólio</h1>
          <p className="text-muted-foreground">
            Acompanhe seus investimentos e rendimentos
          </p>
        </div>

        <PortfolioSummary portfolioItem={data?.portfolioItems || []} />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            {selectedItem && (
              <AssetDetailChart
                item={selectedItem}
                chartData={generateAssetHistory(
                  selectedItem.totalInvestedInCents / 100,
                )}
              />
            )}
          </div>
          <div>
            <AllocationChart portfolio={data?.portfolioItems || []} />
          </div>
        </div>

        <PortfolioTable
          portfolio={data?.portfolioItems || []}
          onSelect={setSelectedItem}
          selectedId={selectedItem?.id}
        />
      </div>
    </main>
  );
}
