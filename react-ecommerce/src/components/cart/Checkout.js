import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getToken, processPayment } from '../../actions/braintreeActions'
import { isAuthentificated } from '../../auth/helpers'
import DropIn from "braintree-web-drop-in-react"
import { connect } from 'react-redux'
import { emptyCart } from '../../redux/actions/cartActions'
import toastr from 'toastr'
import 'toastr/build/toastr.css'
import axios from 'axios'
import { API_URL } from '../../config'

const Checkout = (props) => {
    const [data, setData] = useState({
        braintreeToken: null,
        error: null,
        instance: null
    })
    const [address, setAddress] = useState("")
    const { products } = props
    let userId = isAuthentificated()._id
    let token = JSON.parse(localStorage.getItem('token'))
    useEffect(() => {
        getToken(userId, token).then(res => setData({ ...data, braintreeToken: res.data.token }))
            .catch(err => setData({ ...data, error: err }))
    }, [])

    const createOrder = (userId, token, orderDetails) => {
        return axios.post(`${API_URL}/orders/create/${userId}`, orderDetails, { headers: { Authorization: `Bearer ${token}` } })
    }

    let total = 0
    products.forEach(product => {
        total += product.price * product.count
    })

    const pay = () => {
        data.instance.requestPaymentMethod()
            .then(data => {
                let paymentData = {
                    amount: total,
                    paymentMethodNonce: data.nonce
                }
                processPayment(userId, token, paymentData).then(res => {
                    let orderDetails = {
                        products,
                        transaction_id: res.data.transaction.id,
                        amount: res.data.transaction.amount,
                        address
                    }
                    createOrder(userId, token, orderDetails).then(result => {
                        props.emptyCart()
                        toastr.success('Paiement done !', 'The order is done successfuly', {
                            positionClass: "toast-bottom-left"
                        })
                    })
                })
                    .catch(err => console.log(err))
            })
            .catch(err => console.log(err))
    }

    const handleAddress = (e) => {
        setAddress(e.target.value)
    }

    return (
        <div>
            <h2>Total : {total} MAD</h2>
            {
                (products.length > 0) ? (
                    isAuthentificated() ? (
                        <Fragment>
                            {
                                (data.braintreeToken !== null) ? (
                                    <Fragment>
                                        <DropIn
                                            options={{
                                                authorization: data.braintreeToken,
                                                paypal: {
                                                    flow: 'vault'
                                                }
                                            }}
                                            onInstance={(instance) => setData({ ...data, instance: instance })}
                                        />
                                        <textarea className='form-control' onChange={handleAddress} placeholder='address of delivery' rows="4"></textarea> <br />
                                    </Fragment>
                                ) : null
                            }
                            <button onClick={pay} className="btn btn-success">Pay</button>
                        </Fragment>
                    ) : (
                        <Link to="/signin"><button className="btn btn-danger">Login to Checkout</button></Link>
                    )
                ) : null
            }
        </div>
    )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = { emptyCart }

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)