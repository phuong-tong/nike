import React from "react";
import { makeStyles } from "@mui/styles";
import { AppBar, Toolbar, Typography } from "@mui/material";
import SignIn from "./NavMainComponents/SignIn";

const useStyles = makeStyles((theme) => ({
  nav: {
    backgroundColor: "white",
    color: "black",
    paddingLeft: 36,
    paddingRight: 38,
    position: "relative",
    boxShadow: "none",
    fontFamily: '"Helvetica Neue",Helvetica,Arial,sans-serif',
    // [theme.breakpoints.down("sm")]: {
    //   display: "none",
    // },
    zIndex: 1101,
  },
  title: {
    flexGrow: 1,
  },
  toolbar: {
    padding: 0,
    minHeight: 36,
  },
  jordan: {
    height: 24,
    width: 24,
    "&:hover": {
      opacity: 0.7,
    },
  },
  linkJordan: {
    padding: "0 12px",
    height: 34,
    display: "flex",
    alignItems: "center",
  },
  nav1: {
    height: 34,
    display: "flex",
    alignItems: "center",
    textAlign: "center",
  },
  nav1Menu: {
    margin: "0 12px",
    textDecoration: "none",
    color: "black",
    fontSize: 12,
    "&:hover": {
      color: "grey",
    },
    cursor: "pointer",
  },
  helpMenuContainer: {
    padding: "24px 24px 24px 18px",
    position: "absolute",
    right: 130,
    zIndex: 10,
    width: 200,
    fontSize: 14,
    borderRadius: 10,
    textAlign: "left",
    backgroundColor: "white",
  },
  helpMenuHeader: {
    padding: "4px 8px",
    marginBottom: 12,
    fontSize: 16,
    cursor: "pointer",
  },
  helpMenuItem: {
    color: "#757575",
    padding: "4px 8px",
    cursor: "pointer",
    "&:hover": {
      color: "black",
    },
  },
}));

const NavSub = () => {
  const classes = useStyles();
  const [help, setHelp] = React.useState(false);

  return (
    <div>
      <AppBar className={classes.nav}>
        <Toolbar className={classes.toolbar}>
          <Typography variant="h6" className={classes.title}></Typography>
          <div className={classes.nav1}>
            <div
              onMouseOver={() => setHelp(true)}
              onMouseLeave={() => setHelp(false)}
            >
              <span className={classes.nav1Menu}>Help</span>
              {help && (
                <div className={classes.helpMenuContainer}>
                  <div className={classes.helpMenuHeader}>Help</div>
                  <div className={classes.helpMenuItem}> Order Status</div>
                  <div className={classes.helpMenuItem}>
                    Dispatch and Delivery
                  </div>
                  <div className={classes.helpMenuItem}>Return</div>
                  <div className={classes.helpMenuItem}>Contact Us</div>
                  <div className={classes.helpMenuItem}>Privacy Policy</div>
                  <div className={classes.helpMenuItem}>Terms of Sale</div>
                  <div className={classes.helpMenuItem}>Terms of Use</div>
                  <div className={classes.helpMenuItem}>Send us feedback</div>
                </div>
              )}
            </div>
            <SignIn />
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavSub;
