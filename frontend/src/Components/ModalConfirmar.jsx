import React from 'react';
import './ModalConfirmar.css';
import iconSalir from '../assets/arrow-back-up.svg';
import iconConfirmar from '../assets/circle-check.svg';
import { useModalShake } from './useModalShake';

const ModalConfirmar = ({
    isOpen,
    onClose,
    onConfirm,
    onSalir,
    onConfirmar,
    title = 'Confirmar',
    mensaje = '¿Estás seguro de que desea realizar este gasto?',
    salirLabel = 'Retroceder',
    confirmLabel = 'Confirmar',
    isLoading = false,
}) => {
    const { isShaking, handleOverlayClick } = useModalShake();

    if (!isOpen) {
        return null;
    }

    const handleClose = onClose ?? onSalir;
    const handleConfirm = onConfirm ?? onConfirmar;

    return (
        <div className="confirm-overlay" onClick={handleOverlayClick}>
            <div className={`confirm-container confirm-modal scale-up-center ${isShaking ? 'shake' : ''}`} onClick={(e) => e.stopPropagation()}>
                <h1 className="confirm-title confirm-header">{title}</h1>

                <div className="confirm-body-card confirm-message-container">
                    <p className="confirm-text confirm-message-text">{mensaje}</p>
                    <div className="confirm-line confirm-decorative-line" />
                </div>

                <div className="confirm-footer confirm-actions">
                    <button className="btn-confirm-salir btn-confirm-red" onClick={handleClose} disabled={isLoading}>
                        <img src={iconSalir} alt="" className="confirm-btn-icon" />
                        {salirLabel}
                    </button>
                    <button className="btn-confirm-aceptar btn-confirm-green" onClick={handleConfirm} disabled={isLoading}>
                        {isLoading ? <span className="confirm-spinner" aria-hidden="true" /> : <img src={iconConfirmar} alt="" className="confirm-btn-icon" />}
                        {isLoading ? 'Guardando...' : confirmLabel}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ModalConfirmar;
