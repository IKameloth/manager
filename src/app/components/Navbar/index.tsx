import React, { useEffect, useContext, ReactNode } from "react";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import { StoreState } from "../../store";
import { makeStyles } from "@mui/styles";
import { Redirect, useLocation } from "react-router-dom";
import Appbar from "./Appbar";
import Sidebar from "./Sidebar";
import { logout } from "../../store/common/operations";
import { cleanAdminState } from "@/app/store/admin";
import { UIContext } from "@/app/context/ui";
import theme from "@/assets/theme";

const indexStyle = makeStyles(() => ({
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

type Props = {
  children: ReactNode
}

const Navegation = ({ children }: Props) => {
  const location = useLocation();
  const { isOpenMenu, toggleMenu } = useContext(UIContext);
  const dispatch = useDispatch();
  const { common, admin } = useSelector((state: StoreState) => state);
  const { isLoggedIn, profile } = common;
  const { unauthorized } = admin;

  const classes = indexStyle();

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

  if (!isLoggedIn) return <Redirect to="/login" />;

  if (unauthorized || !profile.status) {
    handleLogout()
    return <Redirect to="/login" />;
  }

  useEffect(() => {
    location.pathname === "/" ? toggleMenu(true) : toggleMenu(false);
  }, [location]);

  return (
    <div className={classes.root}>
      <Appbar
        isSideOpen={isOpenMenu}
        openMenu={openMenu}
        anchorEl={anchorEl}
        onSideChange={() => toggleMenu(!isOpenMenu)}
        onClickMenu={handleClickMenu}
        onCloseMenu={handleCloseMenu}
        onLogout={handleLogout}
      />
      <Sidebar isOpen={isOpenMenu} />

      <main
        className={clsx(classes.content, {
          [classes.contentShift]: isOpenMenu,
        })}
      >
        <div className={classes.drawerHeader} />
        {children}
      </main>
    </div>
  );
};

export default Navegation;
