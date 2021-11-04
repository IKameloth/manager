import React, { MouseEvent, useEffect } from "react";
import { SideBar } from "@/assets/SideBar/Sidebar";
import { Dialog, Avatar, ButtonBase, Divider, Drawer, Grid, Typography, DialogTitle, FormControl, DialogContent, InputLabel, Select, MenuItem, DialogActions, Button } from "@material-ui/core";
import UserMenu from "./UserMenu";
import AdminMenu from "./AdminMenu";
import RoleNames from "./RoleNames";
import { useDispatch, useSelector } from "react-redux";
import { StoreState } from "@/app/store";
import { setCountry, setInstitution, setRoles } from "@/app/store/user";
import { setCountries, setIsLoading } from "@/app/store/common";

type PropsType = {
    open: boolean,
    setOpenDialog: (state: boolean) => void
}

export default function ScopeSelection(props: PropsType) {
  const dispatch = useDispatch();
  const classes = SideBar();
  const [isLoading, setIsLoading] = React.useState(false);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [countrySelected, setCountrySelected] = React.useState('');
  const [institutionSelected, setInstitutionSelected] = React.useState('');

  const userStore = useSelector((state: StoreState) => state.user);
  const commonStore = useSelector((state: StoreState) => state.common);
  const { country, roles, institution } = userStore;
  const { countries, profile } = commonStore;

  useEffect(() => {
    let controller = new AbortController();
    (async () => {
      try {
        if(!isLoading && !countries){
          setIsLoading(true)
          await dispatch(setCountries())
          setIsLoading(false)
        }
      } catch (e) { 
        console.log("ERROR", e)
      }
    })();
    return () => controller?.abort();
  }, [countries]);

  const setInstitutionList = async (country:string) => {
    setIsLoading(true)
    if (profile.userData)
      await dispatch(setRoles( profile.userToken, profile.userData.id, country))
    setIsLoading(false)
  }
  useEffect(() => {
    if(countries && !isLoading && countrySelected !== ''){
      setInstitutionList(countrySelected)  
    }
  }, [countrySelected]);

  const handleChangeSelectCountry = (event: any) => {
    setCountrySelected(String(event.target.value) || '');
  };

  const handleChangeSelectInstitution = (event: any) => {
    setInstitutionSelected(String(event.target.value) || '');
  };

  const handleOnSubmit = async (e:MouseEvent) => {
    e.preventDefault();
    await dispatch(setCountry(countrySelected));
    await dispatch(setInstitution(institutionSelected));
    props.setOpenDialog(false);
  };
  if(!props.open)
    return <></>

  return(
    <>
        <DialogTitle id="alert-dialog-title" style={{ textAlign: 'center' }}>
          <Typography component="span" variant="h6" style={{ fontSize: 18 }}>Seleccione donde desea operar</Typography>
        </DialogTitle>
        <DialogContent>
          <form className={classes.form} noValidate>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="max-width">País</InputLabel>
              <Select value={countrySelected} onChange={handleChangeSelectCountry} >
                {countries?.data?.map(country => <MenuItem key={country} value={country}>{country}</MenuItem>)}
              </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="max-width">Institución</InputLabel>
              <Select value={institutionSelected} onChange={handleChangeSelectInstitution} >
                {roles?.map(role => {
                  if(role){
                      return <MenuItem key={role.id} value={role.institution.name}>{role.institution.name}</MenuItem>
                  }
                })}
                {roles.length == 0 &&
                  <MenuItem key={'not-found'} value="">No posee instituciones en {countrySelected}</MenuItem>
                }
              </Select>
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          { country !== '' && institution !== '' &&
            <Button onClick={() => setOpenDialog(false)} color="primary">
              Cancel
            </Button>
          }
          <Button onClick={handleOnSubmit} color="primary">
            Ok
          </Button>
        </DialogActions>
    </>
  );
};