import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getOneProduct } from '../../actions/productActions'
import Layout from '../../components/Layout'
import Product from '../../components/product/Product'

const ProductDetails = () => {
    const [product, setProduct] = useState({ category: { name: "" } })
    let { id } = useParams()
    useEffect(() => {
        getOneProduct(id).then(res => setProduct(res.data.product))
    })
    const { name, description } = product
    return (
        <Layout title={name} description={description} classname="container">
            <div className='row justify-content-center'>
                <Product data={product} className='col-5 card' showBtnDetail={false} />
            </div>
        </Layout>
    )
}

export default ProductDetails