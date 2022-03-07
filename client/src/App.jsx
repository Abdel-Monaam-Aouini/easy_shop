import React from "react";
import { CssBaseline } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Products from "./components/Products/Products";
import Basket from "./components/Basket/Basket";
import Checkout from "./components/Checkout/Checkout";

const App = () => {
  return (
    <>
      <CssBaseline />
      <NavBar />
      <BrowserRouter>
        <Routes>
          <Route exact path="/" component={Products} />
          <Route exact path="/basket" component={Basket} />
          <Route exact path="/checkout" component={Checkout} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  );
};

export default App;
