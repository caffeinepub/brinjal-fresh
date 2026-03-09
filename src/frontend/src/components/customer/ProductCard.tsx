import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Product } from "@/store/types";
import { calcPriceForUnit, formatRupees, stockLabel } from "@/store/types";
import { ShoppingCart } from "lucide-react";
import { useState } from "react";
import { QuantitySelector } from "./QuantitySelector";

interface ProductCardProps {
  product: Product;
  index: number;
  onAddToCart: (product: Product, grams: number) => void;
}

export function ProductCard({ product, index, onAddToCart }: ProductCardProps) {
  const unitType = product.unitType ?? "kg";
  const isBunchOrPiece = unitType === "bunch" || unitType === "piece";
  const [selectedGrams, setSelectedGrams] = useState(isBunchOrPiece ? 1 : 500);
  const [added, setAdded] = useState(false);
  const stock = stockLabel(product.stockGrams, product.unitType);

  const handleAdd = () => {
    if (stock.level === "out") return;
    onAddToCart(product, selectedGrams);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <article
      data-ocid={`product.card.${index}`}
      className="bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col border border-border/50 group"
    >
      {/* Image */}
      <div className="relative overflow-hidden bg-muted aspect-square">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {/* Stock badge overlay */}
        <div className="absolute top-2 right-2">
          <span
            className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
              stock.level === "good"
                ? "bg-primary text-primary-foreground"
                : stock.level === "low"
                  ? "bg-brand-yellow text-foreground"
                  : "bg-destructive text-destructive-foreground"
            }`}
          >
            {stock.label}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4 gap-3">
        {/* Name and price row */}
        <div>
          <h3 className="font-display font-bold text-base text-foreground leading-tight">
            {product.name}
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            {product.hindiName}
          </p>
        </div>

        {/* PRICE - bold and prominent */}
        <div className="flex items-center gap-2">
          <span className="price-bold text-xl">
            {formatRupees(product.pricePerKg)}
          </span>
          <span className="text-sm text-muted-foreground font-medium">
            {unitType === "bunch"
              ? "/bunch"
              : unitType === "piece"
                ? "/piece"
                : "/kg"}
          </span>
        </div>

        {/* Quantity selector */}
        <QuantitySelector
          product={product}
          selectedGrams={selectedGrams}
          onSelect={setSelectedGrams}
          ocidIndex={index}
        />

        {/* Add to cart button */}
        <Button
          data-ocid={`product.add_button.${index}`}
          onClick={handleAdd}
          disabled={stock.level === "out"}
          className={`w-full font-semibold transition-all duration-200 ${
            added
              ? "bg-green-600 text-white"
              : "bg-primary text-primary-foreground hover:opacity-90"
          }`}
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          {added
            ? "Added!"
            : stock.level === "out"
              ? "Out of Stock"
              : "Add to Cart"}
        </Button>
      </div>
    </article>
  );
}
