import React, { MouseEvent, ReactNode, useEffect } from "react";
import { SideBar } from "@/assets/SideBar/Sidebar";
import {
  Typography,
  DialogTitle,
  FormControl,
  DialogContent,
  InputLabel,
  Select,
  MenuItem,
  DialogActions,
  Button,
  SelectChangeEvent,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { StoreState } from "@/app/store";
import {
  setCountries,
  setCountry,
  setInstitution,
  setRoles,
} from "@/app/store/common";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

type ChangeEventType = React.ChangeEvent<{name?:string,value: unknown}>

export default function ScopeSelection({ isOpen, onClose }: Props) {
  const dispatch = useDispatch();
  const classes = SideBar();

  const { common } = useSelector((state: StoreState) => state);
  const {
    currentCountry,
    currentInstitution,
    profile,
    countries,
    rolesProfile,
  } = common;

  const [countrySelected, setCountrySelected] = React.useState("");
  const [institutionSelected, setInstitutionSelected] = React.useState("");
  const [countryList, setCountryList] = React.useState(countries?.data);
  const roles = rolesProfile;

  useEffect(() => {
    dispatch(setCountries(profile.token));
  }, []);

  useEffect(() => {
    setCountryList(countries?.data);
  }, [countries]);

  const setInstitutionList = (country: string) => {
    dispatch(setRoles(profile.id, country, profile.token));
  };

  useEffect(() => {
    if (countries && countrySelected !== "") {
      setInstitutionList(countrySelected);
    }
  }, [countrySelected]);

  const handleChangeSelectCountry = (event: SelectChangeEvent<string>, child: ReactNode) => {
    setCountrySelected(String(event.target.value) || "");
  };

  const handleChangeSelectInstitution = (event: SelectChangeEvent<string>, child: ReactNode) => {
    setInstitutionSelected(String(event.target.value) || "");
  };

  const handleOnSubmit = (e: MouseEvent) => {
    e.preventDefault();
    dispatch(setCountry(countrySelected));
    dispatch(setInstitution(institutionSelected));
    onClose();
  };

  if (!isOpen) return <></>;

  return (
    <>
      <DialogTitle id="alert-dialog-title" style={{ textAlign: "center" }}>
        <Typography component="span" variant="h6" style={{ fontSize: 18 }}>
          Seleccione donde desea operar
        </Typography>
      </DialogTitle>
      <DialogContent>
        <form className={classes.form} noValidate>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="max-width">País</InputLabel>
            <Select
              value={countrySelected}
              defaultValue={currentCountry}
              onChange={handleChangeSelectCountry}
            >
              {countryList != undefined && countryList.length > 0 ? (
                countryList.map((country) => (
                  <MenuItem key={country} value={country}>
                    {country}
                  </MenuItem>
                ))
              ) : (
                <MenuItem key={"not-found"} value="">
                  No posee Países disponibles
                </MenuItem>
              )}
            </Select>
          </FormControl>
          {countrySelected != "" && (
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="max-width">Institución</InputLabel>
              <Select
                value={institutionSelected}
                onChange={handleChangeSelectInstitution}
              >
                {roles && roles?.length > 0 ? (
                  roles?.map((role) => {
                    if (role)
                      return (
                        <MenuItem key={role.id} value={role.institution.name}>
                          {role.institution.name}
                        </MenuItem>
                      );
                  })
                ) : (
                  <MenuItem key={"not-found"} value="">
                    No posee instituciones en {countrySelected}
                  </MenuItem>
                )}
              </Select>
            </FormControl>
          )}
        </form>
      </DialogContent>
      <DialogActions>
        {currentCountry !== "" && currentInstitution !== "" && (
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
        )}
        <Button onClick={handleOnSubmit} color="primary">
          Ok
        </Button>
      </DialogActions>
    </>
  );
}
