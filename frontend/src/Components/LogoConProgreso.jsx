import React from 'react';
import './LogoConProgreso.css';
import logoKuku from '../assets/Captura_de_pantalla_2026-03-30_091031-removebg-preview (1).png';

const LogoConProgreso = ({ duration = 3000 }) => {
    return (
        <div className="logo-progress-container">
            {/* Círculo de progreso SVG */}
            <svg className="progress-ring" viewBox="0 0 200 200">
                {/* Círculo de fondo */}
                <circle
                    className="progress-ring-circle-bg"
                    cx="100"
                    cy="100"
                    r="95"
                    fill="none"
                    stroke="rgba(255, 255, 255, 0.3)"
                    strokeWidth="4"
                />
                {/* Círculo de progreso animado */}
                <circle
                    className="progress-ring-circle"
                    cx="100"
                    cy="100"
                    r="95"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="4"
                    strokeLinecap="round"
                    style={{
                        animationDuration: `${duration}ms`
                    }}
                />
            </svg>
            {/* Logo en el centro */}
            <img src={logoKuku} alt="KUKU-IO LED" className="logo-center" />
        </div>
    );
};

export default LogoConProgreso;
