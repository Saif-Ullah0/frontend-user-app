'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { apiRequest } from '@/utils/api';
import { setItem } from '@/utils/storageService';

export default function RegisterPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    city: '',
    age: '',
    role: '',
    bio: '',
  });

  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const existingUser = localStorage.getItem('user');
    if (existingUser) router.push('/dashboard');
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const data = await apiRequest('/users/register', 'POST', form);
      setItem('user', data);
      setMessage('Registered successfully!');
      router.push('/dashboard');
    } catch (err) {
      console.error('Register error:', err.message);
      setMessage(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-green-100 dark:from-gray-900 dark:to-gray-800 p-6">
      <div className="w-full max-w-xl bg-white dark:bg-gray-900 shadow-xl rounded-xl p-8 border dark:border-gray-700">
        <h2 className="text-3xl font-bold text-green-700 dark:text-green-300 mb-6 text-center">
          Register Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            ['name', 'Name'],
            ['email', 'Email'],
            ['password', 'Password'],
            ['phone', 'Phone'],
            ['city', 'City'],
            ['age', 'Age'],
            ['role', 'Role'],
            ['bio', 'Bio'],
          ].map(([field, label]) => (
            <div key={field}>
              <label className="block text-sm font-medium mb-1 dark:text-white">{label}</label>
              <input
                type={field === 'password' ? 'password' : 'text'}
                name={field}
                value={form[field]}
                onChange={handleChange}
                placeholder={`Enter ${label}`}
                className="w-full px-4 py-2 rounded-lg border dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                required={['name', 'email', 'password'].includes(field)}
              />
            </div>
          ))}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition disabled:opacity-50"
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>

        {message && (
          <p className="mt-4 text-center text-red-500 dark:text-red-400 font-medium">
            {message}
          </p>
        )}
      </div>
    </main>
  );
}
