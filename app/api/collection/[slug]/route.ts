import prisma from "@/utils/connect";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const { userId } = auth();
    const { slug } = params;
    const { email, passkey } = await req.json();

    if (!userId)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const collectionData = await prisma.collection.findUnique({
      where: {
        id: slug,
      },
    });

    if (!collectionData) {
      return NextResponse.json(
        { error: "Collection not found" },
        { status: 404 }
      );
    }

    if (collectionData.userId !== userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: {
        email,
        passkey,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const updatedCollection = await prisma.collection.update({
      where: {
        id: slug,
      },
      data: {
        records: {
          push: user?.userId,
        },
      },
    });

    return NextResponse.json(
      { message: "User added successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Error updating collection" },
      { status: 500 }
    );
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

    const collectionData = await prisma.collection.findUnique({
      where: {
        id: slug,
      },
    });

    if (!collectionData) {
      return NextResponse.json(
        { error: "Collection not found" },
        { status: 404 }
      );
    }

    if (collectionData.userId !== userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await prisma.collection.delete({
      where: {
        id: slug,
      },
    });
    return NextResponse.json(
      { message: "Collection deleted" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Error deleting collection" },
      { status: 500 }
    );
  }
}

export async function GET(
  req: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const { userId } = auth();
    const { slug } = params;

    if (!userId)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const collectionData = await prisma.collection.findUnique({
      where: {
        id: slug,
      },
    });

    if (!collectionData) {
      return NextResponse.json(
        { error: "Collection not found" },
        { status: 404 }
      );
    }

    if (collectionData.userId !== userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const users = await prisma.user.findMany({
      where: {
        userId: {
          in: collectionData.records,
        },
      },
    });

    const collectionWithUsers = {
      ...collectionData,
      users,
    };

    return NextResponse.json(
      { collection: collectionWithUsers },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Error fetching collection" },
      { status: 500 }
    );
  }
}
