import React, { useEffect } from 'react';
import './ModalErrorCliente.css';
import logoKuku from '../assets/Captura_de_pantalla_2026-03-30_091031-removebg-preview (1).png';
import { useModalShake } from './useModalShake';

const ModalErrorModificar = ({
    isOpen,
    onClose,
    title = 'Error',
    message = 'No se pudo modificar esta información en la base de datos',
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

    if (!isOpen) {
        return null;
    }

    return (
        <div className="error-cliente-overlay" onClick={handleOverlayClick}>
            <div className={`error-cliente-modal-card scale-up-center ${isShaking ? 'shake' : ''}`} onClick={(event) => event.stopPropagation()}>
                <div className="error-cliente-logo-container">
                    <img src={logoKuku} alt="KUKU-IO LED" className="error-cliente-logo-img" />
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

export default ModalErrorModificar;