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
        prev.map((u) => (u._id === updated._id ? updated : u))
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
    <main className="p-6 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-blue-700 dark:text-blue-300">All Users</h2>

      {error ? (
        <p className="text-red-500 bg-red-100 dark:bg-red-900 p-3 rounded">{error}</p>
      ) : users.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-300">No users found.</p>
      ) : (
        <div className="overflow-x-auto shadow rounded border dark:border-gray-700">
          <table className="min-w-full bg-white dark:bg-gray-900">
            <thead className="bg-blue-100 dark:bg-blue-800">
              <tr className="text-left text-gray-700 dark:text-gray-200">
                <th className="p-3">#</th>
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">City</th>
                <th className="p-3">Age</th>
                <th className="p-3">Role</th>
              </tr>
            </thead>
            <tbody>
  {users.map((user, idx) => (
  <tr
    key={user._id}
    className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
  >
    <td className="p-3">{idx + 1}</td>
    <td className="p-3">
      {editUser === user._id ? (
        <input
          className="p-1 rounded bg-white dark:bg-gray-800 border"
          value={editForm.name}
          onChange={(e) =>
            setEditForm({ ...editForm, name: e.target.value })
          }
        />
      ) : (
        user.name
      )}
    </td>
    <td className="p-3">{user.email}</td>
    <td className="p-3">{user.city}</td>
    <td className="p-3">{user.age}</td>
    <td className="p-3">{user.role}</td>
    <td className="p-3 space-x-2">
      {editUser === user._id ? (
        <>
          <button
            className="bg-green-600 text-white px-2 py-1 rounded"
            onClick={handleUpdate}
          >
            Save
          </button>
          <button
            className="bg-gray-400 text-white px-2 py-1 rounded"
            onClick={() => setEditUser(null)}
          >
            Cancel
          </button>
        </>
      ) : (
        <>
          <button
            className="bg-yellow-500 text-white px-2 py-1 rounded"
            onClick={() => handleEdit(user)}
          >
            Edit
          </button>
          <button
            className="bg-red-500 text-white px-2 py-1 rounded"
            onClick={() => handleDelete(user._id)}
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
    </main>
  );
}
