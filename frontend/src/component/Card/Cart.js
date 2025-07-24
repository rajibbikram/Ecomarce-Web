import React, { Fragment } from "react";
import "./Cart.css";
import CartItemCard from "./CartItemCard";
import { useSelector, useDispatch } from "react-redux";
import { addItemToCart, removeItemsFromCart } from "../../actions/cardAction";
import { useNavigate, Link } from "react-router-dom";
import MetaData from "../layout/MetaData";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);

  const increaseQuantity = (id, quantity, stock) => {
    if (quantity >= stock) return;
    dispatch(addItemToCart(id, quantity + 1));
  };

  const decreaseQuantity = (id, quantity) => {
    if (quantity <= 1) return;
    dispatch(addItemToCart(id, quantity - 1));
  };

  const checkoutHandler = () => {
    navigate("/shipping");
  };

  const grossTotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  if (cartItems.length === 0) {
    return (
      <div className="emptyCart">
        <p>Your cart is empty</p>
        <Link to="/products">View Products</Link>
      </div>
    );
  }

  return (
    <Fragment>
      <MetaData title="Your Cart" />
      <div className="cartPage">
        <div className="cartHeader">
          <p>Product</p>
          <p>Quantity</p>
          <p>Subtotal</p>
        </div>

        {cartItems.map(item => (
          <div className="cartContainer" key={item.product}>
            <CartItemCard
              item={item}
              deleteCartItems={() => dispatch(removeItemsFromCart(item.product))}
            />
            <div className="cartInput">
              <button onClick={() => decreaseQuantity(item.product, item.quantity)}>-</button>
              <input type="number" readOnly value={item.quantity} />
              <button onClick={() => increaseQuantity(item.product, item.quantity, item.stock)}>+</button>
            </div>
            <p className="cartSubtotal">Rs: {item.price * item.quantity}</p>
          </div>
        ))}

        <div className="cartGrossTotal">
          <div className="cartGrossBox">
            <p className="paa"><b>Gross Total:</b></p>
            <p>Rs: {grossTotal}</p>
          </div>
          <div className="checkoutBtn">
            <button className="bton" onClick={checkoutHandler}>Check Out</button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Cart;
