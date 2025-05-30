"use client"

import Link from "next/link"
import { Menu, X } from "lucide-react"
import { useState } from "react"
import Image from "next/image"

const navigation = [
  { name: "Home", href: "/" },
  // { name: "Collections", href: "/collections" },
  { name: "About Us", href: "/about" },
  { name: "Manufacturing", href: "/manufacturing" },
  { name: "Blog", href: "/blog" },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="bg-[#FFFFFF] border-b border-[#E5E0DC]">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Ethnics by Aravalli</span>
            <Image
              src="/logo.png"
              alt="Ethnics by Aravalli"
              width={120}
              height={40}
              className="h-10 w-auto"
            />
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-[#2E1B1B]"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-center">
          <div className="flex items-center space-x-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="px-3 py-2 text-sm font-semibold leading-6 text-[#2E1B1B] hover:text-[#D9A8A0] transition-colors duration-200 whitespace-nowrap"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 rounded-md bg-[#D9A8A0] px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#C08478] transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D9A8A0] whitespace-nowrap"
          >
            Contact Us
          </Link>
        </div>
      </nav>
      <div className={`lg:hidden ${mobileMenuOpen ? "fixed inset-0 z-50" : "hidden"}`}>
        <div className="fixed inset-0 bg-black/20" aria-hidden="true" />
        <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-[#FFFFFF] px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-[#E5E0DC]">
          <div className="flex items-center justify-between">
            <Link href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Ethnics by Aravalli</span>
              <Image
                src="/logo.png"
                alt="Ethnics by Aravalli"
                width={120}
                height={40}
                className="h-10 w-auto"
              />
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-[#2E1B1B]"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <X className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-[#E5E0DC]">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-[#2E1B1B] hover:bg-[#F9F6F4] transition-colors duration-200"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              {/* Become a Retailer button removed from mobile */}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
} 