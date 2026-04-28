import React from 'react';
import './ModalSeleccion.css';
import iconSalir from '../assets/arrow-back-up.svg';
import { useModalShake } from './useModalShake';

const ModalSeleccionCliente = ({ isOpen, onClose, clientes = [], onSelect = () => {}, position }) => {
    const { isShaking, handleOverlayClick } = useModalShake();

    if (!isOpen) {
        return null;
    }

    const handleSelectCliente = (cliente) => {
        onSelect?.(cliente);
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
            <div className={`modal-seleccion-content scale-up-center ${isShaking ? 'shake' : ''}`} style={modalPositionStyle} onClick={(e) => e.stopPropagation()}>
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
            </div>
        </div>
    );
};

export default ModalSeleccionCliente;
