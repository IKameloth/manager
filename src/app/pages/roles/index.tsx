import React, { useEffect, useState } from 'react';
import { Box, Container, Grid } from '@material-ui/core';
import { TitleBar, NewUserModal, UsersTable } from '@/app/components/Admin';
import Section from '@/app/components/Section';
import { Item } from '@/app/components/Item';

import { useSelector, useDispatch } from 'react-redux';
import { StoreState } from '@/app/store';
import { getUsersList, createUser } from '@/app/store/user/operations';

export default function RoleList() {
    const dispatch = useDispatch()
    const [openModal, setOpenModal] = useState(false)
    const userStore = useSelector((state: StoreState) => state.user)
    const { users } = userStore

    useEffect(() => {
        if (users?.length === 0) {
            dispatch(getUsersList())
        }
    }, [])

    useEffect(() => {
        if (users?.length === 0) {
            dispatch(getUsersList())
        }
    }, [users])
    
    const handleModal = () => {
        setOpenModal(!openModal)
    }

    const handleRegister = (name: string, dni: string, email: string) => {
        dispatch(createUser(name, dni, email))
        setOpenModal(false)
    }

    return (
        <Container>
            <Section>
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={8}>
                        <TitleBar title="usuarios" subTitle="administración y control de usuarios" btnText="crear usuario" btnAction={handleModal} />
                    
                        <Grid item xs={12} md={12} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Item>
                                {users.length > 0 && <UsersTable data={users} loading={!users.length ? true : false} />}
                            </Item>
                        </Grid>
                    </Grid>
                </Box>
                { openModal && <NewUserModal isOpen={openModal} closeModal={handleModal} onRegister={handleRegister} /> }
            </Section>
        </Container>
    );
};