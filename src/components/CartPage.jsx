import React from 'react';

const CartPage = ({ cart, setCart, removeFromCart }) => {
  // Жалпы соманы есептеу
  const totalPrice = cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);

  return (
    <div className="cart-page">
      <div className="container">
        <h1>Сіздің себетіңіз</h1>
        
        {cart.length === 0 ? (
          <div className="empty-cart">
            <p>Себет әзірге бос...</p>
          </div>
        ) : (
          <div className="cart-content">
            <div className="cart-items">
              {cart.map((item) => (
                <div key={item.id} className="cart-card">
                  <img src={item.imageUrl} alt={item.title} className="cart-img" />
                  <div className="cart-info">
                    <h3>{item.title}</h3>
                    <p className="cart-price">{item.price} тг</p>
                    <p>Саны: {item.quantity || 1}</p>
                  </div>
                  <button 
                    onClick={() => removeFromCart(item.id)} 
                    className="remove-item-btn"
                  >
                    Өшіру
                  </button>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <h3>Жиынтық:</h3>
              <div className="summary-row">
                <span>Тауар саны:</span>
                <span>{cart.length} дана</span>
              </div>
              <div className="summary-row total">
                <span>Жалпы сома:</span>
                <span>{totalPrice} тг</span>
              </div>
              <button className="checkout-btn">Тапсырыс беру</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;