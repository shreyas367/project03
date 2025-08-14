import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectToDatabase} from "@/lib/db";
import User from "@/models/User";

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    // ✅ You can replace this with JWT or NextAuth session
    return NextResponse.json({ message: "Login successful", user: { id: user._id, email: user.email } });

  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
