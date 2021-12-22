import React, { useState, useEffect } from "react";
import { Box, Grid, Typography } from "@material-ui/core";
import { Item } from "@/app/components/Item";
import RolesTable from "./RoleTable";
import { useSelector, useDispatch } from "react-redux";
import { getAllRolesByUser } from "@/app/store/admin";
import { StoreState } from "@/app/store";

interface Props {
  userId: string;
}

export default function ShowRoles({ userId }: Props) {
  const dispatcher = useDispatch();
  const { admin } = useSelector((state: StoreState) => state);
  const { rolesList, user } = admin;
  const [isLoading, setIsLoading] = useState(false);
  const [dataTable, setDataTable] = useState(rolesList);

  useEffect(() => {
    setIsLoading(true);
    dispatcher(getAllRolesByUser(userId));
    setIsLoading(false);
  }, []);

  useEffect(() => {
    setDataTable(rolesList);
  }, [rolesList]);

  return (
    <Grid item xs={12} md={8}>
      <Item>
        {!dataTable?.length ? (
          <Box alignItems="center" justifyContent="center" display="flex">
            <Typography variant="subtitle1">
              No se encuentran registros
            </Typography>
          </Box>
        ) : (
          <RolesTable isLoading={isLoading} data={dataTable} />
        )}
      </Item>
    </Grid>
  );
}
