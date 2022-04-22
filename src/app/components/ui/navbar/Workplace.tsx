import React, {
  FC,
  forwardRef,
  ReactElement,
  Ref,
  useContext,
  useEffect,
  useState,
} from "react";
import { UIContext } from "@/app/context/ui";
import { useSelector, useDispatch } from "react-redux";
import { TransitionProps } from "@mui/material/transitions";
import { StoreState } from "@/app/store/index";
import { useForm, SubmitHandler } from "react-hook-form";
import { setCountries, setInstitList } from "@/app/store/common";
import MenuItem from "@mui/material/MenuItem";
import { Grid } from "@mui/material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormHelperText,
  InputLabel,
  Select,
  Slide,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { ProfileType, RoleType } from "@/app/types";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement<any, any>;
  },
  ref: Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface Props {
  profile: ProfileType;
}

interface IForm {
  country: string;
  institution: string;
}

export const Workplace: FC<Props> = ({ profile }) => {
  const dispatcher = useDispatch();
  const { common } = useSelector((state: StoreState) => state);
  const { isOpenWorkplace, toggleWorkplace } = useContext(UIContext);
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const { countries, rolesProfile } = common;

  useEffect(() => {
    dispatcher(setCountries(profile.token));
  }, []);

  useEffect(() => {
    selectedCountry.length > 0 &&
      dispatcher(setInstitList(selectedCountry, profile.token));
  }, [selectedCountry]);

  console.log(selectedCountry);
  return (
    <>
      <Box padding={2}>
        <Button variant="outlined" onClick={() => toggleWorkplace(true)}>
          Seleccionar donde operar
        </Button>
      </Box>
      <Dialog
        TransitionComponent={Transition}
        open={isOpenWorkplace}
        onClose={() => toggleWorkplace(false)}
        aria-describedby="alert-dialog-slide-description"
        keepMounted
      >
        <DialogTitle>Seleccionar donde operar</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description"></DialogContentText>
          <Grid container>
            <Grid item xs={12} mt={2}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel htmlFor="country">Seleccionar país</InputLabel>
                <Select
                  labelId="country"
                  id="country"
                  label="Seleccionar país"
                  fullWidth
                  variant="outlined"
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                >
                  {countries?.data?.map((country) => (
                    <MenuItem key={country} value={country}>
                      {country}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText></FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12} mt={2}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel htmlFor="institution">
                  Seleccionar institución
                </InputLabel>
                <Select
                  labelId="institution"
                  id="institution"
                  label="Seleccionar institución"
                  fullWidth
                  variant="outlined"
                  defaultValue={""}
                >
                  {rolesProfile?.map((role) => (
                    <MenuItem key={role?.id} value={role?.institution.name}>
                      {role?.institution.name}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText></FormHelperText>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center", mb: 1 }}>
          <Button variant="outlined" onClick={() => console.log("submit")}>
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
