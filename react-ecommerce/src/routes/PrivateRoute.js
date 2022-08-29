import React, { Fragment } from 'react'
import { Route, Navigate } from 'react-router-dom'
import { isAuthentificated } from '../auth/helpers'

const PrivateRoute = (props) => {
    const { path, element } = props
    return (
        <Fragment>
            <Route path={path} element={isAuthentificated() ? element : <Navigate to="/home" />} />
        </Fragment>
    )
}

export default PrivateRoute