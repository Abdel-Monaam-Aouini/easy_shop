import React from "react";
import {
  Container,
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  Typography,
  Avatar,
} from "@mui/material";
import { ShoppingCart } from "@mui/icons-material";
import { Link, useLocation } from "react-router-dom";
import logo from "./icon_easy_shop.ico";
import "./style.css";

function NavBar() {
  return (
    <>
      <AppBar position="fixed" className="custom-navbar">
        <Container>
          <Toolbar>
            <Typography
              to="/"
              variant="h6"
              className="custom-title"
              color="inherit"
            >
              <Avatar alt="logo" src={logo} sx={{ width: 56, height: 56 }} />
            </Typography>
            <div className="basket-wrapper">
              <h2>
                Total cost: <strong>00.00</strong>
              </h2>
            </div>
            <div className="basket-wrapper">
              <IconButton
                to="/basket"
                aria-label="Show basket contents"
                color="inherit"
              >
                <Badge color="secondary">
                  <ShoppingCart className="custom-basket" />
                </Badge>
              </IconButton>
            </div>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}

export default NavBar;
