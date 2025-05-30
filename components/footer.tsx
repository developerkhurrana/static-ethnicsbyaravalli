import Link from "next/link"
import { Phone, Mail, MessageCircle, MapPin, Instagram, Facebook } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Ethnics by Aravalli</h3>
            <p className="text-gray-600">Made in Jaipur | Shipping Across India</p>
          </div>
          <div className="space-y-4">
            <h4 className="font-semibold">Contact</h4>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#D9A8A0]" />
                <a href="tel:+919828422208" className="hover:text-[#D9A8A0] transition-colors">
                  +91 98284 22208
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#D9A8A0]" />
                <a href="mailto:ethnicsbyaravalli@gmail.com" className="hover:text-[#D9A8A0] transition-colors">
                  ethnicsbyaravalli@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-[#D9A8A0]" />
                <a href="https://wa.me/919828422208" target="_blank" className="hover:text-[#D9A8A0] transition-colors">
                  WhatsApp: +91 98284 22208
                </a>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="font-semibold">Follow Us</h4>
            <ul className="space-y-3 text-gray-600">
              <li>
                <Link href="https://instagram.com/ethnicsbyaravalli" target="_blank" className="flex items-center gap-2 hover:text-[#D9A8A0] transition-colors">
                  <Instagram className="w-4 h-4 text-[#D9A8A0]" />
                  Instagram
                </Link>
              </li>
              <li>
                <Link href="https://facebook.com/ethnicsbyaravalli" target="_blank" className="flex items-center gap-2 hover:text-[#D9A8A0] transition-colors">
                  <Facebook className="w-4 h-4 text-[#D9A8A0]" />
                  Facebook
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="font-semibold">Address</h4>
            <div className="flex items-start gap-2 text-gray-600">
              <MapPin className="w-4 h-4 text-[#D9A8A0] mt-1" />
              <p>
                H 169, Malviya Nagar Industrial Area,<br />
                Malviya Nagar, Jaipur, Rajasthan 302017
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
} 