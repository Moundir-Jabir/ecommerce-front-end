import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import { getProducts } from '../actions/productActions'
import Product from '../components/product/Product'

const Home = () => {
  const [bestSellers, setBestSellers] = useState([])
  const [arrivals, setArrivals] = useState([])

  useEffect(() => {
    getBestSellers()
    getArrivals()
  }, [])

  const getBestSellers = () => {
    getProducts('sold', 'desc', 6).then(res => setBestSellers(res.data.products))
  }

  const getArrivals = () => {
    getProducts('createdAt', 'desc', 3).then(res => setArrivals(res.data.products))
  }

  return (
    <div>
      <Layout title="Home Page" description="MERN stack e-commerce app" classname="container">
        <h2>Arrival Products</h2>
        <div className='row justify-content-center'>
          {
            arrivals.map(product => (
              <Product key={product._id} data={product} className='card col-md-3 m-2' showBtnDetail={true} />
            ))
          }
        </div>
        <hr />
        <h2>Best Sellers</h2>
        <div className='row justify-content-center'>
          {
            bestSellers.map(product => (
              <Product key={product._id} data={product} className='card col-md-3 m-2' showBtnDetail={true} />
            ))
          }
        </div>
      </Layout>
    </div>
  )
}

export default Home