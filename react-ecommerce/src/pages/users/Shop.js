import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import axios from 'axios'
import { API_URL } from '../../config'
import FilterByCategory from '../../components/product/FilterByCategory'
import FilterByPrice from '../../components/product/FilterByPrice'
import { getFilterProducts } from '../../actions/productActions'
import Product from '../../components/product/Product'
import Search from '../../components/product/Search'

const Shop = () => {

    const [categories, setCategories] = useState([])
    const [filters, setFilters] = useState({
        category: [],
        price: [],
        search: ""
    })
    const [skip, setSkip] = useState(0)
    const [limit, setLimit] = useState(3)
    const [products, setProducts] = useState([])

    const getCategories = () => {
        axios.get(`${API_URL}/category`)
            .then(res => setCategories(res.data.categories))
    }

    useEffect(getCategories, [])
    useEffect(() => {
        getFilterProducts(filters, skip, limit)
            .then(res => setProducts(res.data.products))
    }, [filters])

    const handleFilters = (filterBy, data) => {
        setFilters({
            ...filters, [filterBy]: data
        })
        setSkip(0)
    }

    const loadMore = () => {
        setSkip(skip + limit)
        getFilterProducts(filters, skip + limit, limit)
            .then(res => setProducts([...products, ...res.data.products]))
    }

    return (
        <Layout title="Shop page" description="choice your favorite product in our store" classname="container">
            <div className="row">
                <div className="col-md-3">
                    <FilterByCategory handleFilters={handleFilters} categories={categories} /> <hr />
                    <FilterByPrice handleFilters={handleFilters} />
                </div>
                <div className="col-md-9 row justify-content-center">
                    <Search handleFilters={handleFilters} />
                    {
                        products.map(product => (
                            <Product key={product._id} data={product} className='card col-lg-4 col-md-6' showBtnDetail={true} />
                        ))
                    }
                    {
                        (skip + limit) <= products.length ? (<button style={{ width: "130px", margin: "30px" }} onClick={loadMore} className='btn btn-success'>Load More</button>) : null
                    }
                </div>
            </div>
        </Layout>
    )
}

export default Shop