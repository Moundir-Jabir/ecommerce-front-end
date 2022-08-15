import React, { useEffect, useState } from 'react'
import Layout from '../../../components/Layout'
import axios from 'axios'
import toastr from 'toastr'
import 'toastr/build/toastr.css'
import { API_URL } from '../../../config'

const AddProduct = () => {

    const [product, setProduct] = useState({ name: "", photo: "", quantity: 0, price: 0, category: "", shipping: false, description: "" })
    const [formData] = useState(new FormData())
    const [categories, setCategories] = useState([])

    const getCategories = () => {
        axios.get(`${API_URL}/category`)
            .then(res => setCategories(res.data.categories))
    }

    useEffect(getCategories, [])

    const update = (e) => {
        setProduct({
            ...product, [e.target.name]: e.target.value
        })
    }

    const upload = (e) => {
        setProduct({
            ...product, photo: e.target.files[0]
        })
    }

    const handleShipping = () => {
        setProduct({
            ...product, shipping: !product.shipping
        })
    }

    const submit = (e) => {
        e.preventDefault()
        for (let key in product) {
            formData.set(key, product[key])
        }
        const token = JSON.parse(localStorage.getItem('token'))
        axios.post(`${API_URL}/products/create`, formData, { headers: { Authorization: `Bearer ${token}` } })
            .then((res) => {
                toastr.success('Created Successefuly', 'Product', {
                    positionClass: "toast-bottom-left"
                })
                setProduct({ name: "", photo: product.photo, quantity: 0, price: 0, category: "", shipping: false, description: "" })
            })
            .catch((err) => {
                if (err.response.data.error) {
                    toastr.warning(err.response.data.error, 'Sorry !', {
                        positionClass: "toast-bottom-left"
                    })
                } else {
                    toastr.warning("Problem connection", 'Sorry !', {
                        positionClass: "toast-bottom-left"
                    })
                }
            })
    }

    const { name, quantity, price, category, description, shipping } = product
    let checkbox = { checked: shipping ? "checked" : "" }
    let select = { selected: category == "" ? "selected" : "" }
    return (
        <div>
            <Layout title="Products" description="New Product" classname="container">
                <div className="row">
                    <div className="col-md-6 mx-auto">
                        <form onSubmit={submit}>
                            <div className="mb-3">
                                <label for="photo" className="form-label">Photo</label>
                                <input required onChange={upload} className="form-control" name='photo' type="file" id="photo" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Name</label>
                                <input required onChange={update} name='name' value={name} type="text" className="form-control" id="name" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="quantity" className="form-label">Quantity</label>
                                <input required onChange={update} name='quantity' value={quantity} type="number" className="form-control" id="quantity" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="price" className="form-label">Price</label>
                                <input required onChange={update} name='price' value={price} type="number" className="form-control" id="price" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="category" className="form-label">Category</label>
                                <select onChange={update} id='category' name='category' className="form-select">
                                    <option {...select} value="">Select category</option>
                                    {
                                        categories.map(category => (
                                            <option value={category._id}>{category.name}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className="form-check mb-3">
                                <input onChange={handleShipping} {...checkbox} name='shipping' className="form-check-input" type="checkbox" id="shipping" />
                                <label className="form-check-label" htmlFor='shipping'>Shipping</label>
                            </div>
                            <div className="mb-3">
                                <label htmlFor='description' className="form-label">Description</label>
                                <textarea onChange={update} className="form-control" id="description" name='description' value={description} rows="3"></textarea>
                            </div>
                            <button type='submit' className="btn btn-success">Add Product</button>
                        </form>
                    </div>
                </div>
            </Layout>
        </div>
    )
}

export default AddProduct