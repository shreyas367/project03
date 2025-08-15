// app/page.tsx
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="w-full flex justify-between items-center px-8 py-4 bg-gray-900 text-white">
        <h1 className="text-2xl font-bold">
          <Link href="/">My App</Link>
        </h1>
        <nav className="flex gap-4">
          <Link
            href="/login"
            className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 transition"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="px-4 py-2 rounded bg-green-600 hover:bg-green-700 transition"
          >
            Sign Up
          </Link>
        </nav>
      </header>

      {/* Main Content */}
      <section className="flex flex-1 flex-col items-center justify-center text-center px-6">
        <h2 className="text-4xl font-bold mb-4">
          Welcome to My App 🚀
        </h2>
        <p className="text-lg text-gray-600 max-w-xl">
          This is your Next.js 15 application using the App Router.  
          Get started by logging in or signing up above.
        </p>

        <div className="mt-8 flex gap-4">
          <Link
            href="/upload"
            className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
          >
            Go to Upload Page
          </Link>
          <Link
            href="/video"
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            Watch Videos
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-4 bg-gray-100 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} My App. All rights reserved.
      </footer>
    </main>
  );
}
