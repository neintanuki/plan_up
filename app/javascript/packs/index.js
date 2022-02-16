// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// pages
import App from './pages/App'
import Home from './pages/Home'
import User from './pages/User'
import Dashboard from './pages/Dashboard'

// components
import Login from './components/Login.jsx'
import Register from './components/Register.jsx'


document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
        </Route>

        <Route path="/user" element={<User />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        <Route path='/dashboard/:id' element={<Dashboard />} />
      </Routes>
    </BrowserRouter>,
    document.body.appendChild(document.createElement('div')),
  )
})
