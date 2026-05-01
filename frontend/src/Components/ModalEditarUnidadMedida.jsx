import React, { useState, useEffect } from 'react';
import './ModalEditarUnidadMedida.css';
import iconSalir from '../assets/arrow-back-up.svg';
import iconGuardar from '../assets/circle-check.svg';
import ModalConfirmarSalida from './ModalConfirmarSalida';
import ModalConfirmar from './ModalConfirmar';
import { useModalShake } from './useModalShake';

const ModalEditarUnidadMedida = ({ isOpen, onClose, onSave, unidad }) => {
    const [showConfirmExit, setShowConfirmExit] = useState(false);
    const [showConfirmSave, setShowConfirmSave] = useState(false);
    const { isShaking, handleOverlayClick } = useModalShake();

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

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const container = e.target.closest('.modal-editar-unidad-grid-form');
            const inputs = Array.from(container.querySelectorAll('input'));
            const currentIndex = inputs.indexOf(e.target);
            const nextIndex = currentIndex + 1;
            if (nextIndex < inputs.length) {
                inputs[nextIndex].focus();
            }
        }
    };

    const handleSaveClick = () => {
        setShowConfirmSave(true);
    };

    const handleConfirmSave = () => {
        onSave?.({ ...unidad, codigo, descripcion });
        setShowConfirmSave(false);
    };

    const handleClose = () => {
        setShowConfirmExit(false);
        if (unidad) {
            setCodigo(unidad.codigo || '');
            setDescripcion(unidad.descripcion || '');
        }
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

    if (showConfirmSave) {
        return (
            <ModalConfirmar
                isOpen={showConfirmSave}
                onClose={() => setShowConfirmSave(false)}
                onConfirm={handleConfirmSave}
                title="Confirmar Modificación"
                mensaje="¿Estás seguro de que desea guardar esta modificación?"
                salirLabel="Retroceder"
                confirmLabel="Confirmar"
            />
        );
    }

    return (
        <div className="modal-editar-unidad-overlay" onClick={handleOverlayClick}>
            <div className={`modal-editar-unidad-container ${isShaking ? 'shake' : ''}`} onClick={(e) => e.stopPropagation()}>
                <h2 className="modal-editar-unidad-title">Editar la unidad de medida</h2>

                <div className="modal-editar-unidad-form-section">
                    <h3 className="modal-editar-unidad-subtitle">Información de la unidad de medida</h3>
                    <div className="modal-editar-unidad-divider-line" />

                    <div className="modal-editar-unidad-grid-form">
                        <div className="modal-editar-unidad-input-group">
                            <label>Código:</label>
                            <input
                                type="text"
                                placeholder="Autogenerado por el sistema"
                                value={codigo}
                                onChange={(e) => setCodigo(e.target.value.toUpperCase())}
                                onKeyDown={handleKeyDown}
                                maxLength={3}
                            />
                        </div>
                        <div className="modal-editar-unidad-input-group">
                            <label>Descripción:</label>
                            <input
                                type="text"
                                placeholder="Ingrese la descripción"
                                value={descripcion}
                                onChange={(e) => setDescripcion(e.target.value)}
                                onKeyDown={handleKeyDown}
                            />
                        </div>
                    </div>
                </div>

                <div className="modal-editar-unidad-footer-line">
                    <button className="btn-salir-editar-unidad" onClick={() => setShowConfirmExit(true)}>
                        <img src={iconSalir} alt="" className="modal-editar-unidad-btn-icon" />
                        Salir
                    </button>
                    <button className="btn-guardar-editar-unidad" onClick={handleSaveClick}>
                        <img src={iconGuardar} alt="" className="modal-editar-unidad-btn-icon" />
                        Guardar Modificación
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ModalEditarUnidadMedida;
