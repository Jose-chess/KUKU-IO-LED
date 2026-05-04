import React, { useState } from 'react';
import './LoginForm.css'; 
import logoKuku from '../assets/Captura_de_pantalla_2026-03-30_091031-removebg-preview (1).png';

import { useNavigate } from 'react-router-dom'; 

const LoginPage = () => { 
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5200/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          usuario: usuario,
          password: contrasena
        }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        localStorage.setItem('usuario', JSON.stringify(data));
        navigate('/dashboard');
      } else if (response.status === 401) {
        setError('Usuario o contraseña incorrectos');
      } else {
        setError('Error al iniciar sesión');
      }
    } catch (err) {
      setError('No se pudo conectar con el servidor');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page-container">
      <div className="login-card">
        
        <div className="logo-container">
          <img src={logoKuku} alt="KUKU-IO LED Logo" className="kuku-logo" />
        </div>

        <h1 className="login-title no-select">Iniciar Sesión</h1>


        <form className="login-form" onSubmit={handleLogin}>
          <div className="input-group">
            <label htmlFor="usuario" className="no-select">
              Usuario
            </label>
            <input
              type="text"
              id="usuario"
              placeholder="Introduce tu usuario"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="contrasena" className="no-select">
              Contraseña
            </label>
            <input
              type="password"
              id="contrasena"
              placeholder="Introduce tu contraseña"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
              required
            />
          </div>

          {error && (
            <div className="login-error" style={{ color: '#ef4444', fontSize: '14px', marginBottom: '10px', textAlign: 'center' }}>
              {error}
            </div>
          )}

          <button type="submit" className="login-button" disabled={loading}>
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

      </div>
    </div>
  );
};

export default LoginPage;
