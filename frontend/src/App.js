import React from 'react';
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

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  React.useEffect(() => {
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
        <Route path="/login" element={<LoginSignUp />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
