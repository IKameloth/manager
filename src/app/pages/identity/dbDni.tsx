import React from "react";
import { Container, Grid, Box } from "@mui/material";
import Section from "@/app/components/Section";
import {DbDniForm} from "@/app/components/Identity";
import { MotionContainer } from "@/app/components/Motion";

export default function dbDni() {
  return (
    <Container>
      <MotionContainer>
        <Section>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={6}>
              <DbDniForm/>
            </Grid>
          </Box>
        </Section>
      </MotionContainer>
    </Container>
  );
}