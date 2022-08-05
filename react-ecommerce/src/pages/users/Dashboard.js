import React, { Fragment } from 'react'
import { isAuthentificated } from '../../auth/helpers'
import AdminDashboard from './AdminDashboard'
import ClientDashboard from './ClientDashboard'

const Dashboard = () => {

    const { role } = isAuthentificated()

    return (
        <Fragment>
            {
                role ? <AdminDashboard /> : <ClientDashboard />
            }
        </Fragment>
    )
}

export default Dashboard