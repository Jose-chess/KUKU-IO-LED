import React from 'react';
import './ModalObservacion.css';
import { useModalShake } from './useModalShake';
import iconSalir from '../assets/arrow-back-up.svg';

const ModalObservacion = ({ isOpen, onClose, contenido, titulo = 'Observacion:' }) => {
    const { isShaking, handleOverlayClick } = useModalShake();

    if (!isOpen) {
        return null;
    }

    return (
        <div className="obs-overlay" onClick={handleOverlayClick}>
            <div className={`obs-container ${isShaking ? 'shake' : ''}`} onClick={(e) => e.stopPropagation()}>
                <div className="obs-header">
                    <h2 className="obs-title">{titulo}</h2>
                </div>
                <div className="obs-content">
                    <p className="obs-text">{contenido || 'Sin observaciones registradas.'}</p>
                </div>
                <div className="obs-footer">
                    <button className="obs-btn-salir" onClick={onClose} type="button">
                        <img src={iconSalir} alt="" className="obs-btn-icon" />
                        Salir
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ModalObservacion;
