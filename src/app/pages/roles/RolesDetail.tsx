import React from "react";
import { useParams } from "react-router-dom";
import { Container, Grid, Box } from "@material-ui/core";
import Section from "@/app/components/Section";
import { MotionContainer } from "@/app/components/Motion";
import UserRoles from "@/app/components/Admin/Roles/User/UserRoles";
import BackButton from "@/app/components/BackButton";

interface RouteParams {
  userId: string;
}

export default function RolesDetail() {
  const { userId } = useParams<RouteParams>();

  return (
    <Container>
      <MotionContainer>
        <Section>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={6}>
              <UserRoles userId={userId} />
              <BackButton path={"/roles"} />
            </Grid>
          </Box>
        </Section>
      </MotionContainer>
    </Container>
  );
}
