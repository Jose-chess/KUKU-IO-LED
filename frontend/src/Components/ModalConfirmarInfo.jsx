import React from 'react';
import './ConfirmarInfo.css';
import iconSalir from '../assets/arrow-back-up.svg';
import iconConfirmar from '../assets/circle-check.svg';
import { useModalShake } from './useModalShake';

const ModalConfirmarInfo = ({ isOpen, onClose, onConfirm }) => {
    const { isShaking, handleOverlayClick } = useModalShake();

    if (!isOpen) {
        return null;
    }

    return (
        <div className="confirm-overlay" onClick={handleOverlayClick}>
            <div className={`confirm-container confirm-container-info scale-up-center ${isShaking ? 'shake' : ''}`} onClick={(event) => event.stopPropagation()}>
                <h2 className="confirm-title">Confirmar</h2>

                <div className="confirm-box">
                    <p className="confirm-text">¿Estás seguro de que desea guardar esta información?</p>
                    <div className="confirm-line" />
                </div>

                <div className="confirm-footer">
                    <button className="btn-confirm-salir" type="button" onClick={onClose}>
                        <img src={iconSalir} alt="" className="confirm-btn-icon" />
                        Retroceder
                    </button>
                    <button className="btn-confirm-si" type="button" onClick={onConfirm}>
                        <img src={iconConfirmar} alt="" className="confirm-btn-icon" />
                        Confirmar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ModalConfirmarInfo;
