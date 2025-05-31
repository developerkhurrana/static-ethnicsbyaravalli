"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import ReCAPTCHA from "react-google-recaptcha"

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
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  })

  const onSubmit = async (data: FormData) => {
    if (!recaptchaToken) {
      toast({
        title: "Error",
        description: "Please complete the CAPTCHA verification",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)
    try {
      // Format the message for WhatsApp
      const whatsappMessage = `New Contact Form Submission:\n\nName: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone}\nMessage: ${data.message}`
      
      // Encode the message for WhatsApp URL
      const encodedMessage = encodeURIComponent(whatsappMessage)
      
      // Your WhatsApp number
      const whatsappNumber = "919876543210" // Replace with your actual WhatsApp number
      
      // Create WhatsApp URL
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`
      
      // Open WhatsApp in a new tab
      window.open(whatsappUrl, '_blank')

      toast({
        title: "Success",
        description: "Your message has been sent successfully!",
      })
      reset()
      setRecaptchaToken(null)
    } catch {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
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

      <div className="flex justify-center">
        <ReCAPTCHA
          sitekey="6LdlCFErAAAAAOz3UPOy1f78tRhh8UzX3I19NzJg"
          onChange={(token: string | null) => setRecaptchaToken(token)}
        />
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