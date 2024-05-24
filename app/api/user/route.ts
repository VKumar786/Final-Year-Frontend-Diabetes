import prisma from "@/utils/connect";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const { imageUrl, email, name } = await req.json();

    if (!userId)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const existingUser = await prisma.user.findUnique({
      where: {
        userId: userId || "",
      },
    });

    if (existingUser)
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );

    const user = await prisma.user.create({
      data: {
        userId,
        imageUrl,
        email,
        name,
      },
    });

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Error creating task" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const { userId } = auth();

    if (!userId)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const user = await prisma.user.findUnique({
      where: {
        userId: userId || "",
      },
    });

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Error getting task" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();

    if (!userId)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const existingUser = await prisma.user.findUnique({
      where: {
        userId: userId || "",
      },
    });

    if (!existingUser)
      return NextResponse.json(
        { error: "User does not exist" },
        { status: 404 }
      );

    const user = await prisma.user.update({
      where: {
        userId: userId || "",
      },
      data: body,
    });

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Error updating task" }, { status: 500 });
  }
}
