import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Grid, makeStyles, Box } from "@material-ui/core";
import { NewRoleModal, RolesTable } from "@/app/components/Admin";
import { TitleBar, UserCard } from "@/app/components/Admin";
import Section from '@/app/components/Section';
import { Item } from "@/app/components/Item";

import { Redirect } from "react-router";
import { useSelector, useDispatch } from 'react-redux'
import { getUser } from "@/app/store/user/operations";
import { StoreState } from "@/app/store";

const useStyles = makeStyles((theme) => ({
    paper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        maxWidth: 900,
        borderRadius: '10px',
        boxShadow: '0px 9px 18px rgba(0, 0, 0, 0.18), 0px 5.5px 5px rgba(0, 0, 0, 0.24)',
    },
    container: {
        alignItems: 'center',
        margin: '9px 25px 8px 25px'
    },
    miniTable: {
        marginTop: 15,
        border: 'none',
        height: 120,
    },
    table: {
        border: 'none',
        height: 434,
        '& .MuiDataGrid-columnHeaderTitleContainer': {
            padding: 0
        },
        '& .MuiDataGrid-columnsContainer': {
          padding: '10px',
          color: 'rgba(0, 0, 0, 0.55)',
        },
        '& .MuiDataGrid-iconSeparator': {
          display: 'none',
        },
        '& .MuiFormControl-root': {
          width: 180,
          height: 36,
          padding: '6px 9px 6px 8px',
          borderRadius: 10,
          marginTop: theme.spacing(1),
          color: '#1A75FF',
        },
        '& .MuiDataGrid-footerContainer': {
          justifyContent: 'center',
        },
        '& .MuiTablePagination-root': {
          color: 'rgba(0, 0, 0, 0.55)',
        },
        '& .MuiDataGrid-columnHeaderDraggableContainer': {
          width: 'auto',
        },
        '& .MuiDataGrid-columnSeparator': {
          display: 'none',
        },
        '& .MuiDataGrid-main': {
          marginTop: theme.spacing(1),
        },
        '& .MuiChip-deleteIcon': {
            color: '#FF0000',
        },
        '& .MuiChip-label': {
            fontWeight: 'bold',
            fontSize: 13,
        },
        '& .MuiAutocomplete-input': {
            backgroundColor: "#FFFFFF"
        },
    },
}));

interface RouteParams {
    dni: string
}

export default function RolesDetail() {
    const classes = useStyles();
    const [isOpen, setIsOpen] = useState(false)
    
    const dispatch = useDispatch()
    const { dni } = useParams<RouteParams>();
    const userStore = useSelector((state: StoreState) => state.user)
    const { user } = userStore
    
    useEffect(() => {
        dispatch(getUser(dni))
    }, [])
    
    const handleCreateRoleModal = () => {
        setIsOpen(!isOpen)
    }
    
    if (!user) {
        return <Redirect to="/roles" /> // mandar 404 page
    }

    return (
        <Container>
            <Section>
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={8}>

                        <TitleBar title="roles" subTitle="administración y control de roles" btnText="crear rol" btnAction={handleCreateRoleModal} />

                        <UserCard 
                            status={true} 
                            dni={user.dni} 
                            name={user.name} 
                            email={user.email} 
                            institution={"Desconocido"} 
                            job="Desconocido" 
                            registeredDate={user.CreatedAt} 
                        />

                        <Grid item xs={12} md={8} >
                            <Item>
                                {user && <RolesTable data={user.roles} />}
                            </Item>
                        </Grid>
                    </Grid>
                </Box>
                { isOpen && <NewRoleModal isOpen={isOpen} onCloseModal={handleCreateRoleModal} /> }
            </Section>
        </Container>
    );
};
