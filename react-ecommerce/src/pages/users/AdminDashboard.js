import React from 'react'
import { Link } from 'react-router-dom'
import { isAuthentificated } from '../../auth/helpers'
import Layout from '../../components/Layout'

const AdminDashboard = () => {

    const { name, email, role } = isAuthentificated()

    return (
        <div>
            <Layout title="Dashboard" description={`Welcome ${name}`} classname="container">
                <div className="row justify-content-center">
                    <div className="col-md-3">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">{role ? 'Admin' : 'Client'} Links</h5>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item"><Link className='nav-link' to="/categorie/create">Create new categorie</Link></li>
                                    <li className="list-group-item"><Link className='nav-link' to="/product/create">Create new product</Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-9">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">{role ? 'Admin' : 'Client'} informations</h5>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item">{name}</li>
                                    <li className="list-group-item">{email}</li>
                                    <li className="list-group-item">{role ? 'Admin' : 'Client'}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </div>
    )
}

export default AdminDashboard