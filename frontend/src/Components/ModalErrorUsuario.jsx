import React from 'react';
import './ModalError.css';
import LogoConProgreso from './LogoConProgreso';
import iconSalir from '../assets/arrow-back-up.svg';
import { useModalShake } from './useModalShake';

const ModalErrorUsuario = ({
    isOpen,
    onClose,
    title = 'Error',
    message = 'No se pudo guardar este usuario en la base de datos',
    retryMessage = 'Intente de nuevo!',
    duration = 3000,
}) => {
    const { isShaking, handleOverlayClick } = useModalShake();

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

                <div className="error-footer-right">
                    <button className="btn-error-salir" onClick={onClose}>
                        <img src={iconSalir} alt="" className="error-btn-icon" />
                        Salir
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ModalErrorUsuario;
