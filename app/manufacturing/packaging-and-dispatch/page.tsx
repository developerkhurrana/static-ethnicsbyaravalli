import { Metadata } from 'next'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Package, Truck, Shield, Clock, CheckCircle, Users } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Packaging & Dispatch - Ethnics by Aravalli | Premium Ethnic Wear Manufacturer',
  description: 'Discover our meticulous packaging and dispatch processes. We ensure your ethnic wear reaches you in perfect condition with premium packaging and reliable shipping.',
  keywords: 'packaging, dispatch, shipping, ethnic wear packaging, kurta packaging, quality packaging, secure shipping, Jaipur manufacturer',
  openGraph: {
    title: 'Packaging & Dispatch - Ethnics by Aravalli',
    description: 'Premium packaging and reliable dispatch for your ethnic wear orders.',
    type: 'website',
  },
}

const packagingFeatures = [
  {
    icon: Package,
    title: 'Premium Packaging',
    description: 'Each garment is carefully wrapped in tissue paper and placed in branded packaging to maintain its pristine condition.',
  },
  {
    icon: Shield,
    title: 'Quality Protection',
    description: 'Multi-layer protection ensures your ethnic wear arrives in perfect condition, protected from dust, moisture, and damage.',
  },
  {
    icon: CheckCircle,
    title: 'Final Inspection',
    description: 'Every package undergoes a final quality check before dispatch to ensure all items meet our standards.',
  },
  {
    icon: Truck,
    title: 'Reliable Shipping',
    description: 'Partner with trusted logistics providers for timely and secure delivery across India and internationally.',
  },
  {
    icon: Clock,
    title: 'Fast Dispatch',
    description: 'Orders are processed and dispatched within 24-48 hours of completion, ensuring quick delivery.',
  },
  {
    icon: Users,
    title: 'Tracking Support',
    description: 'Real-time tracking updates and dedicated customer support throughout the shipping process.',
  },
]

const packagingProcess = [
  {
    step: '01',
    title: 'Quality Check',
    description: 'Final inspection of each garment for any defects or quality issues before packaging.',
  },
  {
    step: '02',
    title: 'Tissue Wrapping',
    description: 'Individual garments are wrapped in acid-free tissue paper to prevent color transfer and maintain freshness.',
  },
  {
    step: '03',
    title: 'Branded Packaging',
    description: 'Carefully placed in premium branded packaging with care instructions and product details.',
  },
  {
    step: '04',
    title: 'Secure Sealing',
    description: 'Packages are securely sealed with tamper-evident packaging to ensure product integrity.',
  },
  {
    step: '05',
    title: 'Labeling & Documentation',
    description: 'Complete labeling with tracking information, care instructions, and necessary documentation.',
  },
  {
    step: '06',
    title: 'Dispatch',
    description: 'Handed over to trusted logistics partners for safe and timely delivery to your doorstep.',
  },
]

export default function PackagingAndDispatchPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F9F6F4] via-white to-[#F9F6F4]">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="secondary" className="mb-4 bg-[#D9A8A0] text-[#2E1B1B]">
                Manufacturing Excellence
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold text-[#2E1B1B] mb-6">
                Packaging & Dispatch
              </h1>
              <p className="text-xl text-[#4A3A3A] max-w-3xl mb-8">
                Every piece of ethnic wear deserves to reach its destination in perfect condition. 
                Our meticulous packaging and reliable dispatch processes ensure your products arrive 
                safely and beautifully presented.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/contact">
                  <Button size="lg" className="bg-[#D9A8A0] hover:bg-[#C08478] text-[#2E1B1B] rounded-full">
                    Partner with Us
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-video rounded-lg overflow-hidden shadow-xl">
                <Image
                  src="https://res.cloudinary.com/dfye0gag9/image/upload/f19f9eee-18ec-4459-bf88-132a2e1f2983.png"
                  alt="Packaging and Dispatch Process"
                  width={600}
                  height={400}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2E1B1B] mb-4">
              Why Choose Our Packaging?
            </h2>
            <p className="text-lg text-[#4A3A3A] max-w-2xl mx-auto">
              We go beyond basic packaging to ensure your ethnic wear arrives in pristine condition, 
              reflecting the premium quality of our craftsmanship.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {packagingFeatures.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-[#F9F6F4] rounded-full flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-8 h-8 text-[#D9A8A0]" />
                  </div>
                  <CardTitle className="text-xl text-[#2E1B1B]">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-[#4A3A3A] text-center">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section id="process-section" className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2E1B1B] mb-4">
              Our Packaging Process
            </h2>
            <p className="text-lg text-[#4A3A3A] max-w-2xl mx-auto">
              A systematic approach to ensure every garment is packaged with care and attention to detail.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {packagingProcess.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-[#D9A8A0] text-[#2E1B1B] w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold mb-4">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold text-[#2E1B1B] mb-2">{step.title}</h3>
                <p className="text-[#4A3A3A]">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#2E1B1B] mb-6">
            Ready to Experience Premium Packaging?
          </h2>
          <p className="text-lg text-[#4A3A3A] mb-8">
            Partner with us and ensure your ethnic wear reaches customers in perfect condition, 
            enhancing your brand&apos;s reputation and customer satisfaction.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" className="bg-[#D9A8A0] hover:bg-[#C08478] text-[#2E1B1B] rounded-full">
                Start Partnership
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="border-[#D9A8A0] text-[#D9A8A0] hover:bg-[#D9A8A0] hover:text-[#2E1B1B] rounded-full">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
} 