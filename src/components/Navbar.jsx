'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const pathname = usePathname();
  const isActive = (path) => pathname === path;

  const [user, setUser] = useState(null);

  // Sync with localStorage changes
  useEffect(() => {
    const updateUser = () => {
      const stored = localStorage.getItem('user');
      setUser(stored ? JSON.parse(stored) : null);
    };

    updateUser();

    // Listen for localStorage changes
    window.addEventListener('storage', updateUser);
    return () => window.removeEventListener('storage', updateUser);
  }, []);

  // Also update on client-side route change
  useEffect(() => {
    const stored = localStorage.getItem('user');
    setUser(stored ? JSON.parse(stored) : null);
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    window.location.href = '/login';
  };

  return (
    <nav className="bg-blue-600 dark:bg-gray-900 text-white shadow-md">
      <div className="max-w-6xl mx-auto flex items-center justify-between p-4">
        <Link href="/" className="text-xl font-bold hover:text-yellow-300">
          MyApp
        </Link>

        <ul className="flex gap-6 items-center text-sm">
          <li>
            <Link
              href="/"
              className={`hover:text-yellow-300 ${isActive('/') ? 'underline font-semibold' : ''}`}
            >
              Home
            </Link>
          </li>

          {!user ? (
            <>
              <li>
                <Link
                  href="/login"
                  className={`hover:text-yellow-300 ${isActive('/login') ? 'underline font-semibold' : ''}`}
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  href="/register"
                  className={`hover:text-yellow-300 ${isActive('/register') ? 'underline font-semibold' : ''}`}
                >
                  Register
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link
                  href="/dashboard"
                  className={`hover:text-yellow-300 ${isActive('/dashboard') ? 'underline font-semibold' : ''}`}
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href="/users"
                  className={`hover:text-yellow-300 ${isActive('/users') ? 'underline font-semibold' : ''}`}
                >
                  Users
                </Link>
              </li>
              <li className="text-gray-200 hidden sm:inline">Hi, {user.name}</li>
              <li>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-white"
                >
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
