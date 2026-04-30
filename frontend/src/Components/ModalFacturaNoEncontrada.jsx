import React from 'react';
import './ModalErrorCliente.css';
import logoKuku from '../assets/Captura_de_pantalla_2026-03-30_091031-removebg-preview (1).png';
import iconSalir from '../assets/arrow-back-up.svg';
import { useModalShake } from './useModalShake';

const ModalFacturaNoEncontrada = ({ isOpen, onClose }) => {
    const { isShaking, handleOverlayClick } = useModalShake();

    if (!isOpen) return null;

    return (
        <div className="error-cliente-overlay" onClick={handleOverlayClick}>
            <div className={`error-cliente-modal-card scale-up-center ${isShaking ? 'shake' : ''}`} onClick={(e) => e.stopPropagation()}>
                <div className="error-cliente-logo-container">
                    <img src={logoKuku} alt="KUKU-IO LED Logo" className="error-cliente-logo-img" />
                </div>

                <div className="error-cliente-content">
                    <h1 className="error-cliente-main-title" style={{ fontSize: '42px', margin: '30px 0' }}>Factura no encontrada</h1>
                </div>

                <div className="error-cliente-footer">
                    <button className="btn-error-cliente-salir" onClick={onClose}>
                        <img src={iconSalir} alt="" className="error-cliente-btn-icon" />
                        Salir
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ModalFacturaNoEncontrada;
