import React, { useState } from "react";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import { StoreState } from "../../store";
import { makeStyles } from "@material-ui/core";
import { Redirect } from "react-router-dom";
import Appbar from "./Appbar";
import Sidebar from "./Sidebar";
import { logout } from "../../store/common/operations";
import { cleanAdminState } from "@/app/store/admin";

const indexStyle = makeStyles((theme) => ({
  root: {
    display: "flex",
    backgroundColor: theme.palette.background.default,
  },
  content: {
    flexGrow: 1,
    paddingTop: theme.spacing(3),
    paddingLeft: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -355,
    height: "95vh",
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  drawerHeader: {
    display: "flex",
    ...theme.mixins.toolbar,
  },
}));

interface Props {
  children: Element | React.ReactNode;
}

export default function Navegation({children}: Props) {
  const dispatch = useDispatch();
  const { common, admin } = useSelector((state: StoreState) => state);
  const { isLoggedIn, profile } = common;
  const { unauthorized } = admin;

  const content = children;
  const classes = indexStyle();
  const [isOpened, setIsOpened] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);

  const handleClickMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(cleanAdminState());
    dispatch(logout());
  };

  const handleSidebar = () => {
    setIsOpened(!isOpened);
  };

  if (!isLoggedIn) return <Redirect to="/login" />;

  if (unauthorized || !profile.status) {
    dispatch(cleanAdminState());
    dispatch(logout());
    return <Redirect to="/login" />;
  }

  return (
    <div className={classes.root}>
      <Appbar
        isSideOpen={isOpened}
        openMenu={openMenu}
        anchorEl={anchorEl}
        onSideChange={handleSidebar}
        onClickMenu={handleClickMenu}
        onCloseMenu={handleCloseMenu}
        onLogout={handleLogout}
      />
      <Sidebar isOpen={isOpened} />

      <main
        onClick={() => setIsOpened(false)}
        className={clsx(classes.content, {
          [classes.contentShift]: isOpened,
        })}
      >
        <div className={classes.drawerHeader} />
        {content}
      </main>
    </div>
  );
}
