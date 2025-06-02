"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { siteConfig } from "@/lib/constants"

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  message: z.string().min(10, "Message must be at least 10 characters"),
})

type FormData = z.infer<typeof formSchema>

export function ContactForm() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  })

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    try {
      // First, store the submission in Google Sheets
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          mobile: data.phone,
          message: data.message,
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        if (result.type === 'cooldown') {
          toast({
            title: "Submission Rate Limited",
            description: `Please wait ${result.remainingTime} seconds before submitting again.`,
            variant: "destructive",
          })
        } else if (result.type === 'daily') {
          toast({
            title: "Daily Limit Reached",
            description: "You've reached the daily submission limit. Please try again tomorrow or contact us directly.",
            variant: "destructive",
          })
        } else if (result.type === 'total') {
          toast({
            title: "Maximum Submissions Reached",
            description: "You've reached the maximum number of submissions. Please contact us directly.",
            variant: "destructive",
          })
        } else {
          throw new Error(result.error || 'Failed to submit form')
        }
        return
      }

      // Format the message for WhatsApp
      const whatsappMessage = `New Contact Form Submission:\n\nName: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone}\nMessage: ${data.message}`
      
      // Create WhatsApp URL with the actual number from siteConfig
      const whatsappUrl = `https://wa.me/${siteConfig.whatsappNumber.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(whatsappMessage)}`
      
      // Open WhatsApp in a new tab
      window.open(whatsappUrl, '_blank')

      toast({
        title: "Success",
        description: "Your message has been sent successfully! We'll get back to you soon.",
      })
      reset()
    } catch (error) {
      console.error('Form submission error:', error)
      toast({
        title: "Error",
        description: "Failed to send message. Please try again or contact us directly.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Input
          {...register("name")}
          placeholder="Your Name"
          className="w-full"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>

      <div>
        <Input
          {...register("email")}
          type="email"
          placeholder="Your Email"
          className="w-full"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>

      <div>
        <Input
          {...register("phone")}
          type="tel"
          placeholder="Your Phone Number"
          className="w-full"
        />
        {errors.phone && (
          <p className="mt-1 text-sm text-red-500">{errors.phone.message}</p>
        )}
      </div>

      <div>
        <Textarea
          {...register("message")}
          placeholder="Your Message"
          className="w-full min-h-[100px]"
        />
        {errors.message && (
          <p className="mt-1 text-sm text-red-500">{errors.message.message}</p>
        )}
      </div>

      <Button
        type="submit"
        className="w-full bg-[#D9A8A0] hover:bg-[#C08478] text-white"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Sending..." : "Send Message"}
      </Button>
    </form>
  )
} 