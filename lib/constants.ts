export const siteConfig = {
  name: "Ethnics by Aravalli",
  description: "Premium ethnicwear manufacturer in Jaipur for brands, designers, and B2B clients. Custom, bulk, and private label ethnic clothing direct from manufacturer.",
  whatsappNumber: "+919828422208", // Updated number
  email: "ethnicsbyaravalli@gmail.com", // Updated email
  phone: "+91 93144 44425",
  phone2: "+91 93588 83783", // Updated phone
  address: "H 169, Malviya Nagar Industrial Area, Malviya Nagar, Jaipur, Rajasthan 302017", // Updated address
}

export const navigationLinks = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Manufacturing", href: "/manufacturing" },
  { name: "Blog", href: "/blog" },
]

export type NavigationItem = (typeof navigationLinks)[number] 