import React, { useState } from 'react'
import Layout from '../../components/Layout'
import { API_URL } from '../../config'
import axios from 'axios'
import toastr from 'toastr'
import 'toastr/build/toastr.css'
import { useNavigate } from 'react-router-dom'
import { connect } from 'react-redux'
import { login } from '../../redux/actions/authActions'

const Signin = (props) => {

  const navigate = useNavigate()

  const [user, setUser] = useState({
    email: "", password: ""
  })

  const submit = (e) => {
    e.preventDefault()
    axios.post(`${API_URL}/signin`, user)
      .then((res) => {
        toastr.success('User logged successfuly', 'Login', {
          positionClass: "toast-bottom-left"
        })
        props.login(res.data.user, res.data.token)
        navigate('/dashboard')
      })
      .catch((err) => {
        if (err.response.data.erreur) {
          toastr.warning(err.response.data.erreur, 'Please Check form !', {
            positionClass: "toast-bottom-left"
          })
        } else {
          toastr.warning("Problem connection", 'Sorry !', {
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

  const { email, password } = user
  return (
    <div>
      <Layout title="Sign In" description="Sign In MERN stack e-commerce app" classname="container">
        <h2>Sign in</h2>
        <div className='row justify-content-center'>
          <form className='col-lg-6 col-sm-10' onSubmit={submit}>
            <div class="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input name='email' value={email} onChange={update} type="email" className="form-control" id="email" />
            </div>
            <div class="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input name='password' value={password} onChange={update} type="password" className="form-control" id="password" />
            </div>
            <button className='btn btn-success' type='submit'>Login</button>
          </form>
        </div>
      </Layout>
    </div>
  )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {login}

export default connect(mapStateToProps, mapDispatchToProps)(Signin)