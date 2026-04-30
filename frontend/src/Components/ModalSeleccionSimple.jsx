import React from 'react';
import './ModalSeleccion.css';
import { useModalShake } from './useModalShake';

const ModalSeleccionSimple = ({ isOpen, onClose, options = [], onSelect = () => {}, position }) => {
    const { isShaking, handleOverlayClick } = useModalShake();

    if (!isOpen) {
        return null;
    }

    const handleSelect = (option) => {
        onSelect?.(option);
        onClose?.();
    };

    const modalPositionStyle = position
        ? {
            top: position.top,
            left: position.left,
            width: position.width,
        }
        : {};

    return (
        <div className="modal-seleccion-overlay" onClick={onClose}>
            <div 
                className={`modal-seleccion-content scale-up-center ${isShaking ? 'shake' : ''}`} 
                style={modalPositionStyle} 
                onClick={(e) => e.stopPropagation()}
            >
                <div className="modal-seleccion-body">
                    <div className="modal-seleccion-list">
                        {options && options.length > 0 ? (
                            options.map((option, index) => (
                                <div
                                    key={index}
                                    className="modal-seleccion-item"
                                    onClick={() => handleSelect(option)}
                                >
                                    <span>{option}</span>
                                </div>
                            ))
                        ) : (
                            <div className="modal-seleccion-empty">
                                No hay opciones disponibles
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalSeleccionSimple;
