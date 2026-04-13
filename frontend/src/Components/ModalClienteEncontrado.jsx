import React from 'react';
import './ModalAviso.css';
import iconLapizVerde from '../assets/edit.svg';
import iconSalir from '../assets/arrow-back-up.svg';
import { useModalShake } from './useModalShake';

const ModalClienteEncontrado = ({ isOpen, onClose, clienteData, onEdit }) => {
    const { isShaking, handleOverlayClick } = useModalShake();

    if (!isOpen) {
        return null;
    }

    const handleEditClick = () => {
        onEdit?.(clienteData);
    };

    return (
        <div className="aviso-overlay" onClick={handleOverlayClick}>
            <div className={`aviso-card-bg-white table-view ${isShaking ? 'shake' : ''}`} onClick={(e) => e.stopPropagation()}>
                <div className="aviso-header">
                    <h2 className="aviso-title-main black">Cliente Encontrado</h2>
                </div>

                <div className="inner-table-container">
                    <table className="inner-data-table">
                        <thead>
                            <tr className="inner-header-row-yellow">
                                <th>Código</th>
                                <th>Nombre</th>
                                <th>Apellido</th>
                                <th>Dirección</th>
                                <th>Sector</th>
                                <th>Ciudad</th>
                                <th>Teléfono</th>
                                <th>Límite de Crédito</th>
                                <th>Balance</th>
                                <th>Observaciones</th>
                                <th>Acción</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="inner-data-row">
                                <td>{clienteData?.codigo || ''}</td>
                                <td>{clienteData?.nombre || ''}</td>
                                <td>{clienteData?.apellido || ''}</td>
                                <td>{clienteData?.direccion || ''}</td>
                                <td>{clienteData?.sector || ''}</td>
                                <td>{clienteData?.ciudad || ''}</td>
                                <td>{clienteData?.telefono || ''}</td>
                                <td>${Number(clienteData?.limiteCredito || clienteData?.limite || 0).toLocaleString('es-DO')}</td>
                                <td>${Number(clienteData?.balanceActual || clienteData?.balance || 0).toLocaleString('es-DO')}</td>
                                <td>{clienteData?.observaciones || clienteData?.observacion || ''}</td>
                                <td>
                                    <button className="inner-action-btn" type="button" onClick={handleEditClick}>
                                        <img src={iconLapizVerde} alt="Modificar" className="inner-action-icon" />
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

export default ModalClienteEncontrado;
