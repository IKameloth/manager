import React from "react";
import { Box, Grid, Typography } from "@material-ui/core";
import { Item } from "@/app/components/Item";
import RolesTable from "./RoleTable";

interface Props {
  roles: any;
}

export default function ShowRoles({ roles }: Props) {
  return (
    <Grid item xs={12} md={8}>
      <Item>
        {!roles?.length ? (
          <Box alignItems="center" justifyContent="center" display="flex">
            <Typography variant="subtitle1">
              No se encuentran registros
            </Typography>
          </Box>
        ) : (
          <RolesTable isLoading={false} data={roles} />
        )}
      </Item>
    </Grid>
  );
}
