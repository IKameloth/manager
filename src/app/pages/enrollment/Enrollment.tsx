import React, { useState } from "react";
import { Container, Grid } from '@mui/material';
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
