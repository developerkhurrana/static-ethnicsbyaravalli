import {
  Search,
  MessageSquare,
  PackageCheck,
  ClipboardCheck,
  Truck,
} from "lucide-react"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { SectionHeader } from "@/components/ui/section-header"

export const metadata = {
  title: "How to Order",
  description:
    "Learn how to place wholesale orders for our ethnic wear collections.",
}

const steps = [
  {
    icon: Search,
    title: "Browse Collections",
    description:
      "Explore our extensive range of ethnic wear collections and select the styles you're interested in.",
  },
  {
    icon: MessageSquare,
    title: "Contact Us",
    description:
      "Get in touch via WhatsApp, phone, or email to discuss your requirements and get detailed pricing.",
  },
  {
    icon: PackageCheck,
    title: "Sample Order",
    description:
      "Place a sample order to check the quality and fit of our products before bulk ordering.",
  },
  {
    icon: ClipboardCheck,
    title: "Finalize Order",
    description:
      "Confirm your order details, including quantities, sizes, and delivery timeline.",
  },
  {
    icon: Truck,
    title: "Payment & Shipping",
    description:
      "Complete the payment process and receive your order within the specified timeline.",
  },
]

const faqs = [
  {
    question: "What is the minimum order quantity (MOQ)?",
    answer:
      "Our minimum order quantity varies by product category. Generally, it's 10 pieces per design for most items, but this can be flexible for first-time buyers.",
  },
  {
    question: "Do you provide customization options?",
    answer:
      "Yes, we offer customization in terms of colors, embroidery designs, and sizing. Custom orders may have different MOQ requirements and lead times.",
  },
  {
    question: "What are the payment terms?",
    answer:
      "We typically require a 50% advance payment to confirm the order, with the remaining balance due before shipping. We accept bank transfers and other standard payment methods.",
  },
  {
    question: "What is the delivery timeline?",
    answer:
      "Standard delivery time is 2-3 weeks from order confirmation. This may vary based on order size, customization requirements, and season.",
  },
  {
    question: "Do you ship internationally?",
    answer:
      "Yes, we ship worldwide. International shipping costs and timelines will be provided during the order process.",
  },
  {
    question: "What is your return/exchange policy?",
    answer:
      "We have a quality check process before shipping. In case of any manufacturing defects, we offer replacements within 7 days of delivery.",
  },
]

export default function HowToOrderPage() {
  return (
    <div className="container py-12">
      <SectionHeader
        title="How to Order"
        description="Follow our simple process to place your wholesale order."
        className="mb-12"
      />

      <div className="mb-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {steps.map((step) => {
          const Icon = step.icon
          return (
            <div
              key={step.title}
              className="flex flex-col items-center text-center"
            >
              <div className="mb-4 rounded-full bg-primary/10 p-3">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="mb-2 font-serif text-xl font-medium">
                {step.title}
              </h3>
              <p className="text-muted-foreground">{step.description}</p>
            </div>
          )
        })}
      </div>

      <div className="mx-auto max-w-3xl">
        <h2 className="mb-6 text-center font-serif text-2xl font-semibold">
          Frequently Asked Questions
        </h2>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  )
} 