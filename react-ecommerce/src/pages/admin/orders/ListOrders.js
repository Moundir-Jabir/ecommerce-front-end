import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { API_URL } from '../../../config'
import Layout from '../../../components/Layout'
import moment from 'moment'

const ListOrders = () => {

    const [orders, setOrders] = useState([])

    let token = JSON.parse(localStorage.getItem('token'))

    const getOrders = (token) => {
        axios.get(`${API_URL}/orders`, { headers: { Authorization: `Bearer ${token}` } })
            .then(res => setOrders(res.data))
            .catch(err => console.log(err))
    }

    useEffect(() => {
        getOrders(token)
    }, [])

    return (
        <div>
            <Layout title="Orders" description="List of all orders" classname="container">
                <div className="row">
                    <div className="col-md-6 mx-auto">
                        <div className="alert alert-info text-center my-5">
                            Total of orders : {orders.length}
                        </div>
                        {
                            orders.map(order => (
                                <div key={order._id} className="my-5">
                                    <ul className="list-group">
                                        <li className="list-group-item active"><strong>Transaction id : </strong>{order.transaction_id}</li>
                                        <li className="list-group-item"><strong>Amount : </strong>{order.amount} MAD</li>
                                        <li className="list-group-item"><strong>Status : </strong>{order.status}</li>
                                        <li className="list-group-item"><strong>Ordered on : </strong>{moment(order.createdAt).fromNow()}</li>
                                        <li className="list-group-item"><strong>Customer : </strong>{order.user.name}</li>
                                        <li className="list-group-item"><strong>Delivery address : </strong>{order.address}</li>
                                    </ul>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </Layout>
        </div>
    )
}

export default ListOrders