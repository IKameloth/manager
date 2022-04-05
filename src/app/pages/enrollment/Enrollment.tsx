import React, { useEffect, useState } from "react";
import { Container, Grid, Paper, Typography } from '@material-ui/core';
import TitleBarWithoutButton from "@/app/components/TitleBarWithoutButton";
import FormEnrollment from "@/app/components/Enrollment/FormEnrollment";

export default function Institutions() {
  const [isMinimized, setIsMinimized] = useState<boolean>(false);
  return(
    <Container>
      <Grid container spacing={8}>
          <TitleBarWithoutButton
            title="Enrolamiento"
          />
            <FormEnrollment
              isMinimized={isMinimized}
            />
        </Grid>
    </Container>
  );
};
