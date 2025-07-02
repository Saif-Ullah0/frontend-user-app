'use client';
import { getItem } from '@/utils/storageService';
import { useEffect, useState } from 'react';

export default function DashboardPage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = getItem('user');
    setUser(storedUser);
  }, []);

  if (!user) {
    return (
      <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-6 rounded shadow-md w-full max-w-md text-center">
          <h2 className="text-xl font-semibold text-red-600 mb-4">Access Denied</h2>
          <p className="text-gray-700">User not found. Please login to view dashboard.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white shadow-2xl rounded-xl p-8">
        <h2 className="text-3xl font-bold text-indigo-700 mb-6 text-center">Welcome, {user.name} 👋</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-blue-50 border-l-4 border-blue-400 rounded-lg p-4 shadow">
            <h4 className="text-blue-700 font-semibold">📧 Email</h4>
            <p className="text-gray-700">{user.email}</p>
          </div>

          <div className="bg-green-50 border-l-4 border-green-400 rounded-lg p-4 shadow">
            <h4 className="text-green-700 font-semibold">📱 Phone</h4>
            <p className="text-gray-700">{user.phone || 'N/A'}</p>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 rounded-lg p-4 shadow">
            <h4 className="text-yellow-700 font-semibold">🏙️ City</h4>
            <p className="text-gray-700">{user.city || 'N/A'}</p>
          </div>

          <div className="bg-purple-50 border-l-4 border-purple-400 rounded-lg p-4 shadow">
            <h4 className="text-purple-700 font-semibold">🎂 Age</h4>
            <p className="text-gray-700">{user.age || 'N/A'}</p>
          </div>

          <div className="bg-red-50 border-l-4 border-red-400 rounded-lg p-4 shadow">
            <h4 className="text-red-700 font-semibold">🛡️ Role</h4>
            <p className="text-gray-700 capitalize">{user.role}</p>
          </div>

          <div className="bg-indigo-50 border-l-4 border-indigo-400 rounded-lg p-4 shadow col-span-1 sm:col-span-2">
            <h4 className="text-indigo-700 font-semibold">📝 Bio</h4>
            <p className="text-gray-700">{user.bio || 'No bio provided'}</p>
          </div>
        </div>
      </div>
    </main>
  );
}
