import React, { useState, useEffect } from 'react';
import './ModalEditarUnidadMedida.css';
import iconSalir from '../assets/arrow-back-up.svg';
import iconGuardar from '../assets/circle-check.svg';
import { useModalShake } from './useModalShake';
import { useValidacion } from '../hooks/useValidacion';
import ModalValidacion from './ModalValidacion';

const ModalEditarUnidadMedida = ({ isOpen, onClose, onSave, unidad }) => {
    const { isShaking, handleOverlayClick } = useModalShake();
    const { modalValidacion, cerrarError, mostrarError } = useValidacion();
    const [codigo, setCodigo] = useState('');
    const [descripcion, setDescripcion] = useState('');

    useEffect(() => {
        if (unidad) {
            setCodigo(unidad.codigo || '');
            setDescripcion(unidad.descripcion || '');
        } else {
            setCodigo('');
            setDescripcion('');
        }
    }, [unidad]);

    if (!isOpen) return null;

    if (modalValidacion.isOpen) {
        return (
            <ModalValidacion
                isOpen={modalValidacion.isOpen}
                onClose={cerrarError}
                campo={modalValidacion.campo}
                tipo={modalValidacion.tipo}
                mensaje={modalValidacion.mensaje}
            />
        );
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const container = e.target.closest('.modal-editar-unidad-grid-form');
            const inputs = Array.from(container.querySelectorAll('input'));
            const currentIndex = inputs.indexOf(e.target);
            if (currentIndex + 1 < inputs.length) inputs[currentIndex + 1].focus();
        }
    };

    const handleDescripcionKeyDown = (e) => {
        if (e.key.length === 1 && /\d/.test(e.key)) {
            e.preventDefault();
            mostrarError('Descripción', 'letras');
            return;
        }
        handleKeyDown(e);
    };

    const handleDescripcionChange = (e) => {
        const valor = e.target.value.toUpperCase();
        if (/\d/.test(valor)) return;
        setDescripcion(valor);
    };

    const handleSave = () => {
        if (!descripcion || descripcion.trim() === '') {
            mostrarError('Descripción', 'obligatorio');
            return;
        }
        if (descripcion.trim().length < 2) {
            mostrarError('Descripción', 'custom', 'La descripción debe tener al menos 2 caracteres');
            return;
        }
        onSave?.({ codigo, descripcion: descripcion.trim() });
    };

    const handleClose = () => {
        if (unidad) {
            setCodigo(unidad.codigo || '');
            setDescripcion(unidad.descripcion || '');
        }
        onClose?.();
    };

    return (
        <div className="modal-editar-unidad-overlay" onClick={() => handleOverlayClick(onClose)}>
            <div
                className={`modal-editar-unidad-container scale-up-center ${isShaking ? 'shake' : ''}`}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="modal-editar-unidad-form-section">
                    <h3 className="modal-editar-unidad-subtitle">Información de la unidad de medida</h3>
                    <div className="modal-editar-unidad-divider-line" />
                    <div className="modal-editar-unidad-grid-form">
                        <div className="modal-editar-unidad-input-group">
                            <label>Código:</label>
                            <input
                                type="text"
                                value={codigo}
                                readOnly
                                style={{ backgroundColor: '#f0f0f0', cursor: 'not-allowed' }}
                            />
                        </div>
                        <div className="modal-editar-unidad-input-group">
                            <label>Descripción: *</label>
                            <input
                                type="text"
                                placeholder="Ingrese la descripción"
                                value={descripcion}
                                onChange={handleDescripcionChange}
                                onKeyDown={handleDescripcionKeyDown}
                                autoFocus
                            />
                        </div>
                    </div>
                </div>

                <div className="modal-editar-unidad-footer-line">
                    <button className="btn-salir-editar-unidad" onClick={handleClose}>
                        <img src={iconSalir} alt="" className="modal-editar-unidad-btn-icon" />
                        Salir
                    </button>
                    <button className="btn-guardar-editar-unidad" onClick={handleSave}>
                        <img src={iconGuardar} alt="" className="modal-editar-unidad-btn-icon" />
                        Guardar Modificación
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ModalEditarUnidadMedida;
