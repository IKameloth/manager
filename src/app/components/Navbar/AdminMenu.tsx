import React from "react";
import { MenuStyled } from "@/assets/SideBar/Menu";
import { Link } from "react-router-dom";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import FolderSharedIcon from '@material-ui/icons/FolderShared';
import PersonIcon from '@material-ui/icons/Person';
import BusinessIcon from '@material-ui/icons/Business';
import { Collapse, Grid, List, ListItem, ListItemIcon, ListItemText, Typography } from "@material-ui/core";

export default function AdminMenu() {
  const classes = MenuStyled();
  const [openRoleList, setOpenRoleList] = React.useState(false);
  const [openPersonList, setOpenPersonList] = React.useState(false);
  const [openInstitList, setOpenInstitList] = React.useState(false);

  return(
    <List component="nav" aria-labelledby="nested-list-subheader" className={classes.list}>
    <Grid className={classes.title}>
      <Typography variant="subtitle2">Administración</Typography>
    </Grid>

    <ListItem button onClick={() => setOpenRoleList(!openRoleList)} style={{width: 300}}>
      <ListItemIcon><FolderSharedIcon /></ListItemIcon>
      <ListItemText primary="Roles" />
      {openRoleList ? <ExpandLess /> : <ExpandMore />}
    </ListItem>

    <Collapse in={openRoleList} timeout="auto" unmountOnExit>
      <List component="div" disablePadding style={{width: 230}}>
        <Link to="/roles" className={classes.linkStyled}>
          <ListItem button className={classes.nested}>
            <ListItemIcon><FiberManualRecordIcon style={{height: 6}} /></ListItemIcon>
            <ListItemText primary="Admin Roles" />
          </ListItem>
        </Link>
        <Link to="/test" className={classes.linkStyled}>
          <ListItem button className={classes.nested}>
            <ListItemIcon><FiberManualRecordIcon style={{height: 6}} /></ListItemIcon>
            <ListItemText primary="Test" />
          </ListItem>
        </Link>
      </List>
    </Collapse>

    <ListItem button onClick={() => setOpenPersonList(!openPersonList)} style={{width: 300}}>
      <ListItemIcon><PersonIcon /></ListItemIcon>
      <ListItemText primary="Personas" />
      {openPersonList ? <ExpandLess /> : <ExpandMore />}
    </ListItem>

    <Collapse in={openPersonList} timeout="auto" unmountOnExit>
      <List component="div" disablePadding style={{width: 230}}>
        <Link to="/people" className={classes.linkStyled}>
          <ListItem button className={classes.nested}>
            <ListItemIcon><FiberManualRecordIcon style={{height: 6}} /></ListItemIcon>
            <ListItemText primary="Buscar" />
          </ListItem>
        </Link>
      </List>
    </Collapse>

    <ListItem button onClick={() => setOpenInstitList(!openInstitList)} style={{width: 300}}>
      <ListItemIcon><BusinessIcon /></ListItemIcon>
      <ListItemText primary="Instituciones" />
      {openInstitList ? <ExpandLess /> : <ExpandMore />}
    </ListItem>

    <Collapse in={openInstitList} timeout="auto" unmountOnExit>
      <List component="div" disablePadding style={{width: 230}}>
        <Link to="/institutions" className={classes.linkStyled}>
          <ListItem button className={classes.nested}>
            <ListItemIcon><FiberManualRecordIcon style={{height: 6}} /></ListItemIcon>
            <ListItemText primary="Listar" />
          </ListItem>
        </Link>
      </List>
    </Collapse>
  </List>
  );
};