import React, { useState } from 'react'
import Layout from '../../../components/Layout'
import axios from 'axios'
import toastr from 'toastr'
import 'toastr/build/toastr.css'
import { API_URL } from '../../../config'

const AddCategory = () => {

    const [category, setCategory] = useState({ name: "" })

    const update = (e) => {
        setCategory({
            name: e.target.value
        })
    }

    const submit = (e) => {
        e.preventDefault()
        const token = JSON.parse(localStorage.getItem('token'))
        axios.post(`${API_URL}/category/create`, category, {headers: { Authorization: `Bearer ${token}` } })
            .then((res) => {
                toastr.success('Created Successefuly', 'Category', {
                    positionClass: "toast-bottom-left"
                })
                setCategory({name: ""})
            })
            .catch((err) => {
                console.log(err.response)
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

    const { name } = category
    return (
        <div>
            <Layout title="Categories" description="New Category" classname="container">
                <div className="row">
                    <div className="col-md-6 mx-auto">
                        <form onSubmit={submit}>
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Name of Category</label>
                                <input required onChange={update} name='name' value={name} type="text" className="form-control" id="name" />
                            </div>
                            <button type='submit' className="btn btn-success">Add Category</button>
                        </form>
                    </div>
                </div>
            </Layout>
        </div>
    )
}

export default AddCategory