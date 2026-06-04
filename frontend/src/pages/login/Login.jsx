import React, { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../../components/Navbar.jsx'
import './Login.css'

function Login() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [message, setMessage] = useState('')
  const [isError, setIsError] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const response = await axios.post('/user/login', form)
      const { token, refreshToken, user } = response.data

      localStorage.setItem('token', token)
      localStorage.setItem('refreshToken', refreshToken)
      localStorage.setItem('user', JSON.stringify(user))

      setMessage(`Xush kelibsiz, ${user.name}! ✅`)
      setIsError(false)
      setTimeout(() => navigate('/my-todos'), 1200)
    } catch (error) {
      setMessage(error.response?.data?.message || "Email yoki parol noto'g'ri ❌")
      setIsError(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-page">
      <Navbar />
      <div className="auth-wrapper">
        <div className="auth-card">
          <div className="auth-header">
            <h2>Kirish</h2>
            <p>Hisobingizga kiring</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label>Email</label>
              <input
                name="email"
                type="email"
                placeholder="email@example.com"
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Parol</label>
              <input
                name="password"
                type="password"
                placeholder="Parolingiz"
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="auth-btn" disabled={loading}>
              {loading ? 'Yuklanmoqda...' : 'Kirish'}
            </button>
          </form>

          {message && (
            <p className={`auth-message ${isError ? 'error' : 'success'}`}>
              {message}
            </p>
          )}

          <div className="auth-footer">
            Hisob yo'qmi? <Link to="/register">Ro'yxatdan o'ting</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
