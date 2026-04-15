import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { AuthProvider } from './components/AuthContext.jsx'; 
import PostList from './components/PostList.jsx';
import CartPage from './components/CartPage.jsx'; 
import PostDetailPage from './components/PostDetailPage.jsx';
import AuthForm from './components/AuthForm.jsx';
import Header from './components/Header.jsx'; // Добавлена ссылка на Header
import './assets/style/style.css';

function App() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(savedCart);
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter(item => item.id !== id));
  };

  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="App">
          {/* Используем импортированный Header */}
          <Header cartCount={cart.reduce((total, item) => total + (item.quantity || 1), 0)} />

          <Routes>
            <Route path="/" element={<PostList />} />
            <Route path="/categories/:categoryName" element={<PostList />} />
            <Route path="/detail/:id" element={<PostDetailPage addToCart={addToCart} />} />
            <Route path="/register" element={<AuthForm />} />
            <Route 
              path="/cart" 
              element={<CartPage cart={cart} setCart={setCart} removeFromCart={removeFromCart} />} 
            />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;