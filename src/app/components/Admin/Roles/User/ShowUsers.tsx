import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import { Item } from "@/app/components/Item";
import UsersTable from "@/app/components/Admin/Roles/User/UsersTable";
import { useSelector, useDispatch } from "react-redux";
import { getUsersList } from "@/app/store/admin";
import { StoreState } from "@/app/store";

function ShowUsers() {
  const dispatcher = useDispatch();
  const { admin } = useSelector((state: StoreState) => state);
  const { usersList } = admin;
  const [isLoading, setIsLoading] = useState(false);
  const [dataTable, setDataTable] = useState(usersList);

  useEffect(() => {
    setIsLoading(true);
    dispatcher(getUsersList());
    setIsLoading(false);
  }, []);

  useEffect(() => {
    setDataTable(usersList);
  }, [usersList]);

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
        <UsersTable isLoading={isLoading} data={dataTable} />
      </Item>
    </Grid>
  );
}

export default ShowUsers;
