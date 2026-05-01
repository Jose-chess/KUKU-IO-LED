import React, { useEffect } from 'react';
import './ModalExito.css';
import LogoConProgreso from './LogoConProgreso';
import { useModalShake } from './useModalShake';

const ModalExito = ({
    isOpen,
    onClose,
    title = 'Confirmado',
    subtitle = '',
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
        <div className="exito-overlay" onClick={handleOverlayClick}>
            <div className={`exito-modal-card scale-up-center ${isShaking ? 'shake' : ''}`} onClick={(e) => e.stopPropagation()}>
                <LogoConProgreso duration={duration} />

                <div className="exito-content">
                    <h1 className="exito-main-title">{title}</h1>
                    {subtitle ? <p className="exito-subtitle">{subtitle}</p> : null}
                </div>

            </div>
        </div>
    );
};

export default ModalExito;