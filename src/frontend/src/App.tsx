import { Toaster } from "@/components/ui/sonner";
import { AdminPanel } from "@/pages/AdminPanel";
import { StoreFront } from "@/pages/StoreFront";
import { useStore } from "@/store/useStore";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";

// Root component that provides shared state via closure
function RootWithStore() {
  const store = useStore();

  const rootRoute = createRootRoute({
    component: () => (
      <>
        <Outlet />
        <Toaster richColors position="top-right" />
      </>
    ),
  });

  const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/",
    component: () => (
      <StoreFront
        products={store.products}
        cart={store.cart}
        cartCount={store.cartCount}
        cartTotal={store.cartTotal}
        activeDiscounts={store.activeDiscounts}
        deliveryTiming={store.activeDeliveryTiming}
        onAddToCart={store.addToCart}
        onRemoveFromCart={store.removeFromCart}
        onPlaceOrder={store.placeOrder}
      />
    ),
  });

  const adminRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/admin",
    component: () => (
      <AdminPanel
        products={store.products}
        orders={store.orders}
        discounts={store.discounts}
        deliveryTiming={store.deliveryTiming}
        onUpdateProduct={store.updateProduct}
        onDeleteProduct={store.deleteProduct}
        onUpdateOrderStatus={store.updateOrderStatus}
        onAddDiscount={store.addDiscount}
        onUpdateDiscount={store.updateDiscount}
        onDeleteDiscount={store.deleteDiscount}
        onToggleDiscount={store.toggleDiscount}
        onUpdateDeliveryTiming={store.updateDeliveryTiming}
      />
    ),
  });

  const routeTree = rootRoute.addChildren([indexRoute, adminRoute]);

  const router = createRouter({ routeTree });

  return <RouterProvider router={router} />;
}

export default function App() {
  return <RootWithStore />;
}
