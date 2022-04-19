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
} from "@mui/material";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import TouchAppIcon from "@mui/icons-material/TouchApp";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

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

          <Link to="/users/search" className={classes.linkStyled}>
            <ListItem button className={classes.nested}>
              <ListItemIcon>
                <FiberManualRecordIcon style={{ height: 6 }} />
              </ListItemIcon>
              <ListItemText primary="Buscar" />
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
          <Link to="/users/roles/add" className={classes.linkStyled}>
            <ListItem button className={classes.nested}>
              <ListItemIcon>
                <FiberManualRecordIcon style={{ height: 6 }} />
              </ListItemIcon>
              <ListItemText primary="Agregar Rol" />
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
              <ListItemText primary="Consultar lector" />
            </ListItem>
          </Link>
          <Link to="/sensor/register" className={classes.linkStyled}>
            <ListItem button className={classes.nested}>
              <ListItemIcon>
                <FiberManualRecordIcon style={{ height: 6 }} />
              </ListItemIcon>
              <ListItemText primary="Registrar lector" />
            </ListItem>
          </Link>
        </List>
      </Collapse>
    </List>
  );
}
