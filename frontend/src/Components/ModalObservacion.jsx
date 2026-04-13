import React from 'react';
import './ModalObservacion.css';
import { useModalShake } from './useModalShake';

const ModalObservacion = ({ isOpen, onClose, contenido }) => {
    const { isShaking, handleOverlayClick } = useModalShake();

    if (!isOpen) {
        return null;
    }

    return (
        <div className="obs-overlay" onClick={handleOverlayClick}>
            <div className={`obs-container ${isShaking ? 'shake' : ''}`} onClick={(e) => e.stopPropagation()}>
                <div className="obs-header">
                    <h2 className="obs-title">Observacion:</h2>
                    <button className="obs-close-btn" onClick={onClose} type="button">&times;</button>
                </div>
                <div className="obs-content">
                    <p className="obs-text">{contenido || 'Sin observaciones registradas.'}</p>
                </div>
            </div>
        </div>
    );
};

export default ModalObservacion;
