import React from "react"
import { Box, Container, Grid } from "@mui/material"
import TitleBar from '@/app/components/TitleBar'
import Section from "@/app/components/Section"
import { Search as SearchComponent } from "@/app/components/Users"
import { useSelector } from "react-redux"
import { StoreState } from "@/app/store"


export default function Search() {
  const { common } = useSelector((state: StoreState) => state);
  const { currentCountry, currentInstitution, profile } = common;
  return (
    <Container>
      <Section>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={8}>
            <TitleBar
              title="Usuarios y roles de Autentia"
              subTitle="Buscar usuario"
            />
            <SearchComponent token={profile.token} institution={currentInstitution} country={currentCountry} />  
          </Grid>
        </Box>
      </Section>
    </Container>
  );
}
