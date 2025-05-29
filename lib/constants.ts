export const siteConfig = {
  name: "Ethnic's by Aravalli",
  description: "Premium ethnic wear for boutiques and retailers",
  whatsappNumber: "+919999999999", // Replace with actual number
  email: "contact@ethnicsbyaravalli.com",
  phone: "+91 999-999-9999",
}

export const navigationLinks = [
  { name: "Home", href: "/" },
  { name: "Collections", href: "/collections" },
  { name: "About Us", href: "/about" },
  { name: "Manufacturing", href: "/manufacturing" },
  { name: "How to Order", href: "/how-to-order" },
  { name: "Become a Retailer", href: "/become-retailer" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
]

export type NavigationItem = (typeof navigationLinks)[number] 