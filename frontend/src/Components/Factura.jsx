import React, { useState } from 'react';
import './Factura.css';
import iconBuscar from '../assets/search.svg';
import iconVer from '../assets/eye.svg';
import FacturaModal from './FacturaModal';

const Factura = () => {
    const [busquedaFactura, setBusquedaFactura] = useState('');
    const [facturaSeleccionada, setFacturaSeleccionada] = useState(null);
    const [facturas] = useState([
        {
            id: 1,
            numero: 'FAC-001',
            cliente: 'Electrónica Gómez',
            tipo: 'Al por mayor',
            fecha: '29/04/2026',
            subtotal: 15000,
            descuento: 5,
            itbis: 18,
            total: 16815,
            metodo: 'Transferencia',
            estado: 'Pagada'
        }
    ]);

    const totalFacturas = facturas.length;
    const ingresoTotal = facturas.reduce((acc, curr) => acc + curr.total, 0);
    const facturasHoy = facturas.filter(f => f.fecha === '29/04/2026').length;
    const balancePendiente = facturas.filter(f => f.estado !== 'Pagada').reduce((acc, curr) => acc + curr.total, 0);
    const ticketPromedio = totalFacturas > 0 ? ingresoTotal / totalFacturas : 0;

    const formatMoney = (value) => {
        const numericValue = Number(String(value ?? '').replace(/[^\d.]/g, ''));
        if (Number.isNaN(numericValue)) {
            return '$ 0';
        }
        return `$ ${numericValue.toLocaleString('es-DO', { minimumFractionDigits: 0 })}`;
    };

    // Filtrado automático inline
    const facturasMostradas = facturas.filter(f => {
        if (!busquedaFactura) return true;
        const termino = busquedaFactura.toLowerCase();
        return f.numero.toLowerCase().includes(termino) || f.cliente.toLowerCase().includes(termino);
    });

    return (
        <div className="factura-page">
            <div className="factura-header">
                <div>
                    <h1 className="factura-title">Historial de Ventas</h1>
                </div>

            </div>

            <div className="kpi-grid factura-kpi-grid">
                <div className="kpi-card factura-kpi-card">
                    <p className="kpi-label">Promedio de Venta</p>
                    <h2 className="kpi-value">{formatMoney(ticketPromedio)}</h2>
                </div>
                <div className="kpi-card factura-kpi-card">
                    <p className="kpi-label">Registros hoy</p>
                    <h2 className="kpi-value">{facturasHoy}</h2>
                </div>
                <div className="kpi-card factura-kpi-card">
                    <p className="kpi-label">Total Registros</p>
                    <h2 className="kpi-value">{totalFacturas}</h2>
                </div>
                <div className="kpi-card factura-kpi-card">
                    <p className="kpi-label">Ingreso total</p>
                    <h2 className="kpi-value">{formatMoney(ingresoTotal)}</h2>
                </div>
            </div>

            <div className="factura-table-card">
                <div className="factura-table-controls">
                    <div>
                        <h3>Lista de registros de venta</h3>
                    </div>

                    <div className="search-box">
                        <div className="search-input-wrapper" style={{ width: '350px' }}>
                            <img src={iconBuscar} alt="Buscar" className="search-icon" />
                            <input
                                type="text"
                                placeholder="Buscar por número de registro o cliente..."
                                value={busquedaFactura}
                                onChange={(e) => setBusquedaFactura(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                <div className="factura-table-wrapper">
                    <table className="factura-table">
                        <thead>
                            <tr>
                                <th>Número de Registro</th>
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
                            {facturasMostradas.length === 0 ? (
                                <tr>
                                    <td className="table-row-empty-cell" colSpan={11}>
                                        {busquedaFactura ? 'No se encontraron registros que coincidan con la búsqueda.' : 'No hay registros para mostrar.'}
                                    </td>
                                </tr>
                            ) : (
                                facturasMostradas.map((factura) => (
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
                                                className="btn-ver"
                                                type="button"
                                                aria-label="Ver registro"
                                                onClick={() => setFacturaSeleccionada(factura)}
                                            >
                                                <img src={iconVer} alt="" className="btn-ver-icon" />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {facturaSeleccionada && (
                <FacturaModal
                    data={{
                        ncf: facturaSeleccionada.numero,
                        fecha: facturaSeleccionada.fecha,
                        condicion: 'Contado',
                        metodoPago: facturaSeleccionada.metodo,
                        nroInterno: facturaSeleccionada.id,
                        vendedor: 'Sistema',
                        cliente: {
                            nombre: facturaSeleccionada.cliente,
                            rnc: 'N/A',
                            cedula: 'N/A',
                            direccion: 'Ciudad',
                            ciudad: 'Local',
                            telefono: '000-000-0000'
                        },
                        items: [
                            {
                                cant: 1,
                                um: 'Und',
                                desc: 'Servicios/Productos Generales',
                                precio: facturaSeleccionada.subtotal
                            }
                        ],
                        subtotal: facturaSeleccionada.subtotal,
                        descuentoMonto: (facturaSeleccionada.subtotal * facturaSeleccionada.descuento) / 100,
                        itbis: ((facturaSeleccionada.subtotal - (facturaSeleccionada.subtotal * facturaSeleccionada.descuento) / 100) * facturaSeleccionada.itbis) / 100,
                        total: facturaSeleccionada.total
                    }}
                    onClose={() => setFacturaSeleccionada(null)}
                />
            )}

            )}
        </div>
    );
};

export default Factura;
