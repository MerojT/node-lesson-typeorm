import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../../components/Navbar.jsx'
import './About.css'

function About() {
  return (
    <div className="about-page">
      <Navbar />
      <div className="about-wrapper">
        <div className="about-hero">
          <span className="about-badge">✦ About</span>
          <h1>About Todo<span>.App</span></h1>
          <p>A simple, fast, and secure task management app built with Node.js and React.</p>
        </div>

        <div className="about-sections">
          <div className="about-card">
            <div className="about-card-icon">📝</div>
            <h3>What is Todo?</h3>
            <p>
              A TODO is any task or item that needs to be accomplished. Our app helps you
              organize these tasks into a clean, prioritized list to improve your productivity
              and reduce mental clutter.
            </p>
          </div>

          <div className="about-card">
            <div className="about-card-icon">🎯</div>
            <h3>Our Mission</h3>
            <p>
              To help you clear mental clutter and bring order to your daily life.
              We believe productivity shouldn't be complicated — just capture, prioritize,
              and track your tasks effortlessly.
            </p>
          </div>

          <div className="about-card">
            <div className="about-card-icon">⚡</div>
            <h3>Tech Stack</h3>
            <p>
              Built with <strong>Node.js + Express</strong> on the backend,
              <strong> TypeORM + PostgreSQL</strong> for the database,
              <strong> React + Vite</strong> on the frontend, and
              <strong> Telegraf</strong> for the Telegram bot.
            </p>
          </div>

          <div className="about-card">
            <div className="about-card-icon">🤖</div>
            <h3>Telegram Bot</h3>
            <p>
              Register directly through our Telegram bot without opening the website.
              The admin can also send broadcast notifications to all users via the bot.
            </p>
          </div>
        </div>

        <div className="about-cta">
          <h2>Ready to get organized?</h2>
          <Link to="/register" className="about-cta-btn">Get Started →</Link>
        </div>
      </div>
    </div>
  )
}

export default About
