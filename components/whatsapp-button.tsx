import { MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { siteConfig } from "@/lib/constants"

export function WhatsAppButton() {
  const whatsappUrl = `https://wa.me/${siteConfig.whatsappNumber.replace(/[^0-9]/g, '')}`
  
  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 right-4 z-50"
    >
      <Button size="lg" className="rounded-full bg-green-500 hover:bg-green-600">
        <MessageCircle className="mr-2 h-5 w-5" />
        Chat on WhatsApp
      </Button>
    </a>
  )
} 