import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export async function POST(req: Request) {
  try {
    console.log("Update tariff API route called")

    const body = await req.json()
    console.log("Update tariff request body:", body)

    // Validate required fields
    if (!body.email || !body.tariff) {
      console.error("Missing email or tariff")
      return NextResponse.json({ success: false, message: "Email and tariff are required" }, { status: 400 })
    }

    // Validate tariff value
    const validTariffs = ["Light", "Standard", "Pro"]
    if (!validTariffs.includes(body.tariff)) {
      console.error("Invalid tariff:", body.tariff)
      return NextResponse.json({ success: false, message: "Invalid tariff selected" }, { status: 400 })
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
    const tariff = body.tariff

    console.log("Updating user tariff:", { email, tariff })

    // Update user's version field
    const { data, error } = await supabase
      .from("users")
      .update({ version: tariff })
      .eq("email", email)
      .select("firstname, secondname, email, version")
      .single()

    if (error) {
      console.error("Supabase update error:", error)
      if (error.code === "PGRST116") {
        // No rows returned - user not found
        return NextResponse.json({ success: false, message: "User not found" }, { status: 404 })
      }
      return NextResponse.json({ success: false, message: `Database error: ${error.message}` }, { status: 500 })
    }

    if (!data) {
      console.log("No user found with email:", email)
      return NextResponse.json({ success: false, message: "User not found" }, { status: 404 })
    }

    console.log("Tariff updated successfully:", data)

    // Return updated user data
    return NextResponse.json({
      success: true,
      user: {
        firstName: data.firstname,
        lastName: data.secondname,
        email: data.email,
        version: data.version,
      },
    })
  } catch (err) {
    console.error("Unexpected tariff update error:", err)
    return NextResponse.json({ success: false, message: "An unexpected error occurred" }, { status: 500 })
  }
}
