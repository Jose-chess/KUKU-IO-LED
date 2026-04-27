import React from 'react';
import './ModalSeleccion.css';
import iconSalir from '../assets/arrow-back-up.svg';
import { useModalShake } from './useModalShake';

const ModalSeleccionDescuento = ({ isOpen, onClose, onSelect }) => {
    const { isShaking, handleOverlayClick } = useModalShake();

    if (!isOpen) {
        return null;
    }

    const handleSelectDescuento = (descuento) => {
        onSelect?.(descuento);
        onClose?.();
    };

    const descuentos = [
        { id: '5_mas', cantidad: '5+', porcentaje: '20%' },
        { id: '10_mas', cantidad: '10+', porcentaje: '30%' }
    ];

    return (
        <div className="modal-seleccion-overlay" onClick={handleOverlayClick}>
            <div className={`modal-seleccion-content scale-up-center ${isShaking ? 'shake' : ''}`} onClick={(e) => e.stopPropagation()}>
                <div className="modal-seleccion-header">
                    <h2 className="modal-seleccion-title">Seleccionar Descuento</h2>
                </div>

                <div className="modal-seleccion-body">
                    <div className="modal-seleccion-list">
                        {descuentos.map((descuento) => (
                            <div
                                key={descuento.id}
                                className="modal-seleccion-item modal-seleccion-item-descuento"
                                onClick={() => handleSelectDescuento(descuento)}
                            >
                                <span className="descuento-cantidad">{descuento.cantidad}</span>
                                <span className="descuento-porcentaje">{descuento.porcentaje}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="modal-seleccion-footer">
                    <button className="modal-seleccion-btn-salir" onClick={onClose}>
                        <img src={iconSalir} alt="" className="modal-seleccion-btn-icon" />
                        Retroceder
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ModalSeleccionDescuento;
