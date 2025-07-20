import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Footer from './component/layout/footer/footer.js';
import Header from './component/layout/header/header.js';
import Home from './component/home/home.js';
import './App.css';
import ProductDetails from "./component/productDetails/productDetails.js";
import Products from "./component/Products/products.js";
import LoginSignUp from './component/User/LoginSignUp.js';
import store from "./store";
import { loadUser } from './actions/userAction.js';
import UserOptions from "./component/layout/header/UserOptions.js";
import Profile from "./component/User/Profile.js";
import ProductRoute from './component/Route/ProductRoute.js';
import UpdateProfile from './component/User/UpdateProfile.js';
import UpdatePassword from './component/User/UpdatePassword.js';
import ForgotPassword from './component/User/ForgotPassword.js'


function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
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
        <Route path="/password/forgot" element={<ForgotPassword />}  />

        <Route path="/login" element={<LoginSignUp />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
