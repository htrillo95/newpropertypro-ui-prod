import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HomePage from './components/HomePage';
import AboutPage from './components/AboutPage';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import TenantDashboard from './components/TenantDashboard';
import AdminLogin from './components/AdminLogin';
import AdminPanel from './components/AdminPanel';
import PropertyListings from './components/PropertyListings';
import NavBar from './components/NavBar';
import ScrollToTop from './components/ScrollToTop';

function App() {
    const [role, setRole] = useState(sessionStorage.getItem('role') || ''); // Track user role

    useEffect(() => {
        sessionStorage.setItem('role', role); // Sync role with session storage
    }, [role]);

    const handleTenantLogin = () => setRole('tenant'); // Set role as tenant on login
    const handleAdminLogin = () => setRole('admin'); // Set role as admin on login

    const handleLogout = () => {
        setRole(''); // Clear role
        sessionStorage.clear(); // Clear session storage
        window.location.href = '/'; // Redirect to homepage after logout
    };

    return (
        <Router>
            <ScrollToTop />
            <div className="App">
                <ToastContainer /> {/* Enable toast notifications globally */}
                <NavBar role={role} handleLogout={handleLogout} />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route
                        path="/login"
                        element={
                            role === '' ? (
                                <LoginForm onLogin={handleTenantLogin} />
                            ) : (
                                <Navigate to="/dashboard" />
                            )
                        }
                    />
                    <Route
                        path="/admin-login"
                        element={
                            role === '' ? (
                                <AdminLogin onLogin={handleAdminLogin} />
                            ) : (
                                <Navigate to="/admin" />
                            )
                        }
                    />
                    <Route path="/register" element={<RegisterForm />} />
                    <Route
                        path="/dashboard"
                        element={
                            role === 'tenant' ? <TenantDashboard /> : <Navigate to="/login" />
                        }
                    />
                    <Route
                        path="/admin"
                        element={
                            role === 'admin' ? <AdminPanel /> : <Navigate to="/admin-login" />
                        }
                    />
                    <Route path="/properties" element={<PropertyListings />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;