import React, { useState } from 'react'
import axios from '../../api.js'
import { useNavigate } from 'react-router-dom'
import Navbar from '../../components/Navbar.jsx'
import './CreateTodo.css'

function CreateTodo() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ title: '', description: '' })
  const [message, setMessage] = useState('')
  const [isError, setIsError] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (form.title.trim().length < 2 || form.description.trim().length < 2) {
      setMessage("Title va Description kamida 2 ta harfdan iborat bo'lishi kerak!")
      setIsError(true)
      return
    }

    if (form.description.trim() && form.description.trim().length < 2) {
      setMessage("Tavsif kamida 2 ta harfdan iborat bo'lishi kerak! ⚠️")
      setIsError(true)
      return
    }

    setLoading(true)
    try {
      const token = localStorage.getItem('token')
      if (!token) {
        navigate('/login')
        return
      }

      await axios.post('/todos', form, {
        headers: { Authorization: `Bearer ${token}` }
      })

      setMessage("Vazifa muvaffaqiyatli saqlandi! ✅")
      setIsError(false)
      setForm({ title: '', description: '' })
    } catch (error) {
      if (error.response?.status === 401) {
        navigate('/login')
        return
      }
      setMessage(error.response?.data?.message || "Xatolik yuz berdi ❌")
      setIsError(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="create-page">
      <Navbar />
      <div className="create-wrapper">
        <div className="create-card">
          <div className="create-header">
            <h2>Yangi vazifa qo'shish</h2>
            <p>Vazifangizni kiriting va saqlang</p>
          </div>

          <form onSubmit={handleSubmit} className="create-form">
            <div className="form-group">
              <label>Vazifa nomi</label>
              <input
                name="title"
                placeholder="Masalan: Bozorga borish"
                value={form.title}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Tavsif</label>
              <textarea
                name="description"
                placeholder="Masalan: Meva va sabzavot sotib olish"
                value={form.description}
                onChange={handleChange}
                rows={4}
                required
              />
            </div>

            <div className="create-actions">
              <button type="submit" className="create-btn" disabled={loading}>
                {loading ? 'Saqlanmoqda...' : "✦ Saqlash"}
              </button>
              <button
                type="button"
                className="create-btn-secondary"
                onClick={() => navigate('/my-todos')}
              >
                Vazifalarimga o'tish →
              </button>
            </div>
          </form>

          {message && (
            <p className={`create-message ${isError ? 'error' : 'success'}`}>
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default CreateTodo
