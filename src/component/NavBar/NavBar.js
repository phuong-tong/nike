import React from "react";
import { Outlet } from "react-router-dom";
import { Container, Hidden } from "@mui/material";
import NavSub from "./NavSub";

const NavBar = () => {
  return (
    <div>
      <Hidden lgDown>
        <Container maxWidth="xl">
          <NavSub />
        </Container>
      </Hidden>

      <Hidden xlUp>
        <Container>
          <NavSub />
        </Container>
      </Hidden>

      <Outlet />
    </div>
  );
};

export default NavBar;
