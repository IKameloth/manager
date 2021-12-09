import React from "react";
import { Link } from 'react-router-dom';
import { AppBar, Divider, Menu, Toolbar } from "@material-ui/core";
import { navigationBar } from "@/assets/SideBar/NavigationBar";
import clsx from "clsx";
import IconButton from '@material-ui/core/IconButton';
import MoreIcon from '@material-ui/icons/MoreVert';
import MenuItem from '@material-ui/core/MenuItem';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import MenuIcon from '@material-ui/icons/Menu';

interface Props {
  isSideOpen: boolean;
  openMenu: boolean;
  anchorEl: null | HTMLElement;
  onSideChange: () => void;
  onClickMenu: (event: React.MouseEvent<HTMLElement>) => void;
  openSync: () => void
  onCloseMenu: () => void
  onLogout: () => void;
};

export default function Appbar(props: Props) {
  const classes = navigationBar();

  return (
    <AppBar position="fixed" color="inherit" className={clsx(classes.appBar, { [classes.appBarShift]: props.isSideOpen, })}>
      <Toolbar>
        <IconButton color="inherit" edge="start" onClick={props.onSideChange} style={{marginRight: 16}}>
          { props.isSideOpen ? <ChevronLeftIcon className={classes.primary} /> : <MenuIcon className={classes.primary} />}
        </IconButton>
        
        <Link to="/">
          <div className={classes.img}></div>
        </Link>
        
        <div style={{flexGrow: 1}}></div>

        <IconButton edge="start" aria-label="more" aria-controls="long-menu" aria-haspopup="true" onClick={props.onClickMenu}>
          <MoreIcon className={classes.primary} />
        </IconButton>

        <Menu id="long-menu" anchorEl={props.anchorEl} keepMounted open={props.openMenu} onClose={props.onCloseMenu}>
          <MenuItem onClick={props.onCloseMenu}>Sincronizar</MenuItem>
          <Divider />
          <MenuItem onClick={props.onLogout}>Salir</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};