import React from "react";
import { Link } from "react-router-dom";
import { MenuStyled } from "@/assets/SideBar/Menu";
import {
  Collapse,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@material-ui/core";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import HowToRegIcon from "@material-ui/icons/HowToReg";
import TouchAppIcon from "@material-ui/icons/TouchApp";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import { ExpandLess, ExpandMore } from "@material-ui/icons";

export default function UserMenu() {
  const classes = MenuStyled();
  const [openUserList, setOpenUserList] = React.useState(false);
  const [openIdentList, setOpenIdentList] = React.useState(false);
  const [openEnrollList, setOpenEnrollList] = React.useState(false);
  const [openSensorList, setOpenSensorList] = React.useState(false);

  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      className={classes.list}
    >
      <Grid className={classes.title}>
        <Typography variant="subtitle2">General</Typography>
      </Grid>

      <ListItem
        button
        onClick={() => setOpenUserList(!openUserList)}
        style={{ width: 300 }}
      >
        <ListItemIcon>
          <SupervisorAccountIcon />
        </ListItemIcon>
        <ListItemText primary="Usuarios" />
        {openUserList ? <ExpandLess /> : <ExpandMore />}
      </ListItem>

      <Collapse in={openUserList} timeout="auto" unmountOnExit>
        <List component="div" disablePadding style={{ width: 230 }}>
          <Link to="/example1" className={classes.linkStyled}>
            <ListItem button className={classes.nested}>
              <ListItemIcon>
                <FiberManualRecordIcon style={{ height: 6 }} />
              </ListItemIcon>
              <ListItemText primary="Asignar rol" />
            </ListItem>
          </Link>

          <Link to="/users/roles" className={classes.linkStyled}>
            <ListItem button className={classes.nested}>
              <ListItemIcon>
                <FiberManualRecordIcon style={{ height: 6 }} />
              </ListItemIcon>
              <ListItemText primary="Listar roles" />
            </ListItem>
          </Link>
        </List>
      </Collapse>

      <ListItem
        button
        onClick={() => setOpenIdentList(!openIdentList)}
        style={{ width: 300 }}
      >
        <ListItemIcon>
          <AssignmentIndIcon />
        </ListItemIcon>
        <ListItemText primary="Identidad" />
        {openUserList ? <ExpandLess /> : <ExpandMore />}
      </ListItem>

      <Collapse in={openIdentList} timeout="auto" unmountOnExit>
        <List component="div" disablePadding style={{ width: 230 }}>
          <Link to="/example1" className={classes.linkStyled}>
            <ListItem button className={classes.nested}>
              <ListItemIcon>
                <FiberManualRecordIcon style={{ height: 6 }} />
              </ListItemIcon>
              <ListItemText primary="Example" />
            </ListItem>
          </Link>
        </List>
      </Collapse>

      <ListItem
        button
        onClick={() => setOpenEnrollList(!openEnrollList)}
        style={{ width: 300 }}
      >
        <ListItemIcon>
          <HowToRegIcon />
        </ListItemIcon>
        <ListItemText primary="Enrolamiento" />
        {openUserList ? <ExpandLess /> : <ExpandMore />}
      </ListItem>

      <Collapse in={openEnrollList} timeout="auto" unmountOnExit>
        <List component="div" disablePadding style={{ width: 230 }}>
          <Link to="/enrollment" className={classes.linkStyled}>
            <ListItem button className={classes.nested}>
              <ListItemIcon>
                <FiberManualRecordIcon style={{ height: 6 }} />
              </ListItemIcon>
              <ListItemText primary="Enrolar" />
            </ListItem>
          </Link>

          <Link to="/reenrollment" className={classes.linkStyled}>
            <ListItem button className={classes.nested}>
              <ListItemIcon>
                <FiberManualRecordIcon style={{ height: 6 }} />
              </ListItemIcon>
              <ListItemText primary="Re-Enrolar" />
            </ListItem>
          </Link>
        </List>
      </Collapse>

      <ListItem
        button
        onClick={() => setOpenSensorList(!openSensorList)}
        style={{ width: 300 }}
      >
        <ListItemIcon>
          <TouchAppIcon />
        </ListItemIcon>
        <ListItemText primary="Sensores" />
        {openSensorList ? <ExpandLess /> : <ExpandMore />}
      </ListItem>

      <Collapse in={openSensorList} timeout="auto" unmountOnExit>
        <List component="div" disablePadding style={{ width: 230 }}>
          <Link to="/sensor" className={classes.linkStyled}>
            <ListItem button className={classes.nested}>
              <ListItemIcon>
                <FiberManualRecordIcon style={{ height: 6 }} />
              </ListItemIcon>
              <ListItemText primary="Administrar Sensor" />
            </ListItem>
          </Link>
        </List>
      </Collapse>
    </List>
  );
}
