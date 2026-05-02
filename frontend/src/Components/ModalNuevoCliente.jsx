import React, { useState } from 'react';
import './ModalNuevoCliente.css';
import iconSalir from '../assets/arrow-back-up.svg';
import iconGuardar from '../assets/circle-check.svg';
import ModalConfirmarSalida from './ModalConfirmarSalida';
import { useModalShake } from './useModalShake';

const ModalNuevoCliente = ({ isOpen, onClose, onSave }) => {
    const [showConfirmExit, setShowConfirmExit] = useState(false);
    const { isShaking, handleOverlayClick } = useModalShake();

    if (!isOpen) return null;

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const container = e.target.closest('.modal-cliente-container');
            const inputs = Array.from(container.querySelectorAll('input, textarea'));
            const currentIndex = inputs.indexOf(e.target);
            const nextIndex = currentIndex + 1;
            if (nextIndex < inputs.length) {
                inputs[nextIndex].focus();
            }
        }
    };

    const handleSave = () => {
        onSave?.();
    };

    const handleClose = () => {
        setShowConfirmExit(false);
        onClose?.();
    };

    if (showConfirmExit) {
        return (
            <ModalConfirmarSalida
                isOpen={showConfirmExit}
                onClose={() => setShowConfirmExit(false)}
                onConfirm={handleClose}
            />
        );
    }

    return (
        <div className="modal-cliente-overlay" onClick={() => handleOverlayClick(onClose)}>
            <div className={`modal-cliente-container ${isShaking ? 'shake' : ''}`} onClick={(e) => e.stopPropagation()}>
                <h2 className="modal-cliente-title">Añadir Cliente</h2>

                <div className="modal-cliente-form-section">
                    <h3 className="modal-cliente-subtitle">Informacion del cliente</h3>
                    <div className="modal-cliente-divider-line" />

                    <div className="modal-cliente-grid-form">
                        <div className="modal-cliente-input-group">
                            <label>Código del cliente:</label>
                            <input
                                type="text"
                                placeholder="Autoincremental por el sistema"
                                onKeyDown={handleKeyDown}
                                readOnly
                            />
                        </div>
                        <div className="modal-cliente-input-group">
                            <label>Nombre:</label>
                            <input
                                type="text"
                                placeholder="Ingrese el nombre"
                                onKeyDown={handleKeyDown}
                            />
                        </div>
                        <div className="modal-cliente-input-group">
                            <label>Apellido:</label>
                            <input
                                type="text"
                                placeholder="Ingrese el apellido"
                                onKeyDown={handleKeyDown}
                            />
                        </div>
                        <div className="modal-cliente-input-group">
                            <label>RNC/Cédula:</label>
                            <input
                                type="text"
                                placeholder="Ingrese el RNC o Cédula"
                                onKeyDown={handleKeyDown}
                            />
                        </div>
                        <div className="modal-cliente-input-group">
                            <label>Dirección:</label>
                            <input
                                type="text"
                                placeholder="Ingrese la dirección"
                                onKeyDown={handleKeyDown}
                            />
                        </div>
                        <div className="modal-cliente-input-group">
                            <label>Sector:</label>
                            <input
                                type="text"
                                placeholder="Ingrese el sector"
                                onKeyDown={handleKeyDown}
                            />
                        </div>
                        <div className="modal-cliente-input-group">
                            <label>Ciudad:</label>
                            <input
                                type="text"
                                placeholder="Ingrese la ciudad"
                                onKeyDown={handleKeyDown}
                            />
                        </div>
                        <div className="modal-cliente-input-group">
                            <label>Teléfono:</label>
                            <input
                                type="text"
                                placeholder="Ingrese el teléfono"
                                onKeyDown={handleKeyDown}
                            />
                        </div>
                        <div className="modal-cliente-input-group">
                            <label>Limite de crédito:</label>
                            <input
                                type="text"
                                placeholder="Ingrese el límite de crédito"
                                onKeyDown={handleKeyDown}
                            />
                        </div>
                        <div className="modal-cliente-input-group">
                            <label>Balance actual:</label>
                            <input
                                type="text"
                                placeholder="Ingrese el balance actual"
                                onKeyDown={handleKeyDown}
                            />
                        </div>
                    </div>

                    <div className="modal-cliente-input-group modal-cliente-full-width">
                        <label>Observación:</label>
                        <textarea
                            placeholder="Ingrese una observación"
                            rows="4"
                            onKeyDown={handleKeyDown}
                        />
                    </div>
                </div>

                <div className="modal-cliente-footer-line">
                    <button className="btn-salir-cliente" onClick={() => setShowConfirmExit(true)}>
                        <img src={iconSalir} alt="" className="modal-cliente-btn-icon" />
                        Salir
                    </button>
                    <button className="btn-guardar-cliente" onClick={handleSave}>
                        <img src={iconGuardar} alt="" className="modal-cliente-btn-icon" />
                        Guardar cliente
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ModalNuevoCliente;
