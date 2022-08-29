let token = JSON.parse(localStorage.getItem('token')) || false
let user = JSON.parse(localStorage.getItem('user_info')) || false

let myState = {
    token, user
}

const authReducer = (state = myState, action) => {
    switch (action.type) {
        case "SET_USER":
            return {
                ...state, token: action.payload.token, user: action.payload.user
            }
        default:
            return state
    }
}

export default authReducer