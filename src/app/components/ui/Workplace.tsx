import React, { forwardRef, ReactElement, Ref, useState } from "react";
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

export const Workplace = () => {
  const [open, setOpen] = useState<boolean>(false);
  const { common } = useSelector((state: StoreState) => state);
  const { countries, rolesProfile } = common;

  return (
    <>
      <Box padding={2}>
        <Button variant="outlined" onClick={() => setOpen(true)}>
          Seleccionar donde operar
        </Button>
      </Box>
      {/* DIALOG */}
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setOpen(false)}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Seleccionar donde operar"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <form>
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
            </form>
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center", mb: 1 }}>
          <Button variant="outlined" onClick={() => setOpen(false)}>
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement<any, any>;
  },
  ref: Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
