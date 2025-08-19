import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
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
import AboutPage from './component/About/AboutPage.js';
import Dashboad from './component/admin/Dashboad.js';

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

// =======================
// Layout Controller
// =======================
function AppContent({ stripeApiKey, isAuthenticated, user }) {
  const location = useLocation();

  // Hide footer on all admin routes
  const hideFooter = location.pathname.startsWith("/admin");

  return (
    <>
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
        <Route path="/admin/dashboard" element={<ProductRoute element={<Dashboad />} />} />
        <Route path="/login" element={<LoginSignUp />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/about" element={<AboutPage />} />

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

        {/* 404 Route */}
        <Route path="*" element={
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center', 
            height: '60vh',
            textAlign: 'center'
          }}>
            <h1>404 - Page Not Found</h1>
            <p>The page you're looking for doesn't exist.</p>
            <Link to="/" style={{ 
              marginTop: '20px', 
              padding: '10px 20px', 
              backgroundColor: '#007bff', 
              color: 'white', 
              textDecoration: 'none', 
              borderRadius: '5px' 
            }}>
              Go to Home
            </Link>
          </div>
        } />
      </Routes>

      {/* Footer hidden only for admin pages */}
      {!hideFooter && <Footer />}
    </>
  );
}

// =======================
// Main App
// =======================
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
        <AppContent
          stripeApiKey={stripeApiKey}
          isAuthenticated={isAuthenticated}
          user={user}
        />
      </Router>
    </AlertProvider>
  );
}

export default App;
