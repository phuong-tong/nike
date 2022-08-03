import React, { useState } from "react";
import { Container, Drawer, Grid, Hidden } from "@mui/material";
import { makeStyles } from "@mui/styles";

import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as action from "./module/action/action";
import CartBag from "./cartComponent/cartBag";
import CartSummary from "./cartComponent/cartSummary";
import Paypal from "../Paypal/paypal";

const useStyles = makeStyles((theme) => ({
  Container: {
    margin: "40px 0",
  },
  Cart: {
    width: 1100,

    margin: "0px auto",
    fontSize: 16,
  },
  CloseIcon: {
    float: "right",
    color: "grey",
    cursor: "pointer",
  },
  PromoCode: {
    padding: "8px 0 30px 16px",
    fontSize: 12,
  },
  PromoCodeTitle: {
    fontSize: 14,
  },
  Bag: {
    fontSize: 22,
  },
  BagMobile: {
    textAlign: "center",
    marginBottom: 40,
    lineHeight: 1.75,
  },
  NumberItems: {
    color: "#757575",
  },
  CheckoutButton: {
    width: "100%",
    color: "white",
    backgroundColor: "black",
    padding: "18px 24px",
    outline: 0,
    borderRadius: 30,
    border: "none",
    cursor: "pointer",
    fontSize: 16,
    lineHeight: 1.75,
  },
  CheckoutMobileContainer: {
    width: "100%",
    padding: "16px 0px",
    position: "fixed",
    bottom: 0,
    left: 0,
    backgroundColor: "white",
  },
  MoreOptionsContainer: {
    position: "fixed",
    width: "100%",
    bottom: 0,
    backgroundColor: "white",
    zIndex: 2,
    display: "none",
  },
  MoreOptionsButton: {
    width: "100%",
    color: "white",
    backgroundColor: "black",
    padding: "18px 24px",
    outline: 0,
    borderRadius: 30,
    border: "none",
    cursor: "pointer",
    fontSize: 16,
    marginBottom: 8,
    lineHeight: 1.75,
  },
  MoreOptionsCancel: {
    width: "inherit",
    color: "black",
    backgroundColor: "white",
    padding: "18px 24px",
    outline: 0,
    borderRadius: 30,
    border: "1px #cccccc solid",
    cursor: "pointer",
    fontSize: 16,
    lineHeight: 1.75,
  },
  MemberCheckoutContainer: {
    padding: 24,
  },
}));

const Cart = (props) => {
  const classes = useStyles();
  const [PromoCode, setPromoCode] = useState(true);
  const products = useSelector((state) => state.reducerCart.products);
  const cancelMoreOptions = () => {
    //let moreOption = doc
  };
  const sumMoney = products.reduce((sum, item) => {
    return sum + item.quantity * item.price;
  }, 0);

  const { window } = props;
  const container =
    window !== undefined ? () => window().document.body : undefined;
  const [checkout, setCheckout] = React.useState(false);
  const dispatch = useDispatch();
  const history = useNavigate();
  const checkOut = () => {
    //đợi đến khi làm chức năng log in
    if (!JSON.parse(localStorage.getItem("user"))) {
      alert("Please sign in before checkout");
    } else {
      alert("Please buy product before checkout");
    }
  };
  const transactionSuccess = (data) => {
    alert("payment success");
    const userLocal = JSON.parse(localStorage.getItem("user"));
    const { token } = userLocal;
    const object = {
      products: products,
      isPayed: data.paid,
      description: "paypal",
    };
    dispatch(action.postAPICart(object, token, history));
  };
  const transactionError = (data) => {
    setTimeout(() => {
      alert("error");
    }, 2000);
  };
  const transactionCancel = (data) => {
    console.log("error", data);
  };
  const convertVNDtoUSD = () => {
    return (sumMoney / 23000).toFixed(2);
  };
  const transactionLive = (data) => {
    for (const item of products) {
      delete item.sizes;
      delete item.message;
    }
    const userLocal = JSON.parse(localStorage.getItem("user"));
    const { token } = userLocal;
    const object = {
      products: products,
      isPayed: false,
      description: "Payment on delivery",
    };
    dispatch(action.postAPICart(object, token, history));
  };

  return (
    <div className={classes.Container}>
      <Container maxWidth="xl">
        <div className={classes.Cart}>
          <Hidden mdUp>
            <div className={classes.BagMobile}>
              <div className={classes.Bag}> Bag </div>
              <span className={classes.NumberItems}> Bag</span>
            </div>
          </Hidden>
          <Grid container spacing={2}>
            <Grid item md={8} xs={12}>
              {PromoCode && (
                <div className={classes.PromoCode}>
                  <div className={classes.PromoCodeTitle}>
                    Have a promo code
                  </div>
                  <div>
                    If you have a promo code you will be able to apply it on the
                    payment page during checkout.
                  </div>
                </div>
              )}
              <Hidden smDown>
                <div className={classes.Bag}>Bag</div>
              </Hidden>
              {/* Bag */}
              <CartBag />
            </Grid>

            <Grid item md={4} xs={12}>
              {/* Summary */}
              <CartSummary />
            </Grid>
          </Grid>

          {/* cart Favorite */}
        </div>
      </Container>

      {/* checkout mobile */}
      <Hidden mdUp>
        <div className={classes.CheckoutMobileContainer}>
          <div style={{ margin: "0 12px" }}>
            <button
              onClick={() => checkOut()}
              className={classes.CheckoutButton}
            >
              Go to checkout
            </button>
          </div>
        </div>
        <Drawer
          container={container}
          variant="temporary"
          anchor="bottom"
          open={checkout ? true : false}
          onClose={() => {
            setCheckout(false);
          }}
          ModalProps={{ keepMounted: true }}
        >
          <div className={classes.MemberCheckoutContainer}>
            {/* Paypal */}
            <Paypal
              sum={convertVNDtoUSD()}
              transactionSuccess={transactionSuccess}
              transactionCancel={transactionCancel}
              transactionError={transactionError}
            />
            <button
              onClick={transactionLive}
              className={classes.MoreOptionsButton}
            >
              Member Checkout
            </button>
          </div>
        </Drawer>
      </Hidden>

      {/* more options */}
    </div>
  );
};

export default Cart;
