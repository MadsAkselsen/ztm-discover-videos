import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
    console.log("=====>")
    if (req.method === "POST") {
      try {
        return NextResponse.json({ done: true });
      } catch (error) {
        console.error("Something went wrong logging in", error);
        return NextResponse.json({ done: false }, {status: 500});
      }
    } else {
      return NextResponse.json({ message: {done: false} });
    }
  }