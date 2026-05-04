import React from 'react';
import './ModalSinConexion.css';
import logoKuku from '../assets/Captura_de_pantalla_2026-03-30_091031-removebg-preview (1).png';
import iconSalir from '../assets/arrow-back-up.svg';
import { useModalShake } from './useModalShake';

const ModalSinConexion = ({
    isOpen,
    onClose,
}) => {
    const { isShaking, handleOverlayClick } = useModalShake();

    if (!isOpen) {
        return null;
    }

    return (
        <div className="sin-conexion-overlay" onClick={handleOverlayClick}>
            <div className={`sin-conexion-modal-card scale-up-center ${isShaking ? 'shake' : ''}`} onClick={(e) => e.stopPropagation()}>
                <div className="sin-conexion-logo-container">
                    <img src={logoKuku} alt="KUKU-IO LED Logo" className="sin-conexion-logo" />
                </div>

                <div className="sin-conexion-content">
                    <h1 className="sin-conexion-title">Aviso</h1>
                    <p className="sin-conexion-message">
                        Esta usted sin conexión a internet, sus datos seran
                        almacenados en una base de datos temporal hasta que
                        recupere su conexión a internet!
                    </p>
                </div>

                <div className="sin-conexion-footer">
                    <div className="sin-conexion-separator"></div>
                    <div className="sin-conexion-button-container">
                        <button className="sin-conexion-salir-button" onClick={onClose}>
                            <img src={iconSalir} alt="" className="sin-conexion-salir-icon" />
                            Salir
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalSinConexion;
