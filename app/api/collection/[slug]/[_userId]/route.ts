import { auth } from "@clerk/nextjs/server";
import prisma from "../../../../../utils/connect";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: any }
) {
  try {
    const { userId } = auth();
    const { _userId } = params;

    if (!userId)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const tracks = await prisma.track.findMany({
      where: {
        userId: {
          equals: _userId,
        },
      },
      orderBy: {
        updatedAt: "desc",
      },
    });

    return NextResponse.json({ tracks }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Error getting task" }, { status: 500 });
  }
}
