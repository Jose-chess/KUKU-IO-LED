import React from 'react';
import './ModalExito.css';
import logoKuku from '../assets/Captura_de_pantalla_2026-03-30_091031-removebg-preview (1).png';
import iconSalir from '../assets/arrow-back-up.svg';
import { useModalShake } from './useModalShake';

const ModalExito = ({
    isOpen,
    onClose,
    title = 'Confirmado',
    subtitle = '',
    buttonLabel = 'Salir',
}) => {
    const { isShaking, handleOverlayClick } = useModalShake();

    if (!isOpen) {
        return null;
    }

    return (
        <div className="exito-overlay" onClick={handleOverlayClick}>
            <div className={`exito-modal-card scale-up-center ${isShaking ? 'shake' : ''}`} onClick={(e) => e.stopPropagation()}>
                <div className="exito-logo-container">
                    <img src={logoKuku} alt="KUKU-IO LED Logo" className="exito-logo-img" />
                </div>

                <div className="exito-content">
                    <h1 className="exito-main-title">{title}</h1>
                    {subtitle ? <p className="exito-subtitle">{subtitle}</p> : null}
                </div>

                <div className="exito-footer">
                    <button className="btn-exito-salir" onClick={onClose}>
                        <img src={iconSalir} alt="" className="exito-btn-icon" />
                        {buttonLabel}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ModalExito;