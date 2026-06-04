import React, { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../../components/Navbar.jsx'
import './Register.css'

function Register() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '', age: '' })
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
      await axios.post('/user/register', {
        ...form,
        age: form.age ? Number(form.age) : undefined,
      })
      setMessage("Muvaffaqiyatli ro'yxatdan o'tdingiz! ✅")
      setIsError(false)
      setTimeout(() => navigate('/login'), 1500)
    } catch (error) {
      setMessage(error.response?.data?.message || "Xatolik yuz berdi ❌")
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
            <h2>Ro'yxatdan o'tish</h2>
            <p>Yangi hisob yarating</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label>Ism</label>
              <input
                name="name"
                placeholder="Ismingiz"
                onChange={handleChange}
                required
              />
            </div>
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
                placeholder="Kamida 6 ta belgi"
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Yosh <span className="optional">(ixtiyoriy)</span></label>
              <input
                name="age"
                type="number"
                placeholder="Yoshingiz"
                onChange={handleChange}
              />
            </div>

            <button type="submit" className="auth-btn" disabled={loading}>
              {loading ? 'Yuklanmoqda...' : "Ro'yxatdan o'tish"}
            </button>
          </form>

          {message && (
            <p className={`auth-message ${isError ? 'error' : 'success'}`}>
              {message}
            </p>
          )}

          <div className="auth-footer">
            Hisobingiz bormi? <Link to="/login">Kirish</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
