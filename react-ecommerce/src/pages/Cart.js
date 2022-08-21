import React from 'react'
import { connect } from 'react-redux'
import Checkout from '../components/cart/Checkout'
import Layout from '../components/Layout'
import { API_URL } from '../config'
import { updateCount, removeProduct } from '../redux/actions/cartActions'

export const Cart = (props) => {

    const plus = (product) => {
        if(product.count < product.quantity){
            product.count++
            props.updateCount(product)
        }
    }

    const minus = (product) => {
        if(product.count > 1){
            product.count--
            props.updateCount(product)
        }
    }

    const remove = (id) => {
        props.removeProduct(id)
    }
    
    const { products } = props
    return (
        <Layout title='Cart' description="List of product selected" classname="container">
            <div className='row'>
                <div className="col-md-9 table-responsive">
                    <table className="table align-middle">
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Quantity</th>
                                <th>Unit price</th>
                                <th>Total</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                products.map(product => (
                                    <tr key={product._id}>
                                        <td><img style={{ width: "100px" }} src={`${API_URL}/products/photo/${product._id}`} /></td>
                                        <td>{product.name}</td>
                                        <td><i style={{cursor: "pointer"}} className="text-primary fa-solid fa-2x fa-circle-plus" onClick={() => plus(product)}></i> <span style={{margin: "20px"}}>{product.count}</span> <i style={{cursor: "pointer"}} className="fa-solid text-primary fa-2x fa-circle-minus" onClick={() => minus(product)}></i> </td>
                                        <td>{product.price} MAD</td>
                                        <td>{product.price * product.count} MAD</td>
                                        <td><i onClick={() => remove(product._id)} style={{cursor: "pointer"}} className="text-danger fa-solid fa-trash"></i></td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
                <div className="col-md-3">
                    <Checkout products={products} />
                </div>
            </div>
        </Layout>
    )
}

const mapStateToProps = (state) => ({
    products: state.cart.products
})

const mapDispatchToProps = {updateCount, removeProduct}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)