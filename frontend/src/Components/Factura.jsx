import React, { useState } from 'react';
import './Factura.css';
import iconNuevaFactura from '../assets/new-section.svg';
import iconBuscar from '../assets/search.svg';
import iconVer from '../assets/eye.svg';
import FacturaModal from './FacturaModal';
import ModalFacturaEncontrada from './ModalFacturaEncontrada';
import ModalFacturaNoEncontrada from './ModalFacturaNoEncontrada';

const Factura = () => {
    const [busquedaFactura, setBusquedaFactura] = useState('');
    const [facturaSeleccionada, setFacturaSeleccionada] = useState(null);
    const [facturaBusquedaResultado, setFacturaBusquedaResultado] = useState(null);
    const [showModalEncontrada, setShowModalEncontrada] = useState(false);
    const [showModalNoEncontrada, setShowModalNoEncontrada] = useState(false);
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
    const facturasPendientes = facturas.filter(f => f.estado !== 'Pagada').length;
    const ticketPromedio = totalFacturas > 0 ? ingresoTotal / totalFacturas : 0;

    const formatMoney = (value) => {
        const numericValue = Number(String(value ?? '').replace(/[^\d.]/g, ''));
        if (Number.isNaN(numericValue)) {
            return '$ 0';
        }
        return `$ ${numericValue.toLocaleString('es-DO')}`;
    };

    const handleBuscarFactura = () => {
        const termino = busquedaFactura.trim().toLowerCase();
        if (!termino) return;

        const encontrada = facturas.find(
            factura =>
                factura.numero.toLowerCase().includes(termino) ||
                factura.cliente.toLowerCase().includes(termino)
        );

        if (encontrada) {
            setFacturaBusquedaResultado(encontrada);
            setShowModalEncontrada(true);
        } else {
            setShowModalNoEncontrada(true);
        }
        
        setBusquedaFactura('');
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
                    <p className="kpi-label">Ticket promedio</p>
                    <h2 className="kpi-value">{formatMoney(ticketPromedio)}</h2>
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
                                placeholder="Buscar por número de factura o cliente..."
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
                                <th>Número de Factura</th>
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
                                                className="btn-ver"
                                                type="button"
                                                aria-label="Ver factura"
                                                title="Ver factura"
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

            <ModalFacturaEncontrada 
                isOpen={showModalEncontrada}
                onClose={() => setShowModalEncontrada(false)}
                data={facturaBusquedaResultado}
                onVerFactura={(factura) => {
                    setShowModalEncontrada(false);
                    setFacturaSeleccionada(factura);
                }}
            />

            <ModalFacturaNoEncontrada
                isOpen={showModalNoEncontrada}
                onClose={() => setShowModalNoEncontrada(false)}
            />
        </div>
    );
};

export default Factura;
