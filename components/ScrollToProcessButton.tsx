"use client";
import { Button } from "@/components/ui/button";

export function ScrollToProcessButton() {
  return (
    <Button
      size="lg"
      variant="outline"
      className="border-[#D9A8A0] text-[#D9A8A0] hover:bg-[#D9A8A0] hover:text-[#2E1B1B] rounded-full"
      onClick={() => {
        if (typeof window !== "undefined") {
          document.getElementById("process-section")?.scrollIntoView({ behavior: "smooth" });
        }
      }}
    >
      View Our Process
    </Button>
  );
} 