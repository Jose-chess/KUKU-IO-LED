import React, { useEffect } from 'react';
import './ModalErrorPago.css';
import LogoConProgreso from './LogoConProgreso';
import { useModalShake } from './useModalShake';

const ModalErrorPago = ({
    isOpen,
    onClose,
    title = 'Error',
    mensaje = 'No se pudo registrar el pago en la base de datos',
    submensaje = 'Intente de nuevo!',
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
        <div className="error-pago-overlay" onClick={handleOverlayClick}>
            <div className={`error-pago-card scale-up-center ${isShaking ? 'shake' : ''}`} onClick={(e) => e.stopPropagation()}>
                <LogoConProgreso duration={duration} />

                <div className="error-pago-content">
                    <h1 className="error-pago-title">{title}</h1>
                    <p className="error-pago-mensaje">{mensaje}</p>
                    <p className="error-pago-submensaje">{submensaje}</p>
                </div>
            </div>
        </div>
    );
};

export default ModalErrorPago;
