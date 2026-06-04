import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../../components/Navbar.jsx'
import './MyTodos.css'

function MyTodos() {
  const navigate = useNavigate()
  const [todos, setTodos] = useState([])
  const [loading, setLoading] = useState(true)
  const [deletingId, setDeletingId] = useState(null)

  const fetchTodos = async () => {
    try {
      const token = localStorage.getItem('token')
      if (!token) {
        navigate('/login')
        return
      }
      const response = await axios.get('/todos', {
        headers: { Authorization: `Bearer ${token}` }
      })
      setTodos(response.data)
    } catch (error) {
      if (error.response?.status === 401) {
        navigate('/login')
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTodos()
  }, [])

  const handleDelete = async (id) => {
    setDeletingId(id)
    try {
      const token = localStorage.getItem('token')
      await axios.delete(`/todos/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setTodos(todos.filter(t => t.id !== id))
    } catch (error) {
      console.error("O'chirishda xatolik:", error)
    } finally {
      setDeletingId(null)
    }
  }

  if (loading) {
    return (
      <div className="mytodos-page">
        <Navbar />
        <div className="mytodos-loading">
          <div className="spinner"></div>
          <p>Yuklanmoqda...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="mytodos-page">
      <Navbar />
      <div className="mytodos-wrapper">
        <div className="mytodos-header">
          <div>
            <h2>Mening vazifalarim</h2>
            <p>{todos.length} ta vazifa</p>
          </div>
          <Link to="/create" className="add-btn">+ Yangi vazifa</Link>
        </div>

        {todos.length === 0 ? (
          <div className="mytodos-empty">
            <div className="empty-icon">📋</div>
            <h3>Hali vazifa yo'q!</h3>
            <p>Birinchi vazifangizni qo'shing</p>
            <Link to="/create" className="empty-btn">Vazifa qo'shish</Link>
          </div>
        ) : (
          <div className="todos-list">
            {todos.map((todo) => (
              <div key={todo.id} className="todo-card">
                <div className="todo-card-body">
                  <h3 className="todo-title">{todo.title}</h3>
                  <p className="todo-desc">{todo.description}</p>
                </div>
                <button
                  className="todo-delete"
                  onClick={() => handleDelete(todo.id)}
                  disabled={deletingId === todo.id}
                >
                  {deletingId === todo.id ? '...' : '🗑'}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default MyTodos
