"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Menu, X, Info, Factory, BookOpen, Mail, Home } from "lucide-react"
import Image from "next/image"
import { usePathname } from "next/navigation"

const navigation = [
  { name: "Home", href: "/", icon: Home },
  // { name: "Catalog", href: "/catalog", icon: ShoppingBag },
  { name: "About Us", href: "/about", icon: Info },
  { name: "Manufacturing", href: "/manufacturing", icon: Factory },
  { name: "Blog", href: "/blog", icon: BookOpen },
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
              className={`-m-1 inline-flex items-center justify-center rounded-md p-2 transition-colors duration-200 ${
                isTransparent ? 'text-white hover:bg-white/10' : 'text-[#2E1B1B] hover:bg-[#F9F6F4]'
              }`}
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Menu className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-6">
            <div className="flex items-center space-x-3">
              {navigation.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-semibold leading-6 transition-all duration-200 whitespace-nowrap group
                      ${isActive 
                        ? 'bg-[#D9A8A0] text-white' 
                        : isTransparent 
                          ? 'bg-white/10 text-white hover:bg-[#D9A8A0] hover:text-white' 
                          : 'bg-[#F9F6F4] text-[#2E1B1B] hover:bg-[#D9A8A0] hover:text-white'}
                      focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D9A8A0]`}
                  >
                    <Icon className="h-4 w-4 mb-0.5" />
                    {item.name}
                  </Link>
                )
              })}
            </div>
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <Link
              href="/contact"
              className={`group inline-flex items-center gap-2 rounded-full px-6 py-2 text-sm font-semibold shadow-sm transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D9A8A0] whitespace-nowrap
                ${isTransparent ? 'bg-white text-[#2E1B1B] hover:bg-[#F9F6F4]' : 'bg-[#D9A8A0] text-white hover:bg-[#C08478]'}
              `}
            >
              <Mail className="h-4 w-4" />
              Contact Us
            </Link>
          </div>
        </nav>
      </header>

      {/* Mobile menu */}
      <div className={`lg:hidden ${mobileMenuOpen ? 'fixed inset-0 z-[100]' : 'hidden'}`}>
        <div className="fixed inset-0 bg-black/20" aria-hidden="true" onClick={() => setMobileMenuOpen(false)} />
        <div className="fixed inset-y-0 right-0 z-[101] w-full overflow-y-auto bg-[#FFFFFF] px-4 py-6 sm:max-w-sm sm:ring-1 sm:ring-[#E5E0DC]">
          <div className="flex items-center justify-between mb-8">
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
              className="-m-1 rounded-md p-2 text-[#2E1B1B] hover:bg-[#F9F6F4] transition-colors duration-200"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-2 flow-root">
            <div className="space-y-3">
              {navigation.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center gap-2 w-full text-center rounded-full px-4 py-3 text-base font-semibold transition-all duration-200
                      ${isActive 
                        ? 'bg-[#D9A8A0] text-white' 
                        : 'bg-[#F9F6F4] text-[#2E1B1B] hover:bg-[#D9A8A0] hover:text-white'}
                    `}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Icon className="h-5 w-5" />
                    {item.name}
                  </Link>
                )
              })}
              <Link
                href="/contact"
                className="flex items-center gap-2 w-full text-center rounded-md px-4 py-3 text-base font-semibold bg-[#D9A8A0] text-white hover:bg-[#C08478] transition-colors duration-200 mt-4 justify-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Mail className="h-5 w-5" />
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>

      {!isHomePage && <div className="h-[42px]" />}
    </>
  )
} 