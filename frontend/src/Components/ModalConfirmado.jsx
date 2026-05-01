import React, { useEffect } from 'react';
import './ModalConfirmado.css';
import LogoConProgreso from './LogoConProgreso';
import { useModalShake } from './useModalShake';

const ModalConfirmado = ({
    isOpen,
    onClose,
    title = 'Confirmado',
    subtitle = 'Información empresarial guardada exitosamente!',
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
        <div className="confirmado-toast" role="status" aria-live="polite" onClick={handleOverlayClick}>
            <div className={`confirmado-card scale-up-center ${isShaking ? 'shake' : ''}`} onClick={(event) => event.stopPropagation()}>
                <LogoConProgreso duration={duration} />

                <div className="confirmado-body">
                    <h2 className="confirmado-title">{title}</h2>
                    <p className="confirmado-text">{subtitle}</p>
                </div>

            </div>
        </div>
    );
};

export default ModalConfirmado;