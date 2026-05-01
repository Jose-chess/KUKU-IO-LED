import React from 'react';
import './ModalSeleccion.css';
import { useModalShake } from './useModalShake';

const ModalSeleccionSimple = ({ isOpen, onClose, options = [], onSelect = () => { }, position, selectedValue, placeholder = null }) => {
    const { isShaking } = useModalShake();

    if (!isOpen) {
        return null;
    }

    const handleSelect = (option) => {
        onSelect?.(option);
        onClose?.();
    };

    const modalPositionStyle = position
        ? {
            position: 'fixed',
            top: position.top,
            left: position.left,
            width: position.width,
            zIndex: 99999,
        }
        : { position: 'fixed', zIndex: 99999 };

    const handleOverlayClick = (e) => {
        e.stopPropagation();
        onClose?.();
    };

    return (
        <div className="modal-seleccion-overlay" onClick={handleOverlayClick}>
            <div
                className="modal-seleccion-content"
                style={modalPositionStyle}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="modal-seleccion-body">
                    <div className="modal-seleccion-list">
                        {placeholder && (
                            <div className="modal-seleccion-item placeholder" onClick={(e) => e.stopPropagation()}>
                                <span>{placeholder}</span>
                            </div>
                        )}
                        {options && options.length > 0 ? (
                            options.map((option, index) => (
                                <div
                                    key={index}
                                    className={`modal-seleccion-item ${selectedValue === option ? 'selected' : ''}`}
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
