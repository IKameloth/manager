import React, { forwardRef, ReactElement, Ref, useContext } from "react";
import { UIContext } from "@/app/context/ui";
import { useSelector } from "react-redux";
import { TransitionProps } from "@mui/material/transitions";
import { StoreState } from "../../store/index";
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
} from "@mui/material";
import { Box } from "@mui/system";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement<any, any>;
  },
  ref: Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const Workplace = () => {
  const { isOpenWorkplace, toggleWorkplace } = useContext(UIContext);
  const { common } = useSelector((state: StoreState) => state);
  const { countries, rolesProfile } = common;

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
                  value={""}
                >
                  {countries?.data?.map((country) => (
                    <MenuItem key={country} value={country}>
                      {country}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>{/* HELPER TEXT */}</FormHelperText>
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
                  value={""}
                >
                  {rolesProfile?.map((role) => (
                    <MenuItem key={role?.id} value={role?.institution.name}>
                      {role?.institution.name}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>{/* HELPER TEXT */}</FormHelperText>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center", mb: 1 }}>
          <Button variant="outlined" onClick={() => toggleWorkplace(false)}>
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
