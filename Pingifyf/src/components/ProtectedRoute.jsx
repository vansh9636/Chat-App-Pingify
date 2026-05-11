import React, { use, useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { Context } from '../context/Context'
import Loading from './Loading'

const ProtectedRoute = ({ children }) => {
    const { userdata, loading } = useContext(Context)

    if (loading) {
        return <Loading />
    }
    return userdata ? (children) : (<Navigate to="/login" />)


}

export default ProtectedRoute