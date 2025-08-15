import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import Video from "@/models/Video";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { title, description, url } = await req.json();
    if (!title || !description || !url) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    await connectToDatabase();

    const newVideo = await Video.create({
      title,
      description,
      url,
      createdAt: new Date(),
    });

    return NextResponse.json(newVideo, { status: 201 });
  } catch (error) {
    console.error("Error saving video:", error);
    return NextResponse.json({ error: "Failed to save video" }, { status: 500 });
  }
}
