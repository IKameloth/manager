import React, { useState, useEffect } from "react";
import { StoreState } from "@/app/store";
import { useSelector, useDispatch } from "react-redux";
import UserCard from "./UserCard";
import NewRoleModal from "../NewRoleModal";
import { getAllRolesByUser, getUser } from "@/app/store/admin";
import TitleBar from "../TitleBar";
import ShowRoles from "./ShowRoles";
import { Box, Grid, Typography } from "@material-ui/core";
import { Item } from "@/app/components/Item";
import RolesTable from "./RoleTable";

interface Props {
  userId: string;
}

export default function UserRoles({ userId }: Props) {
  const dispatcher = useDispatch();
  const { admin, common } = useSelector((state: StoreState) => state);
  const { rolesList, user } = admin;
  const { currentCountry, currentInstitution } = common;

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [rolesData, setRolesData] = useState(rolesList);
  const [userInfo, setUserInfo] = useState(user);

  useEffect(() => {
    dispatcher(getUser(userId));
    dispatcher(getAllRolesByUser(userId));
  }, []);

  useEffect(() => {
    console.log("update role list");
    setRolesData(rolesList);
  }, [rolesList]);

  useEffect(() => {
    setUserInfo(user);
  }, [user]);

  const handleCreateRoleModal = () => {
    setIsOpenModal(!isOpenModal);
  };

  return (
    <>
      <TitleBar
        title="roles"
        subTitle="administración y control de roles"
        btnText="crear rol"
        btnAction={handleCreateRoleModal}
      />
      {!!userInfo && <UserCard userData={userInfo} />}
      {!!rolesData && (
        <Grid item xs={12} md={8}>
          <Item>
            {!rolesData?.length ? (
              <Box alignItems="center" justifyContent="center" display="flex">
                <Typography variant="subtitle1">
                  No se encuentran registros
                </Typography>
              </Box>
            ) : (
              <RolesTable isLoading={false} data={rolesData} />
            )}
          </Item>
        </Grid>
      )}
      {isOpenModal && (
        <NewRoleModal
          isOpen={isOpenModal}
          country={currentCountry}
          institution={currentInstitution}
          userDni={userInfo?.dni}
          userId={userId}
          onCloseModal={handleCreateRoleModal}
        />
      )}
    </>
  );
}
