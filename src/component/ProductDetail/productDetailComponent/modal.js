import React from "react";
import { makeStyles } from "@mui/styles";
import PropTypes from "prop-types";
import { Alert, Grid, Modal, Backdrop } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSpring, animated } from "react-spring";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: "white",
    border: "2px solid #000",
    boxShadow: "none",
    // padding: theme.spacing(2, 4, 3),
    height: 400,
    width: 500,
  },
  img: {
    width: 200,
    height: 200,
  },
  alert: {
    margin: "10px 0px",
  },
  iconClose: {
    cursor: "pointer",
  },
  Checkout: {
    padding: "20px 16px",
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
    marginBottom: 12,
  },
}));
const Fade = React.forwardRef(function Fade(props, ref) {
  const { in: open, children, onEnter, onExited, ...other } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter();
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited();
      }
    },
  });
  return (
    <animated.div ref={ref} style={style} {...other}>
      {children}
    </animated.div>
  );
});
Fade.propTypes = {
  children: PropTypes.element,
  in: PropTypes.bool.isRequired,
  onEnter: PropTypes.func,
  onExited: PropTypes.func,
};

const Modaltransition = ({
  open,
  handleOpen,
  handleClose,
  productDispatch,
}) => {
  const classes = useStyles();
  //điều hướng trang
  const navigate = useNavigate();

  //time to closse popup
  setTimeout(() => {
    handleClose();
  }, 10000);

  return (
    <Modal
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className={classes.modal}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{ timeout: 500 }}
    >
      <Fade in={open}>
        <div className={classes.paper}>
          <Grid container direction="row" justify="center" alignItems="center">
            <Grid item xs={11}>
              <Alert severity="success" className={classes.alert}>
                {" "}
                Added to bag
              </Alert>
            </Grid>

            <Grid item xs={6}>
              <img src={productDispatch.img} className={classes.img} />
            </Grid>

            <Grid item xs={6}>
              <h6>{productDispatch.name}</h6>
              <p>{productDispatch.message}</p>
              <p>{productDispatch.size}</p>
              <span>{productDispatch.price.toLocaleString()}</span>
            </Grid>

            <Grid item xs={6}>
              <div className={classes.Checkout}>
                <button className={classes.CheckoutButton}>View Cart</button>
              </div>
            </Grid>
            <Grid item xs={6}>
              <div className={classes.Checkout}>
                <button className={classes.CheckoutButton}>Checkout</button>
              </div>
            </Grid>
          </Grid>
        </div>
      </Fade>
    </Modal>
  );
};

export default Modaltransition;
