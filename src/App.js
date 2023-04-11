import React from 'react';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Header from './components/Header';
import Home from './components/Home';
import { Toaster } from "react-hot-toast";
import Cart from './components/Cart';


export default function App() {
  return (
    <Router>
    <Header />
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/cart" element={<Cart/>}></Route>
      </Routes>
      <Toaster />
    </Router>
  )
}
