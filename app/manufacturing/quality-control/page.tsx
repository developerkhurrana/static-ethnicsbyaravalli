import { Metadata } from 'next'
import Image from 'next/image'
import Link from "next/link"
import { ArrowLeft, CheckCircle, Eye, Target, Shield, Zap, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { SectionHeader } from "@/components/ui/section-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export const metadata: Metadata = {
  title: 'Quality Control - Ethnics by Aravalli | Premium Ethnic Wear Manufacturer',
  description: 'Discover our stringent quality control processes. Every garment undergoes multiple quality checks to ensure superior craftsmanship and consistency.',
  keywords: 'quality control, garment inspection, ethnic wear quality, kurta quality, manufacturing standards, Jaipur manufacturer',
  openGraph: {
    title: 'Quality Control - Ethnics by Aravalli',
    description: 'Stringent quality control for premium ethnic wear.',
    type: 'website',
  },
}

const qualityFeatures = [
  {
    icon: CheckCircle,
    title: 'Multi-Stage Inspection',
    description: 'Every garment undergoes multiple quality checks at different stages of production.',
  },
  {
    icon: Eye,
    title: 'Visual Inspection',
    description: 'Trained inspectors examine every detail for stitching, fabric, and finishing quality.',
  },
  {
    icon: Target,
    title: 'Measurement Accuracy',
    description: 'Precise measurements are verified to ensure perfect fit and sizing consistency.',
  },
  {
    icon: Shield,
    title: 'Durability Testing',
    description: 'Garments are tested for strength, colorfastness, and overall durability.',
  },
  {
    icon: Zap,
    title: 'Fast Turnaround',
    description: 'Efficient quality control processes ensure quick approval without compromising standards.',
  },
  {
    icon: Users,
    title: 'Expert Team',
    description: 'Experienced quality control specialists with deep knowledge of ethnic wear standards.',
  },
]

const qualityProcess = [
  {
    step: '01',
    title: 'Raw Material Check',
    description: 'All fabrics and materials are inspected for quality, color, and consistency.',
  },
  {
    step: '02',
    title: 'In-Process Inspection',
    description: 'Quality checks are conducted during cutting, stitching, and assembly stages.',
  },
  {
    step: '03',
    title: 'Final Product Check',
    description: 'Complete garment inspection for fit, finish, and overall quality standards.',
  },
  {
    step: '04',
    title: 'Measurement Verification',
    description: 'All measurements are verified against specifications for perfect sizing.',
  },
  {
    step: '05',
    title: 'Packaging Inspection',
    description: 'Final check before packaging to ensure presentation and labeling quality.',
  },
  {
    step: '06',
    title: 'Quality Approval',
    description: 'Only garments meeting our high standards are approved for dispatch.',
  },
]

export default function QualityControlPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F9F6F4] via-white to-[#F9F6F4]">
      {/* Breadcrumb */}
      <div className="mb-6">
        <Link href="/manufacturing" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Manufacturing
        </Link>
      </div>

      <SectionHeader
        title="Quality Control Excellence"
        description="Where perfection meets precision - our quality control processes ensure every garment meets the highest standards."
        className="mb-12"
      />

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="secondary" className="mb-4 bg-[#D9A8A0] text-[#2E1B1B]">
                Manufacturing Excellence
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold text-[#2E1B1B] mb-6">
                Quality Control
              </h1>
              <p className="text-xl text-[#4A3A3A] max-w-3xl mb-8">
                Stringent quality control measures are in place at every stage to guarantee superior 
                craftsmanship and consistency before shipping. Every garment is thoroughly inspected.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/contact">
                  <Button size="lg" className="bg-[#D9A8A0] hover:bg-[#C08478] text-[#2E1B1B] rounded-full">
                    Partner with Us
                  </Button>
                </Link>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-[#D9A8A0] text-[#D9A8A0] hover:bg-[#D9A8A0] hover:text-[#2E1B1B] rounded-full"
                  onClick={() => {
                    if (typeof window !== 'undefined') {
                      document.getElementById('process-section')?.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  View Our Process
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-video rounded-lg overflow-hidden shadow-xl">
                <Image
                  src="https://lh3.googleusercontent.com/p/AF1QipOSQ4UdNWJkeTGUSVvojWo3iB9ZBTX2vRS90zSd=s680-w680-h510-rw"
                  alt="Quality Control Process"
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
              Why Choose Our Quality Control?
            </h2>
            <p className="text-lg text-[#4A3A3A] max-w-2xl mx-auto">
              We maintain the highest quality standards through rigorous inspection processes 
              that ensure every garment meets our exacting requirements.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {qualityFeatures.map((feature, index) => (
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
              Our Quality Control Process
            </h2>
            <p className="text-lg text-[#4A3A3A] max-w-2xl mx-auto">
              A comprehensive approach to ensuring every garment meets our high quality standards.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {qualityProcess.map((step, index) => (
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
            Ready for Premium Quality?
          </h2>
          <p className="text-lg text-[#4A3A3A] mb-8">
            Partner with us and experience the highest quality standards in ethnic wear manufacturing, 
            ensuring your customers receive only the best products.
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