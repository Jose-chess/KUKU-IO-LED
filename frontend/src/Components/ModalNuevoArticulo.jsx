import React, { useState, useRef } from 'react';
import './ModalNuevoArticulo.css';
import iconSalir from '../assets/arrow-back-up.svg';
import iconGuardar from '../assets/circle-check.svg';
import ModalConfirmarSalida from './ModalConfirmarSalida';
import ModalSeleccionSimple from './ModalSeleccionSimple';
import { useModalShake } from './useModalShake';
import iconFlecha from '../assets/chevron-down.svg';

const ModalNuevoArticulo = ({ isOpen, onClose, onSave }) => {
    const [showConfirmExit, setShowConfirmExit] = useState(false);
    const [showModalUnidad, setShowModalUnidad] = useState(false);
    const [unidadSeleccionada, setUnidadSeleccionada] = useState('');
    const [modalPosition, setModalPosition] = useState(null);
    const unidadRef = useRef(null);
    const { isShaking, handleOverlayClick, triggerShake } = useModalShake();

    // Handler personalizado para el overlay que cierra el submodal sin shake
    const handleOverlayClickCustom = (e) => {
        if (showModalUnidad) {
            setShowModalUnidad(false);
            return;
        }
        handleOverlayClick(onClose);
    };

    if (!isOpen) return null;

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const container = e.target.closest('.modal-articulo-container');
            const inputs = Array.from(container.querySelectorAll('input'));
            const currentIndex = inputs.indexOf(e.target);
            const nextIndex = currentIndex + 1;
            if (nextIndex < inputs.length) {
                inputs[nextIndex].focus();
            }
        }
    };

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
        <div className="modal-articulo-overlay" onClick={handleOverlayClickCustom}>
            <div className={`modal-articulo-container ${isShaking ? 'shake' : ''}`} onClick={(e) => e.stopPropagation()}>
                <h2 className="modal-articulo-title">Añadir Artículo</h2>

                <div className="modal-articulo-form-section">
                    <h3 className="modal-articulo-subtitle">Información del artículo</h3>
                    <div className="modal-articulo-divider-line" />

                    <div className="modal-articulo-grid-form">
                        <div className="modal-articulo-input-group">
                            <label>Código del artículo:</label>
                            <input type="text"
                             placeholder="Autoincremental por el sistema" onKeyDown={handleKeyDown} readOnly />
                        </div>
                        <div className="modal-articulo-input-group">
                            <label>Descripción:</label>
                            <input type="text"
                             placeholder='Ingrese el nombre del artículo' onKeyDown={handleKeyDown} />
                        </div>
                        <div className="modal-articulo-input-group">
                            <label>Color:</label>
                            <input type="text"
                            placeholder='Ingrese el color del artículo' onKeyDown={handleKeyDown} />
                        </div>
                        <div className="modal-articulo-input-group">
                            <label>Unidad:</label>
                            <div
                                ref={unidadRef}
                                className="desplegable-unidad"
                                onClick={() => {
                                    const rect = unidadRef.current.getBoundingClientRect();
                                    setModalPosition({ top: rect.bottom + window.scrollY + 5, left: rect.left + window.scrollX, width: rect.width });
                                    setShowModalUnidad(true);
                                }}
                            >
                                <span>{unidadSeleccionada || "Seleccione la unidad"}</span>
                                <img
                                    src={iconFlecha}
                                    alt=""
                                    className={`icono-flecha-inline ${showModalUnidad ? 'open' : ''}`}
                                />
                            </div>
                        </div>
                        <div className="modal-articulo-input-group">
                            <label>Existencia mínima:</label>
                            <input type="text"
                            placeholder='Ingrese la existencia mínima' onKeyDown={handleKeyDown} />
                        </div>
                        <div className="modal-articulo-input-group">
                            <label>Existencia actual:</label>
                            <input type="text"
                            placeholder='Ingrese la existencia actual' onKeyDown={handleKeyDown} />
                        </div>
                        <div className="modal-articulo-input-group">
                            <label>Costo de compra:</label>
                            <input type="text"
                            placeholder='Ingrese el costo de compra' onKeyDown={handleKeyDown} />
                        </div>
                        <div className="modal-articulo-input-group">
                            <label>Precio de venta:</label>
                            <input type="text"
                            placeholder='Ingrese el precio de venta' onKeyDown={handleKeyDown} />
                        </div>
                    </div>
                </div>

                <div className="modal-articulo-footer-line">
                    <button className="btn-salir-articulo" onClick={() => setShowConfirmExit(true)}>
                        <img src={iconSalir} alt="" className="modal-articulo-btn-icon" />
                        Salir
                    </button>
                    <button className="btn-guardar-articulo" onClick={handleSave}>
                        <img src={iconGuardar} alt="" className="modal-articulo-btn-icon" />
                        Guardar artículo
                    </button>
                </div>
            </div>

            <ModalSeleccionSimple
                isOpen={showModalUnidad}
                onClose={() => setShowModalUnidad(false)}
                position={modalPosition}
                options={['Unidad', 'Caja', 'Docena', 'Metro', 'Litro', 'Kg', 'Par', 'Set', 'Rollo', 'Bolsa', 'Pack', 'Galon']}
                placeholder="Seleccione la unidad"
                onSelect={(val) => {
                    if (val) setUnidadSeleccionada(val);
                }}
                selectedValue={unidadSeleccionada}
            />
        </div>
    );
};

export default ModalNuevoArticulo;
