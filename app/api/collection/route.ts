import prisma from "@/utils/connect";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const { name } = await req.json();

    if (!userId)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const existingCollection = await prisma.collection.findUnique({
      where: {
        name,
      },
    });

    if (existingCollection) {
      return NextResponse.json(
        {
          error: "Collection already exists",
        },
        {
          status: 400,
        }
      );
    }

    const collection = await prisma.collection.create({
      data: {
        name,
        userId,
      },
    });

    return NextResponse.json({ collection });
  } catch (error) {
    console.log("Error Creating collection", error);

    return NextResponse.json({
      error: "Error creating collection",
      status: 500,
    });
  }
}

export async function GET(req: Request) {
  try {
    const { userId } = auth();
    if (!userId)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const collections = await prisma.collection.findMany({
      where: {
        userId: {
          equals: userId,
        },
      },
      orderBy: {
        updatedAt: "desc",
      },
    });

    return NextResponse.json({ collections }, { status: 200 });
  } catch (error) {
    console.log("Error Getting Tracks", error);

    return NextResponse.json({ error: "Error getting task" }, { status: 500 });
  }
}
