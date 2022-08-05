import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { isAuthentificated } from './auth/helpers'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import Dashboard from './pages/users/Dashboard'
import Signin from './pages/users/Signin'
import Signup from './pages/users/Signup'

const Router = () => {
    return (
        <Routes>
            <Route path='/' element={<Navigate to="/home" />} />
            <Route path='/home' element={isAuthentificated() ? <Home /> : <Navigate to="/signin" />} />
            <Route path='/dashboard' element={isAuthentificated() ? <Dashboard /> : <Navigate to="/signin" />} />
            <Route path='/signin' element={isAuthentificated() ? <Navigate to="/home" /> : <Signin />} />
            <Route path='/signup' element={isAuthentificated() ? <Navigate to="/home" /> : <Signup />} />
            <Route path='*' element={<NotFound />} />
        </Routes>
    )
}

export default Router