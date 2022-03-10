import React, { useState, useEffect } from "react";
import {
  Grid,
  Container,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from "@mui/material";
import Banner from "../Banner/Banner";
import Spinner from "../Spinner";
import fetchData from "../../data/fetchData";
import { ShoppingCart } from "@mui/icons-material";
import { useRecoilState } from "recoil";
import productState from "../../state/productState";
import { find, reject } from "lodash";
import "./Products.css";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [state, setState] = useRecoilState(productState);

  useEffect(() => {
    fetchData("products").then((data) => setProducts(data));
  }, []);

  const addProduct = (product) => {
    setState((products) => [...products, product]);
  };

  const RemoveItemFromBasket = (id) => {
    const remove = reject(state, (item) => item._id === id);
    setState(remove);
  };

  if (!products.length) {
    return <Spinner />;
  }

  return (
    <Container id="products">
      <Grid container spacing={4}>
        {products.map((product) => (
          <Grid key={product._id} item xs={12} sm={6} md={4}>
            <Card className="custom-card">
              <CardActionArea>
                <CardMedia
                  component="img"
                  alt={product.name}
                  height="260"
                  className="card-image"
                  image={product.image}
                  title={product.name}
                />
                <CardContent className="content">
                  <Typography
                    className="title"
                    gutterBottom
                    variant="h5"
                    component="h2"
                  >
                    {product.name}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Typography
                  className="basket-item-price"
                  gutterBottom
                  variant="h5"
                  component="h2"
                >
                  $ {product.price}
                </Typography>
              </CardActions>
              <CardActions className="actions-content">
                <Grid container justifyContent="space-between">
                  <Grid item>
                    <Button
                      size="small"
                      className="custom-button"
                      onClick={() => {
                        addProduct(product);
                      }}
                      disabled={
                        find(state, ["_id", product._id]) ? true : false
                      }
                    >
                      <ShoppingCart /> Add to basket
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      size="small"
                      color="secondary"
                      variant="outlined"
                      onClick={() => {
                        RemoveItemFromBasket(product._id);
                      }}
                    >
                      Remove
                    </Button>
                  </Grid>
                </Grid>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Products;
