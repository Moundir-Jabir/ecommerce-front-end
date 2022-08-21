import axios from 'axios'
import {API_URL} from '../config'

export const getProducts = (sortBy, order, limit) => {
    return axios.get(`${API_URL}/products?sortBy=${sortBy}&order=${order}&limit=${limit}`)
}

export const getOneProduct = (id) => {
    return axios.get(`${API_URL}/products/${id}`)
}

export const getFilterProducts = (filters, skip, limit, sortBy="", order="") => {
    return axios.post(`${API_URL}/products/search?sortBy=${sortBy}&order=${order}&limit=${limit}`, {filters, skip})
}

export const getRelatedProducts = (id) => {
    return axios.get(`${API_URL}/products/related/${id}`)
}