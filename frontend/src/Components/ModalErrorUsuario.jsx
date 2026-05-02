import React, { useEffect } from 'react';
import './ModalError.css';
import LogoConProgreso from './LogoConProgreso';
import iconSalir from '../assets/arrow-back-up.svg';
import { useModalShake } from './useModalShake';

const ModalErrorUsuario = ({
    isOpen,
    onClose,
    title = 'Error',
    message = 'No se pudo guardar este usuario en la base de datos',
    retryMessage = '¡Intente de nuevo!',
    duration = 3000,
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
                <div className="error-logo-box">
                    <LogoConProgreso duration={duration} />
                </div>

                <div className="error-header-box">
                    <h1 className="error-header">{title}</h1>
                </div>

                <div className="error-message-box">
                    <p className="error-text-main">{message}</p>
                    <p className="error-text-sub">{retryMessage}</p>
                </div>
            </div>
        </div>
    );
};

export default ModalErrorUsuario;
