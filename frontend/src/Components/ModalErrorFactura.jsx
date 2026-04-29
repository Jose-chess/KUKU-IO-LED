import React from 'react';
import './ModalAviso.css';
import logoKuku from '../assets/Captura_de_pantalla_2026-03-30_091031-removebg-preview (1).png';
import iconSalir from '../assets/arrow-back-up.svg';
import { useModalShake } from './useModalShake';

const ModalErrorFactura = ({
    isOpen,
    onClose,
    title = 'Error',
    mensaje = 'No se pudo generar el PDF',
    submensaje = 'Intente de nuevo!',
    buttonLabel = 'Salir',
}) => {
    const { isShaking, handleOverlayClick } = useModalShake();

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

                <div className="aviso-footer-right">
                    <button className="btn-aviso-red" type="button" onClick={onClose}>
                        <img src={iconSalir} alt="" className="confirmado-btn-icon" style={{width: '16px', filter: 'brightness(0) invert(1)'}} />
                        {buttonLabel}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ModalErrorFactura;
