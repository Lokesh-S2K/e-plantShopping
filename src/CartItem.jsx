import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity, clearCart } from './CartSlice'; 
import './CartItem.css';


const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();


  const calculateTotalAmount = () => {
    return cart.reduce((total, item) => {
      const costNum = parseFloat(item.cost.replace('$', '')) || 0;
      return total + costNum * item.quantity;
    }, 0).toFixed(2);
  };


  const calculateTotalCost = (item) => {
    const costNum = parseFloat(item.cost.replace('$', '')) || 0;
    return (costNum * item.quantity).toFixed(2);
  };


  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };


  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    }
  };


  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };


const handleContinueShopping = (e) => {
  e.preventDefault();
  onContinueShopping();
};

const handleCheckout = () => {
  const total = calculateTotalAmount();

  if (cart.length === 0) {
    alert("🛒 Your cart is empty. Please add something before checking out.");
    return;
  }

  const orderSummary = cart.map(item => `${item.name} x ${item.quantity}`).join('\n');

  alert(`🎉 Thank you for your order!\n\n🧾 Order Summary:\n${orderSummary}\n\n💰 Total: $${total}`);

  dispatch(clearCart());
};


  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.length === 0 ? (
          <p style={{ color: 'gray' }}>Your cart is empty. 🪴</p>
        ) : (
          cart.map(item => (
            <div className="cart-item" key={item.name}>
              <img className="cart-item-image" src={item.image} alt={item.name} />
              <div className="cart-item-details">
                <div className="cart-item-name">{item.name}</div>
                <div className="cart-item-cost">{item.cost}</div>
                <div className="cart-item-quantity">
                  <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                  <span className="cart-item-quantity-value">{item.quantity}</span>
                  <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
                </div>
                <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
                <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="continue_shopping_btn">
        <button className="get-started-button1" onClick={handleCheckout}>Checkout</button>

      </div>
    </div>
  );
};

export default CartItem;
