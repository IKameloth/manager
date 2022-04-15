import React, { useState, useEffect } from "react"
import { Box, Grid, Typography } from "@mui/material"
import { Item } from "@/app/components/Item"
import UsersTable from "./UsersTable"
import { useSelector, useDispatch } from "react-redux"
import { StoreState } from "@/app/store"
import { setUsersList } from "@/app/store/common"
import Loader from '@/app/components/Loader'

type UserProps = {
  setAddRole: (addRole: boolean) => void
}

const Users = ({setAddRole}:UserProps) => {
  const dispatcher = useDispatch()
  const { common } = useSelector((state: StoreState) => state)
  const { usersList, profile, currentCountry, currentInstitution } = common
  const [isLoading, setIsLoading] = useState(true)
  const [pages, setPages] = useState([0])

    const getAsyncUserList = async () => {
        setIsLoading(true)
        await dispatcher(setUsersList(profile.token, currentCountry, currentInstitution))
        setIsLoading(false)
    }

    useEffect(() => {
        getAsyncUserList()
    }, [currentCountry, currentInstitution])

    const changePage = async (page: number, offset: number) => {
        setIsLoading(true)
        console.log(page, pages)
        if(pages.length - 1 > page){
          await dispatcher(setUsersList(profile.token, currentCountry, currentInstitution, pages[page]))
        }else{
          let pagesArr = pages
          pagesArr.push(offset)
          setPages(pagesArr)
          await dispatcher(setUsersList(profile.token, currentCountry, currentInstitution, offset))
        }
        setIsLoading(false)
    }

    if(isLoading){
      return(
        <Loader />
      )
    }

  return (
    <Grid
      item
      xs={12}
      md={12}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Item delay={1}>
        {!usersList.data.length ? (
          <Box alignItems="center" justifyContent="center" display="flex">
            <Typography variant="subtitle1">
              No se encuentran registros
            </Typography>
          </Box>
        ) : (
          <UsersTable setAddRole={setAddRole} token={profile.token} changePage={changePage} isLoading={isLoading} usersList={usersList} />
        )}
      </Item>
    </Grid>
  )
}

export default Users
