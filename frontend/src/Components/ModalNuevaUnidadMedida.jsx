import React, { useState } from 'react';
import './ModalNuevaUnidadMedida.css';
import iconSalir from '../assets/arrow-back-up.svg';
import iconGuardar from '../assets/circle-check.svg';
import ModalConfirmar from './ModalConfirmar';
import { useModalShake } from './useModalShake';

const ModalNuevaUnidadMedida = ({ isOpen, onClose, onSave }) => {
    const [showConfirmExit, setShowConfirmExit] = useState(false);
    const [showConfirmSave, setShowConfirmSave] = useState(false);
    const { isShaking, handleOverlayClick } = useModalShake();

    const [codigo, setCodigo] = useState('');
    const [descripcion, setDescripcion] = useState('');

    if (!isOpen) return null;

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const container = e.target.closest('.modal-unidad-grid-form');
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
        onSave?.({ codigo, descripcion });
        setCodigo('');
        setDescripcion('');
        setShowConfirmSave(false);
    };

    const handleClose = () => {
        setShowConfirmExit(false);
        setCodigo('');
        setDescripcion('');
        onClose?.();
    };



    return (
        <div className="modal-unidad-overlay" onClick={handleOverlayClick}>
            <div className={`modal-unidad-container scale-up-center ${isShaking ? 'shake' : ''}`} onClick={(e) => e.stopPropagation()}>
                <div className="modal-unidad-form-section">
                    <h3 className="modal-unidad-subtitle">Información de la unidad de medida</h3>
                    <div className="modal-unidad-divider-line" />

                    <div className="modal-unidad-grid-form">
                        <div className="modal-unidad-input-group">
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
                        <div className="modal-unidad-input-group">
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

                <div className="modal-unidad-footer-line">
                    <button className="btn-salir-unidad" onClick={() => setShowConfirmExit(true)}>
                        <img src={iconSalir} alt="" className="modal-unidad-btn-icon" />
                        Salir
                    </button>
                    <button className="btn-guardar-unidad" onClick={handleSaveClick}>
                        <img src={iconGuardar} alt="" className="modal-unidad-btn-icon" />
                        Guardar Unidad
                    </button>
                </div>
            </div>

            <ModalConfirmar
                isOpen={showConfirmExit}
                onClose={() => setShowConfirmExit(false)}
                onConfirm={handleClose}
                mensaje="¿Está seguro de que desea salir?"
            />

            <ModalConfirmar
                isOpen={showConfirmSave}
                onClose={() => setShowConfirmSave(false)}
                onConfirm={handleConfirmSave}
                mensaje="¿Está seguro de que desea guardar esta unidad de medida?"
            />
        </div>
    );
};

export default ModalNuevaUnidadMedida;
