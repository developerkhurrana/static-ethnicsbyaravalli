import { Metadata } from 'next'
import Image from 'next/image'
import Link from "next/link"
import { ArrowLeft, Scissors, Settings, Target, Zap, Users, Shield } from "lucide-react"

import { Button } from "@/components/ui/button"
// import { SectionHeader } from "@/components/ui/section-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export const metadata: Metadata = {
  title: 'Cutting & Stitching - Ethnics by Aravalli | Premium Ethnic Wear Manufacturer',
  description: 'Discover our precision cutting and stitching processes. High-tech machinery and skilled artisans work together to manufacture premium ethnic wear.',
  keywords: 'cutting, stitching, ethnic wear manufacturing, kurta stitching, precision cutting, Jaipur manufacturer',
  openGraph: {
    title: 'Cutting & Stitching - Ethnics by Aravalli',
    description: 'Precision cutting and stitching for premium ethnic wear.',
    type: 'website',
  },
}

const cuttingFeatures = [
  {
    icon: Scissors,
    title: 'Precision Cutting',
    description: 'Advanced cutting machines ensure perfect fabric cutting with minimal waste and maximum efficiency.',
  },
  {
    icon: Settings,
    title: 'Expert Stitching',
    description: 'Skilled artisans and modern sewing machines create flawless stitches and perfect finishes.',
  },
  {
    icon: Target,
    title: 'Quality Control',
    description: 'Every step is monitored to ensure the highest quality standards are maintained throughout.',
  },
  {
    icon: Shield,
    title: 'Durability',
    description: 'Strong stitching techniques ensure your ethnic wear lasts for years without any issues.',
  },
  {
    icon: Zap,
    title: 'Fast Production',
    description: 'Efficient processes allow for quick turnaround times without compromising on quality.',
  },
  {
    icon: Users,
    title: 'Skilled Team',
    description: 'Experienced craftsmen with years of expertise in ethnic wear manufacturing.',
  },
]

const cuttingProcess = [
  {
    step: '01',
    title: 'Fabric Inspection',
    description: 'All fabrics are thoroughly inspected for quality, color consistency, and any defects.',
  },
  {
    step: '02',
    title: 'Pattern Layout',
    description: 'Patterns are carefully laid out on fabric to optimize usage and minimize waste.',
  },
  {
    step: '03',
    title: 'Precision Cutting',
    description: 'Advanced cutting machines ensure accurate cutting with clean, precise edges.',
  },
  {
    step: '04',
    title: 'Component Assembly',
    description: 'Individual pieces are assembled and prepared for the stitching process.',
  },
  {
    step: '05',
    title: 'Expert Stitching',
    description: 'Skilled artisans stitch each component with precision and attention to detail.',
  },
  {
    step: '06',
    title: 'Quality Check',
    description: 'Final inspection ensures every garment meets our high quality standards.',
  },
]

export default function CuttingAndStitchingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F9F6F4] via-white to-[#F9F6F4]">
      {/* Breadcrumb */}
      <div className="mb-6">
        <Link href="/manufacturing" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Manufacturing
        </Link>
      </div>
{/* 
      <SectionHeader
        title="Cutting & Stitching Excellence"
        description="Where precision meets craftsmanship - our cutting and stitching processes ensure every garment is perfectly crafted."
        className="mb-12"
      /> */}

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="secondary" className="mb-4 bg-[#D9A8A0] text-[#2E1B1B]">
                Manufacturing Excellence
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold text-[#2E1B1B] mb-6">
                Cutting & Stitching
              </h1>
              <p className="text-xl text-[#4A3A3A] max-w-3xl mb-8">
                High-tech machinery and skilled artisans work together to manufacture premium ethnic wear 
                with precision and attention to detail. Every stitch is crafted with care and expertise.
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
                  src="https://res.cloudinary.com/dfye0gag9/image/upload/IMG_3287_pfjlim.jpg"
                  alt="Cutting and Stitching Process"
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
              Why Choose Our Cutting & Stitching?
            </h2>
            <p className="text-lg text-[#4A3A3A] max-w-2xl mx-auto">
              We combine modern technology with traditional craftsmanship to create 
              perfectly crafted ethnic wear that stands the test of time.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cuttingFeatures.map((feature, index) => (
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
              Our Cutting & Stitching Process
            </h2>
            <p className="text-lg text-[#4A3A3A] max-w-2xl mx-auto">
              A systematic approach to creating perfectly crafted ethnic wear garments.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cuttingProcess.map((step, index) => (
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
            Ready for Perfect Craftsmanship?
          </h2>
          <p className="text-lg text-[#4A3A3A] mb-8">
            Partner with us and experience the perfect blend of technology and craftsmanship 
            in cutting and stitching for your ethnic wear collections.
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