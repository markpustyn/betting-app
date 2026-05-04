import { NextResponse } from "next/server"
import { db } from "@/db/db"
import { bets } from "@/db/schema"

export async function GET() {
  try {
    const result = await db.select().from(bets)

    return NextResponse.json({
      success: true,
      data: result, // FIXED
    })
  } catch (err) {
    console.error(err)
    return NextResponse.json(
      { error: "Failed to fetch bets" }, // also fix message
      { status: 500 }
    )
  }
}