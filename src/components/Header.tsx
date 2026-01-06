import { Navbar } from "./Navbar";
import shoppingCart from "../assets/img/shopping-cart.png";
import { useCart } from "../context/CartContext"; 
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const Header = () => {
  const { cartItems, increaseQuantity, decreaseQuantity, removeFromCart } = useCart();
  const [open, setOpen] = useState(false);
  const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const { userName } = useAuth();

  return (
    <div className="header">
      <div className="header-inner flex justify-between items-center px-5 py-2">
        <div className="logo h-[56px] flex items-center">
<<<<<<< HEAD
        <Link
          to="/"
          className=" text-black font-semibold text-lg px-6 py-3 rounded pointer"
        >
          Shop
        </Link>
=======
          <span className="font-bold text-xl">Shop</span>
>>>>>>> b7f7830cb44cfb4bba425c4b0b2c5a405505a955
        </div>

        <nav className="navbar w-[300px]">
          <Navbar />
        </nav>
         {userName && (
        <Link
          to="/orders"
          className="inline-block bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600"
        >
          Мои заказы
        </Link>
      )}
        <div className="relative">
          <button
            className="relative"
            onClick={() => setOpen((prev) => !prev)}
          >
            <img
              src={shoppingCart}
              alt="shopping-cart"
              className="w-[30px] h-[26px]"
            />
            {totalCount > 0 && (
              <span className="absolute top-2 right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {totalCount}
              </span>
            )}
          </button>

          {open && (
            <div className="absolute right-0 mt-2 w-[320px] bg-white shadow-lg rounded-lg p-4 z-50">
              <h3 className="font-semibold text-lg mb-3">Корзина</h3>
              {cartItems.length === 0 ? (
                <p className="text-gray-500">Корзина пуста</p>
              ) : (
                <ul className="space-y-3">
                  {cartItems.map((item, index) => (
                    <li
                      key={item.id}
                      className="flex justify-between items-center text-sm border-b pb-2"
                    >
                      <div>
                        <p className="font-medium">{index + 1}. {item.title}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <button
                            onClick={() => decreaseQuantity(item.id)}
                            className="px-2 py-1 bg-gray-200 rounded"
                          >
                            -
                          </button>
                          <span>{item.quantity}</span>
                          <button
                            onClick={() => increaseQuantity(item.id)}
                            className="px-2 py-1 bg-gray-200 rounded"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:underline ml-3"
                      >
                        ✕
                      </button>
                    </li>
                  ))}
                </ul>
              )}
              {cartItems.length > 0 && (
                <div className="mt-4 text-right">
                  <Link
                    to="/checkout"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    onClick={() => setOpen(false)}
                  >
                    Оплатить
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};