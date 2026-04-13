import React, { useState } from 'react';
import './PanelVentas.css';
import iconNuevaVenta from '../assets/new-section.svg';
import iconBuscar from '../assets/search.svg';
import iconSalir from '../assets/arrow-back-up.svg';
import iconConfirmar from '../assets/circle-check.svg';
import ModalExito from './ModalExito';
import ModalVentaEncontrada from './ModalVentaEncontrada';
import ModalVentaNoEncontrada from './ModalVentaNoEncontrada';
import { useModalShake } from './useModalShake';

const ConfirmarVentaModal = ({ isOpen, onClose, onConfirm, message, salirLabel, confirmLabel }) => {
    const { isShaking, handleOverlayClick } = useModalShake();

    if (!isOpen) {
        return null;
    }

    return (
        <div className="confirm-overlay" onClick={handleOverlayClick}>
            <div
                className={`confirm-container confirm-modal scale-up-center ${isShaking ? 'shake' : ''}`}
                onClick={(event) => event.stopPropagation()}
            >
                <h1 className="confirm-title confirm-header">Confirmar</h1>

                <div className="confirm-body-card confirm-message-container">
                    <p className="confirm-text confirm-message-text">{message}</p>
                    <div className="confirm-line confirm-decorative-line" />
                </div>

                <div className="confirm-footer confirm-actions">
                    <button className="btn-confirm-salir btn-confirm-red" type="button" onClick={onClose}>
                        <img src={iconSalir} alt="" className="confirm-btn-icon" />
                        {salirLabel}
                    </button>
                    <button className="btn-confirm-aceptar btn-confirm-green" type="button" onClick={onConfirm}>
                        <img src={iconConfirmar} alt="" className="confirm-btn-icon" />
                        {confirmLabel}
                    </button>
                </div>
            </div>
        </div>
    );
};

