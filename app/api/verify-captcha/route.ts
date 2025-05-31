import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { token } = await request.json()

    if (!token) {
      return NextResponse.json(
        { success: false, error: "No token provided" },
        { status: 400 }
      )
    }

    const response = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`,
      {
        method: "POST",
      }
    )

    const data = await response.json()

    if (!data.success) {
      return NextResponse.json(
        { success: false, error: "Invalid token" },
        { status: 400 }
      )
    }

    // Check if the score is above 0.5 (you can adjust this threshold)
    if (data.score < 0.5) {
      return NextResponse.json(
        { success: false, error: "Score too low" },
        { status: 400 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("CAPTCHA verification error:", error)
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    )
  }
} 