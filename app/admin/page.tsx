"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function AdminPage() {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuthAndRedirect = async () => {
      const token = localStorage.getItem("adminToken");
      
      if (!token) {
        // No token found, redirect to login
        router.push("/admin/login");
        return;
      }

      try {
        // Verify token expiration
        const payload = JSON.parse(atob(token.split(".")[1]));
        if (payload.exp * 1000 < Date.now()) {
          localStorage.removeItem("adminToken");
          toast.error("Session expired. Please log in again");
          router.push("/admin/login");
          return;
        }

        // Verify token with server
        const response = await fetch("/api/admin/test", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          localStorage.removeItem("adminToken");
          toast.error("Authentication failed. Please log in again");
          router.push("/admin/login");
          return;
        }

        // Token is valid, redirect to products page
        router.push("/admin/products");
      } catch {
        localStorage.removeItem("adminToken");
        toast.error("Authentication error. Please log in again");
        router.push("/admin/login");
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthAndRedirect();
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="text-lg font-medium text-gray-900 mb-2">
            Checking authentication...
          </div>
          <div className="text-sm text-gray-500">
            Please wait while we verify your access
          </div>
        </div>
      </div>
    );
  }

  // This should never be reached as we redirect in useEffect
  return null;
} 