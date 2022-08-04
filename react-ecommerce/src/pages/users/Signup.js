import React, { useState } from 'react'
import Layout from '../../components/Layout'
import axios from 'axios'
import { API_URL } from '../../config'
import toastr from 'toastr'
import 'toastr/build/toastr.css'
import { useNavigate } from 'react-router-dom'

const Signup = () => {

  const navigate = useNavigate()

  const [user, setUser] = useState({
    name: "", email: "", password: ""
  })

  const submit = (e) => {
    e.preventDefault()
    axios.post(`${API_URL}/signup`, user)
      .then((res) => {
        toastr.success('User created successfuly', 'New Account', {
          positionClass: "toast-bottom-left"
        })
        navigate('/signin')
      })
      .catch((err) => {
        if (err.response.data.erreur) {
          toastr.warning(err.response.data.erreur, 'Please Check form !', {
            positionClass: "toast-bottom-left"
          })
        } else {
          toastr.warning("This email is already used by another account", 'Sorry !', {
            positionClass: "toast-bottom-left"
          })
        }
      })
  }

  const update = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    })
  }

  const { name, email, password } = user
  return (
    <div>
      <Layout title="Sign Up" description="Sign Up MERN stack e-commerce app" classname="container">
        <h2>Sign up</h2>
        <div className='row justify-content-center'>
          <form className='col-lg-6 col-sm-10' onSubmit={submit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input name='name' value={name} onChange={update} type="text" className="form-control" id="name" />
            </div>
            <div class="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input name='email' value={email} onChange={update} type="email" className="form-control" id="email" />
            </div>
            <div class="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input name='password' value={password} onChange={update} type="password" className="form-control" id="password" />
            </div>
            <button className='btn btn-success' type='submit'>Sign up</button>
          </form>
        </div>
      </Layout>
    </div>
  )
}

export default Signup