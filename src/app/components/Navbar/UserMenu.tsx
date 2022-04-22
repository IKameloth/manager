import React from "react";
import { Link } from "react-router-dom";
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
  const [openUserList, setOpenUserList] = React.useState(false);
  const [openIdentList, setOpenIdentList] = React.useState(false);
  const [openEnrollList, setOpenEnrollList] = React.useState(false);
  const [openSensorList, setOpenSensorList] = React.useState(false);

  return (
    <List component="nav" aria-labelledby="nested-list-subheader">
      <Grid>
        <Typography variant="subtitle2">General</Typography>
      </Grid>

      <ListItem button onClick={() => setOpenUserList(!openUserList)}>
        <ListItemIcon>
          <SupervisorAccountIcon />
        </ListItemIcon>
        <ListItemText primary="Usuarios" />
        {openUserList ? <ExpandLess /> : <ExpandMore />}
      </ListItem>

      <Collapse in={openUserList} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <Link to="/users/search">
            <ListItem button>
              <ListItemIcon>
                <FiberManualRecordIcon />
              </ListItemIcon>
              <ListItemText primary="Buscar" />
            </ListItem>
          </Link>
          <Link to="/users/roles">
            <ListItem button>
              <ListItemIcon>
                <FiberManualRecordIcon />
              </ListItemIcon>
              <ListItemText primary="Listar roles" />
            </ListItem>
          </Link>
          <Link to="/users/roles/add">
            <ListItem button>
              <ListItemIcon>
                <FiberManualRecordIcon />
              </ListItemIcon>
              <ListItemText primary="Agregar Rol" />
            </ListItem>
          </Link>
        </List>
      </Collapse>

      <ListItem button onClick={() => setOpenIdentList(!openIdentList)}>
        <ListItemIcon>
          <AssignmentIndIcon />
        </ListItemIcon>
        <ListItemText primary="Identidad" />
        {openIdentList ? <ExpandLess /> : <ExpandMore />}
      </ListItem>

      <Collapse in={openIdentList} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <Link to="/identity/verification">
            <ListItem button>
              <ListItemIcon>
                <FiberManualRecordIcon />
              </ListItemIcon>
              <ListItemText primary="Verificación" />
            </ListItem>
          </Link>
        </List>
        <List component="div" disablePadding>
          <Link to="/identity/newdni">
            <ListItem button>
              <ListItemIcon>
                <FiberManualRecordIcon />
              </ListItemIcon>
              <ListItemText primary="Cédula Nueva" />
            </ListItem>
          </Link>
        </List>
        <List component="div" disablePadding>
          <Link to="/identity/olddni">
            <ListItem button>
              <ListItemIcon>
                <FiberManualRecordIcon />
              </ListItemIcon>
              <ListItemText primary="Cédula Antigua" />
            </ListItem>
          </Link>
        </List>
        <List component="div" disablePadding>
          <Link to="/identity/dbdni">
            <ListItem button>
              <ListItemIcon>
                <FiberManualRecordIcon />
              </ListItemIcon>
              <ListItemText primary="Cédulas y Base de datos" />
            </ListItem>
          </Link>
        </List>
      </Collapse>

      <ListItem button onClick={() => setOpenEnrollList(!openEnrollList)}>
        <ListItemIcon>
          <HowToRegIcon />
        </ListItemIcon>
        <ListItemText primary="Enrolamiento" />
        {openEnrollList ? <ExpandLess /> : <ExpandMore />}
      </ListItem>

      <Collapse in={openEnrollList} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <Link to="/enrollment">
            <ListItem button>
              <ListItemIcon>
                <FiberManualRecordIcon />
              </ListItemIcon>
              <ListItemText primary="Enrolar" />
            </ListItem>
          </Link>

          <Link to="/reenrollment">
            <ListItem button>
              <ListItemIcon>
                <FiberManualRecordIcon />
              </ListItemIcon>
              <ListItemText primary="Re-Enrolar" />
            </ListItem>
          </Link>
        </List>
      </Collapse>

      <ListItem button onClick={() => setOpenSensorList(!openSensorList)}>
        <ListItemIcon>
          <TouchAppIcon />
        </ListItemIcon>
        <ListItemText primary="Sensores" />
        {openSensorList ? <ExpandLess /> : <ExpandMore />}
      </ListItem>

      <Collapse in={openSensorList} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <Link to="/sensor">
            <ListItem button>
              <ListItemIcon>
                <FiberManualRecordIcon />
              </ListItemIcon>
              <ListItemText primary="Consultar lector" />
            </ListItem>
          </Link>
          <Link to="/sensor/register">
            <ListItem button>
              <ListItemIcon>
                <FiberManualRecordIcon />
              </ListItemIcon>
              <ListItemText primary="Registrar lector" />
            </ListItem>
          </Link>
        </List>
      </Collapse>
    </List>
  );
}
