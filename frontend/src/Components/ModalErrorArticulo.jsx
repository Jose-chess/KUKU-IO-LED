import React, { useEffect } from 'react';
import './ModalError.css';
import LogoConProgreso from './LogoConProgreso';
import { useModalShake } from './useModalShake';
import iconSalir from '../assets/arrow-back-up.svg';

const ModalErrorArticulo = ({
    isOpen,
    onClose,
    title = 'Error',
    message = 'No se pudo guardar este artículo en la base de datos',
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

    if (!isOpen) {
        return null;
    }

    return (
        <div className="error-overlay" onClick={handleOverlayClick}>
            <div className={`error-card scale-up-center ${isShaking ? 'shake' : ''}`} onClick={(e) => e.stopPropagation()}>
                <LogoConProgreso duration={duration} />

                <h1 className="error-header">{title}</h1>

                <div className="error-message-box">
                    <p className="error-text-main">{message}</p>
                    <p className="error-text-sub">{retryMessage}</p>
                </div>

            </div>
        </div>
    );
};

export default ModalErrorArticulo;
