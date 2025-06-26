import Link from "next/link"
import Image from "next/image"
import { Phone, Mail, Instagram } from "lucide-react"

import { siteConfig, navigationLinks } from "@/lib/constants"

export function Footer() {
  return (
    <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto py-12 px-3 lg:px-6">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Logo and description */}
          <div>
            <Link href="/" className="inline-block mb-2">
              <span className="sr-only">Ethnics by Aravalli</span>
              <Image
                src="/ethnics_logo_black.png"
                alt="Ethnics by Aravalli"
                width={100}
                height={30}
                className="h-[30px] w-auto"
                priority
              />
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs">
            Premium women ethnic wear for retailers. Direct from manufacturer to your shop.  
            </p>
          </div>
          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold">Quick Links</h3>
            <nav className="flex flex-col space-y-2">
              {navigationLinks.slice(0, 5).map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
          {/* Socials */}
          <div>
            <h3 className="mb-4 text-sm font-semibold">Socials</h3>
            <nav className="flex flex-col space-y-2">
              <a
                href="https://instagram.com/ethnicsbyaravalli"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-sm text-muted-foreground hover:text-foreground"
              >
                <Instagram className="mr-2 h-4 w-4" />
                @ethnicsbyaravalli
              </a>
            </nav>
          </div>
          {/* Contact */}
          <div>
            <h3 className="mb-4 text-sm font-semibold">Contact</h3>
            <div className="flex flex-col space-y-2 text-sm text-muted-foreground">
              <a
                href={`tel:${siteConfig.phone}`}
                className="flex items-center hover:text-foreground"
              >
                <Phone className="mr-2 h-4 w-4" />
                {siteConfig.phone}
              </a>
              <a
                href={`tel:${siteConfig.phone}`}
                className="flex items-center hover:text-foreground"
              >
                <Phone className="mr-2 h-4 w-4" />
                {siteConfig.phone2}
              </a>
              <a
                href={`mailto:${siteConfig.email}`}
                className="flex items-center hover:text-foreground"
              >
                <Mail className="mr-2 h-4 w-4" />
                {siteConfig.email}
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
} 