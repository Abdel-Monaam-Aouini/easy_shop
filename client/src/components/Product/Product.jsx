import { ShoppingCart } from "@mui/icons-material";
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import "./Product.css";


const Product = ({ product }) => {
  return (
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
          {product.price}
        </Typography>
      </CardActions>
      <CardActions className="actions-content">
        <Button
          size="large"
          className="custom-button"
          // onClick={() => {
          //   addProduct(product.id, 1);
          // }}
        >
          <ShoppingCart /> Add to basket
        </Button>
        <>
          <Button
            size="small"
            color="secondary"
            variant="outlined"
            // onClick={() => {
            //   RemoveItemFromBasket(product.id);
            // }}
          >
            Remove
          </Button>
          <>
            <Button
              size="small"
              variant="outlined"
              className="increase-product-quantity"
              // onClick={() => {
              //   updateProduct(product.id, product.quantity + 1);
              // }}
            >
              +
            </Button>
            <Typography>&nbsp;{product.quantity}&nbsp;</Typography>
            <Button
              size="small"
              color="secondary"
              variant="outlined"
              // onClick={() => {
              //   updateProduct(product.id, product.quantity - 1);
              // }}
            >
              -
            </Button>
          </>
        </>
      </CardActions>
    </Card>
  );
};
export default Product;
