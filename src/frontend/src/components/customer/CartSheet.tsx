import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import type { CartItem } from "@/store/types";
import {
  QUANTITY_OPTIONS,
  calcPriceForUnit,
  formatRupees,
} from "@/store/types";
import { ChevronRight, ShoppingBag, Trash2, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface CartSheetProps {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  cart: CartItem[];
  cartTotal: number;
  onRemove: (i: number) => void;
  onPlaceOrder: (name: string, address: string, phone: string) => number;
}

type Step = "cart" | "checkout" | "success";

export function CartSheet({
  open,
  onOpenChange,
  cart,
  cartTotal,
  onRemove,
  onPlaceOrder,
}: CartSheetProps) {
  const [step, setStep] = useState<Step>("cart");
  const [orderId, setOrderId] = useState<number | null>(null);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const quantityLabel = (item: CartItem) => {
    const unitType = item.product.unitType ?? "kg";
    if (unitType === "bunch") {
      const q = item.quantityGrams;
      return `${q} bunch${q > 1 ? "es" : ""}`;
    }
    if (unitType === "piece") {
      const q = item.quantityGrams;
      return `${q} piece${q > 1 ? "s" : ""}`;
    }
    const opt = QUANTITY_OPTIONS.find((q) => q.grams === item.quantityGrams);
    return opt?.label ?? `${item.quantityGrams}g`;
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = "Full name is required";
    if (!address.trim()) e.address = "Delivery address is required";
    if (!/^\d{10}$/.test(phone.replace(/\s/g, "")))
      e.phone = "Enter a valid 10-digit phone number";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handlePlaceOrder = () => {
    if (!validate()) return;
    const id = onPlaceOrder(name, address, phone);
    setOrderId(id);
    setStep("success");
    toast.success("Order placed successfully!");
    setName("");
    setAddress("");
    setPhone("");
  };

  const handleClose = () => {
    onOpenChange(false);
    setTimeout(() => setStep("cart"), 300);
  };

  return (
    <Sheet open={open} onOpenChange={handleClose}>
      <SheetContent
        data-ocid="cart.sheet"
        side="right"
        className="w-full sm:max-w-md flex flex-col p-0"
      >
        <SheetHeader className="px-5 py-4 border-b border-border">
          <SheetTitle className="font-display flex items-center gap-2 text-foreground">
            {step === "cart" && (
              <>
                <ShoppingBag className="w-5 h-5 text-primary" />
                Your Cart ({cart.length} {cart.length === 1 ? "item" : "items"})
              </>
            )}
            {step === "checkout" && (
              <button
                type="button"
                onClick={() => setStep("cart")}
                className="flex items-center gap-2 text-primary hover:underline text-base font-bold"
              >
                ← Delivery Details
              </button>
            )}
            {step === "success" && "Order Confirmed! 🎉"}
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto">
          {/* CART STEP */}
          {step === "cart" && (
            <div className="flex flex-col h-full">
              {cart.length === 0 ? (
                <div
                  data-ocid="cart.empty_state"
                  className="flex flex-col items-center justify-center flex-1 py-20 gap-4 text-muted-foreground"
                >
                  <ShoppingBag className="w-14 h-14 opacity-30" />
                  <p className="font-medium">Your cart is empty</p>
                  <p className="text-sm">Add some fresh vegetables!</p>
                </div>
              ) : (
                <div className="p-5 space-y-4">
                  {cart.map((item, i) => (
                    <div
                      key={`${item.product.id}-${item.quantityGrams}-${i}`}
                      data-ocid={`cart.item.${i + 1}`}
                      className="flex items-center gap-3 bg-muted/30 rounded-xl p-3"
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-14 h-14 rounded-lg object-cover flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm truncate">
                          {item.product.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {quantityLabel(item)}
                        </p>
                        <p className="price-bold text-sm mt-0.5">
                          {formatRupees(
                            calcPriceForUnit(item.product, item.quantityGrams),
                          )}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => onRemove(i)}
                        className="text-destructive hover:text-destructive/80 p-1.5 rounded-lg hover:bg-destructive/10 transition-colors flex-shrink-0"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* CHECKOUT STEP */}
          {step === "checkout" && (
            <div className="p-5 space-y-5">
              <div className="space-y-1">
                <Label htmlFor="checkout-name">Full Name *</Label>
                <Input
                  id="checkout-name"
                  data-ocid="checkout.input"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={errors.name ? "border-destructive" : ""}
                />
                {errors.name && (
                  <p className="text-destructive text-xs">{errors.name}</p>
                )}
              </div>
              <div className="space-y-1">
                <Label htmlFor="checkout-address">Delivery Address *</Label>
                <Textarea
                  id="checkout-address"
                  data-ocid="checkout.textarea"
                  placeholder="House/Flat No., Street, Area, City, PIN"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  rows={3}
                  className={errors.address ? "border-destructive" : ""}
                />
                {errors.address && (
                  <p className="text-destructive text-xs">{errors.address}</p>
                )}
              </div>
              <div className="space-y-1">
                <Label htmlFor="checkout-phone">Phone Number *</Label>
                <Input
                  id="checkout-phone"
                  data-ocid="checkout.phone_input"
                  type="tel"
                  placeholder="10-digit mobile number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  maxLength={10}
                  className={errors.phone ? "border-destructive" : ""}
                />
                {errors.phone && (
                  <p className="text-destructive text-xs">{errors.phone}</p>
                )}
              </div>

              {/* Order summary */}
              <div className="bg-muted/40 rounded-xl p-4 space-y-2">
                <p className="font-semibold text-sm">Order Summary</p>
                {cart.map((item, i) => (
                  <div
                    key={`summary-${item.product.id}-${i}`}
                    className="flex justify-between text-xs text-muted-foreground"
                  >
                    <span>
                      {item.product.name} × {quantityLabel(item)}
                    </span>
                    <span>
                      {formatRupees(
                        calcPriceForUnit(item.product, item.quantityGrams),
                      )}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SUCCESS STEP */}
          {step === "success" && (
            <div
              data-ocid="order.success_state"
              className="flex flex-col items-center justify-center py-16 px-6 text-center gap-4"
            >
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-4xl">🥦</span>
              </div>
              <h3 className="font-display text-2xl font-bold text-foreground">
                Order Placed!
              </h3>
              <p className="text-muted-foreground">
                Your fresh vegetables are on their way.
              </p>
              {orderId && (
                <div className="bg-muted/50 rounded-xl px-6 py-3">
                  <p className="text-xs text-muted-foreground">Order ID</p>
                  <p className="font-mono font-bold text-primary">#{orderId}</p>
                </div>
              )}
              <p className="text-sm text-muted-foreground">
                We'll contact you on <strong>{phone}</strong> to confirm.
              </p>
              <Button onClick={handleClose} className="mt-4 w-full">
                Continue Shopping
              </Button>
            </div>
          )}
        </div>

        {/* Footer actions */}
        {step !== "success" && (
          <div className="border-t border-border p-5 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground font-medium">
                Subtotal
              </span>
              <span className="price-bold text-xl">
                {formatRupees(cartTotal)}
              </span>
            </div>
            <Separator />
            {step === "cart" ? (
              <Button
                data-ocid="cart.checkout_button"
                onClick={() => setStep("checkout")}
                disabled={cart.length === 0}
                className="w-full font-semibold"
                size="lg"
              >
                Proceed to Checkout
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            ) : (
              <Button
                data-ocid="checkout.submit_button"
                onClick={handlePlaceOrder}
                className="w-full font-semibold"
                size="lg"
              >
                Place Order — {formatRupees(cartTotal)}
              </Button>
            )}
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
