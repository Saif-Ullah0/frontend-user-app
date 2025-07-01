'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { apiRequest } from '@/utils/api';



export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const existingUser = localStorage.getItem('user');
    if (existingUser) {
      router.push('/dashboard'); 
    }
  }, []);

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const data = await apiRequest('/users/login', 'POST', { email, password });
    setMessage(`Welcome, ${data.name}`);
    localStorage.setItem('user', JSON.stringify(data));
  } catch (err) {
    console.error('Login error:', err.message);
    setMessage(err.message);
  }
};

  return (
    <main className="max-w-md mx-auto mt-10 p-6 bg-white dark:bg-gray-900 shadow-lg rounded-xl">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-white">Login to Your Account</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 border rounded focus:outline-none focus:ring focus:border-blue-500 dark:bg-gray-800 dark:text-white"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 border rounded focus:outline-none focus:ring focus:border-blue-500 dark:bg-gray-800 dark:text-white"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded disabled:opacity-50"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      {message && (
        <p className="mt-4 text-center text-sm font-medium text-red-600 dark:text-red-400">
          {message}
        </p>
      )}
    </main>
  );
}
