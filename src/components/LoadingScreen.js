import React, { useEffect, useState } from 'react';
import '../styles/LoadingScreen.css';
import logo from './logo.png'; // Add your logo file

function LoadingScreen() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!loading) return null;

  return (
    <div className="loading-screen">
      <img src={logo} alt="Loading..." />
    </div>
  );
}

export default LoadingScreen;