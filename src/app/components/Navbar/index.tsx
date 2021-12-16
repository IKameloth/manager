import React, { useState } from "react";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import { StoreState } from "../../store";
import { makeStyles } from "@material-ui/core";
import { Redirect } from "react-router-dom";
import Appbar from "./Appbar";
import Sidebar from "./Sidebar";
import Synchronize from "../Sync/Synchronizer";
import { logout } from "../../store/common/operations";

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
  children: any;
}

export default function Navegation(props: Props) {
  const classes = indexStyle();
  const content = props.children;

  const dispatch = useDispatch();
  const { common } = useSelector((state: StoreState) => state);
  const { isLoggedIn } = common;

  const [isOpened, setIsOpened] = useState(false);
  const [syncDialog, setSyncDialog] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);

  const handleClickMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleSidebar = () => {
    setIsOpened(!isOpened);
  };

  const handleSync = () => {
    setSyncDialog(!syncDialog);
    console.log("OPEN?: ", syncDialog);
  };

  if (!isLoggedIn) return <Redirect to="/login" />;

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
        openSync={handleSync}
      />

      <Sidebar isSideOpen={isOpened} />

      <main
        onClick={() => setIsOpened(false)}
        className={clsx(classes.content, {
          [classes.contentShift]: isOpened,
        })}
      >
        <div className={classes.drawerHeader} />
        {content}
      </main>
      {syncDialog && <Synchronize isOpen={syncDialog} />}
    </div>
  );
}
