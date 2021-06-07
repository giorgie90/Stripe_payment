import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./components/CheckoutForm";
import api from "./api";
const stripePromise = api.getPublicStripeKey().then(key => loadStripe(key));

export default function Checkout(props) {
  const { open, setOpen } = props;
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleClose = () => {
    setOpen(false);
  };

  const handlePurchase =() => {
      handleClose();
  }

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogContent  style={{width:'450px'}}>
          <Elements stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
          <Button onClick={handleClose} color="primary"  variant="outlined" style={{marginTop:'10px', float:'right'}}>
            Cancel
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
