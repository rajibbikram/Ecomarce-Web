import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from "axios";

// react-alert imports
import { transitions, positions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';

// Stripe imports
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

// Layout
import Header from './component/layout/header/header.js';
import Footer from './component/layout/footer/footer.js';
import UserOptions from "./component/layout/header/UserOptions.js";

// Pages
import Home from './component/home/home.js';
import ProductDetails from "./component/productDetails/productDetails.js";
import Products from "./component/Products/products.js";
import LoginSignUp from './component/User/LoginSignUp.js';
import Profile from "./component/User/Profile.js";
import UpdateProfile from './component/User/UpdateProfile.js';
import UpdatePassword from './component/User/UpdatePassword.js';
import ForgotPassword from './component/User/ForgotPassword.js';
import ResetPassword from './component/User/ResetPassword.js';
import Cart from './component/Card/Cart.js';
import Shipping from './component/Card/Shipping.js';
import ConfirmOrder from './component/Card/ConfirmOrder.js';
import Payment from './component/Card/Payment.js';
import OrderSuccess from './component/Card/OrderSuccess.js';
import MyOrders from './component/Order/MyOrders.js';
import OrderDetails from './component/Order/OrderDetails.js';

// Route protection
import ProductRoute from './component/Route/ProductRoute.js';

// Redux
import store from "./store";
import { loadUser } from './actions/userAction.js';

// react-alert options
const alertOptions = {
  timeout: 5000,
  position: positions.BOTTOM_CENTER,
  transition: transitions.SCALE,
};

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    try {
      const { data } = await axios.get("/api/v1/stripeapikey");
      setStripeApiKey(data.stripeApiKey);
    } catch (error) {
      console.error("Failed to load Stripe API key", error);
    }
  }

  useEffect(() => {
    store.dispatch(loadUser());
    getStripeApiKey();
  }, []);

  return (
    <AlertProvider template={AlertTemplate} {...alertOptions}>
      <Router>
        <Header />
        {isAuthenticated && <UserOptions user={user} />}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/account" element={<ProductRoute element={<Profile />} />} />
          <Route path="/me/update" element={<ProductRoute element={<UpdateProfile />} />} />
          <Route path="/password/update" element={<ProductRoute element={<UpdatePassword />} />} />
          <Route path="/password/forgot" element={<ForgotPassword />} />
          <Route path="/password/reset/:token" element={<ResetPassword />} />
          <Route path="/shipping" element={<ProductRoute element={<Shipping />} />} />
          <Route path="/order/confirm" element={<ProductRoute element={<ConfirmOrder />} />} />
          <Route path="/success" element={<ProductRoute element={<OrderSuccess />} />} />
          <Route path="/orders" element={<ProductRoute element={<MyOrders />} />} />
          <Route path="/order/:id" element={<ProductRoute element={<OrderDetails />} />} />
          <Route path="/login" element={<LoginSignUp />} />
          <Route path="/Cart" element={<Cart />} />

          {/* Stripe Payment Route */}
          {stripeApiKey && (
            <Route
              path="/process/payment"
              element={
                <ProductRoute
                  element={
                    <Elements stripe={loadStripe(stripeApiKey)}>
                      <Payment />
                    </Elements>
                  }
                />
              }
            />
          )}
        </Routes>

        <Footer />
      </Router>
    </AlertProvider>
  );
}

export default App;
