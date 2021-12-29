import React, { MouseEvent, useEffect } from "react";
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
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { StoreState } from "@/app/store";
import {
  setCountries,
  setCountry,
  setInstitution,
  setIsLoading,
  setRoles,
  unsetIsLoading,
} from "@/app/store/common";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

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

  const [openDialog, setOpenDialog] = React.useState(false);
  const [countrySelected, setCountrySelected] = React.useState("");
  const [institutionSelected, setInstitutionSelected] = React.useState("");
  const roles = rolesProfile;

  useEffect(() => {
    if (!countries) {
      dispatch(setCountries());
    }
  }, []);

  const setInstitutionList = async (country: string) => {
    setIsLoading();
    await dispatch(setRoles(profile.token, profile.id, country));
    unsetIsLoading();
  };

  useEffect(() => {
    if (countries && countrySelected !== "") {
      setInstitutionList(countrySelected);
    }
  }, [countrySelected]);

  const handleChangeSelectCountry = (event: any) => {
    setCountrySelected(String(event.target.value) || "");
  };

  const handleChangeSelectInstitution = (event: any) => {
    setInstitutionSelected(String(event.target.value) || "");
  };

  const handleOnSubmit = async (e: MouseEvent) => {
    e.preventDefault();
    await dispatch(setCountry(countrySelected));
    await dispatch(setInstitution(institutionSelected));
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
              {countries?.data?.map((country) => (
                <MenuItem key={country} value={country}>
                  {country}
                </MenuItem>
              ))}
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
