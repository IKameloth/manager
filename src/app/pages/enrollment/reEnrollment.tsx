import React, { useState } from "react";
import { Container, Grid } from "@mui/material";
import TitleBarWithoutButton from "@/app/components/TitleBarWithoutButton";
import FormReEnrollment from "@/app/components/Enrollment/FormReEnrollment";

export default function Institutions() {
  const [isMinimized, setIsMinimized] = useState<boolean>(false);
  return (
    <Container>
      <Grid container spacing={8}>
        <TitleBarWithoutButton title="Re-Enrolamiento" />
        <FormReEnrollment isMinimized={isMinimized} />
      </Grid>
    </Container>
  );
}
