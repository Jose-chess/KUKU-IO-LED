import React from 'react';
import './ModalErrorCliente.css';
import logoKuku from '../assets/Captura_de_pantalla_2026-03-30_091031-removebg-preview (1).png';
import iconSalir from '../assets/arrow-back-up.svg';
import { useModalShake } from './useModalShake';

const ModalErrorModificar = ({
    isOpen,
    onClose,
    title = 'Error',
    message = 'No se pudo modificar esta información en la base de datos',
    retryMessage = 'Intente de nuevo!',
}) => {
    const { isShaking, handleOverlayClick } = useModalShake();

    if (!isOpen) {
        return null;
    }

    return (
        <div className="error-cliente-overlay" onClick={handleOverlayClick}>
            <div className={`error-cliente-modal-card scale-up-center ${isShaking ? 'shake' : ''}`} onClick={(event) => event.stopPropagation()}>
                <div className="error-cliente-logo-container">
                    <img src={logoKuku} alt="KUKU-IO LED" className="error-cliente-logo-img" />
                </div>

                <div className="error-cliente-content">
                    <h1 className="error-cliente-main-title">{title}</h1>
                    {message ? <p className="error-cliente-sub-text">{message}</p> : null}
                    {retryMessage ? <p className="error-cliente-retry-text">{retryMessage}</p> : null}
                </div>

                <div className="error-cliente-footer">
                    <button className="btn-error-cliente-salir" type="button" onClick={onClose}>
                        <img src={iconSalir} alt="" className="error-cliente-btn-icon" />
                        Salir
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ModalErrorModificar;