"use client";

import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  IconBrandTabler,
  IconPackage,
  IconShoppingCart,
  IconUsers,
  IconFileText,
  IconLogout,
  IconBuildingStore,
  IconChartBar,
} from "@tabler/icons-react";

interface ModernAdminLayoutProps {
  children: React.ReactNode;
}

export default function ModernAdminLayout({ children }: ModernAdminLayoutProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const links = [
    {
      label: "Products",
      href: "/admin/products",
      icon: <IconPackage className="h-5 w-5 shrink-0" />,
    },
    {
      label: "Orders",
      href: "/admin/orders",
      icon: <IconShoppingCart className="h-5 w-5 shrink-0" />,
    },
    {
      label: "Retailers",
      href: "/admin/retailers",
      icon: <IconUsers className="h-5 w-5 shrink-0" />,
    },
    {
      label: "Catalogs",
      href: "/admin/catalogs",
      icon: <IconFileText className="h-5 w-5 shrink-0" />,
    },
    {
      label: "Purchase Orders",
      href: "/admin/purchaseOrders",
      icon: <IconBuildingStore className="h-5 w-5 shrink-0" />,
    },
    {
      label: "Priorities",
      href: "/admin/priorities",
      icon: <IconChartBar className="h-5 w-5 shrink-0" />,
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    window.location.href = "/admin/login";
  };

  return (
    <div className="flex h-screen bg-[#F9F6F4] pt-[42px]">
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <Link key={idx} href={link.href}>
                  <SidebarLink 
                    link={link} 
                    className={cn(
                      pathname === link.href && "bg-[#D9A8A0] text-white"
                    )}
                  />
                </Link>
              ))}
            </div>
          </div>
          <div>
            <button onClick={handleLogout}>
              <SidebarLink
                link={{
                  label: "Logout",
                  href: "#",
                  icon: (
                    <IconLogout className="h-5 w-5 shrink-0 text-[#D9A8A0]" />
                  ),
                }}
              />
            </button>
          </div>
        </SidebarBody>
      </Sidebar>
      
      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto bg-white h-[calc(100vh-42px)]">
          <div className="p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

export const Logo = () => {
  return (
    <Link
      href="/admin"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-[#2E1B1B]"
    >
      <div className="h-8 w-8 shrink-0 rounded-lg bg-gradient-to-br from-[#D9A8A0] to-[#C08478] flex items-center justify-center">
        <IconBrandTabler className="h-5 w-5 text-white" />
      </div>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-bold text-lg text-[#2E1B1B]"
      >
        Admin
      </motion.span>
    </Link>
  );
};

export const LogoIcon = () => {
  return (
    <Link
      href="/admin"
      className="relative z-20 flex items-center justify-center py-1 text-sm font-normal text-[#2E1B1B] w-full"
    >
      <div className="h-8 w-8 shrink-0 rounded-lg bg-gradient-to-br from-[#D9A8A0] to-[#C08478] flex items-center justify-center">
        <IconBrandTabler className="h-5 w-5 text-white" />
      </div>
    </Link>
  );
}; 