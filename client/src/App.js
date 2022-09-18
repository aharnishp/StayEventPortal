import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LoginPage from './pages/login.js'
import RegisterPage from './pages/register.js'
import RegLogin from './pages/RegLogin.js'
import Dashboard from './pages/Dashboard.js'
import CreateEvent from './pages/CreateEvent.js'


import './pages/stylesheets/app.css'

const App = () => {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<RegLogin />} />
                    {/* <Route path="/register" element={<RegisterPage />} /> */}
                    <Route path="/register" element={<RegLogin />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/createEvent" element={<CreateEvent />}/>
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App