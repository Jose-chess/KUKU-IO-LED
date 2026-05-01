import React, { useEffect } from 'react';
import './ModalErrorCliente.css';
import LogoConProgreso from './LogoConProgreso';
import { useModalShake } from './useModalShake';

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
        <div className="error-cliente-overlay" onClick={handleOverlayClick}>
            <div className={`error-cliente-modal-card scale-up-center ${isShaking ? 'shake' : ''}`} onClick={(e) => e.stopPropagation()}>
                <LogoConProgreso duration={duration} />

                <div className="error-cliente-content">
                    <h1 className="error-cliente-main-title" style={{ fontSize: '42px', margin: '20px 0' }}>Aviso</h1>
                    <p className="error-cliente-sub-text">Debe agregar artículos para poder facturar</p>
                    <p className="error-cliente-retry-text">Intente de nuevo!</p>
                </div>

            </div>
        </div>
    );
};

export default ModalErrorVentaVacia;
