"use client";
import { useEffect, useState } from "react";
import { API_URL } from "../api/config";
import { getToken } from "../api/auth";

export const AdminOrders = () => {
  const [orders, setOrders] = useState<any[]>([]);

  const fetchOrders = async () => {
    const res = await fetch(`${API_URL}/orders/all`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    if (!res.ok) {
      console.error("Ошибка при загрузке заказов");
      return;
    }
    const data = await res.json();
    setOrders(data);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // 🔹 Удаление заказа
  const handleDelete = async (id: number) => {
    if (!confirm("Удалить этот заказ?")) return;

    const res = await fetch(`${API_URL}/orders/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });

    if (res.ok) {
      setOrders((prev) => prev.filter((o) => o.id !== id));
    } else {
      console.error("Ошибка при удалении заказа");
    }
  };

  // 🔹 Обновление заказа (например, изменить total)
 const handleUpdate = async (id: number) => {
  const newTotal = prompt("Введите новую сумму заказа:");
  if (!newTotal) return;

    const res = await fetch(`${API_URL}/orders/${id}`, {
      method: "PATCH", // <-- именно PATCH, не DELETE!
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify({ total: Number(newTotal) }),
    });

    if (res.ok) {
      fetchOrders();
    } else {
      console.error("Ошибка при обновлении заказа");
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Все заказы</h1>
      {orders.map((order) => (
        <div key={order.id} className="border p-4 rounded-lg mb-4 shadow">
          <p className="font-semibold">Заказ #{order.id}</p>
          <p>Пользователь: {order.user?.email}</p>
          <p>Сумма: {order.total} $</p>
          <p>Дата: {new Date(order.createdAt).toLocaleString()}</p>
          <ul className="mt-2 list-disc pl-5">
            {order.items.map((item: any) => (
              <li key={item.id}>
                {item.product.title} × {item.quantity} — {item.price} ₸
              </li>
            ))}
          </ul>

          <div className="mt-4 flex gap-2">
            <button
              onClick={() => handleUpdate(order.id)}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Изменить
            </button>
            <button
              onClick={() => handleDelete(order.id)}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Удалить
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
