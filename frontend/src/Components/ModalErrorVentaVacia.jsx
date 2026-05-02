import React, { useEffect } from 'react';
import './ModalError.css';
import LogoConProgreso from './LogoConProgreso';
import { useModalShake } from './useModalShake';
import iconSalir from '../assets/arrow-back-up.svg';

const ModalErrorVentaVacia = ({ isOpen, onClose, duration = 3000 }) => {
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
                <LogoConProgreso duration={duration} />

                <h1 className="error-header">Aviso</h1>

                <div className="error-message-box">
                    <p className="error-text-main">Debe agregar artículos para poder facturar</p>
                    <p className="error-text-sub">¡Intente de nuevo!</p>
                </div>

            </div>
        </div>
    );
};

export default ModalErrorVentaVacia;
