'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { apiRequest } from '@/utils/api';
import { setItem } from '@/utils/storageService';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  useEffect(() => {
    const existingUser = localStorage.getItem('user');
    if (existingUser) router.push('/dashboard');
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await apiRequest('/users/login', 'POST', { email, password });
      setMessage(`Welcome, ${data.name}`);
      setItem('user', data);
      router.push('/dashboard');
    } catch (err) {
      setMessage(err.message || 'Login failed');
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-tr from-indigo-200 to-purple-200 flex justify-center items-center p-4">
      <div className="bg-white w-full max-w-md p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-center mb-4 text-indigo-600">Login to Your Account</h2>
        {message && <p className="text-red-600 text-sm text-center mb-2">{message}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />
          <button className="w-full bg-indigo-600 text-white py-3 rounded hover:bg-indigo-700 transition">
            Login
          </button>
        </form>
      </div>
    </main>
  );
}
