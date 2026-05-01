import React, { useEffect } from 'react';
import './ModalErrorCliente.css';
import LogoConProgreso from './LogoConProgreso';
import { useModalShake } from './useModalShake';

const ModalErrorCliente = ({
    isOpen,
    onClose,
    title = 'Error',
    message = 'No se pudo guardar este cliente en la base de datos',
    retryMessage = 'Intente de nuevo!',
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
        <div className="error-cliente-overlay" onClick={handleOverlayClick}>
            <div className={`error-cliente-modal-card scale-up-center ${isShaking ? 'shake' : ''}`} onClick={(e) => e.stopPropagation()}>
                <div className="error-cliente-logo-container">
                    <LogoConProgreso duration={duration} />
                </div>

                <div className="error-cliente-content">
                    <h1 className="error-cliente-main-title">{title}</h1>
                    {message ? <p className="error-cliente-sub-text">{message}</p> : null}
                    {retryMessage ? <p className="error-cliente-retry-text">{retryMessage}</p> : null}
                </div>

            </div>
        </div>
    );
};

export default ModalErrorCliente;
