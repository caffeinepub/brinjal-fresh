import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import type { DeliveryTiming } from "@/store/types";
import { Clock, Save } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface DeliveryTimingTabProps {
  deliveryTiming: DeliveryTiming;
  onUpdate: (dt: DeliveryTiming) => void;
}

export function DeliveryTimingTab({
  deliveryTiming,
  onUpdate,
}: DeliveryTimingTabProps) {
  const [message, setMessage] = useState(deliveryTiming.message);
  const [active, setActive] = useState(deliveryTiming.active);

  function handleSave() {
    onUpdate({ message, active });
    toast.success("Delivery timing saved!");
  }

  return (
    <div className="max-w-xl space-y-6">
      {/* Header card */}
      <div className="bg-card rounded-2xl border border-border p-6 shadow-xs">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Clock className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="font-display font-extrabold text-lg text-foreground">
              Delivery Timing
            </h2>
            <p className="text-sm text-muted-foreground">
              Set your delivery hours shown to customers
            </p>
          </div>
        </div>

        {/* Status badge */}
        <div
          className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold mb-5 ${
            active
              ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
              : "bg-muted text-muted-foreground"
          }`}
        >
          <span
            className={`w-2 h-2 rounded-full ${active ? "bg-green-500" : "bg-muted-foreground"}`}
          />
          {active ? "Active — shown on store" : "Inactive — hidden from store"}
        </div>

        {/* Message input */}
        <div className="space-y-2 mb-5">
          <Label
            htmlFor="delivery-message"
            className="text-sm font-semibold text-foreground"
          >
            Timing Message
          </Label>
          <Textarea
            id="delivery-message"
            data-ocid="delivery.message_input"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="e.g. Mon–Sat: 7am–10pm | Sun: 8am–6pm"
            rows={3}
            className="resize-none font-medium"
          />
          <p className="text-xs text-muted-foreground">
            This message will appear below the search bar on the store page when
            active.
          </p>
        </div>

        {/* Active toggle */}
        <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50 border border-border">
          <div>
            <p className="font-semibold text-sm text-foreground">
              Show on store
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Toggle to display delivery timing to customers
            </p>
          </div>
          <Switch
            data-ocid="delivery.toggle"
            checked={active}
            onCheckedChange={setActive}
          />
        </div>

        {/* Save button */}
        <div className="mt-6">
          <Button
            data-ocid="delivery.save_button"
            onClick={handleSave}
            className="w-full sm:w-auto gap-2"
          >
            <Save className="w-4 h-4" />
            Save Delivery Timing
          </Button>
        </div>
      </div>

      {/* Preview card */}
      {message && (
        <div className="bg-card rounded-2xl border border-border p-5 shadow-xs">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            Preview
          </p>
          <div
            className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-medium ${
              active
                ? "bg-primary/10 text-primary border border-primary/20"
                : "bg-muted text-muted-foreground border border-border opacity-60"
            }`}
          >
            <Clock className="w-4 h-4 flex-shrink-0" />
            <span>{message}</span>
          </div>
          {!active && (
            <p className="text-xs text-muted-foreground mt-2">
              Toggle "Show on store" to make this visible to customers.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
