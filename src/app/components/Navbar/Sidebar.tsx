import React from "react";
import { SideBar } from "@/assets/SideBar/Sidebar";
import { Dialog, Avatar, ButtonBase, Divider, Drawer, Grid, Typography, DialogTitle, FormControl, DialogContent, InputLabel, Select, MenuItem, DialogActions, Button } from "@material-ui/core";
import UserMenu from "./UserMenu";
import AdminMenu from "./AdminMenu";
import RoleNames from "./RoleNames";

interface Props {
  isSideOpen: boolean;
  profile: any;
};

export default function Sidebar(props: Props) {
  const classes = SideBar();
  const userName = props.profile.userData?.attributes.name || 'Unknow';
  const nameLetters = userName.trim().split(' ').reduce((acc: any, el: any) => acc + el.charAt(0).toUpperCase(), "").substring(0, 2);
  const rolesArr = props.profile.userData?.relationships?.roles;

  const [openDialog, setOpenDialog] = React.useState(false);
  const [country, setCountry] = React.useState('');
  const [institution, setInstitution] = React.useState('');

  const handleChangeSelectCountry = (event: any) => {
    setCountry(String(event.target.value) || '');
  };

  const handleChangeSelectInstitution = (event: any) => {
    setInstitution(String(event.target.value) || '');
  };

  const handleOnSubmit = () => {
    const data = {
      country: country,
      institution: institution
    };
    console.log(data);
    setOpenDialog(false);
  };

  return(
    <Drawer className={classes.drawer} variant="persistent" anchor="left" open={props.isSideOpen}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className={classes.drawerHeader}></div>
      <Divider />

      {/* AVATAR NAME */}
      <Grid container className={classes.container}>
        <Grid item style={{paddingRight: 10}}>
          <Avatar style={{ backgroundColor: '#2962FF', width: 48, height: 48 }}>{nameLetters}</Avatar>
        </Grid>
        <Grid item>
          <Typography variant="subtitle1">{userName}</Typography>
          <RoleNames rolesArr={rolesArr} />
        </Grid>
      </Grid>
      
      <Divider style={{alignSelf: 'center', width: "85%"}} />

      {/* SELECT COUNTRY AND INSTITUTION */}
      <Grid container className={classes.containerParams}>
        <ButtonBase className={classes.buttonBase} onClick={() => setOpenDialog(!openDialog)}>
          <Grid item>
            <Typography variant="body1" >País: <label style={{color: 'blue'}}>Example</label></Typography>
          </Grid>
          <Grid item>
            <Typography variant="body1" >Institucíon: <label style={{color: 'blue'}}>Example</label></Typography>
          </Grid>
        </ButtonBase>
      </Grid>

      <Dialog open={openDialog} onClose={() => setOpenDialog(!openDialog)}>
        <DialogTitle>Seleccione donde desea operar</DialogTitle>
        <DialogContent>
          <form className={classes.form} noValidate>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="max-width">País</InputLabel>
              <Select value={country} onChange={handleChangeSelectCountry} >
                <MenuItem value="xs">xs</MenuItem>
                <MenuItem value="sm">sm</MenuItem>
                <MenuItem value="md">md</MenuItem>
                <MenuItem value="lg">lg</MenuItem>
                <MenuItem value="xl">xl</MenuItem>
              </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="max-width">Institución</InputLabel>
              <Select value={institution} onChange={handleChangeSelectInstitution} >
                <MenuItem value="xs">xs</MenuItem>
                <MenuItem value="sm">sm</MenuItem>
                <MenuItem value="md">md</MenuItem>
                <MenuItem value="lg">lg</MenuItem>
                <MenuItem value="xl">xl</MenuItem>
              </Select>
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={() => handleOnSubmit()} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>

      {/* USER MENU */}
      <UserMenu />

      {/* ADMIN MENU */}
      <AdminMenu />
    </Drawer>
  );
};