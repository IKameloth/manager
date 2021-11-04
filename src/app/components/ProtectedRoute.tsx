import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Route } from 'react-router'
import { StoreState } from '../store'

const ProtectedRoute = ({render, ...other}: any) =>{
    const { user } = useSelector((state: StoreState) => state)
    const { country, institution } = user

    return (
        <Route
            {...other}
            render={(props) =>
                (!!country.length && !!institution.length) ? <Route {...props} render={ render } /> : <Redirect to="/" />
            }
        />
    );
}

export default ProtectedRoute