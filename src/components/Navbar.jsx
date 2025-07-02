'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getItem, removeItem } from '@/utils/storageService';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState(null);

  const isActive = (path) => pathname === path;

  // Load user from localStorage on mount and pathname change
  useEffect(() => {
    const storedUser = getItem('user');
    setUser(storedUser);
  }, [pathname]);

  const handleLogout = () => {
    removeItem('user');
    setUser(null);
    router.push('/login');
  };

  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-lg font-bold">
          <Link href="/">MyApp</Link>
        </h1>
        <ul className="flex gap-6">
          <li>
            <Link href="/" className={isActive('/') ? 'underline font-semibold' : ''}>Home</Link>
          </li>

          {user ? (
            <>
              <li>
                <Link href="/dashboard" className={isActive('/dashboard') ? 'underline font-semibold' : ''}>Dashboard</Link>
              </li>
              <li>
                <Link href="/users" className={isActive('/users') ? 'underline font-semibold' : ''}>Users</Link>
              </li>
              <li>
                <span className="cursor-pointer hover:underline" onClick={handleLogout}>
                  Logout
                </span>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link href="/login" className={isActive('/login') ? 'underline font-semibold' : ''}>Login</Link>
              </li>
              <li>
                <Link href="/register" className={isActive('/register') ? 'underline font-semibold' : ''}>Register</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
