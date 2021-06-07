import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Fab from "@material-ui/core/Fab";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";
import { ShoppingCart } from "@material-ui/icons";
import api from "./api";
import CheckoutDialog from "./Checkout";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: "50px",
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
    maxWidth: 600,
  },
  image: {
    width: 128,
    height: 128,
    background: "gray",
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  },
}));

export default function Cart() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [carts, setCarts] = React.useState(JSON.parse(localStorage.getItem("carts")));
  console.log("carts", carts);

  const getAllPrice = () => {
    let sum = 0;
    carts.forEach((cart) => (sum += cart.price));
    return sum;
  };

  const handleClick = () => {
    api.setProductDetails("USD", getAllPrice() * 100)
    .then(res =>  console.log(res));
    setOpen(true);
    
  };

  return (
    <Container>
      <Grid container spacing={2} className={classes.root} direction="column">
        <Grid item container alignItems="center" style={{ width: "600px", margin: "auto" }}>
          <Grid item lg>
            <Typography variant="h5" component="h5" style={{ float: "left" }}>
              All Price:{" "}
              <strong style={{ color: "red" }}>$ {getAllPrice()} </strong>
            </Typography>
          </Grid>
          <Grid item lg>
            <Fab
              color="primary"
              variant="extended"
              style={{ float: "right", margin: "5px 0px" }}
              onClick={handleClick}
            >
              <ShoppingCart />
              Pay
            </Fab>
          </Grid>
        </Grid>
        {carts.map((cart, index) => {
          return (
            <Grid item key={index}>
              <Paper className={classes.paper}>
                <Grid container spacing={2}>
                  <Grid item>
                    <ButtonBase className={classes.image}>
                      <img
                        className={classes.img}
                        alt="complex"
                        src={`${process.env.PUBLIC_URL}/assets/products/${cart.image}`}
                      />
                    </ButtonBase>
                  </Grid>
                  <Grid item xs={12} sm container>
                    <Grid item xs container direction="column" spacing={2}>
                      <Grid item xs>
                        <Typography gutterBottom variant="subtitle1">
                          {cart.title}
                        </Typography>
                        <Typography variant="body2" gutterBottom>
                          {cart.discription}
                        </Typography>
                        {/* <Typography variant="body2" color="textSecondary">
                          ID: 1030114
                        </Typography> */}
                      </Grid>
                      <Grid item>
                        {/* <Typography variant="body2" style={{ cursor: "pointer" }}>
                      Remove
                    </Typography> */}
                      </Grid>
                    </Grid>
                    <Grid item>
                      <Typography variant="subtitle1" style={{ color: "red" }}>
                        $ {cart.price}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          );
        })}
        <Grid style={{margin:'auto'}}>
            <Button variant="contained" color="primary" href="/product">Go to Product Page</Button> 
        </Grid>
      </Grid>
      <CheckoutDialog open={open} setOpen={setOpen} />
    </Container>
  );
}
