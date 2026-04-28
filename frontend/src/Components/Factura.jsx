import React, { useState } from 'react';
import './Factura.css';
import iconNuevaFactura from '../assets/new-section.svg';
import iconBuscar from '../assets/search.svg';
import iconEdit from '../assets/edit.svg';

const Factura = () => {
    const [busquedaFactura, setBusquedaFactura] = useState('');
    const [facturas] = useState([]);

    const totalFacturas = facturas.length;
    const facturacionMensual = 0;
    const facturasHoy = facturas.length;
    const facturasPendientes = facturas.length;
    const ingresoTotal = 0;

    const formatMoney = (value) => {
        const numericValue = Number(String(value ?? '').replace(/[^\d.]/g, ''));
        if (Number.isNaN(numericValue)) {
            return '$ 0';
        }
        return `$ ${numericValue.toLocaleString('es-DO')}`;
    };

    const handleBuscarFactura = () => {
        const termino = busquedaFactura.trim().toLowerCase();
        if (!termino) {
            return;
        }
    };

    return (
        <div className="factura-page">
            <div className="factura-header">
                <div>
                    <h1 className="factura-title">Facturas</h1>
                </div>

                <button
                    className="btn-nueva-factura"
                    type="button"
                >
                    <img src={iconNuevaFactura} alt="" className="btn-nueva-factura-icon" />
                    Nueva Factura
                </button>
            </div>

            <div className="kpi-grid factura-kpi-grid">
                <div className="kpi-card factura-kpi-card">
                    <p className="kpi-label">Facturación mensual</p>
                    <h2 className="kpi-value">${facturacionMensual}</h2>
                </div>
                <div className="kpi-card factura-kpi-card">
                    <p className="kpi-label">Facturas emitidas hoy</p>
                    <h2 className="kpi-value">{facturasHoy}</h2>
                </div>
                <div className="kpi-card factura-kpi-card">
                    <p className="kpi-label">Facturas pendientes</p>
                    <h2 className="kpi-value">{facturasPendientes}</h2>
                </div>
                <div className="kpi-card factura-kpi-card">
                    <p className="kpi-label">Ingreso total</p>
                    <h2 className="kpi-value">${ingresoTotal.toLocaleString()}</h2>
                </div>
            </div>

            <div className="factura-table-card">
                <div className="factura-table-controls">
                    <div>
                        <h3>Lista de facturas</h3>
                    </div>

                    <div className="search-box">
                        <div className="search-input-wrapper">
                            <img src={iconBuscar} alt="Buscar" className="search-icon" />
                            <input
                                type="text"
                                placeholder="Buscar por número de factura"
                                value={busquedaFactura}
                                onChange={(e) => setBusquedaFactura(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        handleBuscarFactura();
                                    }
                                }}
                            />
                        </div>
                    </div>
                </div>

                <div className="factura-table-wrapper">
                    <table className="factura-table">
                        <thead>
                            <tr>
                                <th>N.º Factura</th>
                                <th>Cliente</th>
                                <th>Tipo</th>
                                <th>Fecha</th>
                                <th>Sub-total</th>
                                <th>Descuento</th>
                                <th>Itbis</th>
                                <th>Total</th>
                                <th>Método</th>
                                <th>Estado</th>
                                <th>Acción</th>
                            </tr>
                        </thead>
                        <tbody>
                            {facturas.length === 0 ? (
                                <tr>
                                    <td className="table-row-empty-cell" colSpan={11}>
                                        No hay facturas para mostrar.
                                    </td>
                                </tr>
                            ) : (
                                facturas.map((factura) => (
                                    <tr key={factura.id}>
                                        <td>{factura.numero}</td>
                                        <td>{factura.cliente}</td>
                                        <td>{factura.tipo}</td>
                                        <td>{factura.fecha}</td>
                                        <td>{formatMoney(factura.subtotal)}</td>
                                        <td>{factura.descuento}%</td>
                                        <td>{factura.itbis}%</td>
                                        <td>{formatMoney(factura.total)}</td>
                                        <td>{factura.metodo}</td>
                                        <td>{factura.estado}</td>
                                        <td className="accion-cell">
                                            <button
                                                className="btn-edit"
                                                type="button"
                                                aria-label="Editar factura"
                                                title="Editar factura"
                                            >
                                                <img src={iconEdit} alt="" className="btn-edit-icon" />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Factura;
