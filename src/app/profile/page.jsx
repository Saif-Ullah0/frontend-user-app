"use client";
import { useEffect, useState } from "react";

export default function ProfilePage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("user");
    if (saved) setUser(JSON.parse(saved));
  }, []);

  if (!user) return <p style={{ padding: '2rem' }}>Loading...</p>;

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h1>User Profile</h1>
      <p><strong>ID:</strong> {user._id}</p>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Role:</strong> {user.role}</p>
      <p><strong>City:</strong> {user.city}</p>
      <p><strong>Age:</strong> {user.age}</p>
    </div>
  );
}
