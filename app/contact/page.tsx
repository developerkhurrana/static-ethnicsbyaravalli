"use client"

import { Mail, MapPin, Phone, MessageCircle } from "lucide-react"
import { useRef, useState } from "react"
import { toast } from "sonner"

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
    value: "+91 93144 44425",
    href: `tel:+919314444425`,
  },
  {
    icon: Phone,
    title: "Phone / WhatsApp",
    value: "+91 93588 83783",
    href: `tel:+919358883783`,
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
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleWhatsAppSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const form = e.currentTarget
      const formData = new FormData(form)
      
      // Enhanced validation
      const name = (formData.get("name") as string)?.trim()
      const mobile = (formData.get("mobile") as string)?.trim()
      const shop = (formData.get("shop") as string)?.trim()
      const city = (formData.get("city") as string)?.trim()
      
      // Validate name (2-50 characters, letters and spaces only)
      if (!name || !/^[A-Za-z\s]{2,50}$/.test(name)) {
        toast.error("Invalid Name Format", {
          description: "Please enter a valid name using only letters and spaces (2-50 characters).",
        })
        return
      }

      // Validate mobile number (10 digits)
      if (!mobile || !/^[0-9]{10}$/.test(mobile)) {
        toast.error("Invalid Mobile Number", {
          description: "Please enter a valid 10-digit mobile number without any spaces or special characters.",
        })
        return
      }

      // Validate city (2-50 characters, letters and spaces only)
      if (!city || !/^[A-Za-z\s]{2,50}$/.test(city)) {
        toast.error("Invalid City Name", {
          description: "Please enter a valid city name using only letters and spaces (2-50 characters).",
        })
        return
      }

      // Validate shop name if provided (1-100 characters)
      if (shop && !/^[A-Za-z0-9\s\-&]{1,100}$/.test(shop)) {
        toast.error("Invalid Shop Name", {
          description: "Please enter a valid shop name using letters, numbers, spaces, hyphens, and & only (1-100 characters).",
        })
        return
      }

      // Check rate limit
      console.log('🔄 Checking rate limit...')
      const response = await fetch('/api/rate-limit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mobile,
          action: 'contact',
        }),
      })

      const data = await response.json()
      console.log('📊 Rate limit response:', data)

      if (!response.ok) {
        console.log('❌ Rate limit check failed:', data)
        if (data.type === 'cooldown') {
          toast.error("Submission Rate Limited", {
            description: `Please wait ${data.remainingTime} seconds before submitting again. This helps us prevent spam.`,
          })
        } else if (data.type === 'daily') {
          toast.error("Daily Limit Reached", {
            description: "You've reached the daily submission limit. Please try again tomorrow or contact us directly at +91 98284 22208.",
          })
        } else if (data.type === 'total') {
          toast.error("Maximum Submissions Reached", {
            description: "You've reached the maximum number of submissions. Please contact us directly at +91 98284 22208.",
          })
        }
        return
      }

      console.log('✅ Rate limit passed, proceeding with submission...')

      // If rate limit passed, proceed with both Notion and WhatsApp
      let notionSuccess = false
      
      // Store in Notion
      try {
        console.log('📝 Attempting to store in Notion...', {
          name,
          mobile,
          city,
          shop,
          token: data.token
        })
        
        const notionResponse = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name,
            email: '', // Not collected in this form
            mobile,
            message: `From ${city}${shop ? `, Shop: ${shop}` : ''}`,
            brand: shop || '',
            token: data.token, // Pass the rate limit token
          }),
        })

        const notionData = await notionResponse.json()
        console.log('📊 Notion response:', notionData)

        if (!notionResponse.ok) {
          console.error('❌ Failed to store in Notion:', notionData)
        } else {
          console.log('✅ Stored in Notion successfully')
          notionSuccess = true
        }
      } catch (error) {
        console.error('❌ Error storing in Notion:', error)
      }

      // Construct message
      let message = `Hi, I'm ${name} from ${city}`
      if (shop) message += `, I have a shop named ${shop}`
      message += `. I represent a brand/business interested in manufacturing ethnicwear. Please contact me at ${mobile}.`
      
      console.log('📱 Opening WhatsApp with message:', message)
      
      // Open WhatsApp
      const whatsappUrl = `https://wa.me/${siteConfig.whatsappNumber.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(message)}`
      window.open(whatsappUrl, "_blank")

      // Show success toast with appropriate message
      if (notionSuccess) {
        console.log('🎉 Showing success toast (Notion + WhatsApp)')
        toast.success("Message Sent Successfully!", {
          description: "Your message has been stored and WhatsApp is open. We'll get back to you soon!",
        })
      } else {
        console.log('🎉 Showing success toast (WhatsApp only)')
        toast.success("WhatsApp Opened!", {
          description: "Please send your message on WhatsApp. We'll get back to you soon!",
        })
      }

      // Reset form
      console.log('🔄 Resetting form')
      form.reset()
    } catch (error) {
      console.error('Error:', error)
      toast.error("Something went wrong", {
        description: "Please try again later or contact us directly at +91 98284 22208.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container py-12">
      <SectionHeader
        title="Contact the Manufacturer"
        description="Interested in custom manufacturing, bulk orders, or private label ethnicwear? Reach out to us directly."
        className="mb-12"
      />

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Contact Form - First on mobile */}
        <Card className="order-1 lg:order-2">
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
                <Input 
                  id="name" 
                  name="name" 
                  placeholder="Your Name" 
                  required 
                  minLength={2}
                  maxLength={50}
                  pattern="[A-Za-z\s]+"
                  title="Please enter a valid name (letters and spaces only)"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="shop">Brand/Company Name</Label>
                <Input 
                  id="shop" 
                  name="shop" 
                  placeholder="Brand/Company Name (optional)" 
                  maxLength={100}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="mobile">Mobile Number<span className="text-red-500">*</span></Label>
                <Input 
                  id="mobile" 
                  name="mobile" 
                  type="tel" 
                  placeholder="Your Mobile Number" 
                  required 
                  pattern="[0-9]{10}"
                  title="Please enter a valid 10-digit mobile number"
                  maxLength={10}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="city">City<span className="text-red-500">*</span></Label>
                <Input 
                  id="city" 
                  name="city" 
                  placeholder="Your City" 
                  required 
                  minLength={2}
                  maxLength={50}
                  pattern="[A-Za-z\s]+"
                  title="Please enter a valid city name (letters and spaces only)"
                />
              </div>
              <Button 
                type="submit" 
                className="w-full flex items-center justify-center gap-2"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send us"} <MessageCircle className="w-5 h-5" /> message
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Contact Info - Second on mobile */}
        <div className="space-y-6 order-2 lg:order-1">
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
      </div>
    </div>
  )
} 