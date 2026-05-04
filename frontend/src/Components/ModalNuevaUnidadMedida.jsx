import React, { useState, useEffect } from 'react';
import './ModalNuevaUnidadMedida.css';
import iconSalir from '../assets/arrow-back-up.svg';
import iconGuardar from '../assets/circle-check.svg';
import { useModalShake } from './useModalShake';
import { useValidacion } from '../hooks/useValidacion';
import ModalValidacion from './ModalValidacion';
import { fetchNextUnidadCode } from '../api/unidadesMedidaApi';

const ModalNuevaUnidadMedida = ({ isOpen, onClose, onSave, initialData }) => {
    const { isShaking, handleOverlayClick } = useModalShake();
    const { modalValidacion, cerrarError, mostrarError } = useValidacion();
    const [codigo, setCodigo] = useState('');
    const [descripcion, setDescripcion] = useState('');

    useEffect(() => {
        if (isOpen) {
            fetchNextUnidadCode()
                .then(data => setCodigo(data.codigo))
                .catch(() => setCodigo('U-0001'));
            setDescripcion(initialData?.descripcion || '');
        }
    }, [isOpen, initialData]);

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

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const container = e.target.closest('.modal-unidad-grid-form');
            const inputs = Array.from(container.querySelectorAll('input'));
            const currentIndex = inputs.indexOf(e.target);
            if (currentIndex + 1 < inputs.length) inputs[currentIndex + 1].focus();
        }
    };

    const handleClose = () => {
        setDescripcion('');
        onClose?.();
    };

    const handleSave = () => {
        if (!descripcion || descripcion.trim() === '') {
            mostrarError('Descripción', 'obligatorio');
            return;
        }
        onSave?.({ codigo, descripcion: descripcion.trim() });
    };

    return (
        <div className="modal-unidad-overlay" onClick={handleOverlayClick}>
            <div
                className={`modal-unidad-container scale-up-center ${isShaking ? 'shake' : ''}`}
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="modal-unidad-title">Ingrese la unidad de medida</h2>
                <div className="modal-unidad-form-section">
                    <h3 className="modal-unidad-subtitle">Información de la unidad de medida</h3>
                    <div className="modal-unidad-divider-line" />
                    <div className="modal-unidad-grid-form">
                        <div className="modal-unidad-input-group">
                            <label>Código:</label>
                            <input
                                type="text"
                                value={codigo}
                                readOnly
                                style={{ backgroundColor: '#f0f0f0', cursor: 'not-allowed' }}
                            />
                        </div>
                        <div className="modal-unidad-input-group">
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

                <div className="modal-unidad-footer-line">
                    <button className="btn-salir-unidad" onClick={handleClose}>
                        <img src={iconSalir} alt="" className="modal-unidad-btn-icon" />
                        Salir
                    </button>
                    <button className="btn-guardar-unidad" onClick={() => onSave?.({ codigo, descripcion })}>
                        <img src={iconGuardar} alt="" className="modal-unidad-btn-icon" />
                        Guardar Unidad
                    </button>
                </div>
            </div>

        </div>
    );
};

export default ModalNuevaUnidadMedida;