import React, { useEffect, useState } from "react"
import { Box, Container, Grid } from "@material-ui/core"
import TitleBar from '@/app/components/TitleBar'
import Section from "@/app/components/Section"
import { Search as SearchComponent } from "@/app/components/Users"
import AddIcon from "@material-ui/icons/Add"
import SearchIcon from "@material-ui/icons/Search"
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
