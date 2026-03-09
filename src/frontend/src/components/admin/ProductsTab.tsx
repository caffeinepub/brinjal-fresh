import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Product } from "@/store/types";
import { formatRupees, stockLabel } from "@/store/types";

function stockDisplay(product: Product): string {
  const unit = product.unitType ?? "kg";
  if (unit === "bunch") return `${product.stockGrams} bunches`;
  if (unit === "piece") return `${product.stockGrams} pieces`;
  return `${(product.stockGrams / 1000).toFixed(1)} kg`;
}

function priceLabel(product: Product): string {
  const unit = product.unitType ?? "kg";
  if (unit === "bunch") return `${formatRupees(product.pricePerKg)}/bunch`;
  if (unit === "piece") return `${formatRupees(product.pricePerKg)}/pc`;
  return `${formatRupees(product.pricePerKg)}/kg`;
}
import { Edit2, Save, Trash2, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface ProductsTabProps {
  products: Product[];
  onUpdate: (product: Product) => void;
  onDelete: (id: number) => void;
}

type EditState = {
  name: string;
  hindiName: string;
  pricePerKg: string;
  stockKg: string;
};

export function ProductsTab({
  products,
  onUpdate,
  onDelete,
}: ProductsTabProps) {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editState, setEditState] = useState<EditState>({
    name: "",
    hindiName: "",
    pricePerKg: "",
    stockKg: "",
  });

  const startEdit = (product: Product) => {
    setEditingId(product.id);
    const unit = product.unitType ?? "kg";
    setEditState({
      name: product.name,
      hindiName: product.hindiName,
      pricePerKg: (product.pricePerKg / 100).toFixed(0),
      stockKg:
        unit === "kg"
          ? (product.stockGrams / 1000).toFixed(1)
          : String(product.stockGrams),
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
  };

  const saveEdit = (product: Product) => {
    const priceNum = Number.parseFloat(editState.pricePerKg);
    const stockNum = Number.parseFloat(editState.stockKg);
    if (Number.isNaN(priceNum) || priceNum <= 0) {
      toast.error("Invalid price");
      return;
    }
    if (Number.isNaN(stockNum) || stockNum < 0) {
      toast.error("Invalid stock");
      return;
    }
    if (!editState.name.trim()) {
      toast.error("Product name is required");
      return;
    }
    const unit = product.unitType ?? "kg";
    const newStockGrams =
      unit === "kg" ? Math.round(stockNum * 1000) : Math.round(stockNum); // for bunch/piece, store as whole units
    onUpdate({
      ...product,
      name: editState.name.trim(),
      hindiName: editState.hindiName.trim(),
      pricePerKg: Math.round(priceNum * 100),
      stockGrams: newStockGrams,
    });
    setEditingId(null);
    toast.success(`${editState.name} updated!`);
  };

  const rowIndex = (id: number) => products.findIndex((p) => p.id === id) + 1;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-xl font-bold">Products</h2>
          <p className="text-sm text-muted-foreground">
            {products.length} vegetables listed
          </p>
        </div>
      </div>

      {/* Mobile cards */}
      <div className="sm:hidden space-y-3">
        {products.map((product, idx) => {
          const isEditing = editingId === product.id;
          const i = idx + 1;
          return (
            <div
              key={product.id}
              data-ocid={`products.row.${i}`}
              className="bg-card rounded-xl border border-border p-4 space-y-3"
            >
              <div className="flex items-center gap-3">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                />
                <div className="flex-1">
                  {isEditing ? (
                    <div className="space-y-2">
                      <Input
                        value={editState.name}
                        onChange={(e) =>
                          setEditState((s) => ({ ...s, name: e.target.value }))
                        }
                        placeholder="Product name"
                        className="h-8 text-sm"
                      />
                      <Input
                        value={editState.hindiName}
                        onChange={(e) =>
                          setEditState((s) => ({
                            ...s,
                            hindiName: e.target.value,
                          }))
                        }
                        placeholder="Hindi name"
                        className="h-8 text-sm"
                      />
                    </div>
                  ) : (
                    <>
                      <p className="font-semibold">{product.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {product.hindiName}
                      </p>
                    </>
                  )}
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-1 space-y-1">
                  <p className="text-xs text-muted-foreground">Price</p>
                  {isEditing ? (
                    <Input
                      value={editState.pricePerKg}
                      onChange={(e) =>
                        setEditState((s) => ({
                          ...s,
                          pricePerKg: e.target.value,
                        }))
                      }
                      type="number"
                      step="1"
                      min="0"
                      className="h-8 text-sm"
                    />
                  ) : (
                    <p className="price-bold text-sm">{priceLabel(product)}</p>
                  )}
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-xs text-muted-foreground">Stock</p>
                  {isEditing ? (
                    <Input
                      value={editState.stockKg}
                      onChange={(e) =>
                        setEditState((s) => ({ ...s, stockKg: e.target.value }))
                      }
                      type="number"
                      step="0.1"
                      min="0"
                      className="h-8 text-sm"
                    />
                  ) : (
                    <p className="text-sm font-medium">
                      {stockDisplay(product)}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex gap-2">
                {isEditing ? (
                  <>
                    <Button
                      data-ocid="products.save_button"
                      size="sm"
                      className="flex-1"
                      onClick={() => saveEdit(product)}
                    >
                      <Save className="w-3.5 h-3.5 mr-1" /> Save
                    </Button>
                    <Button
                      data-ocid="products.cancel_button"
                      size="sm"
                      variant="outline"
                      className="flex-1"
                      onClick={cancelEdit}
                    >
                      <X className="w-3.5 h-3.5 mr-1" /> Cancel
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      data-ocid={`products.edit_button.${i}`}
                      size="sm"
                      variant="outline"
                      className="flex-1"
                      onClick={() => startEdit(product)}
                    >
                      <Edit2 className="w-3.5 h-3.5 mr-1" /> Edit
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          data-ocid={`products.delete_button.${i}`}
                          size="sm"
                          variant="outline"
                          className="text-destructive border-destructive/30 hover:bg-destructive/10 hover:text-destructive"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent data-ocid="products.delete_button.dialog">
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Delete {product.name}?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete{" "}
                            <strong>{product.name}</strong>? This cannot be
                            undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel data-ocid="products.delete_button.cancel_button">
                            Cancel
                          </AlertDialogCancel>
                          <AlertDialogAction
                            data-ocid="products.delete_button.confirm_button"
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            onClick={() => {
                              onDelete(product.id);
                              toast.success(`${product.name} deleted`);
                            }}
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Desktop table */}
      <div
        data-ocid="products.table"
        className="hidden sm:block rounded-xl border border-border overflow-hidden"
      >
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="w-12">#</TableHead>
              <TableHead>Product</TableHead>
              <TableHead>Hindi Name</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => {
              const isEditing = editingId === product.id;
              const i = rowIndex(product.id);
              const stock = stockLabel(product.stockGrams, product.unitType);
              return (
                <TableRow key={product.id} data-ocid={`products.row.${i}`}>
                  <TableCell className="text-muted-foreground text-sm">
                    {i}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
                      />
                      {isEditing ? (
                        <Input
                          value={editState.name}
                          onChange={(e) =>
                            setEditState((s) => ({
                              ...s,
                              name: e.target.value,
                            }))
                          }
                          className="h-8 max-w-[160px]"
                        />
                      ) : (
                        <span className="font-semibold">{product.name}</span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    {isEditing ? (
                      <Input
                        value={editState.hindiName}
                        onChange={(e) =>
                          setEditState((s) => ({
                            ...s,
                            hindiName: e.target.value,
                          }))
                        }
                        className="h-8 max-w-[120px]"
                      />
                    ) : (
                      <span className="text-muted-foreground">
                        {product.hindiName}
                      </span>
                    )}
                  </TableCell>
                  <TableCell>
                    {isEditing ? (
                      <Input
                        value={editState.pricePerKg}
                        onChange={(e) =>
                          setEditState((s) => ({
                            ...s,
                            pricePerKg: e.target.value,
                          }))
                        }
                        type="number"
                        step="1"
                        min="0"
                        className="h-8 max-w-[100px]"
                      />
                    ) : (
                      <span className="price-bold">{priceLabel(product)}</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {isEditing ? (
                      <Input
                        value={editState.stockKg}
                        onChange={(e) =>
                          setEditState((s) => ({
                            ...s,
                            stockKg: e.target.value,
                          }))
                        }
                        type="number"
                        step="0.1"
                        min="0"
                        className="h-8 max-w-[100px]"
                      />
                    ) : (
                      <Badge
                        variant={
                          stock.level === "good"
                            ? "default"
                            : stock.level === "low"
                              ? "secondary"
                              : "destructive"
                        }
                        className={stock.level === "good" ? "bg-primary" : ""}
                      >
                        {stock.label}
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    {isEditing ? (
                      <div className="flex justify-end gap-2">
                        <Button
                          data-ocid="products.save_button"
                          size="sm"
                          onClick={() => saveEdit(product)}
                        >
                          <Save className="w-3.5 h-3.5 mr-1" /> Save
                        </Button>
                        <Button
                          data-ocid="products.cancel_button"
                          size="sm"
                          variant="outline"
                          onClick={cancelEdit}
                        >
                          <X className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    ) : (
                      <div className="flex justify-end gap-2">
                        <Button
                          data-ocid={`products.edit_button.${i}`}
                          size="sm"
                          variant="outline"
                          onClick={() => startEdit(product)}
                        >
                          <Edit2 className="w-3.5 h-3.5 mr-1" /> Edit
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              data-ocid={`products.delete_button.${i}`}
                              size="sm"
                              variant="outline"
                              className="text-destructive border-destructive/30 hover:bg-destructive/10 hover:text-destructive"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent data-ocid="products.delete_button.dialog">
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Delete {product.name}?
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete{" "}
                                <strong>{product.name}</strong>? This cannot be
                                undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel data-ocid="products.delete_button.cancel_button">
                                Cancel
                              </AlertDialogCancel>
                              <AlertDialogAction
                                data-ocid="products.delete_button.confirm_button"
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                onClick={() => {
                                  onDelete(product.id);
                                  toast.success(`${product.name} deleted`);
                                }}
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    )}
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
