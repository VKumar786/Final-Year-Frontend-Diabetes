import prisma from "@/utils/connect";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params }: { params: { slug: string } }
) {
  try {
  } catch (error) {
    return NextResponse.json({ error: "Error updating task" }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const { userId } = auth();
    const { slug } = params;

    if (!userId)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const trackData = await prisma.track.findUnique({
      where: {
        id: slug[0],
      },
    });

    if (!trackData) {
      return NextResponse.json({ error: "Track not found" }, { status: 404 });
    }

    if (trackData.userId !== userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await prisma.track.delete({
      where: {
        id: slug[0],
      },
    });
    return NextResponse.json({ message: "Track deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Error deleting task" }, { status: 500 });
  }
}
