import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import clsx from 'clsx';
import { logout } from '../../store/common/operations';
import { useDispatch, useSelector } from 'react-redux';
import { StoreState } from '../../store';
import Appbar from "./Appbar";
import Sidebar from './Sidebar';
import { makeStyles } from "@material-ui/core";
import { cleanUserList } from '@/app/store/user';

const indexStyle = makeStyles((theme) => ({
  root: {
    display: 'flex',
    backgroundColor: theme.palette.background.default,
  },
  content: {
    flexGrow: 1,
    paddingTop: theme.spacing(3),
    paddingLeft: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -355,
    height: '95vh',
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  drawerHeader: {
    display: 'flex',
    ...theme.mixins.toolbar,
  },
}));

interface Props {
  children: any;
};

export default function Navegation(props: Props) {
  const classes = indexStyle();
  const content = props.children;
  const dispatch = useDispatch();
  const [isOpened, setIsOpened] = useState(false);
  const { common } = useSelector((state: StoreState) => state);
  const { isLoggedIn } = common;

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);

  const handleClickMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(cleanUserList())
    dispatch(logout());
  };

  const handleSidebar = () => {
    setIsOpened(!isOpened);
  };

  if (!isLoggedIn) {
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
      
      <Sidebar isSideOpen={isOpened} />

      <main onClick={() => setIsOpened(false)}
        className={clsx(classes.content, {
          [classes.contentShift]: isOpened,
        })}
      >
        <div className={classes.drawerHeader} />
        { content }
      </main>

    </div>
  );
};
