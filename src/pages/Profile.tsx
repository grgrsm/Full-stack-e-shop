import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { getToken } from "../api/auth";
import { API_URL } from "../api/config";

export const Profile = () => {
  const { userName } = useAuth();
  const [user, setUser] = useState<any>(null);

  const fetchProfile = async () => {
    const res = await fetch(`${API_URL}/users/me/profile`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    const data = await res.json();
    setUser(data);
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (!user) {
    return <p>Загрузка профиля...</p>;
  }

  return (
    <div className="w-full h-full bg-green-200 p-6">
      <h1 className="text-2xl font-bold mb-4">Профиль</h1>
      <p><strong>Имя:</strong> {userName}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Роль:</strong> {user.role}</p>
    </div>
  );
};
