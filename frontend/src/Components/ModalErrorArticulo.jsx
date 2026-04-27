import React from 'react';
import './ModalErrorGasto.css';
import logoKuku from '../assets/Captura_de_pantalla_2026-03-30_091031-removebg-preview (1).png';
import iconSalir from '../assets/arrow-back-up.svg';
import { useModalShake } from './useModalShake';

const ModalErrorArticulo = ({
    isOpen,
    onClose,
    title = 'Error',
    message = 'No se pudo guardar este artículo en la base de datos',
    retryMessage = 'Intente de nuevo',
    buttonLabel = 'Salir',
}) => {
    const { isShaking, handleOverlayClick } = useModalShake();

    if (!isOpen) {
        return null;
    }

    return (
        <div className="error-gasto-overlay" onClick={handleOverlayClick}>
            <div className={`error-gasto-container scale-up-center ${isShaking ? 'shake' : ''}`} onClick={(e) => e.stopPropagation()}>
                <div className="error-gasto-content">
                    <img src={logoKuku} alt="KUKU-IO LED" className="error-gasto-logo" />

                    <h1 className="error-gasto-title">{title}</h1>

                    <div className="error-gasto-message-box">
                        <p className="error-gasto-text">{message}</p>
                        <p className="error-gasto-retry">{retryMessage}</p>
                    </div>
                </div>

                <div className="error-gasto-footer-container">
                    <div className="error-gasto-botones-flex">
                        <button className="btn-error-salir" onClick={onClose}>
                            <img src={iconSalir} alt="" className="error-gasto-btn-icon" />
                            {buttonLabel}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalErrorArticulo;
