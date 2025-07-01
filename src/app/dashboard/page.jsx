'use client';

import { useEffect, useState } from 'react';

export default function DashboardPage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  return (
    <main className="max-w-3xl mx-auto mt-10 p-6 rounded-lg shadow-md bg-white dark:bg-gray-800 dark:text-white">
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      {user ? (
        <div className="space-y-2">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Phone:</strong> {user.phone}</p>
          <p><strong>City:</strong> {user.city}</p>
          <p><strong>Age:</strong> {user.age}</p>
          <p><strong>Role:</strong> {user.role}</p>
          <p><strong>Bio:</strong> {user.bio}</p>
        </div>
      ) : (
        <p className="text-gray-500">No user data found. Please login.</p>
      )}
    </main>
  );
}
