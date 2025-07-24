import React, { Fragment } from "react";
import CheckoutSteps from "../Card/checkOutStep";
import { useSelector } from "react-redux";
import MetaData from "../layout/MetaData";
import "./ConfirmOrder.css";
import { Link, useNavigate } from "react-router-dom";
import { Typography } from "@material-ui/core";

const ConfirmOrder = () => {
  const navigate = useNavigate();
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);

  const address = `${shippingInfo?.address}, ${shippingInfo?.city}, ${shippingInfo?.state}, ${shippingInfo?.pinCode}, ${shippingInfo?.country}`;

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );
  const shippingCharges = subtotal > 1000 ? 0 : 200;
  const tax = subtotal * 0.18;
  const totalPrice = subtotal + shippingCharges + tax;

  const proceedToPayment = () => {
    const data = {
      subtotal: subtotal.toFixed(2),
      shippingCharges: shippingCharges.toFixed(2),
      tax: tax.toFixed(2),
      totalPrice: totalPrice.toFixed(2),
    };

    sessionStorage.setItem("orderInfo", JSON.stringify(data));
    navigate("/process/payment");
  };

  return (
    <Fragment>
      <MetaData title="Confirm Order" />
      <CheckoutSteps activeStep={1} />

      <div className="confirmOrderPage">
        <div>
          <div className="confirmShippingArea">
            <Typography>Shipping Info</Typography>
            <div className="confirmShippingAreaBox">
              <div>
                <p>Name:</p>
                <span>{user?.name}</span>
              </div>
              <div>
                <p>Phone:</p>
                <span>{shippingInfo?.phoneNo}</span>
              </div>
              <div>
                <p>Address:</p>
                <span>{address}</span>
              </div>
            </div>
          </div>

          <div className="confirmCartItems">
            <Typography>Your Cart Items:</Typography>
            <div className="confirmCartItemsContainer">
              {cartItems &&
                cartItems.map((item) => (
                  <div key={item.product}>
                    <img src={item.image} alt="Product" />
                    <Link to={`/product/${item.product}`}>{item.name}</Link>{" "}
                    <span>
                      {item.quantity} X ₹{item.price} ={" "}
                      <b>₹{(item.price * item.quantity).toFixed(2)}</b>
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>

        <div className="orderSummary">
          <Typography>Order Summary</Typography>
          <div>
            <div>
              <p>Subtotal:</p>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>

            <div>
              <p>Shipping Charges:</p>
              <span>₹{shippingCharges.toFixed(2)}</span>
            </div>

            <div>
              <p>GST:</p>
              <span>₹{tax.toFixed(2)}</span>
            </div>
          </div>

          <div className="orderSummaryTotal">
            <p>
              <b>Total:</b>
            </p>
            <span>₹{totalPrice.toFixed(2)}</span>
          </div>

          <button onClick={proceedToPayment}>Proceed to Payment</button>
        </div>
      </div>
    </Fragment>
  );
};

export default ConfirmOrder;
