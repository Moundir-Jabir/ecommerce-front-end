import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import AddCategory from './pages/admin/categories/AddCategory'
import ListOrders from './pages/admin/orders/ListOrders'
import AddProduct from './pages/admin/product/AddProduct'
import { connect } from 'react-redux'
import Cart from './pages/Cart'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import Dashboard from './pages/users/Dashboard'
import ProductDetails from './pages/users/ProductDetails'
import Shop from './pages/users/Shop'
import Signin from './pages/users/Signin'
import Signup from './pages/users/Signup'

const Router = (props) => {
    let { isAuthentificated } = props
    let isAdmin = false
    if(isAuthentificated)
        if(isAuthentificated.role == 1)
            isAdmin = true
    return (
        <Routes>
            <Route path='/' element={<Navigate to="/home" />} />
            <Route path='/home' element={<Home />} />
            <Route path='/shop' element={<Shop />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/productDetails/:id' element={<ProductDetails />} />
            <Route path='/dashboard' element={isAuthentificated ? <Dashboard /> : <Navigate to="/home" />} />
            <Route path='/signin' element={isAuthentificated ? <Navigate to="/home" /> : <Signin />} />
            <Route path='/signup' element={isAuthentificated ? <Navigate to="/home" /> : <Signup />} />
            <Route path='/category/create' element={isAdmin ? <AddCategory /> : <Navigate to="/home" />} />
            <Route path='/product/create' element={isAdmin ? <AddProduct /> : <Navigate to="/home" />} />
            <Route path='/orders' element={isAdmin ? <ListOrders /> : <Navigate to="/home" />} />
            <Route path='*' element={<NotFound />} />
        </Routes>
    )
}

const mapStateToProps = (state) => ({
    isAuthentificated: state.auth.user
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Router)