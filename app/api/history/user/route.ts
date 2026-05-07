import { NextResponse } from "next/server"
import { db } from "@/db/db"
import { trades } from "@/db/schema"
import { eq } from "drizzle-orm"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const address = searchParams.get("address")

  if (!address) {
    return NextResponse.json({ error: "Missing address" }, { status: 400 })
  }

  const result = await db
    .select()
    .from(trades)




  return NextResponse.json({
    success: true,
    data: result,
  })
}