import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export async function POST(req: Request) {
  try {
    console.log("Login API route called")

    const body = await req.json()
    console.log("Login request body:", { email: body.email, password: "***" }) // Don't log password

    // Validate required fields
    if (!body.email || !body.password) {
      console.error("Missing email or password")
      return NextResponse.json({ success: false, message: "Email and password are required" }, { status: 400 })
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

    const email = body.email.trim().toLowerCase()
    const password = body.password

    console.log("Querying user by email:", email)

    // Query user by email and password
    const { data, error } = await supabase
      .from("users")
      .select("firstname, secondname, email, version")
      .eq("email", email)
      .eq("password", password) // Note: In production, you should hash passwords and compare hashes
      .single()

    if (error) {
      console.error("Supabase query error:", error)
      if (error.code === "PGRST116") {
        // No rows returned - invalid credentials
        return NextResponse.json({ success: false, message: "Invalid email or password" }, { status: 401 })
      }
      return NextResponse.json({ success: false, message: `Database error: ${error.message}` }, { status: 500 })
    }

    if (!data) {
      console.log("No user found with provided credentials")
      return NextResponse.json({ success: false, message: "Invalid email or password" }, { status: 401 })
    }

    console.log("User found:", { email: data.email, firstname: data.firstname, secondname: data.secondname })

    // Return user data (excluding password)
    return NextResponse.json({
      success: true,
      user: {
        firstName: data.firstname,
        lastName: data.secondname,
        email: data.email,
        version: data.version || "",
      },
    })
  } catch (err) {
    console.error("Unexpected login error:", err)
    return NextResponse.json({ success: false, message: "An unexpected error occurred" }, { status: 500 })
  }
}
