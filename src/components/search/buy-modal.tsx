"use client";

import { Calendar } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Asset } from "@/lib/types";

interface BuyModalProps {
  asset: Asset | null;
  open: boolean;
  onClose: () => void;
  onConfirm: (data: {
    asset: Asset;
    quantity: number;
    purchasePrice: number;
    purchaseDate: string;
  }) => void;
}

export function BuyModal({ asset, open, onClose, onConfirm }: BuyModalProps) {
  const [quantity, setQuantity] = useState("");
  const [purchasePrice, setPurchasePrice] = useState("");
  const [purchaseDate, setPurchaseDate] = useState(
    new Date().toISOString().split("T")[0],
  );

  const handleConfirm = () => {
    if (!asset || !quantity || !purchasePrice || !purchaseDate) return;

    onConfirm({
      asset,
      quantity: Number.parseFloat(quantity),
      purchasePrice: Number.parseFloat(purchasePrice),
      purchaseDate,
    });

    setQuantity("");
    setPurchasePrice("");
    setPurchaseDate(new Date().toISOString().split("T")[0]);
    onClose();
  };

  const totalValue =
    (Number.parseFloat(quantity) || 0)
    * (Number.parseFloat(purchasePrice) || 0);

  if (!asset) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="border-border bg-card">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-foreground">
            <span className="text-2xl">{/* {asset.logo} */}🎯</span>
            Comprar {asset.symbol}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="quantity" className="text-foreground">
              Quantidade
            </Label>
            <Input
              id="quantity"
              type="number"
              step="any"
              placeholder="Ex: 10"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="border-border bg-secondary"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="price" className="text-foreground">
              Preço de Compra ({asset.currency === "BRL" ? "R$" : "$"})
            </Label>
            <Input
              id="price"
              type="number"
              step="any"
              placeholder={`Preço atual: ${asset.price}`}
              value={purchasePrice}
              onChange={(e) => setPurchasePrice(e.target.value)}
              className="border-border bg-secondary"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="date" className="text-foreground">
              Data da Compra
            </Label>
            <div className="relative">
              <Input
                id="date"
                type="date"
                value={purchaseDate}
                onChange={(e) => setPurchaseDate(e.target.value)}
                className="border-border bg-secondary"
              />
              <Calendar className="-translate-y-1/2 pointer-events-none absolute top-1/2 right-3 h-4 w-4 text-muted-foreground" />
            </div>
          </div>

          {totalValue > 0 && (
            <div className="rounded-lg border border-border bg-secondary/50 p-4">
              <p className="text-muted-foreground text-sm">Valor Total</p>
              <p className="font-bold text-foreground text-xl">
                {totalValue.toLocaleString(
                  asset.currency === "BRL" ? "pt-BR" : "en-US",
                  {
                    style: "currency",
                    currency: asset.currency === "BRL" ? "BRL" : "USD",
                  },
                )}
              </p>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={!quantity || !purchasePrice}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Confirmar Compra
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
