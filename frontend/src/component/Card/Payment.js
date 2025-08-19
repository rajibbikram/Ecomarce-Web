import React, { Fragment, useEffect, useRef } from "react";
import CheckoutSteps from "../Card/checkOutStep";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../layout/MetaData";
import { Typography } from "@material-ui/core";
import { useAlert } from "react-alert";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";
import "./payment.css";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import EventIcon from "@mui/icons-material/Event";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import { useNavigate } from "react-router-dom";
import { createOrder, clearErrors } from "../../actions/orderAction";

const Payment = () => {
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  const payBtn = useRef(null);

  // Debug: Log the retrieved orderInfo
  console.log("Retrieved orderInfo from sessionStorage:", orderInfo);

  const stripe = useStripe();
  const elements = useElements();
  const alert = useAlert();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);
  const { shippingInfo } = useSelector((state) => state.cart);
  const { error } = useSelector((state) => state.newOrder || {});

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error, alert]);

  // Prepare order object with all required details
  const order = {
    shippingInfo,
    orderItems: orderInfo?.cartItems || [],
    itemsPrice: orderInfo?.subtotal || 0,
    taxPrice: orderInfo?.tax || 0,
    shippingPrice: orderInfo?.shippingCharges || 0,
    totalPrice: orderInfo?.totalPrice || 0,
  };

  // Debug: Log the order object being sent
  console.log("Order being created:", order);
  console.log("Cart items from orderInfo:", orderInfo?.cartItems);
  console.log("Cart items structure check:", orderInfo?.cartItems?.map(item => ({
    name: item.name,
    price: item.price,
    quantity: item.quantity,
    image: item.image,
    product: item.product
  })));

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      alert.error("Stripe has not loaded yet.");
      return;
    }

    payBtn.current.disabled = true;
    alert.info("Processing payment...");

    const paymentData = {
      amount: Math.round(Number(orderInfo?.totalPrice || 0) * 100), // amount in paise
    };

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      // Call backend to get Stripe payment intent client secret
      const { data } = await axios.post(
        "/api/v1/payment/process",
        paymentData,
        config
      );

      const client_secret = data.client_secret;

      // Confirm payment with Stripe
      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
            address: {
              line1: shippingInfo.address,
              city: shippingInfo.city,
              state: shippingInfo.state,
              postal_code: shippingInfo.pinCode,
              country: shippingInfo.country,
            },
          },
        },
      });

      if (result.error) {
        payBtn.current.disabled = false;
        alert.error(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          alert.success("Payment succeeded!");

          // Add payment info to order before dispatching
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };

          dispatch(createOrder(order));
          navigate("/success");
        } else {
          alert.error("There was an issue processing your payment.");
          payBtn.current.disabled = false;
        }
      }
    } catch (error) {
      payBtn.current.disabled = false;
      alert.error(error.response?.data?.message || error.message);
    }
  };

  const totalPrice =
    orderInfo && !isNaN(Number(orderInfo.totalPrice))
      ? Number(orderInfo.totalPrice)
      : 0;

  return (
    <Fragment>
      <MetaData title="Payment" />
      <CheckoutSteps activeStep={2} />

      <div className="paymentContainer">
        <form className="paymentForm" onSubmit={submitHandler}>
          <Typography>Card Info</Typography>

          <div>
            <CreditCardIcon />
            <CardNumberElement className="paymentInput" />
          </div>

          <div>
            <EventIcon />
            <CardExpiryElement className="paymentInput" />
          </div>

          <div>
            <VpnKeyIcon />
            <CardCvcElement className="paymentInput" />
          </div>

          <input
            type="submit"
            value={`Pay - ₹${totalPrice.toFixed(2)}`}
            ref={payBtn}
            className="paymentFormBtn"
          />
        </form>
      </div>
    </Fragment>
  );
};

export default Payment;
