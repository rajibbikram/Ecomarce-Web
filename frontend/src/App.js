import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from './component/layout/footer/footer.js';
import Header from './component/layout/header/header.js';
import Home from './component/home/home.js';
import './App.css';
import ProductDetails from "./component/productDetails/productDetails.js";


function App() {
  return (
    <Router>
      <Header />
      
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/product/:id' element={<ProductDetails />} />
        
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
