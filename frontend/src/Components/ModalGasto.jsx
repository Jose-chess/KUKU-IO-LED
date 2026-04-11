import React, { useState } from 'react';
import './ModalGasto.css';
import iconSalir from '../assets/arrow-back-up.svg';
import iconConfirmar from '../assets/circle-check.svg';
import ModalConfirmar from './ModalConfirmar';
import ModalConfirmarSalida from './ModalConfirmarSalida';
import ModalExito from './ModalExito';
import ModalErrorGasto from './ModalErrorGasto';

const createInitialGastoFormData = () => ({
    descripcion: '',
    monto: '',
    fecha: new Date().toISOString(),
    categoria: 'Operativo',
});

const ModalGasto = ({ isOpen, onClose, onGuardar, onGastoGuardado }) => {
    const [formData, setFormData] = useState(createInitialGastoFormData);
    const [status, setStatus] = useState('idle');
    const [showConfirm, setShowConfirm] = useState(false);
    const [showConfirmExit, setShowConfirmExit] = useState(false);
    const [showExito, setShowExito] = useState(false);
    const [showError, setShowError] = useState(false);

    if (!isOpen) {
        return null;
    }

    const isLoading = status === 'loading';

    const resetForm = () => {
        setFormData(createInitialGastoFormData());
        setStatus('idle');
    };

    const closeAllModals = () => {
        setShowConfirm(false);
        setShowConfirmExit(false);
        setShowExito(false);
        setShowError(false);
    };

    const handleCampoChange = (campo, value) => {
        setFormData((current) => ({
            ...current,
            [campo]: value,
        }));
    };

    const handleConfirmarGasto = async () => {
        setStatus('loading');

        try {
            const payload = {
                ...formData,
                descripcion: formData.descripcion.trim() || 'Sin descripcion',
                monto: formData.monto.trim() || '0',
            };

            const result = onGuardar
                ? await onGuardar(payload)
                : await new Promise((resolve) => {
                    window.setTimeout(() => resolve({ success: true, data: payload }), 350);
                });

            if (result === false || result?.success === false) {
                throw new Error('No se pudo guardar el gasto');
            }

            onGastoGuardado?.(result?.data ?? payload);
            setStatus('success');
            setShowConfirm(false);
            setShowConfirmExit(false);
            setShowExito(true);
        } catch (error) {
            console.error('Error al guardar gasto:', error);
            setStatus('error');
            setShowConfirm(false);
            setShowConfirmExit(false);
            setShowError(true);
        }
    };

    const handleCloseExito = () => {
        setShowExito(false);
        resetForm();
        closeAllModals();
        onClose();
    };

    const handleCloseError = () => {
        setShowError(false);
        setStatus('idle');
    };

    const handleClose = () => {
        resetForm();
        closeAllModals();
        onClose();
    };

    const handleOpenConfirm = () => {
        if (!isLoading) {
            setShowConfirm(true);
        }
    };

    const handleOpenExitConfirm = () => {
        if (!isLoading) {
            setShowConfirmExit(true);
        }
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
                            value={formData.descripcion}
                            onChange={(e) => handleCampoChange('descripcion', e.target.value)}
                            disabled={isLoading}
                        />
                    </div>

                    <div className="modal-gasto-input-group">
                        <label className="modal-gasto-input-label">Monto del gasto:</label>
                        <input
                            type="text"
                            placeholder="Ingrese el monto del gasto"
                            className="modal-gasto-input modal-gasto-monto-input"
                            value={formData.monto}
                            onChange={(e) => handleCampoChange('monto', e.target.value)}
                            disabled={isLoading}
                        />
                    </div>
                </div>

                <div className="modal-gasto-footer">
                    <button className="modal-gasto-btn-salir" onClick={handleOpenExitConfirm} disabled={isLoading}>
                        <img src={iconSalir} alt="" className="modal-gasto-btn-icon" />
                        Salir
                    </button>
                    <button className="modal-gasto-btn-guardar" onClick={handleOpenConfirm} disabled={isLoading}>
                        <img src={iconConfirmar} alt="" className="modal-gasto-btn-icon" />
                        {isLoading ? 'Guardando...' : 'Guardar gasto'}
                    </button>
                </div>

                <ModalConfirmar
                    isOpen={showConfirm}
                    onClose={() => setShowConfirm(false)}
                    onConfirm={handleConfirmarGasto}
                    isLoading={isLoading}
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
