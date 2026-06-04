import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../../components/Navbar.jsx'
import './Homepage.css'

function Homepage() {
  return (
    <div className="home-page">
      <Navbar />
      <main>
        <section className="hero">
          <div className="hero-inner">
            <div className="hero-badge">✦ Organize your life</div>
            <h1 className="hero-title">
              Manage your tasks<br />
              <span>with clarity</span>
            </h1>
            <p className="hero-desc">
              Break down your big goals into manageable tasks, set priorities,
              and track your progress. Say goodbye to mental clutter.
            </p>
            <div className="hero-btns">
              <Link to="/register" className="hero-btn-primary">Get Started</Link>
              <Link to="/about" className="hero-btn-secondary">Learn More</Link>
            </div>
          </div>

          <div className="hero-visual">
            <div className="todo-card-preview">
              <div className="todo-preview-header">
                <span>My Tasks</span>
                <span className="todo-count">3</span>
              </div>
              <div className="todo-item done">
                <span className="check">✓</span> Buy groceries
              </div>
              <div className="todo-item done">
                <span className="check">✓</span> Morning run
              </div>
              <div className="todo-item active">
                <span className="dot"></span> Study TypeORM
              </div>
              <div className="todo-item">
                <span className="dot"></span> Build frontend
              </div>
            </div>
          </div>
        </section>

        <section className="features">
          <div className="features-inner">
            <div className="feature-card">
              <div className="feature-icon">📋</div>
              <h3>Create Tasks</h3>
              <p>Add tasks with title and description. Keep everything organized in one place.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔐</div>
              <h3>Secure Auth</h3>
              <p>JWT-based authentication. Your tasks are private and only visible to you.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🤖</div>
              <h3>Telegram Bot</h3>
              <p>Register via Telegram bot. Get notifications directly in your messenger.</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default Homepage
