import React, { useState } from 'react';
import './ModalNuevoArticulo.css';
import iconSalir from '../assets/arrow-back-up.svg';
import iconGuardar from '../assets/circle-check.svg';
import ModalConfirmarSalida from './ModalConfirmarSalida';
import { useModalShake } from './useModalShake';

const ModalNuevoArticulo = ({ isOpen, onClose, onSave }) => {
    const [showConfirmExit, setShowConfirmExit] = useState(false);
    const { isShaking, handleOverlayClick } = useModalShake();

    if (!isOpen) return null;

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
        <div className="modal-articulo-overlay" onClick={handleOverlayClick}>
            <div className={`modal-articulo-container ${isShaking ? 'shake' : ''}`} onClick={(e) => e.stopPropagation()}>
                <h2 className="modal-articulo-title">Añadir Nuevo Artículo</h2>

                <div className="modal-articulo-form-section">
                    <h3 className="modal-articulo-subtitle">Informacion del artículo</h3>
                    <div className="modal-articulo-divider-line" />

                    <div className="modal-articulo-grid-form">
                        <div className="modal-articulo-input-group">
                            <label>Código del artículo:</label>
                            <input type="text"
                             placeholder="Autoincremental por el sistema" />
                        </div>
                        <div className="modal-articulo-input-group">
                            <label>Descripción:</label>
                            <input type="text"
                             placeholder='Ingrese el nombre del artículo' />
                        </div>
                        <div className="modal-articulo-input-group">
                            <label>Color:</label>
                            <input type="text" 
                            placeholder='Ingrese el color del artículo' />
                        </div>
                        <div className="modal-articulo-input-group">
                            <label>Unidad:</label>
                            <input type="text" 
                            placeholder='Ingrese la unidad del artículo' />
                        </div>
                        <div className="modal-articulo-input-group">
                            <label>Existencia mínima:</label>
                            <input type="text" 
                            placeholder='Ingrese la existencia mínima' />
                        </div>
                        <div className="modal-articulo-input-group">
                            <label>Existencia actual:</label>
                            <input type="text" 
                            placeholder='Ingrese la existencia actual' />
                        </div>
                        <div className="modal-articulo-input-group">
                            <label>Costo de compra:</label>
                            <input type="text" 
                            placeholder='Ingrese el costo de compra' />
                        </div>
                        <div className="modal-articulo-input-group">
                            <label>Precio de venta:</label>
                            <input type="text" 
                            placeholder='Ingrese el precio de venta' />
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
        </div>
    );
};

export default ModalNuevoArticulo;
