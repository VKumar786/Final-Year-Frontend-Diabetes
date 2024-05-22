import prisma from "@/utils/connect";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = await req.json();

    if (!userId)
      return NextResponse.json({ error: "Unauthorized", status: 401 });

    // const existingUser = await prisma.user.findUnique({
    //   where: {
    //     userId: userId || "",
    //   },
    // });

    // if (existingUser)
    //   return NextResponse.json({ error: "User already exists", status: 400 });

    const user = await prisma.user.create({
      data: {
        userId: userId,
      },
    });

    return NextResponse.json({ user, status: 201 });
  } catch (error) {
    console.log("Error Creating Tracks", error);

    return NextResponse.json({ error: "Error creating task", status: 500 });
  }
}

export async function GET(req: Request) {
  try {
  } catch (error) {
    console.log("Error Getting Tracks", error);

    return NextResponse.json({ error: "Error getting task", status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
  } catch (error) {
    console.log("Error Updating Tracks", error);

    return NextResponse.json({ error: "Error updating task", status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
  } catch (error) {
    console.log("Error Deleting Tracks", error);

    return NextResponse.json({ error: "Error deleting task", status: 500 });
  }
}
