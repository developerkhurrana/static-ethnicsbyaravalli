"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Eye, EyeOff, Lock, ArrowRight, Loader2 } from "lucide-react";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("adminToken", data.token);
        toast.success("Welcome back! Redirecting to dashboard...");
        router.push("/admin/products");
      } else {
        const error = await response.json();
        toast.error(error.error || "Invalid credentials");
      }
    } catch {
      toast.error("Connection error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F9F6F4] via-[#F5F2F0] to-[#E5E0DC] p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Logo/Brand Section */}
        <div className="text-center space-y-2">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-[#D9A8A0] to-[#C08478] rounded-2xl flex items-center justify-center shadow-lg">
            <Lock className="w-8 h-8 text-white" />
          </div>
          <div className="space-y-1">
            <h1 className="text-3xl font-bold text-[#2E1B1B] tracking-tight">
              Admin Portal
            </h1>
            <p className="text-[#4A3A3A] text-sm">
              Sign in to your dashboard
            </p>
          </div>
        </div>

        {/* Login Card */}
        <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm">
          <CardContent className="p-8">
            <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-[#2E1B1B]">
                Admin Password
              </label>
                <div className="relative">
              <Input
                id="password"
                    type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your admin password"
                required
                disabled={isLoading}
                    className="h-12 px-4 pr-12 text-base border-[#E5E0DC] focus:border-[#D9A8A0] focus:ring-[#D9A8A0] transition-all duration-200"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#4A3A3A] hover:text-[#2E1B1B] transition-colors"
                    disabled={isLoading}
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
            </div>

            <Button
              type="submit"
                className="w-full h-12 bg-gradient-to-r from-[#D9A8A0] to-[#C08478] hover:from-[#C08478] hover:to-[#B07A6E] text-[#2E1B1B] font-medium text-base shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02]"
              disabled={isLoading || !password}
            >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Signing in...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-2">
                    <span>Sign in to Admin</span>
                    <ArrowRight className="w-5 h-5" />
                  </div>
                )}
            </Button>
          </form>
        </CardContent>
      </Card>

        {/* Footer */}
        <div className="text-center">
          <p className="text-xs text-[#4A3A3A]">
            Secure admin access for Ethnics by Aravalli
          </p>
        </div>
      </div>
    </div>
  );
} 