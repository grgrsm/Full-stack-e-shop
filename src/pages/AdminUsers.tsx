"use client";
import { useEffect, useState } from "react";
import { API_URL } from "../api/config";
import { getToken } from "../api/auth";

export const AdminUsers = () => {
  const [users, setUsers] = useState<any[]>([]);

  const fetchUsers = async () => {
    const res = await fetch(`${API_URL}/users`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    const data = await res.json();
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleUpdateEmail = async (id: number) => {
    const newEmail = prompt("Введите новый email:");
    if (!newEmail) return;

    const res = await fetch(`${API_URL}/users/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify({ email: newEmail }),
    });

    if (res.ok) {
      fetchUsers();
    } else {
      console.error("Ошибка при обновлении email");
    }
  };

  // 🔹 Удаление пользователя
  const handleDeleteUser = async (id: number) => {
    if (!confirm("Удалить этого пользователя?")) return;

    const res = await fetch(`${API_URL}/users/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });

    if (res.ok) {
      setUsers((prev) => prev.filter((u) => u.id !== id));
    } else {
      console.error("Ошибка при удалении пользователя");
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Все пользователи</h1>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Роль</th>
            <th className="border px-4 py-2">Действия</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="text-center">
              <td className="border px-4 py-2">{user.id}</td>
              <td className="border px-4 py-2">{user.email}</td>
              <td className="border px-4 py-2">{user.role}</td>
              <td className="border px-4 py-2 space-x-2">
                <button
                  onClick={() => handleUpdateEmail(user.id)}
                  className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Изменить email
                </button>
                <button
                  onClick={() => handleDeleteUser(user.id)}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Удалить
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
