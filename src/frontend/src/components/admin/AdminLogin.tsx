import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Leaf, Lock } from "lucide-react";
import { useState } from "react";

interface AdminLoginProps {
  onLogin: () => void;
}

export function AdminLogin({ onLogin }: AdminLoginProps) {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setTimeout(() => {
      if (password === "200519") {
        onLogin();
      } else {
        setError("Incorrect password. Please try again.");
      }
      setLoading(false);
    }, 400);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-card rounded-2xl shadow-card-hover border border-border p-8">
          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center mb-3">
              <Leaf className="w-7 h-7 text-primary-foreground" />
            </div>
            <h1 className="font-display font-extrabold text-2xl text-primary">
              Brinjal Fresh
            </h1>
            <p className="text-muted-foreground text-sm mt-1">Admin Portal</p>
          </div>

          <div className="flex items-center gap-2 bg-muted/50 rounded-xl p-3 mb-6">
            <Lock className="w-4 h-4 text-muted-foreground flex-shrink-0" />
            <p className="text-sm text-muted-foreground">
              Enter your password to manage products, orders & discounts
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="admin-password">Admin Password</Label>
              <div className="relative">
                <Input
                  id="admin-password"
                  data-ocid="admin.password_input"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter admin password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {error && (
              <p
                data-ocid="admin.error_state"
                className="text-destructive text-sm bg-destructive/10 px-3 py-2 rounded-lg"
              >
                {error}
              </p>
            )}

            <Button
              data-ocid="admin.submit_button"
              type="submit"
              className="w-full font-semibold"
              size="lg"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
