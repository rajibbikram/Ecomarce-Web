import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from './component/layout/footer/footer.js';
import Header from './component/layout/header/header.js';
import Home from './component/home/home.js';
import './App.css';
import ProductDetails from "./component/productDetails/productDetails.js";
import Products from "./component/Products/products.js";
import LoginSignUp from './component/User/LoginSignUp.js';


function App() {
  return (
    <Router>
      <Header />

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
