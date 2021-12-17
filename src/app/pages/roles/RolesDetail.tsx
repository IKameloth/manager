import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Grid, Box, Typography } from "@material-ui/core";
import { NewRoleModal, RolesTable } from "@/app/components/Admin";
import { TitleBar, UserCard } from "@/app/components/Admin";
import Section from "@/app/components/Section";
import { Item } from "@/app/components/Item";

import { Redirect } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { StoreState } from "@/app/store";
import { assignRole, setMessageAdmin, getUser } from "@/app/store/admin";
import { MotionContainer, MotionItemUp } from "@/app/components/Motion";
import { Capitalize } from "@/app/helper/Capitalize";
import ErrorAlert from "@/app/components/ErrorAlert";
import toast from "react-hot-toast";

interface RouteParams {
  userId: string;
}

export default function RolesDetail() {
  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch();
  const { userId } = useParams<RouteParams>();
  const { common } = useSelector((state: StoreState) => state);
  const { profile, currentCountry, currentInstitution } = common;
  const dispatcher = useDispatch();

  // useEffect(() => {
  //   if (!userData) {
  //     dispatch(getRolesByUserId(userId));
  //   }
  // }, []);

  const handleCreateRoleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleAssignRole = async (role: string) => {
    // message.length > 0 && dispatch(cleanMessage());
    // await dispatcher(assignRole(dni, Capitalize(role), institution, country));
    // dispatch(getUser(dni));
  };

  // useEffect(() => {
  //   !errorMessage &&
  //     message.length > 0 &&
  //     toast.success(message, { duration: 5000, position: "top-center" }) &&
  //     dispatch(cleanMessage()) &&
  //     setIsOpen(false);
  // }, [message]);

  // if (!userData) {
  //   return <Redirect to="/roles" />;
  // }

  return (
    <Container>
      <MotionContainer>
        <Section>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={6}>
              <TitleBar
                title="roles"
                subTitle="administración y control de roles"
                btnText="crear rol"
                btnAction={handleCreateRoleModal}
              />
              <UserCard
                status={false}
                dni=""
                name=""
                email=""
                institution={"Desconocido"}
                job="Desconocido"
                registeredDate=""
              />

              <Grid item xs={12} md={8}>
                <Item>
                  {/* {userData ? (
                    <RolesTable data={userData} />
                  ) : (
                    <Box
                      alignItems="center"
                      justifyContent="center"
                      display="flex"
                    >
                      <Typography variant="subtitle1">
                        No se encuentran registros
                      </Typography>
                    </Box>
                  )} */}
                </Item>
              </Grid>
            </Grid>
          </Box>
          {isOpen && (
            <NewRoleModal
              isOpen={isOpen}
              onCloseModal={handleCreateRoleModal}
              onRegister={handleAssignRole}
            />
          )}
        </Section>
        {/* {errorMessage && (
          <ErrorAlert open={!!errorMessage} message={errorMessage} />
        )} */}
      </MotionContainer>
    </Container>
  );
}
