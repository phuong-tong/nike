import React from "react";

import { makeStyles } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import { Alert, Grid, Skeleton } from "@mui/material";
import * as ActionType from "../../Cart/module/constants/constants";
import * as action from "../../Cart/module/action/action";
import Modaltransition from "./modal";

const useStyles = makeStyles({
  ProductContainer: {
    padding: "0 44px",
    fontSize: 16,
    lineHeight: 1.7,
    // [theme.breakpoints.down("md")]: {
    //   padding: "0 8px",
    // },
  },
  ProductImage: {
    width: "100%",
  },
  ShoesType: {
    fontSize: 16,
    marginBottom: 4,
  },
  ShoesName: {
    fontSize: 28,
  },
  Price: {
    fontSize: 16,
    textAlign: "right",
  },
  Size: {
    margin: "20px 0 12px",
  },
  SelectSize: {
    fontSize: 16,
  },
  AlertSelectSize: {
    fontSize: 16,
    color: "rgb(212, 63, 33)",
  },
  SizeGuide: {
    fontSize: 16,
    color: "#757575",
    textAlign: "right",
  },
  SizeRadio: {
    position: "absolute",
    opacity: 0,
    width: 0,
    height: 0,
  },
  SizeLabel: {
    fontSize: 16,
    padding: "10px 0 10px 0",
    textAlign: "center",
    cursor: "pointer",
    borderRadius: "20px",
    "&:hover": {
      boxShadow: "0 0 0 2px black",
      borderRadius: 2,
    },
  },
  SizeLabelChecked: {
    boxShadow: "rgb(17, 17, 17) 0px 0px 0px 1px inset",
    padding: "10px 0 10px 0",
    fontSize: 16,
    padding: "10px 0 10px 0",
    textAlign: "center",
    cursor: "pointer",
    borderRadius: "20px",
  },
  AddtoBag: {
    width: "100%",
    color: "white",
    backgroundColor: "black",
    padding: "18px 24px",
    borderRadius: "30px",
    border: "none",
    outline: "none",
    cursor: "pointer",
  },
  Favorite: {
    width: "100%",
    color: "black",
    backgroundColor: "transparent",
    padding: "18px 24px",
    borderRadius: "30px",
    border: "1px #ccc solid",
    outline: "none",
    cursor: "pointer",
  },
  FavoriteBorderIcon: {
    height: 15,
  },
  ProductLink: {
    color: "black",
    textDecoration: "none",
    cursor: "pointer",
    fontSize: 16,
  },
  ProductColorway: {
    display: "none",
  },
  ProductColorwayImage: {
    width: "100px",
    height: "100px",
    border: "1px solid rgb(17, 17, 17)",
    borderRadius: "4px",
    opacity: 1,
  },
  ProductColorwayImageHide: {
    width: "100px",
    height: "100px",
    borderRadius: "4px",
    opacity: 0.8,
  },
  CheckSize: {
    boxShadow: "rgb(212, 63, 33) 0px 0px 0px 1px",
    padding: "1px",
    borderRadius: "4px",
  },
  AlertSize: {
    margin: "20px 0px",
  },
  AddtoBagNotAllow: {
    cursor: "not-allowed",
    width: "100%",
    color: "white",
    backgroundColor: "black",
    padding: "18px 24px",
    borderRadius: "30px",
    border: "none",
    outline: "none",
  },
});

