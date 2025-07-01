'use client';
import { useState } from 'react';
import { apiRequest } from '@/utils/api';

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

const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    await apiRequest('/users/register', 'POST', form);
    setMessage('Registered successfully');
  } catch (err) {
    setMessage(err.message);
  }
};


  const fields = [
    { name: 'name', label: 'Full Name' },
    { name: 'email', label: 'Email Address' },
    { name: 'password', label: 'Password', type: 'password' },
    { name: 'phone', label: 'Phone Number' },
    { name: 'city', label: 'City' },
    { name: 'age', label: 'Age' },
    { name: 'role', label: 'Role' },
    { name: 'bio', label: 'Short Bio' },
  ];

  return (
    <main className="max-w-lg mx-auto mt-10 p-6 shadow-lg rounded-xl bg-white dark:bg-gray-800 dark:text-white">
      <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {fields.map(({ name, label, type }) => (
          <div key={name} className="flex flex-col">
            <label htmlFor={name} className="mb-1 font-medium text-gray-700 dark:text-gray-200">
              {label}
            </label>
            <input
              id={name}
              name={name}
              type={type || 'text'}
              placeholder={label}
              className="p-2 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={form[name]}
              onChange={handleChange}
              required
            />
          </div>
        ))}

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded transition duration-300"
        >
          Register
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
