import React, { useState } from 'react';
import './LoginForm.css'; 
import logoKuku from '../assets/Captura_de_pantalla_2026-03-30_091031-removebg-preview (1).png';

import { useNavigate } from 'react-router-dom'; 

const LoginPage = () => { 
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');
  

  const handleLogin = (e) => {
    e.preventDefault(); 

    const userKey = `user:${usuario.trim().toLowerCase()}`;
    const mustChangePassword = localStorage.getItem(`${userKey}:mustChangePassword`) !== 'false';

    localStorage.setItem('currentUser', usuario.trim());

    if (mustChangePassword) {
      navigate('/cambio-contrasena', { state: { usuario: usuario.trim() } });
      return;
    }

    navigate('/dashboard'); 
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

          <button type="submit" className="login-button">
            Entrar
          </button>
        </form>

      </div>
    </div>
  );
};

export default LoginPage;