const ModalNuevaVenta = ({ isOpen, onSalir, onFacturar }) => {
    const { isShaking, handleOverlayClick } = useModalShake();

    if (!isOpen) {
        return null;
    }

    return (
        <div className="nueva-venta-overlay" onClick={handleOverlayClick}>
            <div className={`nueva-venta-modal scale-up-center ${isShaking ? 'shake' : ''}`} onClick={(event) => event.stopPropagation()}>
                <h2 className="nueva-venta-title">Nueva Venta</h2>

                <div className="nueva-venta-field">
                    <label>Buscar artículo</label>
                    <div className="nueva-venta-search-input-wrapper">
                        <img src={iconBuscar} alt="Buscar" className="nueva-venta-search-icon" />
                        <input type="text" placeholder="Buscar por nombre" />
                    </div>
                </div>

                <div className="nueva-venta-table-wrapper">
                    <table className="nueva-venta-table">
                        <thead>
                            <tr>
                                <th>Código</th>
                                <th>Artículo</th>
                                <th>Precio unitario</th>
                                <th>Cantidad</th>
                                <th>Acción</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="table-row-empty-cell" colSpan={5}>
                                    No hay artículos agregados.
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="nueva-venta-footer">
                    <div className="nueva-venta-meta">
                        <span>Artículos totales:</span>
                        <strong>0</strong>
                    </div>
                    <div className="nueva-venta-meta">
                        <span>Subtotal:</span>
                        <strong className="subtotal-verde">$ 0</strong>
                    </div>

                    <div className="nueva-venta-actions">
                        <button className="btn-confirm-salir btn-confirm-red" type="button" onClick={onSalir}>
                            <img src={iconSalir} alt="" className="confirm-btn-icon" />
                            Salir
                        </button>
                        <button className="btn-confirm-aceptar btn-confirm-green" type="button" onClick={onFacturar}>
                            <img src={iconConfirmar} alt="" className="confirm-btn-icon" />
                            Facturar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const ModalFacturacion = ({ isOpen, onVolver, onConfirmarVenta }) => {
    const { isShaking, handleOverlayClick } = useModalShake();

    if (!isOpen) {
        return null;
    }

    return (
        <div className="facturacion-overlay" onClick={handleOverlayClick}>
            <div className={`facturacion-modal scale-up-center ${isShaking ? 'shake' : ''}`} onClick={(event) => event.stopPropagation()}>
                <h2 className="facturacion-title">Facturación</h2>

                <section className="facturacion-bloque">
                    <h3 className="facturacion-subtitle">Facturar Artículos</h3>
                    <div className="facturacion-line" />

                    <div className="facturacion-grid">
                        <div className="facturacion-item">
                            <label>Número de Factura:</label>
                            <input value="" placeholder="-" disabled readOnly />
                        </div>
                        <div className="facturacion-item">
                            <label>Tipo:</label>
                            <input value="" placeholder="Seleccione el tipo" disabled readOnly />
                        </div>

                        <div className="facturacion-item">
                            <label>Fecha de Factura:</label>
                            <input value="" placeholder="-" disabled readOnly />
                        </div>
                        <div className="facturacion-item">
                            <label>Descuento:</label>
                            <input value="0" disabled readOnly />
                        </div>

                        <div className="facturacion-item">
                            <label>Cliente:</label>
                            <input value="" placeholder="Seleccione un cliente" disabled readOnly />
                        </div>

                        <div className="facturacion-item">
                            <label>Método:</label>
                            <input value="" placeholder="Seleccione el método" disabled readOnly />
                        </div>
                        <div className="facturacion-item">
                            <label>Itbis %:</label>
                            <input value="0" disabled readOnly />
                        </div>
                    </div>
                </section>

                <section className="facturacion-bloque sin-borde-superior">
                    <div className="monto-venta-row">
                        <span>Monto de Venta:</span>
                        <strong>$ 0</strong>
                    </div>
                    <div className="facturacion-line" />

                    <h3 className="facturacion-subtitle resumen-title">Resumen de la Factura</h3>
                    <div className="resumen-box">
                        <p><span>Sub-total:</span><strong>$ 0</strong></p>
                        <p className="descuento"><span>Descuento:</span><strong>0%</strong></p>
                        <p><span>Itbis:</span><strong>0%</strong></p>
                        <p className="total"><span>Total a pagar:</span><strong>$ 0</strong></p>
                    </div>
                </section>

                <div className="facturacion-footer">
                    <div className="facturacion-meta">Artículos totales: <strong>0</strong></div>
                    <div className="facturacion-meta">N.º de factura: <strong>-</strong></div>
                    <div className="facturacion-actions">
                        <button className="btn-confirm-salir btn-confirm-red" type="button" onClick={onVolver}>
                            <img src={iconSalir} alt="" className="confirm-btn-icon" />
                            Volver
                        </button>
                        <button className="btn-confirm-aceptar btn-confirm-green" type="button" onClick={onConfirmarVenta}>
                            <img src={iconConfirmar} alt="" className="confirm-btn-icon" />
                            Confirmar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const PanelVentas = () => {
    const [showNuevaVentaModal, setShowNuevaVentaModal] = useState(false);
    const [showFacturacionModal, setShowFacturacionModal] = useState(false);
    const [showConfirmSalir, setShowConfirmSalir] = useState(false);
    const [showConfirmVenta, setShowConfirmVenta] = useState(false);
    const [showExitoModal, setShowExitoModal] = useState(false);
    const [showBusquedaVentaModal, setShowBusquedaVentaModal] = useState(false);
    const [showVentaNoEncontradaModal, setShowVentaNoEncontradaModal] = useState(false);
    const [busquedaVenta, setBusquedaVenta] = useState('');

    const manejarBusquedaVenta = (event) => {
        if (event.key !== 'Enter') {
            return;
        }

        event.preventDefault();

        if (busquedaVenta.trim() === '') {
            setShowVentaNoEncontradaModal(true);
            return;
        }

        setShowBusquedaVentaModal(true);
        setBusquedaVenta('');
    };

    return (
        <div className="ventas-page">
            <div className="ventas-header">
                <h1 className="ventas-title">Ventas</h1>

                <button className="btn-nueva-venta" type="button" onClick={() => setShowNuevaVentaModal(true)}>
                    <img src={iconNuevaVenta} alt="" className="btn-nueva-venta-icon" />
                    Nueva Venta
                </button>
            </div>

            <div className="kpi-grid ventas-kpi-grid">
                <div className="kpi-card ventas-kpi-card">
                    <p className="kpi-label">Ventas del día</p>
                    <h2 className="kpi-value">0</h2>
                </div>
                <div className="kpi-card ventas-kpi-card">
                    <p className="kpi-label">Ventas de la semana</p>
                    <h2 className="kpi-value">0</h2>
                </div>
                <div className="kpi-card ventas-kpi-card">
                    <p className="kpi-label">Ventas del mes</p>
                    <h2 className="kpi-value">0</h2>
                </div>
                <div className="kpi-card ventas-kpi-card">
                    <p className="kpi-label">Cantidad de ventas</p>
                    <h2 className="kpi-value">0</h2>
                </div>
            </div>

            <div className="ventas-table-card">
                <div className="ventas-table-controls">
                    <h3>Lista de ventas</h3>

                    <div className="search-box">
                        <div className="search-input-wrapper">
                            <img src={iconBuscar} alt="Buscar" className="search-icon" />
                            <input
                                type="text"
                                placeholder="Buscar venta por nombre del cliente"
                                value={busquedaVenta}
                                onChange={(event) => setBusquedaVenta(event.target.value)}
                                onKeyDown={manejarBusquedaVenta}
                            />
                        </div>
                    </div>
                </div>

                <div className="ventas-table-wrapper">
                    <table className="ventas-table">
                        <thead>
                            <tr>
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
                                <td className="table-row-empty-cell" colSpan={7}>
                                    No hay ventas para mostrar.
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <ModalNuevaVenta
                isOpen={showNuevaVentaModal}
                onSalir={() => {
                    setShowNuevaVentaModal(false);
                    setShowConfirmSalir(true);
                }}
                onFacturar={() => {
                    setShowNuevaVentaModal(false);
                    setShowFacturacionModal(true);
                }}
            />

            <ModalVentaEncontrada
                isOpen={showBusquedaVentaModal}
                onClose={() => setShowBusquedaVentaModal(false)}
                data={null}
                onVerFactura={() => {
                    setShowBusquedaVentaModal(false);
                    setShowFacturacionModal(true);
                }}
            />

            <ModalVentaNoEncontrada
                isOpen={showVentaNoEncontradaModal}
                onClose={() => setShowVentaNoEncontradaModal(false)}
                buttonLabel="Salir"
            />

            <ModalFacturacion
                isOpen={showFacturacionModal}
                onVolver={() => {
                    setShowFacturacionModal(false);
                    setShowNuevaVentaModal(true);
                }}
                onConfirmarVenta={() => {
                    setShowFacturacionModal(false);
                    setShowConfirmVenta(true);
                }}
            />

            <ConfirmarVentaModal
                isOpen={showConfirmSalir}
                onClose={() => {
                    setShowConfirmSalir(false);
                    setShowNuevaVentaModal(true);
                }}
                onConfirm={() => {
                    setShowConfirmSalir(false);
                    setShowNuevaVentaModal(false);
                    setShowFacturacionModal(false);
                }}
                message="¿Estás seguro de que deseas salir?"
                salirLabel="Retroceder"
                confirmLabel="Confirmar"
            />

            <ConfirmarVentaModal
                isOpen={showConfirmVenta}
                onClose={() => {
                    setShowConfirmVenta(false);
                    setShowFacturacionModal(true);
                }}
                onConfirm={() => {
                    setShowConfirmVenta(false);
                    setShowExitoModal(true);
                }}
                message="¿Estás seguro de que deseas confirmar la venta?"
                salirLabel="Retroceder"
                confirmLabel="Confirmar"
            />

            <ModalExito
                isOpen={showExitoModal}
                onClose={() => setShowExitoModal(false)}
                title="Confirmado"
                subtitle="Venta facturada exitosamente!"
                buttonLabel="Salir"
            />
        </div>
    );
};

export default PanelVentas;
