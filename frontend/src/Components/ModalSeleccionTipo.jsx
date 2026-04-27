import React from 'react';
import './ModalSeleccion.css';
import iconSalir from '../assets/arrow-back-up.svg';
import { useModalShake } from './useModalShake';

const ModalSeleccionTipo = ({ isOpen, onClose, onSelect }) => {
    const { isShaking, handleOverlayClick } = useModalShake();

    if (!isOpen) {
        return null;
    }

    const handleSelectTipo = (tipo) => {
        onSelect?.(tipo);
        onClose?.();
    };

    const tipos = [
        { id: 'por_mayor', nombre: 'Venta al por mayor' },
        { id: 'consumidor_final', nombre: 'Venta al consumidor final' }
    ];

    return (
        <div className="modal-seleccion-overlay" onClick={handleOverlayClick}>
            <div className={`modal-seleccion-content scale-up-center ${isShaking ? 'shake' : ''}`} onClick={(e) => e.stopPropagation()}>
                <div className="modal-seleccion-header">
                    <h2 className="modal-seleccion-title">Seleccionar Tipo</h2>
                </div>

                <div className="modal-seleccion-body">
                    <div className="modal-seleccion-list">
                        {tipos.map((tipo) => (
                            <div
                                key={tipo.id}
                                className="modal-seleccion-item"
                                onClick={() => handleSelectTipo(tipo)}
                            >
                                <span>{tipo.nombre}</span>
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

export default ModalSeleccionTipo;
