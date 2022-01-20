import React, { useState, useEffect } from "react";
import { SideBar } from "@/assets/SideBar/Sidebar";
import {
  Dialog,
  Avatar,
  ButtonBase,
  Divider,
  Drawer,
  Grid,
  Typography,
  styled,
} from "@material-ui/core";
import UserMenu from "./UserMenu";
import AdminMenu from "./AdminMenu";
import RoleNames from "./RoleNames";
import ScopeSelection from "./ScopeSelection";
import { useSelector } from "react-redux";
import { StoreState } from "@/app/store";
import { Capitalize } from "@/app/helper/Capitalize";

const StyledDialog = styled(Dialog)(() => ({
  "& .MuiPaper-root": {
    borderRadius: 10,
  },
}));

interface Props {
  isOpen: boolean;
}

export default function Sidebar({ isOpen }: Props) {
  const classes = SideBar();
  const [openDialog, setOpenDialog] = useState(false);
  const { common } = useSelector((state: StoreState) => state);
  const { currentCountry, currentInstitution, rolesProfile, profile } = common;
  const roles = rolesProfile;
  const userName = profile?.name || "Desconocido";

  useEffect(() => {
    if (currentCountry === "" && currentInstitution === "") setOpenDialog(true);
  }, []);

  const handleDialog = () => {
    setOpenDialog(!openDialog);
  };

  return (
    <Drawer
      className={classes.drawer}
      variant="persistent"
      anchor="left"
      open={isOpen}
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
            {userName
              .trim()
              .split(" ")
              .reduce(
                (acc: any, el: any) => acc + el.charAt(0).toUpperCase(),
                ""
              )
              .substring(0, 2)}
          </Avatar>
        </Grid>
        <Grid item>
          <Typography variant="subtitle1">{Capitalize(userName)}</Typography>
          {roles != undefined && <RoleNames rolesArr={roles} />}
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
        <StyledDialog open={openDialog} onClose={handleDialog}>
          <ScopeSelection isOpen={openDialog} onClose={handleDialog} />
        </StyledDialog>
      )}

      {/* USER MENU */}
      {!!currentCountry.length && !!currentInstitution.length && <UserMenu />}

      {/* ADMIN MENU */}
      {roles?.map((ele) => ele?.name).includes("Admin") &&
        !!currentCountry.length &&
        !!currentInstitution.length && <AdminMenu />}
    </Drawer>
  );
}
