import React, { useEffect } from 'react';
import './ModalError.css';
import logoKuku from '../assets/Captura_de_pantalla_2026-03-30_091031-removebg-preview (1).png';
import iconSalir from '../assets/arrow-back-up.svg';
import { useModalShake } from './useModalShake';

const ModalErrorModificarUnidad = ({
    isOpen,
    onClose,
    title = 'Error',
    message = 'No se pudo modificar esta unidad de medida en la base de datos',
    retryMessage = '¡Intente de nuevo!',
    duration = 3000
}) => {
    const { isShaking, handleOverlayClick } = useModalShake();

    useEffect(() => {
        if (isOpen) {
            const timer = setTimeout(() => {
                onClose?.();
            }, duration);
            return () => clearTimeout(timer);
        }
    }, [isOpen, onClose, duration]);

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

export default ModalErrorModificarUnidad;
