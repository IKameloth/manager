import React, { MouseEvent, useEffect } from "react";
import { SideBar } from "@/assets/SideBar/Sidebar";
import { Dialog, Avatar, ButtonBase, Divider, Drawer, Grid, Typography, DialogTitle, FormControl, DialogContent, InputLabel, Select, MenuItem, DialogActions, Button } from "@material-ui/core";
import UserMenu from "./UserMenu";
import AdminMenu from "./AdminMenu";
import RoleNames from "./RoleNames";
import { useDispatch, useSelector } from "react-redux";
import { StoreState } from "@/app/store";
import { setCountry, setInstitution } from "@/app/store/user";

interface Props {
  isSideOpen: boolean;
  profile: any;
};

export default function Sidebar(props: Props) {
  const dispatch = useDispatch();
  const classes = SideBar();
  const userName = props.profile.userData?.attributes.name || 'Unknow';
  const nameLetters = userName.trim().split(' ').reduce((acc: any, el: any) => acc + el.charAt(0).toUpperCase(), "").substring(0, 2);
  const rolesArr = props.profile.userData?.relationships?.roles;

  const [openDialog, setOpenDialog] = React.useState(false);
  const [countrySelected, setCountrySelected] = React.useState('');
  const [institutionSelected, setInstitutionSelected] = React.useState('');

  const { user } = useSelector((state: StoreState) => state);
  const { country, institution } = user

  useEffect(() => {
    if(country === '' && institution === '')
      setOpenDialog(true)  
  }, [])

  const handleChangeSelectCountry = (event: any) => {
    setCountrySelected(String(event.target.value) || '');
  };

  const handleChangeSelectInstitution = (event: any) => {
    setInstitutionSelected(String(event.target.value) || '');
  };

  const handleOnSubmit = async (e:MouseEvent) => {
    e.preventDefault()
    await dispatch(setCountry(countrySelected))
    await dispatch(setInstitution(institutionSelected))
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
            <Typography variant="body1" >País: <label style={{color: 'blue'}}>{country === ''? 'No Seleccionado':country}</label></Typography>
          </Grid>
          <Grid item>
            <Typography variant="body1" >Institucíon: <label style={{color: 'blue'}}>{institution === ''? 'No Seleccionada':institution}</label></Typography>
          </Grid>
        </ButtonBase>
      </Grid>

      <Dialog open={openDialog} onClose={() => setOpenDialog(!openDialog)}>
        <DialogTitle>Seleccione donde desea operar</DialogTitle>
        <DialogContent>
          <form className={classes.form} noValidate>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="max-width">País</InputLabel>
              <Select value={countrySelected} onChange={handleChangeSelectCountry} >
                <MenuItem value="xs">xs</MenuItem>
                <MenuItem value="sm">sm</MenuItem>
                <MenuItem value="md">md</MenuItem>
                <MenuItem value="lg">lg</MenuItem>
                <MenuItem value="xl">xl</MenuItem>
              </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="max-width">Institución</InputLabel>
              <Select value={institutionSelected} onChange={handleChangeSelectInstitution} >
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
          {country !== '' && institution !== '' &&
            <Button onClick={() => setOpenDialog(false)} color="primary">
              Cancel
            </Button>
          }
          <Button onClick={handleOnSubmit} color="primary">
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