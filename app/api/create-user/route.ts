import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export async function POST(req: Request) {
  try {
    console.log("API route called")

    const body = await req.json()
    console.log("Request body:", body)

    // Validate required fields
    const required = ["firstname", "secondname", "email", "password", "heard"]
    for (const field of required) {
      if (!body[field] || typeof body[field] !== "string" || !body[field].trim()) {
        console.error(`Missing or invalid field: ${field}`)
        return NextResponse.json({ success: false, message: `${field} is required` }, { status: 400 })
      }
    }

    // Check environment variables
    if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      console.error("Missing Supabase environment variables")
      return NextResponse.json({ success: false, message: "Server configuration error" }, { status: 500 })
    }

    console.log("Creating Supabase client...")
    const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    })

    const userData = {
      firstname: body.firstname.trim(),
      secondname: body.secondname.trim(),
      email: body.email.trim().toLowerCase(),
      password: body.password, // Note: In production, hash this password
      heard: body.heard,
    }

    console.log("Inserting user data:", userData)

    const { data, error } = await supabase.from("users").insert([userData]).select()

    if (error) {
      console.error("Supabase error:", error)
      return NextResponse.json({ success: false, message: `Database error: ${error.message}` }, { status: 500 })
    }

    console.log("User created successfully:", data)
    return NextResponse.json({ success: true, data })
  } catch (err) {
    console.error("Unexpected error:", err)
    return NextResponse.json({ success: false, message: "An unexpected error occurred" }, { status: 500 })
  }
}
