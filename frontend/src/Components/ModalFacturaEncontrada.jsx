import React from 'react';
import './ModalBusqueda.css';
import { useModalShake } from './useModalShake';
import iconSalir from '../assets/arrow-back-up.svg';
import iconVer from '../assets/eye.svg';

const ModalFacturaEncontrada = ({ isOpen, onClose, data, onVerFactura }) => {
    const { isShaking, handleOverlayClick } = useModalShake();

    if (!isOpen) return null;

    return (
        <div className="busqueda-overlay" onClick={handleOverlayClick}>
            <div
                className={`busqueda-card scale-up-center ${isShaking ? 'shake' : ''}`}
                onClick={(e) => e.stopPropagation()}
                style={{ width: 'min(1350px, calc(100vw - 32px))', maxWidth: 'none' }}
            >
                <h2 className="busqueda-title">Registro de Venta Encontrado</h2>

                <div className="table-wrapper-busqueda" style={{ overflowX: 'auto' }}>
                    <table className="tabla-resultado" style={{ width: '100%', minWidth: '1100px', tableLayout: 'auto' }}>
                        <thead>
                            <tr className="header-amarillo">
                                <th>Número de Registro</th>
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
                                <td style={{ whiteSpace: 'nowrap' }}>{data?.subtotal != null ? `$ ${data.subtotal.toLocaleString('es-DO')}` : '$ 0'}</td>
                                <td style={{ whiteSpace: 'nowrap' }}>{data?.descuento}%</td>
                                <td style={{ whiteSpace: 'nowrap', textAlign: 'left' }}>{data?.itbis}%</td>
                                <td className="font-bold" style={{ whiteSpace: 'nowrap', paddingRight: '24px' }}>$ {data?.total?.toLocaleString('es-DO')}</td>
                                <td style={{ whiteSpace: 'nowrap' }}>{data?.metodo}</td>
                                <td style={{ whiteSpace: 'nowrap' }}>{data?.estado}</td>
                                <td style={{ textAlign: 'center' }}>
                                    <button
                                        type="button"
                                        aria-label="Ver factura"
                                        onClick={() => onVerFactura(data)}
                                        style={{
                                            width: '30px',
                                            height: '30px',
                                            border: 'none',
                                            background: 'transparent',
                                            cursor: 'pointer',
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}
                                    >
                                        <img
                                            src={iconVer}
                                            alt=""
                                            style={{
                                                width: '18px',
                                                height: '18px',
                                                filter: 'invert(39%) sepia(87%) saturate(1371%) hue-rotate(96deg) brightness(95%) contrast(106%)'
                                            }}
                                        />
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="busqueda-footer" style={{ justifyContent: 'flex-end' }}>
                    <button className="btn-salir-rojo" type="button" onClick={onClose}>
                        <img src={iconSalir} alt="" className="busqueda-btn-icon" />
                        Salir
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ModalFacturaEncontrada;
