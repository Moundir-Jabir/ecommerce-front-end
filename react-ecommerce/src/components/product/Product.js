import React from 'react'
import { Link } from 'react-router-dom'
import { API_URL } from '../../config'
import moment from 'moment'

const Product = (props) => {
    const { data, className, showBtnDetail } = props
    const { _id, name, price, description, category, createdAt, quantity } = data
    let src = `${API_URL}/products/photo/${_id}`
    let stock = (quantity == 0) ? "Out of stock" : `${quantity} in stock`
    return (
        <div className={className}>
            <img style={{ width: "40%", margin: 'auto' }} className='card-img-top' src={src} alt={name} />
            <div className='card-body'>
                <h3>{name}</h3>
                <p>{description}</p>
                <div>
                    <h4><span className='badge text-bg-primary'>{price} MAD</span></h4>
                    <h4><span className='badge rounded-pill text-bg-success'>{category.name}</span></h4>
                </div>
                {
                    showBtnDetail ? (
                        <Link to={`/productDetails/${_id}`}><button className='btn btn-warning'>Details</button></Link>
                    ) : null
                }
                {
                    quantity > 0 ? (
                        <button className='btn btn-success'>Add to Cart</button>
                    ) : null
                }
                <div>
                    <span>{stock}</span> <br />
                    <span>Added {moment(createdAt).fromNow()}</span>
                </div>
            </div>
        </div>
    )
}

export default Product