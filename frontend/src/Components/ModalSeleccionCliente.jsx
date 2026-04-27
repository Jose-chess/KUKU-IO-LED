import React from 'react';
import './ModalSeleccion.css';
import iconSalir from '../assets/arrow-back-up.svg';
import { useModalShake } from './useModalShake';

const ModalSeleccionCliente = ({ isOpen, onClose, clientes, onSelect }) => {
    const { isShaking, handleOverlayClick } = useModalShake();

    if (!isOpen) {
        return null;
    }

    const handleSelectCliente = (cliente) => {
        onSelect?.(cliente);
        onClose?.();
    };

    return (
        <div className="modal-seleccion-overlay" onClick={handleOverlayClick}>
            <div className={`modal-seleccion-content scale-up-center ${isShaking ? 'shake' : ''}`} onClick={(e) => e.stopPropagation()}>
                <div className="modal-seleccion-header">
                    <h2 className="modal-seleccion-title">Seleccionar Cliente</h2>
                </div>

                <div className="modal-seleccion-body">
                    <div className="modal-seleccion-list">
                        {clientes && clientes.length > 0 ? (
                            clientes.map((cliente) => (
                                <div
                                    key={cliente.id}
                                    className="modal-seleccion-item"
                                    onClick={() => handleSelectCliente(cliente)}
                                >
                                    <span>{cliente.nombre} {cliente.apellido}</span>
                                </div>
                            ))
                        ) : (
                            <div className="modal-seleccion-empty">
                                No hay clientes disponibles
                            </div>
                        )}
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

export default ModalSeleccionCliente;
