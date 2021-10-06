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
    open: boolean
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
          console.log("dispatch", countries)
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
    console.log("change", countrySelected, isLoading, countries)
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
    setOpenDialog(false);
  };
  if(!props.open)
    return <></>

  return(
    <>
        <DialogTitle>Seleccione donde desea operar</DialogTitle>
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
                  if(role)
                    <MenuItem key={role.id} value={role.id}>{role?.institution.name}</MenuItem>
                })}
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