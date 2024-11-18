import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import TenantDashboard from './components/TenantDashboard';
import AdminLogin from './components/AdminLogin';
import AdminPanel from './components/AdminPanel';
import PropertyListings from './components/PropertyListings';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/dashboard" element={<TenantDashboard />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/properties" element={<PropertyListings />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;