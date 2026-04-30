import React from 'react';
import './ModalBusqueda.css';
import './PanelRecibos.css';
import { useModalShake } from './useModalShake';
import iconSalir from '../assets/arrow-back-up.svg';
import iconVerVerde from '../assets/eye.svg';

const ModalReciboEncontrado = ({ isOpen, onClose, data, onVerRecibo }) => {
    const { isShaking, handleOverlayClick } = useModalShake();

    if (!isOpen) return null;

    return (
        <div className="busqueda-overlay" onClick={handleOverlayClick}>
            <div
                className={`busqueda-card scale-up-center ${isShaking ? 'shake' : ''}`}
                onClick={(e) => e.stopPropagation()}
                style={{ width: 'min(1350px, calc(100vw - 32px))', maxWidth: 'none' }}
            >
                <h2 className="busqueda-title">Recibo Encontrado</h2>

                <div className="table-wrapper-busqueda">
                    <table className="tabla-resultado" style={{ width: '100%', tableLayout: 'auto' }}>
                        <thead>
                            <tr className="header-amarillo">
                                <th>Número del Recibo</th>
                                <th>Cliente</th>
                                <th>Tipo</th>
                                <th>Fecha</th>
                                <th>Sub-total</th>
                                <th>Descuento</th>
                                <th style={{ textAlign: 'left' }}>Itbis</th>
                                <th style={{ paddingRight: '24px' }}>Total</th>
                                <th>Método</th>
                                <th>Estado</th>
                                <th style={{ textAlign: 'center' }}>Acción</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style={{ whiteSpace: 'nowrap' }}>{data?.numero}</td>
                                <td style={{ whiteSpace: 'nowrap' }}>{data?.cliente}</td>
                                <td style={{ whiteSpace: 'nowrap' }}>{data?.tipo}</td>
                                <td style={{ whiteSpace: 'nowrap' }}>{data?.fecha}</td>
                                <td style={{ whiteSpace: 'nowrap' }}>$ {data?.monto?.toLocaleString('es-DO', { minimumFractionDigits: 2 })}</td>
                                <td style={{ whiteSpace: 'nowrap' }}>0%</td>
                                <td style={{ whiteSpace: 'nowrap', textAlign: 'left' }}>18%</td>
                                <td className="font-bold" style={{ whiteSpace: 'nowrap', paddingRight: '24px' }}>$ {data?.monto?.toLocaleString('es-DO', { minimumFractionDigits: 2 })}</td>
                                <td style={{ whiteSpace: 'nowrap' }}>{data?.metodo || 'Efectivo'}</td>
                                <td style={{ whiteSpace: 'nowrap' }}>{data?.estado || 'Pagado'}</td>
                                <td style={{ textAlign: 'right', paddingRight: '24px' }}>
                                    <button
                                        className="btn-ver-recibo"
                                        onClick={() => onVerRecibo && onVerRecibo(data)}
                                    >
                                        <img src={iconVerVerde} alt="Ver" className="btn-ver-icon" />
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="busqueda-footer">
                    <button className="btn-salir" onClick={onClose}>
                        <img src={iconSalir} alt="Salir" className="btn-icon" />
                        Salir
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ModalReciboEncontrado;
