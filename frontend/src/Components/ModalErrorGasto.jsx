import React from 'react';
import './ModalErrorGasto.css';
import logoKuku from '../assets/Captura_de_pantalla_2026-03-30_091031-removebg-preview (1).png';
import iconSalir from '../assets/arrow-back-up.svg';

const ModalErrorGasto = ({ isOpen, onClose }) => {
    if (!isOpen) {
        return null;
    }

    return (
        <div className="error-gasto-overlay">
            <div className="error-gasto-container scale-up-center">
                <div className="error-gasto-content">
                    <img src={logoKuku} alt="KUKU-IO LED" className="error-gasto-logo" />

                    <h1 className="error-gasto-title">Error</h1>

                    <div className="error-gasto-message-box">
                        <p className="error-gasto-text">No se pudo guardar este gasto en la base de datos</p>
                        <p className="error-gasto-retry">Intente de nuevo</p>
                    </div>
                </div>

                <div className="error-gasto-footer-container">
                    <div className="error-gasto-botones-flex">
                        <button className="btn-error-salir" onClick={onClose}>
                            <img src={iconSalir} alt="" className="error-gasto-btn-icon" />
                            Salir
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalErrorGasto;