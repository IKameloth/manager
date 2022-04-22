import React, { FC, useContext } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  CardMedia,
} from "@mui/material";
import { UIContext } from "@/app/context/ui";
import { Link, useHistory } from "react-router-dom";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import MenuIcon from "@mui/icons-material/Menu";
import Logo from "@/assets/images/autentia-logo.svg";
import { useDispatch } from "react-redux";
import { logout } from "@/app/store/common";

export const Navbar: FC = () => {
  const dispatcher = useDispatch();
  const history = useHistory();
  const { isOpenMenu, toggleMenu, toggleWorkplace } = useContext(UIContext);

  const handleLogout = () => {
    toggleMenu(false);
    toggleWorkplace(false);
    dispatcher(logout());
    return history.replace("/login");
  };

  return (
    <>
      <AppBar
        color="default"
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={() => toggleMenu(!isOpenMenu)}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            {isOpenMenu ? <ArrowBackIosNewIcon /> : <MenuIcon />}
          </IconButton>
          <Typography component="span" variant="h6" noWrap>
            {/* IMG LOGO */}
            <Link to="/">
              <CardMedia component="img" image={Logo} alt="logo-autentia" />
            </Link>
          </Typography>
          <Box sx={{ flexGrow: 1 }}></Box>
          <IconButton
            color="inherit"
            aria-label="logout"
            edge="end"
            onClick={handleLogout}
          >
            <ExitToAppIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </>
  );
};
