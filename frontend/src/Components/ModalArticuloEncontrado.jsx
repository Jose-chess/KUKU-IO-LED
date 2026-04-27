import React from 'react';
import './ModalAviso.css';
import iconLapizVerde from '../assets/edit.svg';
import iconTrash from '../assets/trash.svg';
import iconSalir from '../assets/arrow-back-up.svg';
import { useModalShake } from './useModalShake';

const ModalArticuloEncontrado = ({ isOpen, onClose, articuloData, onEdit, onDelete }) => {
    const { isShaking, handleOverlayClick } = useModalShake();

    if (!isOpen) {
        return null;
    }

    const handleEditClick = () => {
        onEdit?.(articuloData);
    };

    const handleDeleteClick = () => {
        onDelete?.(articuloData);
    };

    return (
        <div className="aviso-overlay" onClick={handleOverlayClick}>
            <div className={`aviso-card-bg-white table-view ${isShaking ? 'shake' : ''}`} onClick={(e) => e.stopPropagation()}>
                <div className="aviso-header">
                    <h2 className="aviso-title-main black">Artículo Encontrado</h2>
                </div>

                <div className="inner-table-container">
                    <table className="inner-data-table">
                        <thead>
                            <tr className="inner-header-row-yellow">
                                <th>Código</th>
                                <th>Descripción</th>
                                <th>Color</th>
                                <th>Unidad</th>
                                <th>Existencia Mínima</th>
                                <th>Existencia Actual</th>
                                <th>Costo de Compra</th>
                                <th>Precio de Venta</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="inner-data-row">
                                <td>{articuloData?.codigo || ''}</td>
                                <td>{articuloData?.descripcion || ''}</td>
                                <td>{articuloData?.color || ''}</td>
                                <td>{articuloData?.unidad || ''}</td>
                                <td>{articuloData?.minima || ''}</td>
                                <td>{articuloData?.actual || ''}</td>
                                <td>${Number(articuloData?.costo || 0).toLocaleString('es-DO')}</td>
                                <td>${Number(articuloData?.precio || 0).toLocaleString('es-DO')}</td>
                                <td>
                                    <button className="inner-action-btn" type="button" onClick={handleEditClick}>
                                        <img src={iconLapizVerde} alt="Modificar" className="inner-action-icon" />
                                    </button>
                                    <button className="inner-action-btn" type="button" onClick={handleDeleteClick}>
                                        <img src={iconTrash} alt="Eliminar" className="inner-action-icon" />
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="aviso-footer-right no-top-border">
                    <button className="btn-aviso-red" onClick={onClose} type="button">
                        <img src={iconSalir} alt="" className="icon-back-img" />
                        Salir
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ModalArticuloEncontrado;
