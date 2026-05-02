import React from 'react';
import './ModalError.css';
import logoKuku from '../assets/Captura_de_pantalla_2026-03-30_091031-removebg-preview (1).png';
import iconSalir from '../assets/arrow-back-up.svg';
import { useModalShake } from './useModalShake';

const ModalErrorEliminarUnidad = ({
    isOpen,
    onClose,
    title = 'Error',
    message = 'No se pudo eliminar esta unidad de medida en la base de datos',
    retryMessage = '¡Intente de nuevo!'
}) => {
    const { isShaking, handleOverlayClick } = useModalShake();

    if (!isOpen) return null;

    return (
        <div className="error-overlay" onClick={handleOverlayClick}>
            <div className={`error-card scale-up-center ${isShaking ? 'shake' : ''}`} onClick={(e) => e.stopPropagation()}>
                <div className="error-logo-container">
                    <img src={logoKuku} alt="KUKU-IO LED" className="img-error-logo" />
                </div>
                
                <h1 className="error-header">{title}</h1>
                
                <div className="error-message-box">
                    <p className="error-text-main">{message}</p>
                    <p className="error-text-sub">{retryMessage}</p>
                </div>
            </div>
        </div>
    );
};

export default ModalErrorEliminarUnidad;
