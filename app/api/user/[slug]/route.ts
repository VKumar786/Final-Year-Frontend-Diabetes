import prisma from "@/utils/connect";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const { userId } = auth();
    const { slug } = params;

    if (!userId)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const userData = await prisma.user.findUnique({
      where: {
        userId: slug,
      },
    });

    if (!userData) {
      return NextResponse.json({ error: "user not found" }, { status: 404 });
    }

    return NextResponse.json({ user: userData }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Error fetching user" },
      { status: 500 }
    );
  }
}
