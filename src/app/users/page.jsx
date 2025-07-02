'use client';
import { useEffect, useState } from 'react';

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [editUser, setEditUser] = useState(null);
  const [editForm, setEditForm] = useState({});

  useEffect(() => {
    fetch('http://localhost:5000/api/users')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setUsers(data);
        else setError('Invalid user data received');
      })
      .catch(() => setError('Failed to fetch users'));
  }, []);

  const handleDelete = async (userId) => {
    if (!confirm('Are you sure you want to delete this user?')) return;

    try {
      const res = await fetch(`http://localhost:5000/api/users/${userId}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setUsers(users.filter((u) => u._id !== userId));
      } else {
        alert('Failed to delete user');
      }
    } catch (err) {
      console.error('Delete error:', err);
      alert('Network error');
    }
  };

  const handleEdit = (user) => {
    setEditUser(user._id);
    setEditForm({ ...user });
  };

  const handleUpdate = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/users/${editUser}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editForm),
      });

      if (res.ok) {
        const updated = await res.json();
        setUsers((prev) =>
          prev.map((u) => (u._id === updated.data._id ? updated.data : u))
        );
        setEditUser(null);
      } else {
        alert('Failed to update user');
      }
    } catch (err) {
      alert('Update error');
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-6xl mx-auto bg-white dark:bg-gray-800 shadow rounded-xl p-6">
        <h2 className="text-3xl font-bold mb-6 text-indigo-700 dark:text-indigo-300">User Management</h2>

        {error ? (
          <p className="text-red-600 bg-red-100 dark:bg-red-900 p-3 rounded">{error}</p>
        ) : users.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-300">No users found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm border rounded-md">
              <thead className="bg-indigo-100 dark:bg-indigo-700 text-gray-800 dark:text-white">
                <tr>
                  <th className="p-3 text-left">#</th>
                  <th className="p-3 text-left">Name</th>
                  <th className="p-3 text-left">Email</th>
                  <th className="p-3 text-left">City</th>
                  <th className="p-3 text-left">Age</th>
                  <th className="p-3 text-left">Role</th>
                  <th className="p-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, idx) => (
                  <tr
                    key={user._id}
                    className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <td className="p-3">{idx + 1}</td>
                    <td className="p-3">
                      {editUser === user._id ? (
                        <input
                          value={editForm.name}
                          onChange={(e) =>
                            setEditForm({ ...editForm, name: e.target.value })
                          }
                          className="w-full p-1 rounded border dark:bg-gray-800"
                        />
                      ) : (
                        user.name
                      )}
                    </td>
                    <td className="p-3">{user.email}</td>
                    <td className="p-3">{user.city}</td>
                    <td className="p-3">{user.age}</td>
                    <td className="p-3">{user.role}</td>
                    <td className="p-3 flex gap-2">
                      {editUser === user._id ? (
                        <>
                          <button
                            onClick={handleUpdate}
                            className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => setEditUser(null)}
                            className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600 transition"
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => handleEdit(user)}
                            className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(user._id)}
                            className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}
