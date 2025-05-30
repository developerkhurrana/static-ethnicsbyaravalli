"use client"

import { Mail, MapPin, Phone, MessageCircle } from "lucide-react"
import { useRef } from "react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { SectionHeader } from "@/components/ui/section-header"
import { siteConfig } from "@/lib/constants"

const contactInfo = [
  {
    icon: Phone,
    title: "Phone / WhatsApp",
    value: "+91 98284 22208",
    href: `tel:+919828422208`,
  },
  {
    icon: Mail,
    title: "Email",
    value: "ethnicsbyaravalli@gmail.com",
    href: `mailto:ethnicsbyaravalli@gmail.com`,
  },
  {
    icon: MapPin,
    title: "Address",
    value: "H 169, Malviya Nagar Industrial Area, Malviya Nagar, Jaipur, Rajasthan 302017",
    href: "https://maps.google.com/?q=26.858194,75.830806",
  },
]

export default function ContactPage() {
  const formRef = useRef<HTMLFormElement>(null)

  function handleWhatsAppSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)
    const name = (formData.get("name") as string)?.trim()
    const shop = (formData.get("shop") as string)?.trim()
    const mobile = (formData.get("mobile") as string)?.trim()
    const city = (formData.get("city") as string)?.trim()
    if (!name || !mobile || !city) return
    let message = `Hi, I'm ${name} from ${city}`
    if (shop) message += `, I have a shop named ${shop}`
    message += ". I represent a brand/business interested in manufacturing ethnicwear. Please contact me at ${mobile}."
    const whatsappUrl = `https://wa.me/${siteConfig.whatsappNumber.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  return (
    <div className="container py-12">
      <SectionHeader
        title="Contact the Manufacturer"
        description="Interested in custom manufacturing, bulk orders, or private label ethnicwear? Reach out to us directly."
        className="mb-12"
      />

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1">
            {contactInfo.map((item) => {
              const Icon = item.icon
              return (
                <a
                  key={item.title}
                  href={item.href}
                  className="flex items-start space-x-4 rounded-lg border p-4 transition-colors hover:bg-muted"
                >
                  <div className="rounded-full bg-primary/10 p-2">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.value}</p>
                  </div>
                </a>
              )
            })}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Business Hours</CardTitle>
              <CardDescription>
                We&apos;re available during the following hours
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Monday - Friday</span>
                  <span>10:00 AM - 7:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span>10:00 AM - 5:00 PM</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Sunday</span>
                  <span>Closed</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Send us a Message</CardTitle>
            <CardDescription>
              Fill out the form below and we&apos;ll get back to you as soon as
              possible.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form ref={formRef} onSubmit={handleWhatsAppSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Your Name<span className="text-red-500">*</span></Label>
                <Input id="name" name="name" placeholder="Your Name" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="shop">Brand/Company Name</Label>
                <Input id="shop" name="shop" placeholder="Brand/Company Name (optional)" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="mobile">Mobile Number<span className="text-red-500">*</span></Label>
                <Input id="mobile" name="mobile" type="tel" placeholder="Your Mobile Number" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="city">City<span className="text-red-500">*</span></Label>
                <Input id="city" name="city" placeholder="Your City" required />
              </div>
              <Button type="submit" className="w-full flex items-center justify-center gap-2">
                Send us <MessageCircle className="w-5 h-5" /> message
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 