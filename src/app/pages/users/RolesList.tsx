import React, { useEffect, useState } from "react"
import { Box, Container, Grid } from "@material-ui/core"
import TitleBar from '@/app/components/TitleBar'
import Section from "@/app/components/Section"
import { Users, AddRole } from "@/app/components/Users"
import AddIcon from "@material-ui/icons/Add"
import SearchIcon from "@material-ui/icons/Search"
import { useParams } from "react-router-dom"

type PageParams = {
  operation?: string
}

export default function RoleList() {
  let { operation } = useParams<PageParams>();
  const [addRole, setAddRole] = useState(false);

  const handleModal = () => {
    setAddRole(!addRole)
  }

  useEffect(() => {
    if(operation !== undefined){
      setAddRole(true)
    }
  },[operation])

  return (
    <Container>
      <Section>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={8}>
            <TitleBar
              title="Usuarios y roles de Autentia"
              subTitle="administración de roles de usuarios de Autentia"
              btnText={addRole?"Listar Roles":"Agregar Rol"}
              icon={addRole? <SearchIcon /> : <AddIcon />}
              btnAction={handleModal}
            />
            {addRole
              ? <AddRole />
              : <Users setAddRole={setAddRole} />
            }
          </Grid>
        </Box>
      </Section>
    </Container>
  );
}
