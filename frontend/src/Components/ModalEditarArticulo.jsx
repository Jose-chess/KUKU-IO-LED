import React, { useState } from 'react';
import './ModalEditarArticulo.css';
import iconSalir from '../assets/arrow-back-up.svg';
import iconGuardar from '../assets/circle-check.svg';
import ModalConfirmarSalida from './ModalConfirmarSalida';
import { useModalShake } from './useModalShake';

const ModalEditarArticulo = ({ isOpen, onClose, onSave, articuloData }) => {
    const [showConfirmExit, setShowConfirmExit] = useState(false);
    const { isShaking, handleOverlayClick } = useModalShake();

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
        <div className="modal-articulo-overlay" onClick={handleOverlayClick}>
            <div className={`modal-articulo-container ${isShaking ? 'shake' : ''}`} onClick={(e) => e.stopPropagation()}>
                <h2 className="modal-articulo-title">Editar Artículo</h2>

                <div className="modal-articulo-form-section">
                    <h3 className="modal-articulo-subtitle">Informacion del artículo</h3>
                    <div className="modal-articulo-divider-line" />

                    <div className="modal-articulo-grid-form">
                        <div className="modal-articulo-input-group">
                            <label>Código del artículo:</label>
                            <input type="text" value={articuloData?.codigo || ''} placeholder="Autoincremental por el sistema" onKeyDown={handleKeyDown} readOnly />
                        </div>
                        <div className="modal-articulo-input-group">
                            <label>Descripción:</label>
                            <input type="text" value={articuloData?.descripcion || ''} placeholder='Ingrese el nombre del artículo' onKeyDown={handleKeyDown} />
                        </div>
                        <div className="modal-articulo-input-group">
                            <label>Color:</label>
                            <input type="text" value={articuloData?.color || ''} placeholder='Ingrese el color del artículo' onKeyDown={handleKeyDown} />
                        </div>
                        <div className="modal-articulo-input-group">
                            <label>Unidad:</label>
                            <input type="text" value={articuloData?.unidad || ''} placeholder='Ingrese la unidad del artículo' onKeyDown={handleKeyDown} />
                        </div>
                        <div className="modal-articulo-input-group">
                            <label>Existencia mínima:</label>
                            <input type="text" value={articuloData?.minima || ''} placeholder='Ingrese la existencia mínima' onKeyDown={handleKeyDown} />
                        </div>
                        <div className="modal-articulo-input-group">
                            <label>Existencia actual:</label>
                            <input type="text" value={articuloData?.actual || ''} placeholder='Ingrese la existencia actual' onKeyDown={handleKeyDown} />
                        </div>
                        <div className="modal-articulo-input-group">
                            <label>Costo de compra:</label>
                            <input type="text" value={articuloData?.costo || ''} placeholder='Ingrese el costo de compra' onKeyDown={handleKeyDown} />
                        </div>
                        <div className="modal-articulo-input-group">
                            <label>Precio de venta:</label>
                            <input type="text" value={articuloData?.precio || ''} placeholder='Ingrese el precio de venta' onKeyDown={handleKeyDown} />
                        </div>
                    </div>
                </div>

                <div className="modal-articulo-footer-line">
                    <button className="btn-salir-articulo" onClick={() => setShowConfirmExit(true)}>
                        <img src={iconSalir} alt="" className="modal-articulo-btn-icon" />
                        Retroceder
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

export default ModalEditarArticulo;
