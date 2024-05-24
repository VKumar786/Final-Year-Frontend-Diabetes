import prisma from "@/utils/connect";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = auth();

    const {
      pregnancies = 0,
      glucose = 0,
      blood_pressure = 0,
      skin_thickness = 0,
      insulin = 0,
      bmi = 0,
      diabetes_pedigree_function = 0,
      age = 0,
      is_diabetic = false,
    } = await req.json();

    const track = await prisma.track.create({
      data: {
        pregnancies,
        glucose,
        blood_pressure,
        skin_thickness,
        insulin,
        bmi,
        diabetes_pedigree_function,
        age,
        userId,
        is_diabetic,
      },
    });

    return NextResponse.json({ track }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Error creating task" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const { userId } = auth();
    if (!userId)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const tracks = await prisma.track.findMany({
      where: {
        userId: {
          equals: userId,
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
