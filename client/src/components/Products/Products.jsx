import React, { useState, useEffect } from "react";
import { Grid, Container } from "@mui/material";
import Product from "../Product/Product";
import Banner from "../Banner/Banner";
import Spinner from "../Spinner";
import fetchData from "../../data/fetchData";
import "./Products.css";

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchData("products").then((data) => setProducts(data));
  }, []);

  if (!products.length) return <Spinner />;
  return (
    <div>
      <Banner />
      <Container id="products">
        <Grid container spacing={4}>
          {products.map((product) => (
            <Grid key={product.id} item xs={12} sm={6} md={4}>
              <Product product={product} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default Products;
