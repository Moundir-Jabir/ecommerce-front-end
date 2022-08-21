import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getOneProduct, getRelatedProducts } from '../../actions/productActions'
import Layout from '../../components/Layout'
import Product from '../../components/product/Product'

const ProductDetails = () => {
    const [product, setProduct] = useState({ category: { name: "" } })
    const [relatedProducts, setRelatedProducts] = useState([])
    let { id } = useParams()
    useEffect(() => {
        getOneProduct(id).then(res => setProduct(res.data.product))
        getRelatedProducts(id).then(res => setRelatedProducts(res.data.products))
    })
    const { name, description } = product
    return (
        <Layout title={name} description={description} classname="container">
            <div className='row justify-content-between align-items-start'>
                <Product data={product} className='col-md-8 card' showBtnDetail={false} />
                <div className='col-md-3'>
                    <h4>Related Products :</h4>
                    <div className='row'>
                    {
                        relatedProducts.map(product => (
                            <Product key={product._id} data={product} className='card col-10' showBtnDetail={true} />
                        ))
                    }
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default ProductDetails