import React from 'react'
import { Navigate } from 'react-router-dom';
import useAppContext from './context/AppContext'

export function PrivateRoute ({ children }){
    const {isLoggedIn} = useAppContext();
    if(!isLoggedIn) {
        return <Navigate to= '/login'/>
    }
    return children
}

