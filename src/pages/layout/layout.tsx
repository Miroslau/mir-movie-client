import React, { useState } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { Outlet } from "react-router-dom";
import SideBar from "../../components/section-component/side-bar/side-bar";

const Layout = () => {
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);

  return (
    <Box
      display={isNonMobile && isSideBarOpen ? "flex" : "block"}
      width="100%"
      height="100%"
    >
      {isSideBarOpen && (
        <SideBar
          drawerWidth="250px"
          isNonMobile={isNonMobile}
          isSideBarOpen={isSideBarOpen}
          setIsSideBarOpen={setIsSideBarOpen}
        />
      )}
      <Box
        flexGrow={1}
        style={{
          backgroundColor: "#191F45",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
