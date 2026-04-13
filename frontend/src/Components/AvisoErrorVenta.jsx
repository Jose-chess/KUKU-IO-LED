import React from 'react';
import './AvisoVentas.css';
import logoKuku from '../assets/Captura_de_pantalla_2026-03-30_091031-removebg-preview (1).png';
import iconSalir from '../assets/arrow-back-up.svg';
import { useModalShake } from './useModalShake';

const AvisoErrorVenta = ({
    isOpen = true,
    onClose = () => {},
    message = 'No se pudo registrar esta venta',
    retryMessage = '¡Intente de nuevo!',
    buttonLabel = 'Salir',
}) => {
    const { isShaking, handleOverlayClick } = useModalShake();

    if (!isOpen) {
        return null;
    }

    return (
        <div className="venta-overlay" onClick={handleOverlayClick}>
            <div className={`venta-card-amarilla scale-up-center ${isShaking ? 'shake' : ''}`} onClick={(event) => event.stopPropagation()}>
                <div className="venta-logo-box">
                    <img src={logoKuku} alt="KUKU-IO LED" className="venta-logo-img" />
                </div>

                <h1 className="venta-titulo-error">Error</h1>

                <div className="venta-texto-container">
                    <p className="venta-p-bold">{message}</p>
                    <p className="venta-p-bold">{retryMessage}</p>
                </div>

                <div className="venta-footer">
                    <button className="btn-venta-salir" type="button" onClick={onClose}>
                        <img src={iconSalir} alt="" className="icon-back" />
                        {buttonLabel}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AvisoErrorVenta;