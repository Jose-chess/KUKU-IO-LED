import React from 'react';
import './ModalSeleccion.css';
import { useModalShake } from './useModalShake';

const ModalSeleccionCliente = ({ isOpen, onClose, clientes = [], onSelect = () => { }, position }) => {
    const { isShaking } = useModalShake();

    if (!isOpen) {
        return null;
    }

    const handleSelectCliente = (cliente) => {
        onSelect?.(cliente);
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

    return (
        <div
            className={`modal-seleccion-content scale-up-center ${isShaking ? 'shake' : ''}`}
            style={modalPositionStyle}
        >
            <div className="modal-seleccion-body">
                <div className="modal-seleccion-list">
                    {clientes && clientes.length > 0 ? (
                        clientes.map((cliente) => (
                            <div
                                key={cliente.id}
                                className="modal-seleccion-item"
                                onClick={() => handleSelectCliente(cliente)}
                            >
                                <span>{cliente.nombre}</span>
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
    );
};

export default ModalSeleccionCliente;
