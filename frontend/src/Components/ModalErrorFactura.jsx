import React, { useEffect } from 'react';
import './ModalAviso.css';
import logoKuku from '../assets/Captura_de_pantalla_2026-03-30_091031-removebg-preview (1).png';
import { useModalShake } from './useModalShake';

const ModalErrorFactura = ({
    isOpen,
    onClose,
    title = 'Error',
    mensaje = 'No se pudo generar el PDF',
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
        <div className="aviso-overlay" onClick={handleOverlayClick}>
            <div className={`aviso-card-bg-yellow scale-up-center ${isShaking ? 'shake' : ''}`} onClick={(e) => e.stopPropagation()}>
                <div className="aviso-logo-container">
                    <img src={logoKuku} alt="KUKU-IO LED" className="aviso-logo-kuku" />
                </div>

                <div className="aviso-content-error">
                    <h1 className="aviso-title-main">{title}</h1>
                    <div className="aviso-text-block">
                        <p className="aviso-text-p">{mensaje}</p>
                        <p className="aviso-text-p">{submensaje}</p>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ModalErrorFactura;
