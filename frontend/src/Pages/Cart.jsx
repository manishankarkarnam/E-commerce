import React, { useContext, useState } from 'react';
import { ShopContext } from '../Context/ShopContext';
import { useNavigate } from 'react-router-dom';
import './CSS/Cart.css';

const Cart = () => {
  const {
    cartItems,
    removeFromCart,
    all_product,
    addToCart,
    getTotalCartAmount,
  } = useContext(ShopContext);
  const navigate = useNavigate();

  const [shippingMethod, setShippingMethod] = useState('standard');
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [promoApplied, setPromoApplied] = useState(false);

  const shippingFees = {
    standard: 5.99,
    express: 14.99,
    overnight: 24.99,
  };

  const subtotal = getTotalCartAmount();
  const shippingFee = shippingFees[shippingMethod];
  const total = subtotal + shippingFee - discount;

  const handleApplyPromo = () => {
    // Example promo codes
    const promoCodes = {
      SAVE10: 10,
      SAVE20: 20,
      FREESHIP: shippingFee, // Assuming FREESHIP removes shipping fee
    };

    const upperCaseCode = promoCode.trim().toUpperCase();

    if (promoCodes.hasOwnProperty(upperCaseCode)) {
      const promoValue = promoCodes[upperCaseCode];
      if (upperCaseCode === 'FREESHIP') {
        setDiscount(shippingFee);
      } else {
        setDiscount(promoValue);
      }
      setPromoApplied(true);
      alert(`Promo code "${upperCaseCode}" applied!`);
    } else {
      alert('Invalid promo code');
    }
  };

  const handleRemovePromo = () => {
    setPromoCode('');
    setDiscount(0);
    setPromoApplied(false);
  };

  return (
    <div className="cart">
      {Object.keys(cartItems).length === 0 ? (
        <div className="cart-empty">
          <h2>Your Cart is Empty</h2>
          <button onClick={() => navigate('/shop')}>Continue Shopping</button>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {Object.entries(cartItems).map(([key, item]) => {
              const [productId, size] = key.split('-');
              const product = all_product.find(
                (p) => p.id === Number(productId)
              );

              if (product && item.quantity > 0) {
                return (
                  <div key={key} className="cart-item">
                    <img src={product.image} alt={product.name} />
                    <div className="cart-item-details">
                      <h3>{product.name}</h3>
                      <div className="cart-item-size">Size: {item.size}</div>
                      <div className="cart-item-price">
                        Price: ${product.new_price.toFixed(2)}
                      </div>
                    </div>
                    <div className="cart-item-quantity">
                      <button
                        onClick={() => removeFromCart(product.id, item.size)}
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() => addToCart(product.id, item.size)}
                      >
                        +
                      </button>
                    </div>
                    <div className="cart-item-total">
                      ${(product.new_price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                );
              }
              return null;
            })}
          </div>
          <div className="cart-summary">
            <h2>Cart Summary</h2>

            <div className="shipping-options">
              <h3>Shipping Method</h3>
              <div className="shipping-option">
                <input
                  type="radio"
                  id="standard"
                  name="shipping"
                  value="standard"
                  checked={shippingMethod === 'standard'}
                  onChange={(e) => setShippingMethod(e.target.value)}
                />
                <label htmlFor="standard">Standard Shipping (3-5 days)</label>
                <span>${shippingFees.standard.toFixed(2)}</span>
              </div>
              <div className="shipping-option">
                <input
                  type="radio"
                  id="express"
                  name="shipping"
                  value="express"
                  checked={shippingMethod === 'express'}
                  onChange={(e) => setShippingMethod(e.target.value)}
                />
                <label htmlFor="express">Express Shipping (2-3 days)</label>
                <span>${shippingFees.express.toFixed(2)}</span>
              </div>
              <div className="shipping-option">
                <input
                  type="radio"
                  id="overnight"
                  name="shipping"
                  value="overnight"
                  checked={shippingMethod === 'overnight'}
                  onChange={(e) => setShippingMethod(e.target.value)}
                />
                <label htmlFor="overnight">Overnight Shipping</label>
                <span>${shippingFees.overnight.toFixed(2)}</span>
              </div>
            </div>

            <div className="promo-code">
              <h3>Promo Code</h3>
              <div className="promo-code-input">
                <input
                  type="text"
                  placeholder="Enter promo code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  disabled={promoApplied}
                />
                {!promoApplied ? (
                  <button
                    onClick={handleApplyPromo}
                    disabled={!promoCode.trim()}
                  >
                    Apply
                  </button>
                ) : (
                  <button
                    onClick={handleRemovePromo}
                    className="remove-promo"
                  >
                    Remove
                  </button>
                )}
              </div>
              {promoApplied && (
                <div className="discount-applied">
                  Promo code applied! You saved $
                  {discount === shippingFee ? shippingFee.toFixed(2) : discount}
                </div>
              )}
            </div>

            <div className="cart-totals">
              <div className="cart-total">
                <span>Subtotal:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="cart-total">
                <span>Shipping:</span>
                <span>${shippingFee.toFixed(2)}</span>
              </div>
              {discount > 0 && (
                <div className="cart-total">
                  <span>Discount:</span>
                  <span>-${discount.toFixed(2)}</span>
                </div>
              )}
              <div className="cart-total total">
                <span><strong>Total:</strong></span>
                <span><strong>${total.toFixed(2)}</strong></span>
              </div>
            </div>

            <button className="checkout-button" onClick={() => navigate('/checkout')}>
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;