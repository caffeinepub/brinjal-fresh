import { useCallback, useEffect, useState } from "react";
import {
  type CartItem,
  type DeliveryTiming,
  type Discount,
  INITIAL_DELIVERY_TIMING,
  INITIAL_DISCOUNTS,
  INITIAL_PRODUCTS,
  type Order,
  type Product,
  calcPriceForUnit,
} from "./types";

// Data version — bump this whenever INITIAL_PRODUCTS changes to force a cache reset
const DATA_VERSION = "v27";

// LocalStorage helpers
function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

// On app load, if the stored data version doesn't match, wipe product/discount/delivery cache
function migrateStorage() {
  const storedVersion = localStorage.getItem("bj_data_version");
  if (storedVersion !== DATA_VERSION) {
    localStorage.removeItem("bj_products");
    localStorage.removeItem("bj_discounts");
    localStorage.removeItem("bj_delivery");
    localStorage.setItem("bj_data_version", DATA_VERSION);
  }
}

function saveToStorage<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // ignore quota errors
  }
}

export function useStore() {
  migrateStorage();

  const [products, setProducts] = useState<Product[]>(() =>
    loadFromStorage("bj_products", INITIAL_PRODUCTS),
  );
  const [orders, setOrders] = useState<Order[]>(() =>
    loadFromStorage("bj_orders", []),
  );
  const [discounts, setDiscounts] = useState<Discount[]>(() =>
    loadFromStorage("bj_discounts", INITIAL_DISCOUNTS),
  );
  const [deliveryTiming, setDeliveryTiming] = useState<DeliveryTiming>(() =>
    loadFromStorage("bj_delivery", INITIAL_DELIVERY_TIMING),
  );
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    saveToStorage("bj_products", products);
  }, [products]);
  useEffect(() => {
    saveToStorage("bj_orders", orders);
  }, [orders]);
  useEffect(() => {
    saveToStorage("bj_discounts", discounts);
  }, [discounts]);
  useEffect(() => {
    saveToStorage("bj_delivery", deliveryTiming);
  }, [deliveryTiming]);

  // Cart actions
  const addToCart = useCallback((product: Product, quantityGrams: number) => {
    setCart((prev) => {
      // For bunch/piece: merge by product id only (add quantities)
      // For kg: merge by product id + quantity
      const unitType = product.unitType ?? "kg";
      const isBunchOrPiece = unitType === "bunch" || unitType === "piece";
      const existing = prev.findIndex((c) =>
        isBunchOrPiece
          ? c.product.id === product.id
          : c.product.id === product.id && c.quantityGrams === quantityGrams,
      );
      if (existing >= 0) {
        const updated = [...prev];
        updated[existing] = {
          ...updated[existing],
          quantityGrams: updated[existing].quantityGrams + quantityGrams,
        };
        return updated;
      }
      return [...prev, { product, quantityGrams }];
    });
  }, []);

  const removeFromCart = useCallback((index: number) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const cartCount = cart.length;

  // Use calcPriceForUnit so bunch/piece prices are correct
  const cartSubtotal = cart.reduce((sum, item) => {
    return sum + calcPriceForUnit(item.product, item.quantityGrams);
  }, 0);

  const activeDiscounts = discounts.filter((d) => d.active);

  // Only apply a discount if the cart subtotal meets the discount's minimum order value
  // If no minOrderValue is set, the discount applies to all orders
  const applicableDiscounts = activeDiscounts.filter((d) => {
    if (d.minOrderValue == null || d.minOrderValue <= 0) return true;
    return cartSubtotal >= d.minOrderValue;
  });

  const maxDiscountPercent =
    applicableDiscounts.length > 0
      ? Math.max(...applicableDiscounts.map((d) => d.discountPercent))
      : 0;
  const cartSavings = Math.round((cartSubtotal * maxDiscountPercent) / 100);
  const cartTotal = cartSubtotal - cartSavings;

  // Order actions
  const placeOrder = useCallback(
    (customerName: string, address: string, phone: string): number => {
      const newOrder: Order = {
        id: Date.now(),
        customerName,
        address,
        phone,
        items: cart.map((c) => ({
          productId: c.product.id,
          productName: c.product.name,
          quantityGrams: c.quantityGrams,
          priceAtOrder: calcPriceForUnit(c.product, c.quantityGrams),
        })),
        totalAmountPaise: cartTotal,
        timestamp: Date.now(),
        status: "pending",
      };
      setOrders((prev) => [newOrder, ...prev]);
      setProducts((prev) =>
        prev.map((p) => {
          const cartItem = cart.find((c) => c.product.id === p.id);
          if (cartItem) {
            return {
              ...p,
              stockGrams: Math.max(0, p.stockGrams - cartItem.quantityGrams),
            };
          }
          return p;
        }),
      );
      clearCart();
      return newOrder.id;
    },
    [cart, cartTotal, clearCart],
  );

  const updateOrderStatus = useCallback(
    (orderId: number, status: Order["status"]) => {
      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, status } : o)),
      );
    },
    [],
  );

  // Product actions
  const updateProduct = useCallback((updated: Product) => {
    setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
  }, []);

  const deleteProduct = useCallback((id: number) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  }, []);

  // Discount actions
  const addDiscount = useCallback((d: Omit<Discount, "id">) => {
    const newD: Discount = { ...d, id: Date.now() };
    setDiscounts((prev) => [...prev, newD]);
  }, []);

  const updateDiscount = useCallback((updated: Discount) => {
    setDiscounts((prev) =>
      prev.map((d) => (d.id === updated.id ? updated : d)),
    );
  }, []);

  const deleteDiscount = useCallback((id: number) => {
    setDiscounts((prev) => prev.filter((d) => d.id !== id));
  }, []);

  const toggleDiscount = useCallback((id: number) => {
    setDiscounts((prev) =>
      prev.map((d) => (d.id === id ? { ...d, active: !d.active } : d)),
    );
  }, []);

  // Delivery timing actions
  const updateDeliveryTiming = useCallback((dt: DeliveryTiming) => {
    setDeliveryTiming(dt);
  }, []);

  const activeDeliveryTiming = deliveryTiming.active
    ? deliveryTiming.message
    : null;

  return {
    products,
    orders,
    discounts,
    activeDiscounts,
    deliveryTiming,
    activeDeliveryTiming,
    cart,
    cartCount,
    cartSubtotal,
    cartSavings,
    cartTotal,
    addToCart,
    removeFromCart,
    clearCart,
    placeOrder,
    updateOrderStatus,
    updateProduct,
    deleteProduct,
    addDiscount,
    updateDiscount,
    deleteDiscount,
    toggleDiscount,
    updateDeliveryTiming,
  };
}
