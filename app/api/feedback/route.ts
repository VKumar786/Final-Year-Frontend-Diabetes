import prisma from "@/utils/connect";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId = "" } = auth();
    const { email = "", message = "" } = await req.json();

    const user = await prisma.feedback.create({
      data: {
        userId: userId || "",
        email,
        message,
      },
    });

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Error creating feedback" }, { status: 500 });
  }
}
