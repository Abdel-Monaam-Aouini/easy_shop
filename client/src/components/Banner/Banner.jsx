import { Container, Typography, Button, Grid } from "@mui/material";
import logo from "./Canon-Kit.png";
import "./Banner.css";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div className="banner">
      <Container>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6}>
            <Typography className="title" variant="h1">
              Welcome to Easy Shop Monaam
            </Typography>
            <Button className="shopping-button">
              <Link className="link_href" to="/products">Shopping</Link>
            </Button>
          </Grid>
          <Grid className="brand" item sm={6}>
            <img src={logo} alt="Brand-tv" />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Banner;
