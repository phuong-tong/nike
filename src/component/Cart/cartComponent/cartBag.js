import React from "react";
import { makeStyles, withStyles } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import { FormControl, Hidden, InputBase, NativeSelect } from "@mui/material";
import * as Action from "../module/action/action";
import * as ActionType from "../module/constants/constants";
import ReactDOM from "react-dom";

const useStyles = makeStyles((theme) => ({
  CartBag: {
    // [theme.breakpoints.down("sm")]: {
    //   marginBottom: 16,
    // },
  },
  Product: {
    display: "flex",
    clear: "both",
    padding: "24px 8px",
    borderBottom: "1px #cccccc solid",
  },
  ProductImageContainer: {
    paddingRight: 16,
  },
  ProductImage: {
    width: 150,
    height: 150,
    marginRight: 10,
    // [theme.breakpoints.down("xs")]: {
    //   width: 80,
    //   height: 80,
    // },
  },
  ProductDetail: {
    width: "100%",
    lineHeight: 1.75,
  },
  ProductName: {
    textDecoration: "none",
    color: "black",
  },
  Price: {
    float: "right",
    // [theme.breakpoints.down("xs")]: {
    //   float: 'none',
    // },
  },
  SubDetail: {
    color: "#757575",
  },
  SelectContainer: {
    display: "flex",
    alignItems: "baseline",
    // [theme.breakpoints.down("xs")]: {
    //   flexDirection: 'column',
    // },
  },
  SelectFormControl: {
    marginRight: 10,
  },
  CartItemAction: {
    marginTop: 16,
    // [theme.breakpoints.down("sm")]: {
    //   marginTop: 36,
    // },
    color: "#757575",
  },
  CartItemActionButton: {
    marginRight: 16,
    textDecoration: "underline",
    cursor: "pointer",
    "&:hover": {
      opacity: 0.7,
    },
  },
  MoreOptionsMobile: {
    marginTop: 36,
    width: "100%",
    color: "black",
    backgroundColor: "white",
    padding: "8px 24px",
    borderRadius: 20,
    outline: 0,
    border: "1px #cccccc solid",
    fontSize: 16,
    cursor: "pointer",
    lineHeight: 1.75,
  },
  SelectFormContainer: {
    display: "flex",
    alignItems: "center",
  },
}));

const CustomSelect = withStyles((theme) => ({
  input: {
    fontSize: 16,
    color: "#757575",
    padding: "0px 12px",
    lineHeight: "inherit",
  },
}))(InputBase);

const CartBag = () => {
  const classes = useStyles();
  const product = useSelector((state) => state.reducerCart.products);

  const Qty = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  const openMoreOption = () => {
    let moreOption = document.getElementById("");
    ReactDOM.findDOMNode(moreOption).stype.display = "block";
  };

  const [itemProduct, setItemProduct] = React.useState("");

  const dispatch = useDispatch();

  const handleChangeSize = (event) => {
    const { value } = event.target;
    const payload = {
      item: itemProduct,
      size: value,
    };
    dispatch(
      Action.createAction({
        type: ActionType.UPDATE_SIZE_COLOR,
        payload: payload,
      })
    );
  };
  const handleChangeQuantity = (event) => {
    const { value } = event.target;
    const payload = {
      item: itemProduct,
      quantity: value,
    };
    dispatch(
      Action.createAction({
        type: ActionType.UPDATE_SIZE_COLOR,
        payload: payload,
      })
    );
  };

  return (
    <div className={classes.CartBag}>
      {/* renderProduct */}
      {product &&
        product.map((item, key) => {
          return (
            <div className={classes.Product} key={key}>
              <a href="#" className={classes.ProductImageContainer}>
                <img className={classes.ProductImage} src={item.img} />
              </a>
              <div className={classes.ProductDetail}>
                <a href="#" className={classes.ProductName}>
                  {item.name}
                </a>
                <div className={classes.Price}>
                  {item.price.toLocaleString()}Đ
                </div>
                <div className={classes.SubDetail}>
                  <div> Cloth</div>
                  <div> White/Black/Cosmic Clay/White </div>

                  <div className={classes.SelectContainer}>
                    {/* Size */}
                    <span className={classes.SelectFormContainer}>
                      {" "}
                      Size
                      <FormControl className={classes.SelectFormControl}>
                        <NativeSelect
                          value={item.size}
                          input={
                            <CustomSelect
                              onChange={handleChangeSize}
                              onClick={() => {
                                setItemProduct(item);
                              }}
                            />
                          }
                        >
                          {item.sizes.map((i, index) => {
                            return <option key={index}>{i.size}</option>;
                          })}
                        </NativeSelect>
                      </FormControl>
                    </span>

                    {/* Quantity */}
                    <span className={classes.SelectFormContainer}>
                      {" "}
                      Quantity
                      <FormControl className={classes.SelectFormControl}>
                        <NativeSelect
                          value={item.quantity}
                          input={
                            <CustomSelect
                              onChange={handleChangeQuantity}
                              onClick={() => setItemProduct(item)}
                            />
                          }
                        >
                          {Qty.map((i, index) => {
                            return (
                              <option key={index} value={i}>
                                {i}
                              </option>
                            );
                          })}
                        </NativeSelect>
                      </FormControl>
                    </span>
                    {/* Remove and move to favorite */}
                    <Hidden xsDown>
                      <div className={classes.CartItemAction}>
                        <span className={classes.CartItemActionButton}>
                          Move to favorite
                        </span>
                        <span
                          className={classes.CartItemActionButton}
                          onClick={() => {
                            dispatch(
                              Action.createAction({
                                type: ActionType.REMOVE_TO_CARD,
                                payload: item,
                              })
                            );
                          }}
                        >
                          Remove
                        </span>
                      </div>
                    </Hidden>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default CartBag;
