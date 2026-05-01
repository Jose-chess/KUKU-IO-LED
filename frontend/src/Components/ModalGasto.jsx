import React, { useState } from 'react';
import './ModalGasto.css';
import iconSalir from '../assets/arrow-back-up.svg';
import iconConfirmar from '../assets/circle-check.svg';
import ModalConfirmar from './ModalConfirmar';
import ModalConfirmarSalida from './ModalConfirmarSalida';
import ModalExito from './ModalExito';
import ModalErrorGasto from './ModalErrorGasto';
import { useModalShake } from './useModalShake';

const ModalGasto = ({ isOpen, onClose, onGuardar }) => {
    const [showConfirm, setShowConfirm] = useState(false);
    const [showConfirmExit, setShowConfirmExit] = useState(false);
    const [showExito, setShowExito] = useState(false);
    const [showError, setShowError] = useState(false);
    const { isShaking, handleOverlayClick } = useModalShake();
    const [descripcion, setDescripcion] = useState('');
    const [monto, setMonto] = useState('');

    if (!isOpen) {
        return null;
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const inputs = Array.from(document.querySelectorAll('.modal-gasto-input'));
            const currentIndex = inputs.indexOf(e.target);
            const nextIndex = currentIndex + 1;
            if (nextIndex < inputs.length) {
                inputs[nextIndex].focus();
            }
        }
    };

    const closeAllModals = () => {
        setShowConfirm(false);
        setShowConfirmExit(false);
        setShowExito(false);
        setShowError(false);
    };

    const handleConfirmarGasto = async () => {
        setShowConfirm(false);
        setShowConfirmExit(false);

        try {
            const payload = { descripcion: descripcion.trim(), monto: monto.trim() };
            const response = await onGuardar?.(payload);

            if (response === false || response?.success === false) {
                setShowError(true);
                return;
            }

            setShowExito(true);
        } catch {
            setShowError(true);
        }
    };

    const handleCloseExito = () => {
        setShowExito(false);
        closeAllModals();
        onClose();
    };

    const handleClose = () => {
        closeAllModals();
        onClose();
    };

    const handleOpenConfirm = () => {
        setShowConfirm(true);
    };

    const handleOpenExitConfirm = () => {
        setShowConfirmExit(true);
    };

    if (showConfirm) {
        return (
            <ModalConfirmar
                isOpen={showConfirm}
                onClose={() => setShowConfirm(false)}
                onConfirm={handleConfirmarGasto}
            />
        );
    }

    if (showConfirmExit) {
        return (
            <ModalConfirmarSalida
                isOpen={showConfirmExit}
                onClose={() => setShowConfirmExit(false)}
                onConfirm={handleClose}
            />
        );
    }

    if (showExito) {
        return (
            <ModalExito
                isOpen={showExito}
                onClose={handleCloseExito}
                subtitle="Gasto registrado exitosamente!"
            />
        );
    }

    if (showError) {
        return (
            <ModalErrorGasto
                isOpen={showError}
                onClose={() => setShowError(false)}
            />
        );
    }

    return (
        <div className="modal-gasto-overlay" onClick={handleOverlayClick}>
            <div className={`modal-gasto-container ${isShaking ? 'shake' : ''}`} onClick={(e) => e.stopPropagation()}>
                <h2 className="modal-gasto-title">Registrar Gasto</h2>

                <div className="modal-gasto-body-card">
                    <h3 className="modal-gasto-section-subtitle">Información del gasto</h3>
                    <div className="modal-gasto-divider-line"></div>

                    <div className="modal-gasto-input-group">
                        <label className="modal-gasto-input-label">Descripcion:</label>
                        <textarea
                            placeholder="Ingrese una breve descripción del gasto"
                            className="modal-gasto-input modal-gasto-textarea"
                            value={descripcion}
                            onChange={(e) => setDescripcion(e.target.value)}
                            rows={3}
                        />
                    </div>

                    <div className="modal-gasto-input-group">
                        <label className="modal-gasto-input-label">Monto del gasto:</label>
                        <input
                            type="text"
                            placeholder="Ingrese el monto del gasto"
                            className="modal-gasto-input modal-gasto-monto-input"
                            value={monto}
                            onChange={(e) => setMonto(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                    </div>
                </div>

                <div className="modal-gasto-footer">
                    <button className="modal-gasto-btn-salir" onClick={handleOpenExitConfirm}>
                        <img src={iconSalir} alt="" className="modal-gasto-btn-icon" />
                        Salir
                    </button>
                    <button className="modal-gasto-btn-guardar" onClick={handleOpenConfirm}>
                        <img src={iconConfirmar} alt="" className="modal-gasto-btn-icon" />
                        Guardar gasto
                    </button>
                </div>

            </div>
        </div>
    );
};

export default ModalGasto;
