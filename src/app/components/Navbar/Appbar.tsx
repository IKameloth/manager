import React from "react";
import { Link } from "react-router-dom";
import { AppBar, Menu, Toolbar } from "@mui/material";
import { navigationBar } from "@/assets/SideBar/NavigationBar";
import clsx from "clsx";
import IconButton from "@mui/material/IconButton";
import MoreIcon from "@mui/icons-material/MoreVert";
import MenuItem from "@mui/material/MenuItem";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import MenuIcon from "@mui/icons-material/Menu";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

interface Props {
  isSideOpen: boolean;
  openMenu: boolean;
  anchorEl: null | HTMLElement;
  onSideChange: () => void;
  onClickMenu: (event: React.MouseEvent<HTMLElement>) => void;
  onCloseMenu: () => void;
  onLogout: () => void;
}

export default function Appbar(props: Props) {
  const classes = navigationBar();

  return (
    <AppBar
      position="fixed"
      color="inherit"
      className={clsx(classes.appBar, {
        [classes.appBarShift]: props.isSideOpen,
      })}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          edge="start"
          onClick={props.onSideChange}
          style={{ marginRight: 16 }}
        >
          {props.isSideOpen ? (
            <ChevronLeftIcon className={classes.primary} />
          ) : (
            <MenuIcon className={classes.primary} />
          )}
        </IconButton>

        <Link to="/">
          <div className={classes.img}></div>
        </Link>

        <div style={{ flexGrow: 1 }}></div>

        <IconButton
          edge="start"
          aria-label="more"
          aria-controls="long-menu"
          aria-haspopup="true"
          onClick={props.onClickMenu}
        >
          <MoreIcon className={classes.primary} />
        </IconButton>

        <Menu
          id="long-menu"
          anchorEl={props.anchorEl}
          keepMounted
          open={props.openMenu}
          onClose={props.onCloseMenu}
        >
          <MenuItem onClick={props.onLogout}>
            Salir
            <ExitToAppIcon style={{ marginLeft: 3, color: "Blue" }} />
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}
