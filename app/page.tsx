// app/page.tsx
import Header from "@/app/components/Header"; // your client Header
import { connectToDatabase } from "@/lib/db";
import Video, { IVideo } from "@/models/Video";
import { HydratedDocument } from "mongoose";

export const revalidate = 0; // disable caching for SSR

async function fetchVideos(): Promise<IVideo[]> {
  await connectToDatabase();
  const videos = await Video.find({})
    .sort({ createdAt: -1 })
    .lean() as HydratedDocument<IVideo>[];
  return videos;
}

export default async function HomePage() {
  const videos = await fetchVideos();

  return (
    <main className="min-h-screen flex flex-col">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <section className="flex flex-1 flex-col items-center justify-center text-center px-6 mt-8">
        <h2 className="text-4xl font-bold mb-4">Welcome to My App 🚀</h2>
        <p className="text-lg text-gray-600 max-w-xl mb-8">
          Watch the latest videos below. Login to upload your own!
        </p>

        {/* Videos Grid */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.length === 0 ? (
            <p className="text-gray-500 col-span-full">No videos uploaded yet.</p>
          ) : (
            videos.map((video) => (
              <div key={video._id} className="bg-white shadow rounded-lg p-4">
                <video
                  src={video.url}
                  controls
                  className="w-full rounded-lg mb-2"
                />
                <h3 className="text-xl font-semibold">{video.title}</h3>
                <p className="text-gray-600">{video.description}</p>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-4 bg-gray-100 text-center text-gray-500 text-sm mt-8">
        &copy; {new Date().getFullYear()} My App. All rights reserved.
      </footer>
    </main>
  );
}
