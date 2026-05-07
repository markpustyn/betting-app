import { NextRequest, NextResponse } from "next/server"
import { db } from "@/db/db"
import { trades } from "@/db/schema"
import { desc, eq } from "drizzle-orm"

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const betId = searchParams.get("betId")


    const result = await db
        .select()
        .from(trades)
        .where(eq(trades.betId, Number(betId)))
        .orderBy(desc(trades.createdAt))
        .limit(10)
    


    return NextResponse.json({
      success: true,
      data: result,
    })
  } catch (err) {
    console.error(err)

    return NextResponse.json(
      { error: "Failed to fetch trades" },
      { status: 500 }
    )
  }
}