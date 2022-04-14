import React, { useState, useEffect } from "react";
import { Box, Grid, Typography } from "@mui/material";
import { Item } from "@/app/components/Item";
import UsersTable from "@/app/components/Admin/Roles/User/UsersTable";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "@/app/store/common";
import { cleanAdminState, getUsersList } from "@/app/store/admin";
import { StoreState } from "@/app/store";

function ShowUsers() {
  const dispatcher = useDispatch();
  const { admin, common } = useSelector((state: StoreState) => state);
  const { usersList, unauthorized } = admin;
  const { profile } = common;
  const [isLoading, setIsLoading] = useState(false);
  const [dataTable, setDataTable] = useState(usersList);

  const getAsyncUserList = async () => {
    setIsLoading(true);
    await dispatcher(getUsersList(profile.token));
    setIsLoading(false);
  };

  useEffect(() => {
    getAsyncUserList();
  }, []);

  useEffect(() => {
    setDataTable(usersList);
  }, [usersList]);

  if (unauthorized) {
    dispatcher(cleanAdminState());
    dispatcher(logout());
  }

  return (
    <Grid
      item
      xs={12}
      md={12}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Item>
        {!dataTable?.length ? (
          <Box alignItems="center" justifyContent="center" display="flex">
            <Typography variant="subtitle1">
              No se encuentran registros
            </Typography>
          </Box>
        ) : (
          <UsersTable isLoading={isLoading} data={dataTable} />
        )}
      </Item>
    </Grid>
  );
}

export default ShowUsers;
