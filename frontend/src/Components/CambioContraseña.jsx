import React, { useState } from 'react';
import './CambioContraseña.css';
import logoKuku from '../assets/Captura_de_pantalla_2026-03-30_091031-removebg-preview (1).png';
import { useLocation, useNavigate } from 'react-router-dom'; 

const CambioContraseña = () => { 
  const navigate = useNavigate();
  const location = useLocation();
  const usuario = location.state?.usuario || localStorage.getItem('currentUser') || '';
  const [nuevaContraseña, setNuevaContraseña] = useState('');
  const [confirmarContraseña, setConfirmarContraseña] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault(); 

    if (!usuario) {
      navigate('/');
      return;
    }

    if (nuevaContraseña !== confirmarContraseña) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    const userKey = `user:${usuario.trim().toLowerCase()}`;
    localStorage.setItem(`${userKey}:mustChangePassword`, 'false');
    localStorage.setItem(`${userKey}:password`, nuevaContraseña);
    localStorage.setItem('currentUser', usuario.trim());
    navigate('/dashboard'); 
  };

  return (
    <div className="login-page-container cambio-password-screen">
      <div className="login-card">
        
        <div className="logo-container">
          <img src={logoKuku} alt="KUKU-IO LED Logo" className="kuku-logo" />
        </div>

        <h1 className="login-title no-select">Bienvenido/a al Sistema</h1>

        <h4 className="login-subtitle no-select">
          Estimado usuario, en este primer inicio de sessión,
          por motivos de seguridad,
          es obligatorio que cambie su contraseña antes de continuar
          para garantizar la protección de su cuenta.
        </h4>

        
        {error && <div className="login-error" role="alert">{error}</div>}

        <form className="login-form" onSubmit={handleLogin}>
          <div className="input-group">
            <label htmlFor="contraseña" className="no-select">
              Nueva Contraseña
            </label>
            <input
              type="password"
              id="contraseña"
              placeholder="Ingrese su nueva contraseña"
              value={nuevaContraseña}
              onChange={(e) => setNuevaContraseña(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="contrasena" className="no-select">
              Confirmar Contraseña
            </label>
            <input
              type="password"
              id="contrasena"
              placeholder="Repita su nueva contraseña"
              value={confirmarContraseña}
              onChange={(e) => setConfirmarContraseña(e.target.value)}
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

export default CambioContraseña;