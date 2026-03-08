import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Order } from "@/store/types";
import { QUANTITY_OPTIONS, formatRupees } from "@/store/types";
import { PackageOpen } from "lucide-react";

interface OrdersTabProps {
  orders: Order[];
  onUpdateStatus: (orderId: number, status: Order["status"]) => void;
}

const STATUS_COLORS: Record<Order["status"], string> = {
  pending: "bg-brand-yellow text-foreground",
  confirmed: "bg-primary text-primary-foreground",
  delivered: "bg-green-600 text-white",
};

function quantityLabel(grams: number) {
  const opt = QUANTITY_OPTIONS.find((q) => q.grams === grams);
  return opt?.label ?? `${grams}g`;
}

function formatDate(ts: number) {
  return new Date(ts).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function OrdersTab({ orders, onUpdateStatus }: OrdersTabProps) {
  if (orders.length === 0) {
    return (
      <div
        data-ocid="orders.empty_state"
        className="flex flex-col items-center justify-center py-20 gap-4 text-muted-foreground"
      >
        <PackageOpen className="w-16 h-16 opacity-30" />
        <p className="font-semibold text-lg">No orders yet</p>
        <p className="text-sm">Orders from customers will appear here</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <h2 className="font-display text-xl font-bold">Orders</h2>
        <p className="text-sm text-muted-foreground">
          {orders.length} orders received
        </p>
      </div>

      {/* Mobile cards */}
      <div className="sm:hidden space-y-3">
        {orders.map((order, idx) => {
          const i = idx + 1;
          return (
            <div
              key={order.id}
              data-ocid={`orders.row.${i}`}
              className="bg-card rounded-xl border border-border p-4 space-y-3"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-bold text-sm">
                    #{String(order.id).slice(-6)}
                  </p>
                  <p className="font-semibold">{order.customerName}</p>
                  <p className="text-xs text-muted-foreground">{order.phone}</p>
                </div>
                <span
                  className={`text-xs font-bold px-2 py-1 rounded-full ${STATUS_COLORS[order.status]}`}
                >
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
              </div>
              <div className="text-xs text-muted-foreground bg-muted/30 rounded-lg p-2">
                {order.address}
              </div>
              <div className="space-y-1">
                {order.items.map((item) => (
                  <div
                    key={`${item.productId}-${item.quantityGrams}`}
                    className="flex justify-between text-xs"
                  >
                    <span>
                      {item.productName} × {quantityLabel(item.quantityGrams)}
                    </span>
                    <span className="font-semibold">
                      {formatRupees(item.priceAtOrder)}
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs text-muted-foreground">
                    {formatDate(order.timestamp)}
                  </span>
                  <p className="price-bold text-base">
                    {formatRupees(order.totalAmountPaise)}
                  </p>
                </div>
                <Select
                  value={order.status}
                  onValueChange={(v) =>
                    onUpdateStatus(order.id, v as Order["status"])
                  }
                >
                  <SelectTrigger
                    data-ocid={`orders.select.${i}`}
                    className="w-32 h-8 text-xs"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="confirmed">Confirmed</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          );
        })}
      </div>

      {/* Desktop table */}
      <div
        data-ocid="orders.table"
        className="hidden sm:block rounded-xl border border-border overflow-auto"
      >
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Items</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order, idx) => {
              const i = idx + 1;
              return (
                <TableRow key={order.id} data-ocid={`orders.row.${i}`}>
                  <TableCell className="font-mono text-xs text-muted-foreground">
                    #{String(order.id).slice(-6)}
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-semibold text-sm">
                        {order.customerName}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {order.phone}
                      </p>
                      <p className="text-xs text-muted-foreground line-clamp-1 max-w-[180px]">
                        {order.address}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-0.5 text-xs">
                      {order.items.map((item) => (
                        <div
                          key={`${item.productId}-${item.quantityGrams}`}
                          className="text-muted-foreground"
                        >
                          {item.productName} ×{" "}
                          {quantityLabel(item.quantityGrams)}
                        </div>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="price-bold">
                      {formatRupees(order.totalAmountPaise)}
                    </span>
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground whitespace-nowrap">
                    {formatDate(order.timestamp)}
                  </TableCell>
                  <TableCell>
                    <Select
                      value={order.status}
                      onValueChange={(v) =>
                        onUpdateStatus(order.id, v as Order["status"])
                      }
                    >
                      <SelectTrigger
                        data-ocid={`orders.select.${i}`}
                        className="w-32 h-8 text-xs"
                      >
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="confirmed">Confirmed</SelectItem>
                        <SelectItem value="delivered">Delivered</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
