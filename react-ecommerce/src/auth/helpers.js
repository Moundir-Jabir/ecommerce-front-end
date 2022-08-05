export const isAuthentificated = () => {
    let token = localStorage.getItem('token')
    let user = localStorage.getItem('user_info')
    if (token)
        return JSON.parse(user)
    return false
}