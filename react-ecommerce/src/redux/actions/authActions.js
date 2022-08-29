export const login = (user, token) => {
    localStorage.setItem('user_info', JSON.stringify(user))
    localStorage.setItem('token', JSON.stringify(token))
    return {
        type: 'SET_USER',
        payload: {
            user, token
        }
    }
}

export const logout = () => {
    localStorage.removeItem('user_info')
    localStorage.removeItem('token')
    return {
        type: 'SET_USER',
        payload: {
            user: false,
            token: false
        }
    }
}