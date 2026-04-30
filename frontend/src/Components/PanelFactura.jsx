import React, { useState } from 'react';
import './PanelFactura.css';
import iconBuscar from '../assets/search.svg';
import iconOjo from '../assets/eye.svg';
import FacturaModal from './FacturaModal';
import ModalFacturaNoEncontrada from './ModalFacturaNoEncontrada';

const PanelFactura = () => {
    const [busquedaFactura, setBusquedaFactura] = useState('');
    const [facturaSeleccionada, setFacturaSeleccionada] = useState(null);
    const [mostrarModal, setMostrarModal] = useState(false);
    const [mostrarErrorBusqueda, setMostrarErrorBusqueda] = useState(false);

    // Datos de ejemplo para la tabla
    const facturas = [
        {
            id: 1,
            numero: 'B02000000134',
            fecha: '2026-04-28',
            cliente: 'José',
            rnc: '44-665-898',
            direccion: 'Oficina #5',
            ciudad: 'Santo Domingo',
            telefono: '+1 (829) 551-1725',
            condicion: 'Contado',
            estado: 'Pago',
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

        const query = busquedaFactura.toLowerCase().trim();
        if (!query) return;

        // Buscar en el array de facturas
        const facturaEncontrada = facturas.find(f =>
            f.numero.toLowerCase().includes(query) ||
            f.cliente.toLowerCase().includes(query)
        );

        if (facturaEncontrada) {
            setFacturaSeleccionada(facturaEncontrada);
            setMostrarModal(true);
            setBusquedaFactura('');
        } else {
            console.log('Factura no encontrada:', busquedaFactura);
            setMostrarErrorBusqueda(true);
            setBusquedaFactura('');
        }
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
                                            <button
                                                className="btn-ver-factura"
                                                type="button"
                                                onClick={() => {
                                                    setFacturaSeleccionada(factura);
                                                    setMostrarModal(true);
                                                }}
                                            >
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

            {mostrarModal && (
                <FacturaModal
                    data={facturaSeleccionada ? {
                        ncf: facturaSeleccionada.numero,
                        fecha: facturaSeleccionada.fecha,
                        condicion: facturaSeleccionada.condicion,
                        metodoPago: facturaSeleccionada.metodoPago,
                        cliente: {
                            nombre: facturaSeleccionada.cliente,
                            rnc: facturaSeleccionada.rnc,
                            cedula: facturaSeleccionada.cedula,
                            direccion: facturaSeleccionada.direccion,
                            ciudad: facturaSeleccionada.ciudad,
                            telefono: facturaSeleccionada.telefono
                        },
                        items: [
                            { cant: 2, um: 'Und', desc: 'Panel LED P10 Exterior High Brightness', precio: 10000.00 },
                            { cant: 1, um: 'Und', desc: 'Controladora NovaStar DH408', precio: 5000.00 }
                        ],
                        subtotal: 25000.00,
                        descuentoMonto: 0.00,
                        itbis: 4500.00,
                        total: 29500.00,
                        observaciones: 'Instalación incluida en el precio.'
                    } : null}
                    onClose={() => setMostrarModal(false)}
                />
            )}

            <ModalFacturaNoEncontrada
                isOpen={mostrarErrorBusqueda}
                onClose={() => setMostrarErrorBusqueda(false)}
            />
        </div>
    );
};

export default PanelFactura;
