import React, { useState } from 'react';
import './ModalNuevoCliente.css';
import iconSalir from '../assets/arrow-back-up.svg';
import iconGuardar from '../assets/circle-check.svg';

const createInitialCliente = () => ({
    codigoCliente: '',
    nombre: '',
    apellido: '',
    rncCedula: '',
    direccion: '',
    sector: '',
    ciudad: '',
    telefono: '',
    limiteCredito: '',
    balanceActual: '',
    observacion: '',
});

const ModalNuevoCliente = ({ isOpen, onClose, onSave }) => {
    const [formData, setFormData] = useState(createInitialCliente());

    if (!isOpen) return null;

    const handleChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSave = () => {
        onSave?.(formData);
        setFormData(createInitialCliente());
        onClose?.();
    };

    const handleClose = () => {
        setFormData(createInitialCliente());
        onClose?.();
    };

    return (
        <div className="modal-cliente-overlay">
            <div className="modal-cliente-container">
                <h2 className="modal-cliente-title">Anadir Cliente</h2>

                <div className="modal-cliente-form-section">
                    <h3 className="modal-cliente-subtitle">Informacion del cliente</h3>
                    <div className="modal-cliente-divider-line" />

                    <div className="modal-cliente-grid-form">
                        <div className="modal-cliente-input-group">
                            <label>Codigo Cliente:</label>
                            <input
                                type="text"
                                placeholder="1111"
                                value={formData.codigoCliente}
                                onChange={(e) => handleChange('codigoCliente', e.target.value)}
                            />
                        </div>
                        <div className="modal-cliente-input-group">
                            <label>Nombre:</label>
                            <input
                                type="text"
                                placeholder="Carlos"
                                value={formData.nombre}
                                onChange={(e) => handleChange('nombre', e.target.value)}
                            />
                        </div>
                        <div className="modal-cliente-input-group">
                            <label>Apellido:</label>
                            <input
                                type="text"
                                placeholder="Castillo"
                                value={formData.apellido}
                                onChange={(e) => handleChange('apellido', e.target.value)}
                            />
                        </div>
                        <div className="modal-cliente-input-group">
                            <label>RNC/Cedula:</label>
                            <input
                                type="text"
                                placeholder="44-665-898"
                                value={formData.rncCedula}
                                onChange={(e) => handleChange('rncCedula', e.target.value)}
                            />
                        </div>
                        <div className="modal-cliente-input-group">
                            <label>Direccion:</label>
                            <input
                                type="text"
                                placeholder="Oficina #5"
                                value={formData.direccion}
                                onChange={(e) => handleChange('direccion', e.target.value)}
                            />
                        </div>
                        <div className="modal-cliente-input-group">
                            <label>Sector:</label>
                            <input
                                type="text"
                                placeholder="El embrujo"
                                value={formData.sector}
                                onChange={(e) => handleChange('sector', e.target.value)}
                            />
                        </div>
                        <div className="modal-cliente-input-group">
                            <label>Ciudad:</label>
                            <input
                                type="text"
                                placeholder="Santiago"
                                value={formData.ciudad}
                                onChange={(e) => handleChange('ciudad', e.target.value)}
                            />
                        </div>
                        <div className="modal-cliente-input-group">
                            <label>Telefono:</label>
                            <input
                                type="text"
                                placeholder="849-279-2200"
                                value={formData.telefono}
                                onChange={(e) => handleChange('telefono', e.target.value)}
                            />
                        </div>
                        <div className="modal-cliente-input-group">
                            <label>Limite de credito:</label>
                            <input
                                type="text"
                                placeholder="$ 100,000"
                                value={formData.limiteCredito}
                                onChange={(e) => handleChange('limiteCredito', e.target.value)}
                            />
                        </div>
                        <div className="modal-cliente-input-group">
                            <label>Balance actual:</label>
                            <input
                                type="text"
                                placeholder="$ 70,000"
                                value={formData.balanceActual}
                                onChange={(e) => handleChange('balanceActual', e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="modal-cliente-input-group modal-cliente-full-width">
                        <label>Observacion:</label>
                        <textarea
                            placeholder="Bien"
                            rows="4"
                            value={formData.observacion}
                            onChange={(e) => handleChange('observacion', e.target.value)}
                        />
                    </div>
                </div>

                <div className="modal-cliente-footer-line">
                    <button className="btn-salir-cliente" onClick={handleClose}>
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
