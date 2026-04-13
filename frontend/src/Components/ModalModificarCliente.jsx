import React from 'react';
import './ModalNuevoCliente.css';
import './ModalSharedAnimation.css';
import iconSalir from '../assets/arrow-back-up.svg';
import iconGuardar from '../assets/circle-check.svg';
import ModalConfirmarSalida from './ModalConfirmarSalida';
import { useModalShake } from './useModalShake';

const ModalModificarCliente = ({ isOpen, onClose, onGuardarModificacion, onUpdate, clienteData }) => {
    const [showConfirmExit, setShowConfirmExit] = React.useState(false);
    const { isShaking, handleOverlayClick } = useModalShake();

    if (!isOpen) return null;

    const handleUpdate = (event) => {
        event.preventDefault();
        (onUpdate ?? onGuardarModificacion)?.();
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
            <div className={`modal-cliente-container scale-up-center ${isShaking ? 'shake' : ''}`} onClick={(e) => e.stopPropagation()}>
                <h2 className="modal-cliente-title">Modificar Cliente</h2>

                <form onSubmit={handleUpdate}>
                    <div className="modal-cliente-form-section">
                        <h3 className="modal-cliente-subtitle">Información del cliente</h3>
                        <div className="modal-cliente-divider-line" />

                        <div className="modal-cliente-grid-form">
                            <div className="modal-cliente-input-group">
                                <label>Código Cliente:</label>
                                <input
                                    type="text"
                                    name="codigo"
                                    defaultValue={clienteData?.codigo ?? ''}
                                />
                            </div>
                            <div className="modal-cliente-input-group">
                                <label>Nombre:</label>
                                <input
                                    type="text"
                                    name="nombre"
                                    defaultValue={clienteData?.nombre ?? ''}
                                />
                            </div>
                            <div className="modal-cliente-input-group">
                                <label>Apellido:</label>
                                <input
                                    type="text"
                                    name="apellido"
                                    defaultValue={clienteData?.apellido ?? ''}
                                />
                            </div>
                            <div className="modal-cliente-input-group">
                                <label>RNC:</label>
                                <input
                                    type="text"
                                    name="rnc"
                                    defaultValue={clienteData?.rnc ?? ''}
                                />
                            </div>
                            <div className="modal-cliente-input-group">
                                <label>Dirección:</label>
                                <input
                                    type="text"
                                    name="direccion"
                                    defaultValue={clienteData?.direccion ?? ''}
                                />
                            </div>
                            <div className="modal-cliente-input-group">
                                <label>Sector:</label>
                                <input
                                    type="text"
                                    name="sector"
                                    defaultValue={clienteData?.sector ?? ''}
                                />
                            </div>
                            <div className="modal-cliente-input-group">
                                <label>Ciudad:</label>
                                <input
                                    type="text"
                                    name="ciudad"
                                    defaultValue={clienteData?.ciudad ?? ''}
                                />
                            </div>
                            <div className="modal-cliente-input-group">
                                <label>Teléfono:</label>
                                <input
                                    type="text"
                                    name="telefono"
                                    defaultValue={clienteData?.telefono ?? ''}
                                />
                            </div>
                            <div className="modal-cliente-input-group">
                                <label>Límite de crédito:</label>
                                <div className="modal-cliente-currency-field">
                                    <input
                                        type="text"
                                        name="limiteCredito"
                                        defaultValue={clienteData?.limiteCredito ?? clienteData?.limite ?? ''}
                                    />
                                </div>
                            </div>
                            <div className="modal-cliente-input-group">
                                <label>Balance actual:</label>
                                <div className="modal-cliente-currency-field">
                                    <input
                                        type="text"
                                        name="balanceActual"
                                        defaultValue={clienteData?.balanceActual ?? clienteData?.balance ?? ''}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="modal-cliente-input-group modal-cliente-full-width">
                            <label>Observación:</label>
                            <textarea
                                name="observacion"
                                defaultValue={clienteData?.observacion ?? ''}
                                rows="3"
                            />
                        </div>
                    </div>

                    <div className="modal-cliente-footer-line">
                        <button type="button" className="btn-salir-cliente" onClick={() => setShowConfirmExit(true)}>
                            <img src={iconSalir} alt="" className="modal-cliente-btn-icon" />
                            Salir
                        </button>
                        <button type="submit" className="btn-guardar-modificacion">
                            <img src={iconGuardar} alt="" className="modal-cliente-btn-icon" />
                            Guardar Modificación
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ModalModificarCliente;