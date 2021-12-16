import React, { useEffect } from "react";
import { SideBar } from "@/assets/SideBar/Sidebar";
import {
  Dialog,
  Avatar,
  ButtonBase,
  Divider,
  Drawer,
  Grid,
  Typography,
  DialogTitle,
  FormControl,
  DialogContent,
  InputLabel,
  Select,
  MenuItem,
  DialogActions,
  Button,
  styled,
} from "@material-ui/core";
import UserMenu from "./UserMenu";
import AdminMenu from "./AdminMenu";
import RoleNames from "./RoleNames";
import ScopeSelection from "./ScopeSelection";
import { useSelector } from "react-redux";
import { StoreState } from "@/app/store";

const StyledDialog = styled(Dialog)(() => ({
  "& .MuiPaper-root": {
    borderRadius: 10,
  },
}));

export default function Sidebar({ isSideOpen }: any) {
  const classes = SideBar();
  const [openDialog, setOpenDialog] = React.useState(false);
  const { common } = useSelector((state: StoreState) => state);
  const { profile } = common;
  const { currentCountry, currentInstitution, roles } = profile;

  const userName = profile?.name || "Desconocido";
  const nameLetters = userName
    .trim()
    .split(" ")
    .reduce((acc: any, el: any) => acc + el.charAt(0).toUpperCase(), "")
    .substring(0, 2);

  useEffect(() => {
    if (currentCountry === "" && currentInstitution === "") setOpenDialog(true);
  }, []);

  return (
    <Drawer
      className={classes.drawer}
      variant="persistent"
      anchor="left"
      open={isSideOpen}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className={classes.drawerHeader}></div>
      <Divider />

      {/* AVATAR NAME */}
      <Grid container className={classes.container}>
        <Grid item style={{ paddingRight: 10 }}>
          <Avatar style={{ backgroundColor: "#2962FF", width: 48, height: 48 }}>
            {nameLetters}
          </Avatar>
        </Grid>
        <Grid item>
          <Typography variant="subtitle1">{userName}</Typography>
          <RoleNames rolesArr={roles} />
        </Grid>
      </Grid>

      <Divider style={{ alignSelf: "center", width: "85%" }} />

      {/* SELECT COUNTRY AND INSTITUTION */}
      <Grid container className={classes.containerParams}>
        <ButtonBase
          className={classes.buttonBase}
          onClick={() => setOpenDialog(!openDialog)}
        >
          <Grid item>
            <Typography variant="body1">
              País:{" "}
              <label style={{ color: "blue", cursor: "pointer" }}>
                {currentCountry === "" ? "No Seleccionado" : currentCountry}
              </label>
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="body1">
              Institucíon:{" "}
              <label style={{ color: "blue", cursor: "pointer" }}>
                {currentInstitution === ""
                  ? "No Seleccionada"
                  : currentInstitution}
              </label>
            </Typography>
          </Grid>
        </ButtonBase>
      </Grid>
      {openDialog && (
        <StyledDialog
          open={openDialog}
          onClose={() => setOpenDialog(!openDialog)}
        >
          <ScopeSelection open={openDialog} setOpenDialog={setOpenDialog} />
        </StyledDialog>
      )}

      {/* USER MENU */}
      {!!currentCountry.length && !!currentInstitution.length && <UserMenu />}

      {/* ADMIN MENU */}
      {roles?.map((ele) => ele?.name).includes("Admin") && <AdminMenu />}
    </Drawer>
  );
}
