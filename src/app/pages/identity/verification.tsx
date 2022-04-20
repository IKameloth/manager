import React from "react";
import { Container, Grid, Box } from "@mui/material";
import Section from "@/app/components/Section";
import {VerificationForm} from "@/app/components/Identity";
import { MotionContainer } from "@/app/components/Motion";

export default function verificacion() {
  return (
    <Container>
      <MotionContainer>
        <Section>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={6}>
              <VerificationForm/>
            </Grid>
          </Box>
        </Section>
      </MotionContainer>
    </Container>
  );
}