const ProductMain = ({ detailProduct, getIndexImg, indexPress }) => {
  const classes = useStyles();
  const [size, setSize] = React.useState("");
  const [flag, setFlag] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  //console.log(detailProduct);
  //console.log(getIndexImg);
  const dispatch = useDispatch();
  const productDispatch = {
    id: detailProduct._id,
    name: detailProduct.name,
    message: detailProduct.message,
    price: detailProduct.price,
    sizes: detailProduct.sizes,
    size: size,
    color: detailProduct.imgDetails[indexPress].color,
    quantity: 1,
    img: detailProduct.imgDetails[indexPress].imgs[indexPress].img,
  };

  const productFav = {
    id: detailProduct._id,
    name: detailProduct.name,
    message: detailProduct.message,
    price: detailProduct.price,
    sizes: detailProduct.sizes,
    size: size,
    color: detailProduct.imgDetails[indexPress].color,
    quantity: 1,
    img: detailProduct.imgDetails[indexPress].imgs[indexPress].img,
  };
  const handleChange = (e) => {
    const { value } = e.target;
    setSize(value);
  };

  const checkSize = () => {
    if (size === "") {
      setFlag(true);
      return;
    }
    setFlag(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const addProduct = () => {
    if (size) {
      handleOpen();
      dispatch(
        action.createAction({
          type: ActionType.ADD_TO_CARD,
          payload: productDispatch,
        })
      );
    }
  };

  const listSize = detailProduct.sizes.map((item, index) => {
    return (
      <Grid item xs={4} key={index}>
        <label>
          <input
            type="radio"
            name="box"
            value={item.size}
            className={classes.SizeRadio}
            onChange={handleChange}
            onBlur={checkSize}
          />
          <div
            className={
              size === item.size ? classes.SizeLabelChecked : classes.SizeLabel
            }
          >
            {item.size}
          </div>
        </label>
      </Grid>
    );
  });
  const isLoading = useSelector((state) => state.reducerURL.isLoading);
  const listSizeLazyLoading = detailProduct.sizes.map((item, index) => {
    return (
      <Grid item xs={4} key={index}>
        <Skeleton width="100%">
          <label>
            <input
              type="radio"
              name="box"
              value={item.size}
              className={classes.SizeRadio}
            />
            <div className={classes.SizeLabel}>{item.size}</div>
          </label>
        </Skeleton>
      </Grid>
    );
  });

  return (
    <Grid container className={classes.ProductContainer} spacing={2}>
      <Grid item xs={8}>
        {isLoading ? (
          <Skeleton>
            <div className={classes.ShoesType}> Women's Clothing </div>
          </Skeleton>
        ) : (
          <div className={classes.ShoesType}> Women's Clothing </div>
        )}

        {isLoading ? (
          <Skeleton>
            <div className={classes.ShoesName}> {detailProduct.name}</div>
          </Skeleton>
        ) : (
          <div className={classes.ShoesName}> {detailProduct.name}</div>
        )}
      </Grid>

      <Grid item xs={4}>
        {isLoading ? (
          <Skeleton>
            <div className={classes.Price}>
              {detailProduct.price.toLocaleString()}Đ
            </div>
          </Skeleton>
        ) : (
          <div className={classes.Price}>
            {detailProduct.price.toLocaleString()}Đ
          </div>
        )}
      </Grid>

      {/* small image */}
      {detailProduct.imgDetails.map((item, index) => {
        console.log(item.imgs[0].img);
        return (
          <Grid item xs={4} key={index}>
            {isLoading ? (
              <Skeleton>
                <img
                  className={classes.ProductColorwayImage}
                  src={item.imgs[0].img}
                />
              </Skeleton>
            ) : (
              <img
                key={index}
                src={item.imgs[0].img}
                className={
                  indexPress === index
                    ? classes.ProductColorwayImage
                    : classes.ProductColorwayImageHide
                }
                onClick={() => {
                  getIndexImg(index); // get index để tý bỏ zo cái object send lên store vd: color: detailProduct.imgDetails[indexPress].color,
                }}
              />
            )}
          </Grid>
        );
      })}

      <Grid item xs={12}>
        <Grid container className={classes.Size} spacing={2}>
          <Grid
            item
            xs={6}
            className={flag ? classes.AlertSelectSize : classes.SelectSize}
          >
            {isLoading ? (
              <Skeleton width="100%">
                <span> Select Size</span>
              </Skeleton>
            ) : (
              <span> Select Size</span>
            )}
          </Grid>
          <Grid item xs={6} className={classes.SizeGuide}>
            {isLoading ? (
              <Skeleton width="100%">
                <span> Size Guide</span>
              </Skeleton>
            ) : (
              <span> Size Guide</span>
            )}
          </Grid>
          {/* show a list of sizes */}
          {isLoading ? listSizeLazyLoading : listSize}
        </Grid>
        {flag && (
          <Alert severity="error" className={classes.AlertSize}>
            Please choose size
          </Alert>
        )}
      </Grid>

      <Grid item xs={12}>
        {isLoading ? (
          <Skeleton width="100%">
            <button className={classes.AddtoBag}>Add to cart</button>
          </Skeleton>
        ) : (
          <button
            className={flag ? classes.AddtoBagNotAllow : classes.AddtoBag}
            onClick={() => {
              checkSize();
              addProduct();
            }}
          >
            Add to cart
          </button>
        )}
      </Grid>

      {/* add to favorite */}

      {/* Modaltransition */}
      <Modaltransition
        open={open}
        handleOpen={handleOpen}
        handleClose={handleClose}
        productDispatch={productDispatch}
      />
    </Grid>
  );
};

export default ProductMain;
