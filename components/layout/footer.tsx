import Link from "next/link"
import { Phone, Mail } from "lucide-react"

import { siteConfig, navigationLinks } from "@/lib/constants"

export function Footer() {
  return (
    <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="mb-4 font-serif text-lg font-semibold">{siteConfig.name}</h3>
            <p className="text-sm text-muted-foreground">
              Premium ethnic wear for modern retailers. Direct from manufacturers to your boutique.
            </p>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-semibold">Quick Links</h3>
            <nav className="flex flex-col space-y-2">
              {navigationLinks.slice(0, 4).map((item) => (
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
          <div>
            <h3 className="mb-4 text-sm font-semibold">Resources</h3>
            <nav className="flex flex-col space-y-2">
              {navigationLinks.slice(4).map((item) => (
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