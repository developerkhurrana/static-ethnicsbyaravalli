import { Check } from "lucide-react"

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { SectionHeader } from "@/components/ui/section-header"

export const metadata = {
  title: "Become a Retailer",
  description:
    "Join our network of premium ethnic wear retailers. Fill out the form to get started.",
}

const benefits = [
  "Direct access to manufacturer prices",
  "Exclusive designs not available elsewhere",
  "Flexible MOQ requirements",
  "Pan-India shipping available",
  "Dedicated support manager",
  "Regular new collection updates",
]

export default function BecomeRetailerPage() {
  return (
    <div className="container py-12">
      <SectionHeader
        title="Become a Retailer"
        description="Join our network of successful boutiques and retailers across India."
        className="mb-12"
      />

      <div className="grid gap-8 lg:grid-cols-2">
        <div>
          <h2 className="mb-6 font-serif text-2xl font-semibold">
            Why Partner With Us?
          </h2>
          <div className="space-y-4">
            {benefits.map((benefit) => (
              <div key={benefit} className="flex items-center gap-2">
                <div className="rounded-full bg-primary/10 p-1">
                  <Check className="h-4 w-4 text-primary" />
                </div>
                <span>{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Register Your Interest</CardTitle>
            <CardDescription>
              Fill out the form below and our team will get back to you within 24
              hours.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form
              action="https://api.notionforms.io/v1/forms/YOUR_FORM_ID"
              method="POST"
              className="space-y-4"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    placeholder="John"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    placeholder="Doe"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="storeName">Store Name</Label>
                <Input
                  id="storeName"
                  name="storeName"
                  placeholder="Fashion Boutique"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  name="city"
                  placeholder="Mumbai"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+91 98765 43210"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="interest">Interested In</Label>
                <Select name="interest" required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select product category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bridal">Bridal Collection</SelectItem>
                    <SelectItem value="designer">Designer Wear</SelectItem>
                    <SelectItem value="casual">Casual Ethnic</SelectItem>
                    <SelectItem value="all">All Categories</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button type="submit" className="w-full">
                Submit Application
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 