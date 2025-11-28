"use client";

import { Search } from "lucide-react";
import { useState } from "react";

import { AssetCard } from "@/components/search/asset-card";
import { BuyModal } from "@/components/search/buy-modal";
import { Sidebar } from "@/components/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Toaster } from "@/components/ui/toaster";
import { useStock } from "@/hooks/queries/use-stock";
import { useDebounce } from "@/hooks/use-debounce";
import { useToast } from "@/hooks/use-toast";
import { generateAssetHistory } from "@/lib/mock-data";
import type { Asset, AssetType } from "@/lib/types";
import { cn } from "@/lib/utils";

const assetTypes: { value: AssetType | "ALL"; label: string }[] = [
  { value: "ALL", label: "Todos" },
  { value: "BRL", label: "Brasil" },
  { value: "USD", label: "EUA" },
  { value: "CRYPTO", label: "Crypto" },
];

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<AssetType | "ALL">("ALL");
  const [buyModalOpen, setBuyModalOpen] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const { toast } = useToast();

  const { data, refetch } = useStock({
    symbol: searchQuery,
    currency: selectedType === "ALL" ? "BRL" : selectedType,
  });

  const handleSearchChange = useDebounce(() => {
    refetch();
  }, 300);

  const handleBuy = (asset: Asset) => {
    setSelectedAsset(asset);
    setBuyModalOpen(true);
  };

  const handleConfirmBuy = (data: {
    asset: Asset;
    quantity: number;
    purchasePrice: number;
    purchaseDate: string;
  }) => {
    toast({
      title: "Compra registrada!",
      description: `${data.quantity} ${data.asset.symbol} adicionado ao portfólio.`,
    });
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 overflow-auto p-6">
        <div className="mx-auto max-w-7xl space-y-6">
          <div>
            <h1 className="font-bold text-2xl text-foreground">
              Buscar Ativos
            </h1>
            <p className="text-muted-foreground">
              Pesquise ações brasileiras, americanas e criptomoedas
            </p>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-1">
              <Search className="-translate-y-1/2 absolute top-1/2 left-3 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Buscar por símbolo ou nome..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  handleSearchChange();
                }}
                className="border-border bg-card pl-10"
              />
            </div>

            <div className="flex gap-2">
              {assetTypes.map((type) => (
                <Button
                  key={type.value}
                  variant="ghost"
                  onClick={() => setSelectedType(type.value)}
                  className={cn(
                    "border-border",
                    selectedType === type.value
                      && "border-primary bg-primary text-primary-foreground",
                  )}
                >
                  {type.label}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {data?.stock && (
              <AssetCard
                key={data.stock.symbol}
                asset={data.stock}
                chartData={generateAssetHistory(data.stock.price ?? 0)}
                onBuy={handleBuy}
              />
            )}
          </div>

          {!data?.stock && (
            <div className="py-12 text-center">
              <p className="text-muted-foreground">
                Nenhum ativo encontrado para sua busca.
              </p>
            </div>
          )}
        </div>
      </main>

      <BuyModal
        asset={selectedAsset}
        open={buyModalOpen}
        onClose={() => setBuyModalOpen(false)}
        onConfirm={handleConfirmBuy}
      />
      <Toaster />
    </div>
  );
}
