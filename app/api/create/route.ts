import { NextResponse } from "next/server"
import { db } from "@/db/db"
import { bets } from "@/db/schema"

export async function POST(req: Request) {
  
  try {

    const { title, optionA, optionB, closingDate , totalPool} = await req.json()

    if (!title || !optionA || !optionB || !closingDate) {
      return NextResponse.json(
        { error: "Missing fields" },
        { status: 400 }
      )
    }

    const result = await db
      .insert(bets)
      .values({
        title: title,
        optionA: optionA,
        optionB: optionB,
        closesAt: new Date(closingDate),
        totalPool: totalPool,
      })
      .returning()

    return NextResponse.json({
      success: true,
      data: result[0],
    })
  } catch (err) {
    console.error(err)

    return NextResponse.json(
      { error: "Failed to insert trade" },
      { status: 500 }
    )
  }
}