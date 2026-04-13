import React from 'react';
import './ModalConfirmar.css';
import iconSalir from '../assets/arrow-back-up.svg';
import iconConfirmar from '../assets/circle-check.svg';
import { useModalShake } from './useModalShake';

const ModalConfirmarModificacion = ({ isOpen, onClose, onConfirm, isLoading = false }) => {
    const { isShaking, handleOverlayClick } = useModalShake();

    if (!isOpen) {
        return null;
    }

    return (
        <div className="confirm-overlay" onClick={handleOverlayClick}>
            <div className={`confirm-container confirm-container-modificacion scale-up-center ${isShaking ? 'shake' : ''}`} onClick={(e) => e.stopPropagation()}>
                <h2 className="confirm-title">Confirmar</h2>

                <div className="confirm-box">
                    <p className="confirm-text">¿Estas seguro de que desea modificar este cliente ?</p>
                    <div className="confirm-line" />
                </div>

                <div className="confirm-footer">
                    <button className="btn-confirm-salir" onClick={onClose} disabled={isLoading}>
                        <img src={iconSalir} alt="" className="confirm-btn-icon" />
                        Volver
                    </button>
                    <button className="btn-confirm-si" onClick={onConfirm} disabled={isLoading}>
                        <img src={iconConfirmar} alt="" className="confirm-btn-icon" />
                        Confirmar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ModalConfirmarModificacion;