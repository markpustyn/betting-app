import { NextResponse } from "next/server"
import { db } from "@/db/db"
import { bets } from "@/db/schema"
import { eq } from "drizzle-orm"

export async function POST(req: Request) {
  try {
    const { id, winner } = await req.json()

    if (!id || !winner) {
      return NextResponse.json(
        { error: "Missing fields" },
        { status: 400 }
      )
    }

    const result = await db
      .update(bets)
      .set({ winner })
      .where(eq(bets.id, id))
      .returning()

    return NextResponse.json({
      success: true,
      data: result[0],
    })
  } catch (err) {
    console.error(err)

    return NextResponse.json(
      { error: "Failed to update bet" },
      { status: 500 }
    )
  }
}