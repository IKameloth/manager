import React, { FC, useContext } from "react";
import { UIContext } from "@/app/context/ui";
import { useSelector } from "react-redux";
import { StoreState } from "@/app/store/index";
import {
  Avatar,
  Box,
  capitalize,
  Divider,
  Drawer,
  List,
  Toolbar,
  Typography,
} from "@mui/material";
import RoleNames from "../Navbar/RoleNames";
import UserMenu from "../Navbar/UserMenu";
import AdminMenu from "../Navbar/AdminMenu";

interface Props {
  window?: () => Window;
  drawerWidth: number;
}

export const Sidebar: FC<Props> = ({ window, drawerWidth }) => {
  const { isOpenMenu, toggleMenu } = useContext(UIContext);
  const { common } = useSelector((state: StoreState) => state);
  const { profile, rolesProfile } = common;

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
        >
          <Avatar sx={{ bgcolor: "#2962FF", height: 50, width: 50 }}>
            {profile.name
              .trim()
              .split(" ")
              .reduce(
                (acc: string, el: string) => acc + el.charAt(0).toUpperCase(),
                ""
              )
              .substring(0, 2)}
          </Avatar>
          <Typography variant="subtitle1">
            {capitalize(profile.name)}
          </Typography>
          {!!rolesProfile && <RoleNames rolesArr={rolesProfile} />}
        </Box>
      </List>
      <Divider variant="middle" />
      {/* SELECT INSTITUTION */}
      <Divider variant="middle" />
      {/* USER MENU */}
      <UserMenu />
      {/* ADMIN MENU */}
      <AdminMenu />
    </div>
  );

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      aria-label="mailbox folders"
    >
      <Drawer
        container={container}
        variant="temporary"
        open={isOpenMenu}
        onClose={() => toggleMenu(!isOpenMenu)}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
};
