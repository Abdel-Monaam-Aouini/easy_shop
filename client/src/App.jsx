import React from "react";
import { RecoilRoot } from "recoil";
import { Container, CssBaseline } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Products from "./components/Products/Products";
import Basket from "./components/Basket/Basket";
import Checkout from "./components/Checkout/Checkout";
import Banner from "./components/Banner/Banner";

const App = () => {
  return (
    <RecoilRoot>
      <Container>
        <CssBaseline />
        <NavBar />
        <Routes>
          <Route exact path="/" element={<Banner />} />
          <Route exact path="/products" element={<Products />} />
          <Route exact path="/basket" element={<Basket />} />
          <Route exact path="/checkout" element={<Checkout />} />
        </Routes>
        <Footer />
      </Container>
    </RecoilRoot>
  );
};

export default App;
