import React, { FC } from "react";
import { Box, Drawer } from "@mui/material";

interface SideBarProps {
  isNonMobile?: boolean;
  drawerWidth?: string;
  isSideBarOpen?: boolean;
  setIsSideBarOpen?: (isSideBarOpen: boolean) => void;
}
const SideBar: FC<SideBarProps> = ({
  isNonMobile,
  drawerWidth,
  isSideBarOpen,
  setIsSideBarOpen,
}) => {
  const drawerStyle = {
    width: drawerWidth,
    "& .MuiDrawer-paper": {
      width: drawerWidth,
      borderWidth: isNonMobile ? 0 : "2px",
      boxSizing: "border-box",
      backgroundColor: "red",
    },
  };

  return (
    <Box component="nav">
      <Drawer
        open={isSideBarOpen}
        onClose={setIsSideBarOpen?.bind(this, false)}
        variant="persistent"
        anchor="left"
        sx={drawerStyle}
      ></Drawer>
    </Box>
  );
};

export default SideBar;
