"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function ClientHeader() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return (
      <header className="w-full flex items-center justify-between px-6 py-4 bg-gray-800 text-white shadow">
        <h1 className="text-2xl font-bold">My App</h1>
        <nav className="flex items-center gap-4">
          <span>Loading...</span>
        </nav>
      </header>
    );
  }

  return (
    <header className="w-full flex items-center justify-between px-6 py-4 bg-gray-800 text-white shadow">
      <h1 className="text-2xl font-bold">My App</h1>

      <nav className="flex items-center gap-4">
        {/* Upload button visible always */}
        <button
          onClick={() => router.push("/upload")}
          className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Upload
        </button>

        {session ? (
          <>
            <button
              onClick={() => signOut()}
              className="bg-red-500 px-4 py-2 rounded hover:bg-red-600 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => signIn()}
              className="bg-green-500 px-4 py-2 rounded hover:bg-green-600 transition"
            >
              Login
            </button>
            <button
              onClick={() => router.push("/register")}
              className="bg-purple-500 px-4 py-2 rounded hover:bg-purple-600 transition"
            >
              Sign Up
            </button>
          </>
        )}
      </nav>
    </header>
  );
}
