import axios from 'axios'
import {API_URL} from '../config'

export const getToken = (id, token) => {
    return axios.get(`${API_URL}/braintree/getToken/${id}`, { headers: { Authorization: `Bearer ${token}` } })
}

export const processPayment = (id, token, paymentData) => {
    return axios.post(`${API_URL}/braintree/purchase/${id}`, paymentData, { headers: { Authorization: `Bearer ${token}` } })
}