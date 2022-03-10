import React from "react";
import { RecoilRoot } from "recoil";
import { Container, CssBaseline } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Products from "./components/Products/Products";
import Basket from "./components/Basket/Basket";
import Checkout from "./components/Checkout/Checkout";

const App = () => {
  return (
    <RecoilRoot>
      <Container>
        <CssBaseline />
        <NavBar />
        <Products />
        <BrowserRouter>
          <Routes>
            <Route exact path="/" component={Products} />
            <Route exact path="/basket" component={Basket} />
            <Route exact path="/checkout" component={Checkout} />
          </Routes>
        </BrowserRouter>
        <Footer />
      </Container>
    </RecoilRoot>
  );
};

export default App;
