import React, { ReactNode } from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { Navbar, Sidebar } from "@/app/components/ui";

const drawerWidth = 240;

interface Props {
  children: ReactNode;
}

export const AppLayout = ({ children }: Props) => {
  return (
    <Box sx={{ display: "flex" }}>
      {/* NAVBAR */}
      <Navbar />
      {/* SIDEBAR */}
      <Sidebar drawerWidth={drawerWidth} />
      {/* CONTENT */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};
