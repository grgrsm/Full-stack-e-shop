import { Navigate, Link } from "react-router-dom";
import { getUserRole } from "../api/auth";

export const AdminPanel = () => {
  const role = getUserRole();

  if (role !== "ADMIN") {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Админ-панель</h1>

      <div className="grid grid-cols-2 gap-6">
        <Link
          to="/admin/orders"
          className="p-6 bg-blue-100 rounded-xl shadow hover:bg-blue-200 transition"
        >
          📦 Управление заказами
        </Link>
        <Link
          to="/admin/users"
          className="p-6 bg-green-100 rounded-xl shadow hover:bg-green-200 transition"
        >
          👥 Управление пользователями
        </Link>
        <Link
          to="/admin/products"
          className="p-6 bg-green-100 rounded-xl shadow hover:bg-green-200 transition"
        >
          📦 Управление продуктов
        </Link>
      </div>
    </div>
  );
};
