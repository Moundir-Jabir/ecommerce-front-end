import {combineReducers} from 'redux'
import cartReducer from './cartReducer'
import authReducer from './authReducer'

const rootReducers = combineReducers({
    cart: cartReducer,
    auth: authReducer
})

export default rootReducers