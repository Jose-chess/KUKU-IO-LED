import React, { useState } from 'react';
import './Factura.css';
import iconBuscar from '../assets/search.svg';
import iconVer from '../assets/eye.svg';
import FacturaModal from './FacturaModal';
// TODO: Importar API calls cuando el backend esté listo
// import { fetchFacturas } from '../api/facturasApi';

const Factura = () => {
    const [busquedaFactura, setBusquedaFactura] = useState('');
    const [facturaSeleccionada, setFacturaSeleccionada] = useState(null);
    
    // Datos del backend (vacíos hasta integrar)
    const [facturas, setFacturas] = useState([]);
    const [kpis, setKpis] = useState({
        totalFacturas: 0,
        ingresoTotal: 0,
        facturasHoy: 0,
        ticketPromedio: 0,
        balancePendiente: 0
    });

    // TODO: useEffect para cargar datos desde backend
    // useEffect(() => {
    //     const loadData = async () => {
    //         const [facturasData, kpisData] = await Promise.all([
    //             fetchFacturas(busquedaFactura),
    //             fetchKpisFacturas()
    //         ]);
    //         setFacturas(facturasData);
    //         setKpis(kpisData);
    //     };
    //     loadData();
    // }, [busquedaFactura]);

    const formatMoney = (value) => {
        if (!value || isNaN(value)) return '$ 0';
        return `$ ${Number(value).toLocaleString('es-DO', { minimumFractionDigits: 0 })}`;
    };

    // TODO: El filtrado debe hacerse en el backend
    const facturasMostradas = facturas;

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
                    <h2 className="kpi-value">{formatMoney(kpis.ticketPromedio)}</h2>
                </div>
                <div className="kpi-card factura-kpi-card">
                    <p className="kpi-label">Registros hoy</p>
                    <h2 className="kpi-value">{kpis.facturasHoy}</h2>
                </div>
                <div className="kpi-card factura-kpi-card">
                    <p className="kpi-label">Total Registros</p>
                    <h2 className="kpi-value">{kpis.totalFacturas}</h2>
                </div>
                <div className="kpi-card factura-kpi-card">
                    <p className="kpi-label">Ingreso total</p>
                    <h2 className="kpi-value">{formatMoney(kpis.ingresoTotal)}</h2>
                </div>
            </div>

            <div className="factura-table-card">
                <div className="factura-table-controls">
                    <div>
                        <h3>Lista de historial de venta</h3>
                    </div>

                    <div className="factura-search-wrapper">
                        <img src={iconBuscar} alt="Buscar" className="factura-search-icon" />
                        <input
                            type="text"
                            placeholder="Buscar por número de registro o cliente"
                            value={busquedaFactura}
                            onChange={(e) => setBusquedaFactura(e.target.value)}
                            className="factura-search-input"
                        />
                    </div>
                </div>

                <div className="factura-table-wrapper">
                    <table className="factura-table">
                        <thead>
                            <tr>
                                <th>Código</th>
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
        </div>
    );
};

export default Factura;
