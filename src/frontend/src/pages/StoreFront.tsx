import { CartSheet } from "@/components/customer/CartSheet";
import { ProductCard } from "@/components/customer/ProductCard";
import { Input } from "@/components/ui/input";
import type { CartItem, Discount, Product } from "@/store/types";
import { Link } from "@tanstack/react-router";
import {
  Clock,
  Leaf,
  Search,
  Settings,
  ShoppingBag,
  ShoppingCart,
  Tag,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

interface StoreFrontProps {
  products: Product[];
  cart: CartItem[];
  cartCount: number;
  cartTotal: number;
  activeDiscounts: Discount[];
  deliveryTiming: string | null;
  onAddToCart: (product: Product, grams: number) => void;
  onRemoveFromCart: (i: number) => void;
  onPlaceOrder: (name: string, address: string, phone: string) => number;
}

export function StoreFront({
  products,
  cart,
  cartCount,
  cartTotal,
  activeDiscounts,
  deliveryTiming,
  onAddToCart,
  onRemoveFromCart,
  onPlaceOrder,
}: StoreFrontProps) {
  const [cartOpen, setCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = searchQuery.trim()
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.hindiName.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : products;

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.06 },
    },
  };
  const cardVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: "oklch(0.96 0.04 145)" }}
    >
      {/* Header / Navbar */}
      <header className="sticky top-0 z-50 bg-card/95 backdrop-blur border-b border-border shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Brand */}
            <Link to="/" data-ocid="nav.link">
              <div className="flex items-center gap-2 cursor-pointer">
                <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center flex-shrink-0">
                  <Leaf className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <span className="font-display font-extrabold text-xl text-primary leading-none block">
                    Brinjal Fresh
                  </span>
                  <span className="text-[10px] text-muted-foreground leading-none">
                    Farm Fresh, Delivered to You
                  </span>
                </div>
              </div>
            </Link>

            {/* Cart button */}
            <button
              type="button"
              data-ocid="nav.cart_button"
              onClick={() => setCartOpen(true)}
              className="relative flex items-center gap-2 bg-primary/10 hover:bg-primary/20 transition-colors px-4 py-2 rounded-xl text-primary font-semibold text-sm"
              aria-label={`Cart with ${cartCount} items`}
            >
              <ShoppingCart className="w-5 h-5" />
              <span className="hidden sm:inline">Cart</span>
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span
                    key="badge"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </header>

      {/* Search Bar */}
      <div className="sticky top-16 z-40 bg-card/98 backdrop-blur border-b border-border shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="relative max-w-xl">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            <Input
              data-ocid="search.search_input"
              type="search"
              placeholder="Search vegetables..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-muted/50 border-border focus-visible:bg-background transition-colors"
            />
          </div>
        </div>

        {/* Delivery Timing Strip */}
        {deliveryTiming && (
          <div
            data-ocid="delivery.timing_strip"
            className="border-t border-amber-200/60 bg-gradient-to-r from-amber-500 to-orange-500 px-4 sm:px-6 lg:px-8 py-2"
          >
            <div className="max-w-7xl mx-auto flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 text-white font-extrabold text-sm tracking-wide uppercase">
                <Clock className="w-4 h-4 flex-shrink-0" />🚚 DELIVERY:
              </span>
              <span className="text-white font-bold text-sm">
                {deliveryTiming}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Discount Banner */}
      {activeDiscounts.length > 0 && (
        <div
          data-ocid="discount.banner"
          className="bg-gradient-to-r from-green-500 via-emerald-500 to-teal-600 px-4 py-2.5"
        >
          <div className="max-w-7xl mx-auto flex flex-wrap items-center gap-2">
            {activeDiscounts.map((d) => (
              <span
                key={d.id}
                className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-sm border border-white/30 text-white font-bold text-sm px-3 py-1 rounded-full shadow-sm"
              >
                <Tag className="w-3.5 h-3.5 flex-shrink-0" />
                <span className="font-extrabold tracking-wide uppercase text-xs">
                  {d.label}
                </span>
                <span className="text-white/80 font-semibold">·</span>
                <span className="bg-white text-emerald-700 font-extrabold text-xs px-2 py-0.5 rounded-full">
                  {d.discountPercent}% OFF
                </span>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Product Grid */}
      <main
        className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10"
        id="products"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-foreground">
              {searchQuery.trim()
                ? `Results for "${searchQuery}"`
                : "Fresh Vegetables"}
            </h2>
            <p className="text-muted-foreground text-sm mt-0.5">
              {filteredProducts.length} item
              {filteredProducts.length !== 1 ? "s" : ""}{" "}
              {searchQuery.trim() ? "found" : "available"}
            </p>
          </div>
        </div>

        {filteredProducts.length === 0 && searchQuery.trim() ? (
          <div
            data-ocid="products.empty_state"
            className="flex flex-col items-center justify-center py-20 text-center"
          >
            <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mb-4">
              <Search className="w-8 h-8 text-muted-foreground" />
            </div>
            <p className="font-display font-bold text-xl text-foreground mb-1">
              No products found
            </p>
            <p className="text-muted-foreground text-sm">
              No vegetables match "{searchQuery}". Try a different search.
            </p>
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
          >
            {filteredProducts.map((product, i) => (
              <motion.div key={product.id} variants={cardVariants}>
                <ProductCard
                  product={product}
                  index={i + 1}
                  onAddToCart={onAddToCart}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card mt-12 mb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
                <Leaf className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-display font-bold text-primary">
                Brinjal Fresh
              </span>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <p>
                © {new Date().getFullYear()}. Built with ❤️ using{" "}
                <a
                  href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors underline"
                >
                  caffeine.ai
                </a>
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Bottom Navigation Bar */}
      <nav
        data-ocid="bottom.nav"
        className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border shadow-lg"
      >
        <div className="max-w-lg mx-auto flex items-center justify-around h-16 px-4">
          {/* Shop */}
          <button
            type="button"
            data-ocid="bottom.shop.button"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="flex flex-col items-center gap-1 flex-1 py-2 text-primary"
          >
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <ShoppingBag className="w-5 h-5 text-primary" />
            </div>
            <span className="text-xs font-semibold text-primary">Shop</span>
          </button>

          {/* Cart */}
          <button
            type="button"
            data-ocid="bottom.cart.button"
            onClick={() => setCartOpen(true)}
            className="flex flex-col items-center gap-1 flex-1 py-2 relative text-muted-foreground hover:text-primary transition-colors"
          >
            <div className="w-10 h-10 rounded-full flex items-center justify-center relative">
              <ShoppingCart className="w-5 h-5" />
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span
                    key="bottom-badge"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
            <span className="text-xs font-medium">Cart</span>
          </button>

          {/* Admin */}
          <Link
            to="/admin"
            data-ocid="bottom.admin.link"
            className="flex flex-col items-center gap-1 flex-1 py-2 text-muted-foreground hover:text-primary transition-colors"
          >
            <div className="w-10 h-10 rounded-full flex items-center justify-center">
              <Settings className="w-5 h-5" />
            </div>
            <span className="text-xs font-medium">Admin</span>
          </Link>
        </div>
      </nav>

      {/* Cart Sheet */}
      <CartSheet
        open={cartOpen}
        onOpenChange={setCartOpen}
        cart={cart}
        cartTotal={cartTotal}
        onRemove={onRemoveFromCart}
        onPlaceOrder={onPlaceOrder}
      />
    </div>
  );
}
