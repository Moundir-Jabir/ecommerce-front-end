import React from 'react'
import { Link } from 'react-router-dom'
import Layout from '../components/Layout'

const NotFound = () => {
  return (
    <Layout title="Page not found" classname="container">
      <Link to="/"> <span>return to home page</span> </Link>
    </Layout>
  )
}

export default NotFound