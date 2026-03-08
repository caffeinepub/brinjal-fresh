import { AdminLogin } from "@/components/admin/AdminLogin";
import { DeliveryTimingTab } from "@/components/admin/DeliveryTimingTab";
import { DiscountsTab } from "@/components/admin/DiscountsTab";
import { OrdersTab } from "@/components/admin/OrdersTab";
import { ProductsTab } from "@/components/admin/ProductsTab";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { DeliveryTiming, Discount, Order, Product } from "@/store/types";
import { Link } from "@tanstack/react-router";
import { Clock, Leaf, LogOut, Package, ShoppingBag, Tag } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

interface AdminPanelProps {
  products: Product[];
  orders: Order[];
  discounts: Discount[];
  deliveryTiming: DeliveryTiming;
  onUpdateProduct: (p: Product) => void;
  onUpdateOrderStatus: (id: number, status: Order["status"]) => void;
  onAddDiscount: (d: Omit<Discount, "id">) => void;
  onUpdateDiscount: (d: Discount) => void;
  onDeleteDiscount: (id: number) => void;
  onToggleDiscount: (id: number) => void;
  onUpdateDeliveryTiming: (dt: DeliveryTiming) => void;
}

export function AdminPanel({
  products,
  orders,
  discounts,
  deliveryTiming,
  onUpdateProduct,
  onUpdateOrderStatus,
  onAddDiscount,
  onUpdateDiscount,
  onDeleteDiscount,
  onToggleDiscount,
  onUpdateDeliveryTiming,
}: AdminPanelProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (!isLoggedIn) {
    return <AdminLogin onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Admin header */}
      <header className="sticky top-0 z-50 bg-card border-b border-border shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <Leaf className="w-4 h-4 text-primary-foreground" />
              </div>
              <div>
                <span className="font-display font-extrabold text-lg text-primary">
                  Brinjal Fresh
                </span>
                <span className="ml-2 text-xs bg-muted px-2 py-0.5 rounded-full text-muted-foreground font-medium">
                  Admin
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Link to="/">
                <Button variant="outline" size="sm" className="hidden sm:flex">
                  ← Back to Store
                </Button>
              </Link>
              <Button
                data-ocid="admin.logout_button"
                variant="outline"
                size="sm"
                onClick={() => setIsLoggedIn(false)}
                className="text-destructive border-destructive/30 hover:bg-destructive/5"
              >
                <LogOut className="w-4 h-4 mr-1.5" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Stats bar */}
      <div className="bg-card/70 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="grid grid-cols-3 gap-4">
            {[
              {
                icon: Package,
                label: "Products",
                value: products.length,
                color: "text-primary",
              },
              {
                icon: ShoppingBag,
                label: "Orders",
                value: orders.length,
                color: "text-brand-orange",
              },
              {
                icon: Tag,
                label: "Active Offers",
                value: discounts.filter((d) => d.active).length,
                color: "text-chart-2",
              },
            ].map((stat) => (
              <div key={stat.label} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <div>
                  <p className="font-display font-extrabold text-2xl leading-none">
                    {stat.value}
                  </p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Tabs defaultValue="products" className="space-y-6">
            <TabsList className="bg-muted/60 rounded-xl p-1 w-full sm:w-auto">
              <TabsTrigger
                data-ocid="admin.products_tab"
                value="products"
                className="flex items-center gap-2 rounded-lg"
              >
                <Package className="w-4 h-4" />
                Products
              </TabsTrigger>
              <TabsTrigger
                data-ocid="admin.orders_tab"
                value="orders"
                className="flex items-center gap-2 rounded-lg"
              >
                <ShoppingBag className="w-4 h-4" />
                Orders
                {orders.filter((o) => o.status === "pending").length > 0 && (
                  <span className="ml-1 bg-brand-orange text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                    {orders.filter((o) => o.status === "pending").length}
                  </span>
                )}
              </TabsTrigger>
              <TabsTrigger
                data-ocid="admin.discounts_tab"
                value="discounts"
                className="flex items-center gap-2 rounded-lg"
              >
                <Tag className="w-4 h-4" />
                Discounts
              </TabsTrigger>
              <TabsTrigger
                data-ocid="admin.delivery_tab"
                value="delivery"
                className="flex items-center gap-2 rounded-lg"
              >
                <Clock className="w-4 h-4" />
                Delivery
              </TabsTrigger>
            </TabsList>

            <TabsContent value="products">
              <ProductsTab products={products} onUpdate={onUpdateProduct} />
            </TabsContent>

            <TabsContent value="orders">
              <OrdersTab orders={orders} onUpdateStatus={onUpdateOrderStatus} />
            </TabsContent>

            <TabsContent value="discounts">
              <DiscountsTab
                discounts={discounts}
                onAdd={onAddDiscount}
                onUpdate={onUpdateDiscount}
                onDelete={onDeleteDiscount}
                onToggle={onToggleDiscount}
              />
            </TabsContent>

            <TabsContent value="delivery">
              <DeliveryTimingTab
                deliveryTiming={deliveryTiming}
                onUpdate={onUpdateDeliveryTiming}
              />
            </TabsContent>
          </Tabs>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Brinjal Fresh Admin Panel. Built with ❤️
            using{" "}
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
      </footer>
    </div>
  );
}
