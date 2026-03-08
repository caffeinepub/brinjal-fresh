import { QUANTITY_OPTIONS, calcPrice, formatRupees } from "@/store/types";
import type { Product } from "@/store/types";
import { useEffect, useRef } from "react";

interface QuantitySelectorProps {
  product: Product;
  selectedGrams: number;
  onSelect: (grams: number) => void;
  ocidIndex: number;
}

export function QuantitySelector({
  product,
  selectedGrams,
  onSelect,
  ocidIndex,
}: QuantitySelectorProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll selected item into view on change
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const selectedEl = container.querySelector<HTMLElement>(
      "[aria-pressed='true']",
    );
    if (selectedEl) {
      selectedEl.scrollIntoView({ block: "nearest", behavior: "smooth" });
    }
  });

  const price = calcPrice(product.pricePerKg, selectedGrams);
  const selectedOption = QUANTITY_OPTIONS.find(
    (q) => q.grams === selectedGrams,
  );

  return (
    <div className="space-y-1">
      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
        Select Quantity
      </p>
      <div
        ref={containerRef}
        className="quantity-scroll overflow-y-auto max-h-[150px] rounded-md border border-border bg-muted/30"
        data-ocid={`product.select.${ocidIndex}`}
        aria-label="Select quantity"
      >
        {QUANTITY_OPTIONS.map((opt) => {
          const isSelected = opt.grams === selectedGrams;
          return (
            <button
              type="button"
              key={opt.grams}
              aria-pressed={isSelected}
              onClick={() => onSelect(opt.grams)}
              className={`w-full text-left px-3 py-1.5 text-sm transition-colors cursor-pointer flex justify-between items-center ${
                isSelected
                  ? "bg-primary text-primary-foreground font-semibold"
                  : "hover:bg-accent/60 text-foreground"
              }`}
            >
              <span>{opt.label}</span>
              <span
                className={`text-xs ${isSelected ? "text-primary-foreground/80" : "text-muted-foreground"}`}
              >
                {formatRupees(calcPrice(product.pricePerKg, opt.grams))}
              </span>
            </button>
          );
        })}
      </div>
      <div className="flex items-center justify-between pt-0.5">
        <span className="text-xs text-muted-foreground">
          {selectedOption?.label ?? ""} selected
        </span>
        <span className="price-bold text-sm">= {formatRupees(price)}</span>
      </div>
    </div>
  );
}
