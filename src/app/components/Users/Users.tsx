import React, { useState, useEffect } from "react"
import { Box, Grid, Typography } from "@material-ui/core"
import { Item } from "@/app/components/Item"
import UsersTable from "./UsersTable"
import { useSelector, useDispatch } from "react-redux"
import { StoreState } from "@/app/store"
import { setUsersList } from "@/app/store/common"

function Users() {
  const dispatcher = useDispatch()
  const { common } = useSelector((state: StoreState) => state)
  const { usersList, profile, currentCountry, currentInstitution } = common
  const [isLoading, setIsLoading] = useState(true)
  const [dataTable, setDataTable] = useState(usersList)

    const getAsyncUserList = async () => {
        setIsLoading(true)
        await dispatcher(setUsersList(profile.token, currentCountry, currentInstitution))
        setIsLoading(false)
    }

    useEffect(() => {
        getAsyncUserList()
    }, [currentCountry, currentInstitution])

    const changePage = async (offset:number) => {
        setIsLoading(true)
        await dispatcher(setUsersList(profile.token, currentCountry, currentInstitution, offset))
        setIsLoading(false)
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
      <Item>
        {!usersList.data.length ? (
          <Box alignItems="center" justifyContent="center" display="flex">
            <Typography variant="subtitle1">
              No se encuentran registros
            </Typography>
          </Box>
        ) : (
          <UsersTable changePage={changePage} isLoading={isLoading} usersList={usersList} />
        )}
      </Item>
    </Grid>
  )
}

export default Users
