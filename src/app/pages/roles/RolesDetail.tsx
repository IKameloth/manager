import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Grid, Box } from "@material-ui/core";
import { NewRoleModal, UserCard } from "@/app/components/Admin";
import { TitleBar } from "@/app/components/Admin";
import Section from "@/app/components/Section";
import { MotionContainer } from "@/app/components/Motion";
import ShowRoles from "@/app/components/Admin/Roles/User/ShowRoles";

interface RouteParams {
  userId: string;
}

export default function RolesDetail() {
  const [isOpen, setIsOpen] = useState(false);
  const { userId } = useParams<RouteParams>();

  const handleCreateRoleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Container>
      <MotionContainer>
        <Section>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={6}>
              <TitleBar
                title="roles"
                subTitle="administración y control de roles"
                btnText="crear rol"
                btnAction={handleCreateRoleModal}
              />
              <UserCard />
              <ShowRoles userId={userId} />
            </Grid>
          </Box>
          {isOpen && (
            <NewRoleModal
              isOpen={isOpen}
              onCloseModal={handleCreateRoleModal}
            />
          )}
        </Section>
      </MotionContainer>
    </Container>
  );
}
