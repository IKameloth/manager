import React, { useState, useEffect } from "react"
import { StoreState } from "@/app/store"
import { useSelector, useDispatch } from "react-redux"
import UserCard from "./UserCard"
import NewRoleModal from "../NewRoleModal"
import { getAllRolesByUser } from "@/app/store/admin"
import TitleBar from "../TitleBar"
import { Box, Grid, Typography } from "@mui/material"
import { Item } from "@/app/components/Item"
import RolesTable from "./RoleTable"
import { setCountries, setInstitList } from "@/app/store/common/operations"
import Loader from "@/app/components/Loader"
import { UserType } from "@/app/types"

interface Props {
  userId: string
}

export default function UserRoles({ userId }: Props) {
  const dispatcher = useDispatch()
  const { admin, common } = useSelector((state: StoreState) => state);
  const { rolesList } = admin;
  const { institutions, countries, profile, currentCountry } = common;

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [rolesData, setRolesData] = useState(rolesList);
  const [isLoading, setIsLoading] = useState(false);
  const [userInfo, setUserInfo] = useState({});

  const getAllDataUser = () => {
    setIsLoading(true);
    dispatcher(getAllRolesByUser(userId, profile.token));
    dispatcher(setCountries(profile.token));
    dispatcher(setInstitList(currentCountry, profile.token));
    setIsLoading(false);
  };

  useEffect(() => {
    getAllDataUser();
  }, []);

  useEffect(() => {
    setRolesData(rolesList);
  }, [rolesList]);

  const handleCreateRoleModal = () => {
    setIsOpenModal(!isOpenModal);
  };

  const handleUserInfo = (userData?: UserType) => {
    userData && setUserInfo(userData);
  };

  return (
    <>
      <TitleBar
        title="roles"
        subTitle="administración y control de roles"
        btnText="crear rol"
        btnAction={handleCreateRoleModal}
      />
      <Grid item xs={12} md={4}>
        <Box alignItems="center" justifyContent="center" display="flex">
          <UserCard
            userID={userId}
            token={profile.token}
            returnUser={handleUserInfo}
          />
        </Box>
      </Grid>
      <Grid item xs={12} md={8}>
        <Item>
          {isLoading ? (
            <Box
              alignItems="center"
              justifyContent="center"
              display="flex"
              height={455}
            >
              <Loader />
            </Box>
          ) : !rolesData?.length ? (
            <Box alignItems="center" justifyContent="center" display="flex">
              <Typography variant="subtitle1">
                No se encuentran registros
              </Typography>
            </Box>
          ) : (
            <RolesTable
              isLoading={isLoading}
              data={rolesData}
              token={profile.token}
            />
          )}
        </Item>
      </Grid>
      {isOpenModal && (
        <NewRoleModal
          isOpen={isOpenModal}
          countryList={countries}
          institList={institutions}
          userInfo={userInfo}
          onCloseModal={handleCreateRoleModal}
          rolesData={rolesData}
          token={profile.token}
        />
      )}
    </>
  );
}
