import React, { useState } from 'react';
import './ModalGasto.css';
import iconSalir from '../assets/arrow-back-up.svg';
import iconConfirmar from '../assets/circle-check.svg';
import ModalConfirmar from './ModalConfirmar';
import ModalConfirmarSalida from './ModalConfirmarSalida';
import ModalExito from './ModalExito';
import ModalErrorGasto from './ModalErrorGasto';

const ModalGasto = ({ isOpen, onClose, onGuardar }) => {
    const [descripcion, setDescripcion] = useState('');
    const [monto, setMonto] = useState('');
    const [showConfirm, setShowConfirm] = useState(false);
    const [showConfirmExit, setShowConfirmExit] = useState(false);
    const [showExito, setShowExito] = useState(false);
    const [showError, setShowError] = useState(false);

    if (!isOpen) {
        return null;
    }

    const handleGuardar = async () => {
        const payload = {
            descripcion: descripcion.trim(),
            monto: monto.trim(),
        };

        try {
            const result = onGuardar ? await onGuardar(payload) : { success: true };

            if (result === false || result?.success === false) {
                throw new Error('No se pudo guardar el gasto');
            }

            setShowConfirm(false);
            setShowConfirmExit(false);
            setShowExito(true);
        } catch (error) {
            console.error('Error al guardar gasto:', error);
            setShowConfirm(false);
            setShowConfirmExit(false);
            setShowError(true);
        }
    };

    const handleCloseExito = () => {
        setShowExito(false);
        setDescripcion('');
        setMonto('');
        onClose();
    };

    const handleCloseError = () => {
        setShowError(false);
    };

    const handleClose = () => {
        setDescripcion('');
        setMonto('');
        setShowConfirm(false);
        setShowConfirmExit(false);
        setShowExito(false);
        setShowError(false);
        onClose();
    };

    if (showExito) {
        return <ModalExito isOpen={showExito} onClose={handleCloseExito} />;
    }

    if (showError) {
        return <ModalErrorGasto isOpen={showError} onClose={handleCloseError} />;
    }

    return (
        <div className="modal-gasto-overlay">
            <div className="modal-gasto-container">
                <h2 className="modal-gasto-title">Registrar Gasto</h2>

                <div className="modal-gasto-body-card">
                    <h3 className="modal-gasto-section-subtitle">Información del gasto</h3>
                    <div className="modal-gasto-divider-line"></div>

                    <div className="modal-gasto-input-group">
                        <label className="modal-gasto-input-label">Descripcion:</label>
                        <input
                            type="text"
                            placeholder="Ingrese una breve descripción del gasto"
                            className="modal-gasto-input"
                            value={descripcion}
                            onChange={(e) => setDescripcion(e.target.value)}
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
                        />
                    </div>
                </div>

                <div className="modal-gasto-footer">
                    <button className="modal-gasto-btn-salir" onClick={() => setShowConfirmExit(true)}>
                        <img src={iconSalir} alt="" className="modal-gasto-btn-icon" />
                        Salir
                    </button>
                    <button className="modal-gasto-btn-guardar" onClick={() => setShowConfirm(true)}>
                        <img src={iconConfirmar} alt="" className="modal-gasto-btn-icon" />
                        Guardar gasto
                    </button>
                </div>

                <ModalConfirmar
                    isOpen={showConfirm}
                    onClose={() => setShowConfirm(false)}
                    onConfirm={handleGuardar}
                />

                <ModalConfirmarSalida
                    isOpen={showConfirmExit}
                    onClose={() => setShowConfirmExit(false)}
                    onConfirm={handleClose}
                />

                <ModalExito
                    isOpen={showExito}
                    onClose={handleCloseExito}
                />

                <ModalErrorGasto
                    isOpen={showError}
                    onClose={handleCloseError}
                />
            </div>
        </div>
    );
};

export default ModalGasto;