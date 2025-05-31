"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import Image from "next/image"
import { usePathname } from "next/navigation"

const navigation = [
  { name: "Home", href: "/" },
  // { name: "Collections", href: "/collections" },
  { name: "About Us", href: "/about" },
  { name: "Manufacturing", href: "/manufacturing" },
  { name: "Blog", href: "/blog" },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()
  const isHomePage = pathname === "/"

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isTransparent = isHomePage && !isScrolled

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isTransparent ? 'bg-transparent' : 'bg-white/95 backdrop-blur-sm border-b border-[#E5E0DC]'
      }`}>
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-3 py-1 lg:px-6" aria-label="Global">
          <div className="flex lg:flex-1">
            <Link href="/" className="-m-0.5 p-0.5">
              <span className="sr-only">Ethnics by Aravalli</span>
              <Image
                src={isTransparent ? "/ethnics_logo_white.png" : "/ethnics_logo_black.png"}
                alt="Ethnics by Aravalli"
                width={60}
                height={18}
                className="h-[18px] w-auto"
              />
            </Link>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className={`-m-1 inline-flex items-center justify-center rounded-md p-1 ${
                isTransparent ? 'text-white' : 'text-[#2E1B1B]'
              }`}
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Menu className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-6">
            <div className="flex items-center space-x-0.5">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`px-2 py-0.5 text-sm font-semibold leading-6 ${
                    isTransparent ? 'text-white hover:text-white/80' : 'text-[#2E1B1B] hover:text-[#D9A8A0]'
                  } transition-colors duration-200 whitespace-nowrap`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <Link
              href="/contact"
              className={`group inline-flex items-center gap-2 rounded-md ${
                isTransparent ? 'bg-white text-[#2E1B1B]' : 'bg-[#D9A8A0] text-white'
              } px-4 py-2 text-sm font-semibold shadow-sm hover:bg-[#C08478] hover:text-white transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D9A8A0] whitespace-nowrap`}
            >
              Contact Us
            </Link>
          </div>
        </nav>
        <div className={`lg:hidden ${mobileMenuOpen ? 'fixed inset-0 z-50' : 'hidden'}`}>
          <div className="fixed inset-0 bg-black/20" aria-hidden="true" />
          <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-[#FFFFFF] px-3 py-2 sm:max-w-sm sm:ring-1 sm:ring-[#E5E0DC]">
            <div className="flex items-center justify-between">
              <Link href="/" className="-m-0.5 p-0.5">
                <span className="sr-only">Ethnics by Aravalli</span>
                <Image
                  src="/ethnics_logo_black.png"
                  alt="Ethnics by Aravalli"
                  width={60}
                  height={18}
                  className="h-[18px] w-auto"
                />
              </Link>
              <button
                type="button"
                className="-m-1 rounded-md p-1 text-[#2E1B1B]"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-2 flow-root">
              <div className="-my-2 divide-y divide-[#E5E0DC]">
                <div className="space-y-0.5 py-2">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-1 text-base font-semibold leading-7 text-[#2E1B1B] hover:bg-[#F9F6F4] transition-colors duration-200"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      {!isHomePage && <div className="h-[42px]" />}
    </>
  )
} 