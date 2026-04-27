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
        <div className="modal-cliente-overlay" onClick={handleOverlayClick}>
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
                            />
                        </div>
                        <div className="modal-cliente-input-group">
                            <label>Nombre:</label>
                            <input
                                type="text"
                                placeholder="Ingrese el nombre"
                            />
                        </div>
                        <div className="modal-cliente-input-group">
                            <label>Apellido:</label>
                            <input
                                type="text"
                                placeholder="Ingrese el apellido"
                            />
                        </div>
                        <div className="modal-cliente-input-group">
                            <label>RNC/Cédula:</label>
                            <input
                                type="text"
                                placeholder="Ingrese el RNC o Cédula"
                            />
                        </div>
                        <div className="modal-cliente-input-group">
                            <label>Dirección:</label>
                            <input
                                type="text"
                                placeholder="Ingrese la dirección"
                            />
                        </div>
                        <div className="modal-cliente-input-group">
                            <label>Sector:</label>
                            <input
                                type="text"
                                placeholder="Ingrese el sector"
                            />
                        </div>
                        <div className="modal-cliente-input-group">
                            <label>Ciudad:</label>
                            <input
                                type="text"
                                placeholder="Ingrese la ciudad"
                            />
                        </div>
                        <div className="modal-cliente-input-group">
                            <label>Teléfono:</label>
                            <input
                                type="text"
                                placeholder="Ingrese el teléfono"
                            />
                        </div>
                        <div className="modal-cliente-input-group">
                            <label>Limite de crédito:</label>
                            <input
                                type="text"
                                placeholder="Ingrese el límite de crédito"
                            />
                        </div>
                        <div className="modal-cliente-input-group">
                            <label>Balance actual:</label>
                            <input
                                type="text"
                                placeholder="Ingrese el balance actual"
                            />
                        </div>
                    </div>

                    <div className="modal-cliente-input-group modal-cliente-full-width">
                        <label>Observación:</label>
                        <textarea
                            placeholder="Ingrese una observación"
                            rows="4"
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
