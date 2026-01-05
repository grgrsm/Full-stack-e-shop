// src/App.tsx
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Catalog } from "./pages/Catalog";
import { Header } from "./components/Header";
import { NavbarRegistration } from "./components/NavbarRegistration";
import { Slider } from "./components/Slider";
import { Goods } from "./components/Goods";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { NewGoods } from "./components/NewGoods";
import { ProductPage } from "./components/ProductPage";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import  Orders  from "./pages/Orders";
import { OrderDetails } from "./pages/OrderDetails";
import { getProducts } from "./api/products";
import type { Product } from "./types/ProductType";
import { CartProvider } from "./context/CartContext";
import { Checkout } from "./pages/Checkout";

function HomePage() {
  const { userName } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getProducts()
      .then((data: Product[]) => setProducts(data))
      .catch((err) => {
        console.error("Failed to load products:", err);
        setProducts([]); // fallback
      });
  }, []);

  return (
    <>
      <NavbarRegistration />
      <Header />

      {/* <div className="p-4 text-center">
        {userName ? (
          <h2 className="text-xl font-bold">Привет, {userName}! 👋</h2>
        ) : (
          <h2 className="text-xl font-bold">Добро пожаловать, гость!</h2>
        )}
      </div> */}
     {userName ? (
  console.log(userName)
) : (
  console.log("no user logged in")
)}


      {/* Slider: первые 5 товаров */}
      <Slider autoSlide autoSlideInterval={5000}>
        {products.slice(0, 5).map((p, index) => (
          <img
            key={`slides-${p.id ?? index}`}
            src={p.imageUrl ?? p.image}
            className="w-full h-full object-center rounded-2xl max-h-[700px] object-contain"
            alt={p.title}
          />
        ))}
      </Slider>

      {/* Goods: все товары */}
      <Goods>
        {products.map((item, index) => (
          <div
            key={`goods-${item.id ?? index}`}
            className={'relative w-full h-full max-w-[500px] max-h-[600px]'}
          >
            <img
              src={item.imageUrl ?? item.image}
              alt={item.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-[60px] left-[30px] text-white text-lg font-semibold bg-black/60 px-3 py-1 rounded">
              {item.title}
            </div>
            <Link
              to={`/product/${item.id}`}
              className="absolute bottom-[20px] left-[30px] px-4 py-2 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
            >
              Подробнее
            </Link>
          </div>
        ))}
      </Goods>

      {/* NewGoods: последние 4 */}
      <NewGoods>
        {products.slice(-4).map((item, index) => (
          <div
            key={`goods-${item.id ?? index}`}
            className="relative w-full h-full max-w-[400px] p-2"
          >
          <img
            src={item.imageUrl ?? item.image}
            alt={item.title}
            className="w-full h-full object-cover rounded-xl"
          />
          <div className="absolute bottom-[60px] left-[30px] text-white text-lg font-semibold bg-black/60 px-3 py-1 rounded">
            {item.title}
          </div>
          <Link
            to={`/product/${item.id}`}
            className="absolute bottom-[20px] left-[30px] px-4 py-2 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
          >
            Подробнее
          </Link>
        </div>

        ))}
      </NewGoods>
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <CartProvider>
          <Router>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/catalog" element={<Catalog />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/product/:id" element={<ProductPage />} />
              <Route path="/checkout" element={<Checkout/> }/>
              {/* <Route path="*" element={<NotFound />} /> */}
              <Route path="/orders" element={<Orders />} />
              <Route path="/orders/:id" element={<OrderDetails />} />
            </Routes>
      </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;