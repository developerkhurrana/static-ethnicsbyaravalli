import Image from "next/image"
import Link from "next/link"
import { ArrowRight, MessageCircle, Package, Truck, CreditCard } from "lucide-react"

import { Button } from "@/components/ui/button"
import { SectionHeader } from "@/components/ui/section-header"

export const metadata = {
  title: "How to Order",
  description: "Learn about our simple ordering process for wholesale ethnic wear.",
}

const steps = [
  {
    number: 1,
    title: "Browse Our Collection",
    description: "Explore our extensive range of ethnic wear collections. You can view our catalog online or request a physical catalog.",
    icon: Package,
    details: [
      "Browse through our online catalog",
      "View detailed product images and specifications",
      "Check minimum order quantities (MOQ)",
      "Request a physical catalog if needed"
    ]
  },
  {
    number: 2,
    title: "Contact Us",
    description: "Reach out to us via WhatsApp or email with your requirements. Our team will guide you through the process.",
    icon: MessageCircle,
    details: [
      "Share your business details",
      "Specify your product requirements",
      "Discuss customization needs",
      "Get pricing information"
    ]
  },
  {
    number: 3,
    title: "Place Your Order",
    description: "Once you've selected your products, we'll provide you with a detailed quote and payment instructions.",
    icon: CreditCard,
    details: [
      "Review the quote",
      "Confirm order quantities",
      "Make payment through secure channels",
      "Receive order confirmation"
    ]
  },
  {
    number: 4,
    title: "Track & Receive",
    description: "We'll process your order and provide tracking information. Our logistics team ensures safe delivery.",
    icon: Truck,
    details: [
      "Get order processing updates",
      "Receive tracking information",
      "Track your shipment",
      "Receive your order safely"
    ]
  }
]

export default function HowToOrderPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col py-12">
      <div className="container max-w-7xl flex-1 flex flex-col">
        <SectionHeader
          title="How to Order"
          description="Follow these simple steps to start your wholesale journey with us"
          className="mb-12"
        />

        <div className="space-y-16">
          {steps.map((step) => (
            <div key={step.number} className="relative">
              <div className="grid gap-8 lg:grid-cols-2 items-center">
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold">
                      {step.number}
                    </div>
                    <h2 className="text-2xl font-bold">{step.title}</h2>
                  </div>
                  <p className="text-lg text-muted-foreground">
                    {step.description}
                  </p>
                  <ul className="space-y-3">
                    {step.details.map((detail, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <ArrowRight className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                  <Image
                    src={`/images/step-${step.number}.jpg`}
                    alt={step.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              {step.number < steps.length && (
                <div className="hidden lg:block absolute left-1/2 top-full w-0.5 h-16 bg-gray-200" />
              )}
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold mb-4">Ready to Start?</h3>
          <p className="text-lg text-muted-foreground mb-8">
            Contact us now to begin your wholesale journey
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/collections">
                Browse Collection
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/contact">
                Contact Us
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
} 