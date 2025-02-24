import { useContext } from "react";

import { StoreContext } from "../../context/StoreContext";

import "./Cart.css";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItems, food_list, removeFromCart, getCartTotal } =
    useContext(StoreContext);

  const navigate = useNavigate();

  return (
    <div className="cart">
      <div className="cart-items">
        {Object.keys(cartItems).length !== 0 ? (
          <>
            <div className="cart-items-title">
              <p>Items</p>
              <p>Title</p>
              <p>Price</p>
              <p>Quantity</p>
              <p>Total</p>
              <p>Remove</p>
            </div>
            <br />
            <hr />
            {food_list.map((item, index) => {
              if (cartItems[item._id] > 0) {
                return (
                  <div key={index}>
                    <div className="cart-items-title cart-items-item">
                      <img src={item.image} alt="" />
                      <p>{item.name}</p>
                      <p>${item.price}</p>
                      <p>{cartItems[item._id]}</p>
                      <p>${item.price * cartItems[item._id]}</p>
                      <p
                        className="cross"
                        onClick={() => removeFromCart(item._id)}
                      >
                        X
                      </p>
                    </div>
                    <hr />
                  </div>
                );
              }
              return null;
            })}
          </>
        ) : (
          <div className="empty-cart">Your cart is empty</div>
        )}
      </div>

      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getCartTotal()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery fee</p>
              <p>${getCartTotal() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>${getCartTotal() != 0 ? getCartTotal() + 2 : 0}</b>
            </div>
          </div>
          <button onClick={() => navigate("/order")}>
            Proceed to checkout
          </button>
        </div>
        <div className="cart-promocode">
          <div>
            <p>If you have a promo code, Enter it here</p>
            <p className="cart-promocode-input">
              <input type="text" placeholder="promo code" />
              <button>Submit</button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
