'use client';
import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-50 dark:from-gray-900 dark:to-gray-800 p-6">
      <div className="text-center max-w-2xl bg-white dark:bg-gray-900 shadow-xl rounded-2xl p-10 border dark:border-gray-700 transition-all">
        <h1 className="text-4xl font-bold text-blue-700 dark:text-blue-300 mb-4">
          Welcome to the User Management System
        </h1>
        <p className="text-gray-700 dark:text-gray-300 mb-8 text-lg">
          A full-stack web application.
        </p>

        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          <Link
            href="/login"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-lg font-semibold transition"
          >
            Login
          </Link>
          <Link
            href="/users"
            className="bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white px-6 py-3 rounded-lg text-lg font-semibold transition"
          >
            View Users
          </Link>
          <Link
            href="/dashboard"
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg text-lg font-semibold transition"
          >
            Dashboard
          </Link>
        </div>

        <div className="mt-6 text-sm text-gray-500 dark:text-gray-400">
          Built with 💙 by <span className="font-semibold">Saif Ullah</span>
        </div>
      </div>
    </main>
  );
}
