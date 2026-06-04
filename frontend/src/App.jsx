import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Homepage from './pages/homepage/Homepage.jsx'
import About from './pages/about/About.jsx'
import Register from './pages/register/Register.jsx'
import Login from './pages/login/Login.jsx'
import CreateTodo from './pages/create-todo/CreateTodo.jsx'
import MyTodos from './pages/my-todos/MyTodos.jsx'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<About />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create" element={<CreateTodo />} />
        <Route path="/my-todos" element={<MyTodos />} />
      </Routes>
    </Router>
  )
}

export default App
