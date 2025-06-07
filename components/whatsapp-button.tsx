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
      <Button 
        size="lg" 
        className="rounded-full bg-gradient-to-b from-green-500 to-green-600 text-white hover:shadow-xl transition duration-200 focus:ring-2 focus:ring-green-400/50"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
    </a>
  )
} 