import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import type { Discount } from "@/store/types";
import { Percent, Plus, Tag, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface DiscountsTabProps {
  discounts: Discount[];
  onAdd: (d: Omit<Discount, "id">) => void;
  onUpdate: (d: Discount) => void;
  onDelete: (id: number) => void;
  onToggle: (id: number) => void;
}

type FormState = {
  label: string;
  description: string;
  discountPercent: string;
};

const emptyForm: FormState = {
  label: "",
  description: "",
  discountPercent: "",
};

export function DiscountsTab({
  discounts,
  onAdd,
  onUpdate,
  onDelete,
  onToggle,
}: DiscountsTabProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingDiscount, setEditingDiscount] = useState<Discount | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [errors, setErrors] = useState<Partial<FormState>>({});

  const openAddDialog = () => {
    setEditingDiscount(null);
    setForm(emptyForm);
    setErrors({});
    setDialogOpen(true);
  };

  const openEditDialog = (d: Discount) => {
    setEditingDiscount(d);
    setForm({
      label: d.label,
      description: d.description,
      discountPercent: d.discountPercent.toString(),
    });
    setErrors({});
    setDialogOpen(true);
  };

  const validate = (): boolean => {
    const e: Partial<FormState> = {};
    if (!form.label.trim()) e.label = "Label is required";
    if (!form.description.trim()) e.description = "Description is required";
    const pct = Number.parseFloat(form.discountPercent);
    if (Number.isNaN(pct) || pct <= 0 || pct > 100)
      e.discountPercent = "Enter a value between 1 and 100";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;
    const data = {
      label: form.label.trim(),
      description: form.description.trim(),
      discountPercent: Number.parseFloat(form.discountPercent),
      active: editingDiscount?.active ?? true,
    };
    if (editingDiscount) {
      onUpdate({ ...data, id: editingDiscount.id });
      toast.success("Discount updated!");
    } else {
      onAdd(data);
      toast.success("Discount added!");
    }
    setDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-xl font-bold">Discounts</h2>
          <p className="text-sm text-muted-foreground">
            Active discounts appear as a banner on the storefront
          </p>
        </div>
        <Button data-ocid="discounts.add_button" onClick={openAddDialog}>
          <Plus className="w-4 h-4 mr-2" />
          Add Discount
        </Button>
      </div>

      {discounts.length === 0 && (
        <div
          data-ocid="discounts.empty_state"
          className="flex flex-col items-center justify-center py-16 gap-3 text-muted-foreground"
        >
          <Tag className="w-12 h-12 opacity-30" />
          <p className="font-medium">No discounts yet</p>
          <p className="text-sm">
            Click "Add Discount" to create your first offer
          </p>
        </div>
      )}

      <div className="space-y-3">
        {discounts.map((d, idx) => {
          const i = idx + 1;
          return (
            <div
              key={d.id}
              data-ocid={`discounts.item.${i}`}
              className={`bg-card rounded-xl border p-4 transition-colors ${
                d.active ? "border-primary/40 bg-primary/5" : "border-border"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3 flex-1">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      d.active ? "bg-primary" : "bg-muted"
                    }`}
                  >
                    <Percent
                      className={`w-5 h-5 ${d.active ? "text-primary-foreground" : "text-muted-foreground"}`}
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-semibold">{d.label}</p>
                      <span
                        className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                          d.active
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {d.discountPercent}% OFF
                      </span>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full ${
                          d.active
                            ? "bg-green-100 text-green-700"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {d.active ? "Active" : "Inactive"}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-0.5">
                      {d.description}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <Switch
                    data-ocid={`discounts.toggle.${i}`}
                    checked={d.active}
                    onCheckedChange={() => onToggle(d.id)}
                    aria-label={`Toggle ${d.label}`}
                  />
                </div>
              </div>
              <Separator className="my-3" />
              <div className="flex justify-end gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => openEditDialog(d)}
                >
                  Edit
                </Button>
                <Button
                  data-ocid={`discounts.delete_button.${i}`}
                  size="sm"
                  variant="destructive"
                  onClick={() => {
                    onDelete(d.id);
                    toast.success("Discount deleted");
                  }}
                >
                  <Trash2 className="w-3.5 h-3.5 mr-1" />
                  Delete
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent data-ocid="discounts.dialog" className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-display">
              {editingDiscount ? "Edit Discount" : "Add New Discount"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div className="space-y-1.5">
              <Label>Label</Label>
              <Input
                placeholder="e.g., Weekend Sale"
                value={form.label}
                onChange={(e) =>
                  setForm((s) => ({ ...s, label: e.target.value }))
                }
                className={errors.label ? "border-destructive" : ""}
              />
              {errors.label && (
                <p className="text-destructive text-xs">{errors.label}</p>
              )}
            </div>
            <div className="space-y-1.5">
              <Label>Description</Label>
              <Input
                placeholder="e.g., Get 10% off on all vegetables"
                value={form.description}
                onChange={(e) =>
                  setForm((s) => ({ ...s, description: e.target.value }))
                }
                className={errors.description ? "border-destructive" : ""}
              />
              {errors.description && (
                <p className="text-destructive text-xs">{errors.description}</p>
              )}
            </div>
            <div className="space-y-1.5">
              <Label>Discount % (1–100)</Label>
              <Input
                type="number"
                min="1"
                max="100"
                placeholder="e.g., 10"
                value={form.discountPercent}
                onChange={(e) =>
                  setForm((s) => ({ ...s, discountPercent: e.target.value }))
                }
                className={errors.discountPercent ? "border-destructive" : ""}
              />
              {errors.discountPercent && (
                <p className="text-destructive text-xs">
                  {errors.discountPercent}
                </p>
              )}
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button
                variant="outline"
                data-ocid="discounts.cancel_button"
                onClick={() => setDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button data-ocid="discounts.confirm_button" onClick={handleSave}>
                {editingDiscount ? "Save Changes" : "Add Discount"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
