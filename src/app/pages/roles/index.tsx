import React, { useState } from "react";
import { Box, Container, Grid } from "@material-ui/core";
import { TitleBar, NewUserModal, UsersTable } from "@/app/components/Admin";
import Section from "@/app/components/Section";
import { Item } from "@/app/components/Item";

export default function RoleList() {
  const [openModal, setOpenModal] = useState(false);

  const handleModal = () => {
    setOpenModal(!openModal);
  };

  return (
    <Container>
      <Section>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={8}>
            <TitleBar
              title="usuarios"
              subTitle="administración y control de usuarios"
              btnText="crear usuario"
              btnAction={handleModal}
            />

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
                <UsersTable />
              </Item>
            </Grid>
          </Grid>
        </Box>
        {openModal && (
          <NewUserModal isOpen={openModal} closeModal={handleModal} />
        )}
      </Section>
    </Container>
  );
}
