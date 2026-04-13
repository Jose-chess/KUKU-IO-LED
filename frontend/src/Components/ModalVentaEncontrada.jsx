import React from 'react';
import './ModalBusqueda.css';
import { useModalShake } from './useModalShake';
import iconSalir from '../assets/arrow-back-up.svg';

const ModalVentaEncontrada = ({ isOpen, onClose, data, onVerFactura }) => {
    const { isShaking, handleOverlayClick } = useModalShake();

    if (!isOpen) {
        return null;
    }

    return (
        <div className="busqueda-overlay" onClick={handleOverlayClick}>
            <div className={`busqueda-card scale-up-center ${isShaking ? 'shake' : ''}`} onClick={(event) => event.stopPropagation()}>
                <h2 className="busqueda-title">Venta Encontrada</h2>

                <div className="table-wrapper-busqueda">
                    <table className="tabla-resultado">
                        <thead>
                            <tr className="header-amarillo">
                                <th>Código</th>
                                <th>Cliente</th>
                                <th>Método</th>
                                <th>Tipo</th>
                                <th>Cantidad de productos</th>
                                <th>Total</th>
                                <th>Fecha</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{data?.codigo}</td>
                                <td>{data?.cliente}</td>
                                <td>{data?.metodo}</td>
                                <td>{data?.tipo}</td>
                                <td>{data?.numProductos}</td>
                                <td className="font-bold">$ {data?.total?.toLocaleString('es-DO')}</td>
                                <td>{data?.fecha}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="busqueda-footer">
                    <button className="btn-salir-rojo" type="button" onClick={onClose}>
                        <img src={iconSalir} alt="" className="busqueda-btn-icon" />
                        Salir
                    </button>
                    <button className="btn-confirmar-verde" type="button" onClick={() => onVerFactura(data)}>
                        Ver Factura
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ModalVentaEncontrada;
