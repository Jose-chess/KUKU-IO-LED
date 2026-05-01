import React, { useEffect } from 'react';
import './ModalErrorGasto.css';
import LogoConProgreso from './LogoConProgreso';
import { useModalShake } from './useModalShake';

const ModalErrorArticulo = ({
    isOpen,
    onClose,
    title = 'Error',
    message = 'No se pudo guardar este artículo en la base de datos',
    retryMessage = 'Intente de nuevo',
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
        <div className="error-gasto-overlay" onClick={handleOverlayClick}>
            <div className={`error-gasto-container scale-up-center ${isShaking ? 'shake' : ''}`} onClick={(e) => e.stopPropagation()}>
                <div className="error-gasto-content">
                    <LogoConProgreso duration={duration} />

                    <h1 className="error-gasto-title">{title}</h1>

                    <div className="error-gasto-message-box">
                        <p className="error-gasto-text">{message}</p>
                        <p className="error-gasto-retry">{retryMessage}</p>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ModalErrorArticulo;
