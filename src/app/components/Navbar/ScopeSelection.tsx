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

type PropsType = {
  open: boolean;
  setOpenDialog: (state: boolean) => void;
};

export default function ScopeSelection(props: PropsType) {
  const dispatch = useDispatch();
  const classes = SideBar();

  const { common } = useSelector((state: StoreState) => state);
  const { profile, isLoading, countries, rolesProfile } = common;
  const { currentCountry, currentInstitution } = profile;

  const [openDialog, setOpenDialog] = React.useState(false);
  const [countrySelected, setCountrySelected] = React.useState("");
  const [institutionSelected, setInstitutionSelected] = React.useState("");
  const roles = rolesProfile;

  // useEffect(() => {
  //   let controller = new AbortController();
  //   (async () => {
  //     try {
  //       if (!isLoading && !countries) {
  //         setIsLoading();
  //         await dispatch(setCountries());
  //         unsetIsLoading();
  //       }
  //     } catch (e) {
  //       console.log("ERROR: SetCountries: ", e);
  //     }
  //   })();
  //   return () => controller?.abort();
  // }, [countries]);

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
    props.setOpenDialog(false);
  };

  if (!props.open) return <></>;

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
          <Button onClick={() => setOpenDialog(false)} color="primary">
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
