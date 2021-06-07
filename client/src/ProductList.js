import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import CameraIcon from "@material-ui/icons/PhotoCamera";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Fab from "@material-ui/core/Fab";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import { Shop, ShoppingCart } from "@material-ui/icons";
import CheckoutDialog from "./Checkout";
import api from "./api";

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
}));

const products = [
  {
    title: "Product-1",
    price: 10.14,
    discription:
      "This is a description for product-1.",
    image: "10800351.jpg"
  },
  {
    title: "Product-2",
    price: 22,
    discription:
      "This is a description for product-2.",
    image: "10810108.jpg"
  },
  {
    title: "Product-3",
    price: 14,
    discription:
      "This is a description for product-3.",
    image: "4806515160996.jpg"
    },
  {
    title: "Product-4",
    price: 55,
    discription:
      "This is a description for product-4.",
    image: "4806515161320.jpg"
    },
  {
    title: "Product-5",
    price: 99,
    discription:
      "This is a description for product-5.",
    image: "4806512880064.jpg"
    },
  {
    title: "Product-6",
    price: 5599,
    discription:
      "This is a description for product-6.",
    image: "10820613.jpg"
    },
];

const ProductList = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [carts, setCarts] = React.useState([]);

  const handleCart = (index) => {
    console.log(index);
    setCarts([...carts, index]);
  };

  const handleBuy = (index) => {
    console.log(products[index].price);
    api
      .setProductDetails("USD", products[index].price * 100)
      .then((res) => {
        console.log("setProductDetails", res);
      })
      .catch((err) => console.log(err));

    setOpen(true);
  };

  const handleClick = () => {
      localStorage.setItem('carts', JSON.stringify(products.filter((product, index) => carts.indexOf(index) > -1)));
      window.location.href = "/cart"; 
  }
  return (
    <Container className={classes.cardGrid} maxWidth="md">
      <Fab color="primary" variant="extended" style={{float:'right', margin:'5px 0px'}} onClick={handleClick}>
         <ShoppingCart />
        Go to Cart
      </Fab>
      <Grid container spacing={2}>
        {products.map((product, index) => (
          <Grid item key={index} xs={12} sm={6} md={4}>
            <Card className={classes.card}>
              <CardMedia
                className={classes.cardMedia}
                image={`${process.env.PUBLIC_URL}/assets/products/${product.image}`}
                title="Image title"
              />
              <CardContent className={classes.cardContent}>
                <Typography gutterBottom variant="h5" component="h2">
                  {product.title}
                </Typography>
                <Typography gutterBottom variant="h5" component="h4" 
                    style={{
                      color: "red",
                      fontStyle: "italic",
                      fontSize: "20px",
                    }}>
                  ${product.price}
                </Typography>
                <Typography>{product.discription}</Typography>
              </CardContent>
              <CardActions>
                <Grid container justify="center" spacing={1}>
                  <Grid item>
                    <Button
                      size="small"
                      color="primary"
                      variant="contained"
                      startIcon={<Shop />}
                      onClick={() => handleBuy(index)}
                    >
                      Buy
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      size="small"
                      color="primary"
                      variant="outlined"
                      startIcon={<ShoppingCart />}
                      onClick={() => handleCart(index)}
                      disabled={carts.indexOf(index) > -1}
                    >
                      Cart
                    </Button>
                  </Grid>
                </Grid>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      <CheckoutDialog open={open} setOpen={setOpen} />
    </Container>
  );
};

export default ProductList;
