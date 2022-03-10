import {
  Button,
  Container,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import "./Basket.css";
import { useRecoilValue } from "recoil";
import productState from "../../state/productState";

const Basket = () => {
  const products = useRecoilValue(productState);

  if (!products.length) {
    return (
      <Typography id="basket" variant="h3" component="div" gutterBottom>
        No Products Selected ...
      </Typography>
    );
  }
  return (
    <Container id="basket">
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="center">Price ($)</TableCell>
              <TableCell align="center"></TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((row) => (
              <TableRow
                key={row._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>
                  {row.name.slice(0, 40)} ...
                </TableCell>
                <TableCell align="center">{row.price}</TableCell>
                <TableCell align="center"></TableCell>
                <TableCell align="center"></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className="actions">
        <Button
          size="small"
          color="secondary"
          variant="contained"
          //onClick={handleEmptyBasket}
        >
          Empty Basket
        </Button>

        <Button
          size="small"
          variant="contained"
          component={Link}
          to="/checkout"
        >
          Checkout
        </Button>
      </div>
    </Container>
  );
};

export default Basket;
