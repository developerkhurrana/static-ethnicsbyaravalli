import { Metadata } from 'next'
import Image from 'next/image'
import Link from "next/link"
import { ArrowLeft, Ruler, Palette, Users, Target, Layers, Zap } from "lucide-react"

import { Button } from "@/components/ui/button"
import { SectionHeader } from "@/components/ui/section-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export const metadata: Metadata = {
  title: 'Pattern Making - Ethnics by Aravalli | Premium Ethnic Wear Manufacturer',
  description: 'Discover our expert pattern making process. Our design studio combines creativity and technology to craft unique ethnic wear collections.',
  keywords: 'pattern making, design studio, ethnic wear design, kurta patterns, fashion design, Jaipur manufacturer',
  openGraph: {
    title: 'Pattern Making - Ethnics by Aravalli',
    description: 'Expert pattern making for premium ethnic wear collections.',
    type: 'website',
  },
}

const patternFeatures = [
  {
    icon: Palette,
    title: 'Creative Design',
    description: 'Our expert designers create unique patterns that blend traditional aesthetics with modern trends.',
  },
  {
    icon: Ruler,
    title: 'Precision Engineering',
    description: 'Advanced CAD software ensures perfect measurements and flawless pattern accuracy.',
  },
  {
    icon: Target,
    title: 'Market Research',
    description: 'Patterns are developed based on extensive market research and customer preferences.',
  },
  {
    icon: Layers,
    title: 'Layered Approach',
    description: 'Multi-layer pattern development ensures perfect fit and comfort for all body types.',
  },
  {
    icon: Zap,
    title: 'Fast Prototyping',
    description: 'Quick sample development allows for rapid iteration and perfect final patterns.',
  },
  {
    icon: Users,
    title: 'Expert Team',
    description: 'Experienced pattern makers with decades of expertise in ethnic wear design.',
  },
]

const patternProcess = [
  {
    step: '01',
    title: 'Design Concept',
    description: 'Initial design concepts are developed based on market trends and customer requirements.',
  },
  {
    step: '02',
    title: 'Technical Drawing',
    description: 'Detailed technical drawings are created with precise measurements and specifications.',
  },
  {
    step: '03',
    title: 'CAD Development',
    description: 'Patterns are digitized using advanced CAD software for perfect accuracy.',
  },
  {
    step: '04',
    title: 'Sample Creation',
    description: 'Physical samples are created to test fit, comfort, and overall design appeal.',
  },
  {
    step: '05',
    title: 'Refinement',
    description: 'Patterns are refined based on sample feedback and quality testing.',
  },
  {
    step: '06',
    title: 'Final Approval',
    description: 'Final patterns are approved and prepared for production implementation.',
  },
]

export default function PatternMakingPage() {
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
        title="Pattern Making Excellence"
        description="Where creativity meets precision - our expert pattern making process ensures every design translates perfectly from concept to creation."
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
                Pattern Making
              </h1>
              <p className="text-xl text-[#4A3A3A] max-w-3xl mb-8">
                Our design studio combines creativity and technology, allowing expert designers to craft 
                unique ethnic wear collections ready for the market. Every pattern is precision-engineered 
                for perfect fit and comfort.
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
                  src="https://res.cloudinary.com/dfye0gag9/image/upload/about_banner_1_q6jmud.jpg"
                  alt="Pattern Making Process"
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
              Why Choose Our Pattern Making?
            </h2>
            <p className="text-lg text-[#4A3A3A] max-w-2xl mx-auto">
              We combine traditional craftsmanship with modern technology to create patterns 
              that ensure perfect fit and exceptional comfort.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {patternFeatures.map((feature, index) => (
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
              Our Pattern Making Process
            </h2>
            <p className="text-lg text-[#4A3A3A] max-w-2xl mx-auto">
              A systematic approach to creating perfect patterns for premium ethnic wear.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {patternProcess.map((step, index) => (
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
            Ready to Create Perfect Patterns?
          </h2>
          <p className="text-lg text-[#4A3A3A] mb-8">
            Partner with us and experience the perfect blend of creativity and precision 
            in pattern making for your ethnic wear collections.
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