import React, { useState } from 'react';
import './PanelFactura.css';
import iconBuscar from '../assets/search.svg';
import iconOjo from '../assets/eye.svg';

const PanelFactura = () => {
    const [busquedaFactura, setBusquedaFactura] = useState('');

    // Datos de ejemplo para la tabla
    const facturas = [
        {
            numero: 'F-001',
            fecha: '2026-04-28',
            cliente: 'José',
            condicion: 'Contado',
            estado: 'Pagada',
            descuento: '0%',
            monto: 15000.00
        }
    ];

    const formatMoney = (value) => {
        return `$ ${value.toLocaleString('es-DO', { minimumFractionDigits: 2 })}`;
    };

    const manejarBusquedaFactura = (event) => {
        if (event.key !== 'Enter') {
            return;
        }

        event.preventDefault();

        console.log('Buscando factura:', busquedaFactura);
        setBusquedaFactura('');
    };

    return (
        <div className="facturas-page">
            <div className="facturas-header">
                <h1 className="facturas-title">Facturas</h1>
            </div>

            <div className="kpi-grid facturas-kpi-grid">
                <div className="kpi-card facturas-kpi-card">
                    <p className="kpi-label">Facturació mensual</p>
                    <h2 className="kpi-value">$0</h2>
                </div>
                <div className="kpi-card facturas-kpi-card">
                    <p className="kpi-label">Promedio por factura</p>
                    <h2 className="kpi-value">$0</h2>
                </div>
                <div className="kpi-card facturas-kpi-card">
                    <p className="kpi-label">Factura más alta</p>
                    <h2 className="kpi-value">$0</h2>
                </div>
                <div className="kpi-card facturas-kpi-card">
                    <p className="kpi-label">Facturas totales</p>
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
                                placeholder="Ingrese el número de la factura o nombre del cliente"
                                value={busquedaFactura}
                                onChange={(event) => setBusquedaFactura(event.target.value)}
                                onKeyDown={manejarBusquedaFactura}
                            />
                        </div>
                    </div>
                </div>

                <div className="facturas-table-wrapper">
                    <table className="facturas-table">
                        <thead>
                            <tr>
                                <th>Número de la factura</th>
                                <th>Fecha de la factura</th>
                                <th>Cliente</th>
                                <th>Condición</th>
                                <th>Estado</th>
                                <th>Descuento</th>
                                <th>Monto de la factura</th>
                                <th>Acción</th>
                            </tr>
                        </thead>
                        <tbody>
                            {facturas.length > 0 ? (
                                facturas.map((factura) => (
                                    <tr key={factura.id}>
                                        <td>{factura.numero}</td>
                                        <td>{factura.fecha}</td>
                                        <td>{factura.cliente}</td>
                                        <td>{factura.condicion}</td>
                                        <td>{factura.estado}</td>
                                        <td>{factura.descuento}</td>
                                        <td>{formatMoney(factura.monto)}</td>
                                        <td>
                                            <button className="btn-ver-factura" type="button">
                                                <img src={iconOjo} alt="Ver factura" className="btn-ver-icon" />
                                            </button>
                                        </td>
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
