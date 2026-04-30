import React from 'react';
import './ModalAviso.css';
import iconSalir from '../assets/arrow-back-up.svg';
import { useModalShake } from './useModalShake';

const ModalGastoEncontrado = ({ isOpen, onClose, gastoData }) => {
    const { isShaking, handleOverlayClick } = useModalShake();

    if (!isOpen) {
        return null;
    }

    return (
        <div className="aviso-overlay" onClick={handleOverlayClick}>
            <div className={`aviso-card-bg-white table-view ${isShaking ? 'shake' : ''}`} onClick={(e) => e.stopPropagation()}>
                <div className="aviso-header">
                    <h2 className="aviso-title-main black">Gasto Encontrado</h2>
                </div>

                <div className="inner-table-container">
                    <table className="inner-data-table">
                        <thead>
                            <tr className="inner-header-row-yellow">
                                <th>ID</th>
                                <th>Descripción</th>
                                <th>Monto</th>
                                <th>Fecha</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="inner-data-row">
                                <td>#{gastoData?.id || ''}</td>
                                <td>{gastoData?.descripcion || ''}</td>
                                <td>RD$ {Number(gastoData?.monto || 0).toLocaleString()}</td>
                                <td>{gastoData?.fecha || ''}</td>
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

export default ModalGastoEncontrado;
