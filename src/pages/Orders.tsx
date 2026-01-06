"use client";
import { useEffect, useState } from "react";
import { getToken } from "../api/auth";
import { API_URL } from "../api/config";
import { Link } from "react-router-dom";

export default function Orders() {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch(`${API_URL}/orders/me`, {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        });
        if (!res.ok) throw new Error("Ошибка при получении заказов");
        const data = await res.json();
        setOrders(data);
        console.log("📦 Получены заказы:", data);
      } catch (err) {
        console.error("Ошибка:", err);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Мои заказы</h1>
      {orders.length === 0 ? (
        <p className="text-gray-500">У вас пока нет заказов</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="border p-5 rounded-xl shadow-md bg-white"
            >
              <div className="flex justify-between items-center mb-2">
                <p className="font-semibold text-lg">Заказ №{order.id}</p>
                <p className="text-sm text-gray-500">
                  {new Date(order.createdAt).toLocaleString()}
                </p>
              </div>
              <p className="text-gray-700 mb-2">Сумма: {order.total} $</p>

              <Link
                to={`/orders/${order.id}`}
                className="text-blue-500 hover:underline text-sm"
              >
                Подробнее →
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
