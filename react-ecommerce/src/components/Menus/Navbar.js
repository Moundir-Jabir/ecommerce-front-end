import React, { Fragment } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { API_URL } from '../../config'
import axios from 'axios'
import toastr from 'toastr'
import 'toastr/build/toastr.css'
import { isAuthentificated } from '../../auth/helpers'

const Navbar = () => {

    const navigate = useNavigate()

    const logout = () => {
        axios.get(`${API_URL}/signout`)
            .then(() => {
                toastr.success('Logout successefuly', 'Logout', {
                    positionClass: "toast-bottom-left"
                })
                localStorage.removeItem('user_info')
                localStorage.removeItem('token')
                navigate('/signin')
            })
    }

    return (
        <nav className="navbar navbar-dark navbar-expand-lg bg-success">
            <div className="container-fluid">
                <Link to="/" className="navbar-brand">E-Commerce</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        {
                            isAuthentificated() ? (
                                <Fragment>
                                    <li className="nav-item">
                                        <NavLink to="/home" className="nav-link" aria-current="page">Home</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to="/dashboard" className="nav-link" aria-current="page">Dashboard</NavLink>
                                    </li>
                                </Fragment>
                            ) : null
                        }
                    </ul>
                    <ul className="navbar-nav mr-auto mb-2 mb-lg-0">
                        {
                            isAuthentificated() ? (<li className="nav-item">
                                <span onClick={logout} style={{ cursor: "pointer" }} className="nav-link">Logout</span>
                            </li>) : (
                                <Fragment>
                                    <li className="nav-item">
                                        <NavLink to="/signin" className="nav-link">Login</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to="/signup" className="nav-link">Register</NavLink>
                                    </li>
                                </Fragment>
                            )
                        }
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar