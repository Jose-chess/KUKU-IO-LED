import React, { useState } from 'react';
import './PanelFactura.css';
import iconBuscar from '../assets/search.svg';

const PanelFactura = () => {
    const [busquedaFactura, setBusquedaFactura] = useState('');

    const facturas = [
        {
            id: 1,
            numero: 'F-001',
            cliente: 'Cliente Ejemplo',
            metodo: 'Efectivo',
            tipo: 'Contado',
            cantidadProductos: 5,
            total: 15000.00,
            fecha: '2026-04-28'
        }
    ];

    const formatMoney = (value) => {
        return `$ ${value.toLocaleString('es-DO', { minimumFractionDigits: 2 })}`;
    };

    const handleBusquedaKeyDown = (e) => {
        if (e.key === 'Enter') {
            console.log('Buscando factura:', busquedaFactura);
        }
    };

    return (
        <div className="facturas-page">
            <div className="facturas-header">
                <h1 className="facturas-title">Facturas</h1>
            </div>

            <div className="kpi-grid facturas-kpi-grid">
                <div className="kpi-card facturas-kpi-card">
                    <p className="kpi-label">Facturación mensual</p>
                    <h2 className="kpi-value">$0</h2>
                </div>
                <div className="kpi-card facturas-kpi-card">
                    <p className="kpi-label">Promedio por factura</p>
                    <h2 className="kpi-value">$0</h2>
                </div>
                <div className="kpi-card facturas-kpi-card">
                    <p className="kpi-label">Facturas pendientes</p>
                    <h2 className="kpi-value">0</h2>
                </div>
                <div className="kpi-card facturas-kpi-card">
                    <p className="kpi-label">Total facturas</p>
                    <h2 className="kpi-value">0</h2>
                </div>
            </div>

            <div className="facturas-table-card">
                <div className="facturas-table-controls">
                    <h3>Lista de facturas</h3>

                    <div className="search-box">
                        <div className="search-input-wrapper">
                            <img src={iconBuscar} alt="Buscar" className="search-icon" />
                            <input
                                type="text"
                                placeholder="Buscar factura por número o cliente"
                                value={busquedaFactura}
                                onChange={(e) => setBusquedaFactura(e.target.value)}
                                onKeyDown={handleBusquedaKeyDown}
                            />
                        </div>
                    </div>
                </div>

                <div className="facturas-table-wrapper">
                    <table className="facturas-table">
                        <thead>
                            <tr>
                                <th>Número</th>
                                <th>Cliente</th>
                                <th>Método</th>
                                <th>Tipo</th>
                                <th>Productos</th>
                                <th>Total</th>
                                <th>Fecha</th>
                            </tr>
                        </thead>
                        <tbody>
                            {facturas.length > 0 ? (
                                facturas.map((factura) => (
                                    <tr key={factura.id}>
                                        <td>{factura.numero}</td>
                                        <td>{factura.cliente}</td>
                                        <td>{factura.metodo}</td>
                                        <td>{factura.tipo}</td>
                                        <td>{factura.cantidadProductos}</td>
                                        <td>{formatMoney(factura.total)}</td>
                                        <td>{factura.fecha}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td className="table-row-empty-cell" colSpan={7}>
                                        No hay facturas para mostrar.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default PanelFactura;
