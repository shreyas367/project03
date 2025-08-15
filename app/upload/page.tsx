import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import VideoUploadForm from "../components/VideoUploadForm";

export default async function UploadPage() {
  // ✅ Server-side session check
  const session = await getServerSession(authOptions);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Upload New Reel</h1>

      {session ? (
        // Logged-in users see the upload form
        <VideoUploadForm />
      ) : (
        // Guests see a login button
        <div className="text-center">
          <p className="text-red-600 mb-4">
            You must be logged in to upload a video.
          </p>
          <Link
            href="/login"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Go to Login
          </Link>
        </div>
      )}
    </div>
  );
}
