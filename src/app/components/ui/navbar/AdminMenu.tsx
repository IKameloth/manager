import React from "react";
import { Link } from "react-router-dom";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import FolderSharedIcon from "@mui/icons-material/FolderShared";
import PersonIcon from "@mui/icons-material/Person";
import BusinessIcon from "@mui/icons-material/Business";
import {
  Collapse,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";

export default function AdminMenu() {
  const [openRoleList, setOpenRoleList] = React.useState(false);
  const [openPersonList, setOpenPersonList] = React.useState(false);
  const [openInstitList, setOpenInstitList] = React.useState(false);

  return (
    <List component="nav" aria-labelledby="nested-list-subheader">
      <Grid>
        <Typography variant="subtitle2">Administración</Typography>
      </Grid>

      <ListItem button onClick={() => setOpenRoleList(!openRoleList)}>
        <ListItemIcon>
          <FolderSharedIcon />
        </ListItemIcon>
        <ListItemText primary="Roles" />
        {openRoleList ? <ExpandLess /> : <ExpandMore />}
      </ListItem>

      <Collapse in={openRoleList} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <Link to="/roles">
            <ListItem button>
              <ListItemIcon>
                <FiberManualRecordIcon />
              </ListItemIcon>
              <ListItemText primary="Admin Roles" />
            </ListItem>
          </Link>
        </List>
      </Collapse>

      <ListItem button onClick={() => setOpenPersonList(!openPersonList)}>
        <ListItemIcon>
          <PersonIcon />
        </ListItemIcon>
        <ListItemText primary="Personas" />
        {openPersonList ? <ExpandLess /> : <ExpandMore />}
      </ListItem>

      <Collapse in={openPersonList} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <Link to="/people">
            <ListItem button>
              <ListItemIcon>
                <FiberManualRecordIcon />
              </ListItemIcon>
              <ListItemText primary="Buscar" />
            </ListItem>
          </Link>
        </List>
      </Collapse>

      <ListItem button onClick={() => setOpenInstitList(!openInstitList)}>
        <ListItemIcon>
          <BusinessIcon />
        </ListItemIcon>
        <ListItemText primary="Instituciones" />
        {openInstitList ? <ExpandLess /> : <ExpandMore />}
      </ListItem>

      <Collapse in={openInstitList} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <Link to="/institutions">
            <ListItem button>
              <ListItemIcon>
                <FiberManualRecordIcon />
              </ListItemIcon>
              <ListItemText primary="Listar" />
            </ListItem>
          </Link>
        </List>
      </Collapse>
    </List>
  );
}
