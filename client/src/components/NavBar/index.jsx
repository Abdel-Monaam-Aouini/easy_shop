import React, { useEffect, useState } from "react";
import {
  Container,
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  Avatar,
  Button,
} from "@mui/material";
import { ShoppingCart } from "@mui/icons-material";
import logo from "./icon_easy_shop.ico";
import "./style.css";
import { useRecoilValue } from "recoil";
import productState from "../../state/productState";
import { deepPurple } from "@mui/material/colors";
import { sumBy } from "lodash";
import { Link } from "react-router-dom";

function NavBar() {
  const products = useRecoilValue(productState);
  const [cost, setCost] = useState(0);

  useEffect(() => {
    setCost(sumBy(products, "price"));
  }, [products]);

  return (
    <>
      <AppBar position="fixed" className="custom-navbar">
        <Container>
          <Toolbar>
            <Link to="/" variant="h6" className="custom-title" color="inherit">
              <Avatar alt="logo" src={logo} sx={{ width: 56, height: 56 }} />
            </Link>
            <Button className="shopping-button">
              <Link className="link_href" to="/products">Shopping</Link>
            </Button>
            <div className="basket-wrapper">
              <h2>
                Total cost: <strong>$ {parseFloat(cost).toFixed(2)}</strong>
              </h2>
            </div>
            <div className="basket-wrapper">
              <IconButton aria-label="Show basket contents" color="inherit">
                <Link className="link_href" to="/basket">
                  <Badge color="secondary">
                    <ShoppingCart className="custom-basket" />
                    <Avatar sx={{ bgcolor: deepPurple[500] }}>
                      {products.length}
                    </Avatar>
                  </Badge>
                </Link>
              </IconButton>
            </div>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}

export default NavBar;
