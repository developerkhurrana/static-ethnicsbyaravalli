"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner } from "sonner"

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-white",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
          error: "group-[.toast]:bg-red-600 group-[.toast]:text-white group-[.toast]:border-red-700",
          success: "group-[.toast]:bg-green-600 group-[.toast]:text-white group-[.toast]:border-green-700",
          warning: "group-[.toast]:bg-yellow-600 group-[.toast]:text-white group-[.toast]:border-yellow-700",
          info: "group-[.toast]:bg-blue-600 group-[.toast]:text-white group-[.toast]:border-blue-700",
        },
        style: {
          fontSize: "0.875rem",
          fontWeight: "600",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
