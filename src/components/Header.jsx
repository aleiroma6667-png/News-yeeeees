import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from './AuthContext.jsx'; 
import menuIcon from '../assets/images/menu-btn (3).svg'; 

const Header = ({ cartCount }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [categories, setCategories] = useState([]); // Категорияларды сақтау үшін
  const { user, logout } = useAuth();

  // Мәзір ашылғанда категорияларды Mokky-ден жүктеу
  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await axios.get('https://621a91c96fd2860b.mokky.dev/categories');
        setCategories(response.data);
      } catch (error) {
        console.error("Категорияларды жүктеу қатесі:", error);
      }
    }
    fetchCategories();
  }, []);

  return (
    <>
      <header className="header">
        <div className="header-left">
          <div className="menu-container">
            <img 
              src={menuIcon} 
              alt="menu" 
              className="menu-btn-img" 
              onClick={() => setIsMenuOpen(!isMenuOpen)} 
            />
            
            {/* Динамикалық Dropdown мәзір */}
            {isMenuOpen && (
              <div className="dropdown-menu">
                <Link to="/" onClick={() => setIsMenuOpen(false)}>Басты бет</Link>
                <hr />
                {categories.map((cat) => (
                  <Link 
                    key={cat.id} 
                    to={`/?category=${cat.slug || cat.name}`} 
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link to="/" className="logo">
            <h1>Новости</h1>
          </Link>
        </div>

        <nav className="nav-menu">
          <Link to="/" className="nav-item">ALL</Link>
          
          {user ? (
            <div className="user-profile">
              <span className="nav-item username">{user.fullName || user.email}</span>
              <button onClick={logout} className="logout-btn">ШЫҒУ</button>
            </div>
          ) : (
            <Link to="/register" className="nav-item">ТІРКЕЛУ</Link>
          )}

          <Link to="/cart" className="nav-cart-btn">
            КОРЗИНА ({cartCount})
          </Link>
        </nav>
      </header>
    </>
  );
};

export default Header;