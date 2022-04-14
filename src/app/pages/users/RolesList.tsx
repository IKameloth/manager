import React, { useState } from "react";
import { Box, Container, Grid } from "@mui/material";
import { TitleBar, NewUserModal } from "@/app/components/Admin";
import Section from "@/app/components/Section";
import { Users } from "@/app/components/Users";

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
            <Users />
          </Grid>
        </Box>
        {openModal && (
          <NewUserModal isOpen={openModal} closeModal={handleModal} />
        )}
      </Section>
    </Container>
  );
}
