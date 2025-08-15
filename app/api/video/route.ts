import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import Video from "@/models/Video";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    // ✅ Check if user is logged in
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized: Please log in to upload a video" },
        { status: 401 }
      );
    }

    // ✅ Parse request body
    const { title, description, url } = await req.json();
    if (!title || !description || !url) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // ✅ Connect to DB
    await connectToDatabase();

    // ✅ Create new video
    const newVideo = await Video.create({
      title,
      description,
      url,
      createdAt: new Date(),
    });

    return NextResponse.json(newVideo, { status: 201 });
  } catch (error) {
    console.error("Error saving video:", error);
    return NextResponse.json(
      { error: "Failed to save video" },
      { status: 500 }
    );
  }
}
