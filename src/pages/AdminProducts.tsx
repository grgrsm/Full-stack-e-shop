import { useEffect, useState } from "react";
import { getProducts } from "../api/products";
import type { Product } from "../types/ProductType";

export const AdminProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getProducts().then(setProducts).catch(() => setProducts([]));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Управление товарами</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="border rounded-lg shadow p-4 flex flex-col"
          >
            <img
              src={product.imageUrl ?? product.image} // 👈 как на клиенте
              alt={product.title}
              className="w-full h-48 object-cover rounded mb-4"
            />
            <h2 className="text-lg font-semibold mb-2">{product.title}</h2>
            <p className="text-sm text-gray-600">Тип: {product.type}</p>
            <p className="text-sm text-gray-600">Год: {product.year}</p>
            <p className="text-sm text-gray-600">Цвет: {product.color}</p>
            <p className="text-green-600 font-bold mt-2">{product.price}$</p>
          </div>
        ))}
      </div>
    </div>
  );
};
