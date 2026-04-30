import React, { useState } from 'react';
import './PanelRecibos.css';
import iconBuscar from '../assets/search.svg';
import iconOjo from '../assets/eye.svg';

import ReciboPagoModal from './ReciboPagoModal';
import ReciboAbonoModal from './ReciboAbonoModal';

const PanelRecibos = () => {
    const [busquedaRecibo, setBusquedaRecibo] = useState('');

    // Datos de ejemplo para la tabla de recibos
    const recibos = [
        {
            id: 1,
            numero: 'R-000000001',
            fecha: '2026-04-29',
            cliente: 'José',
            tipo: 'Pago',
            monto: 15000.00
        },
        {
            id: 2,
            numero: 'R-000000002',
            fecha: '2026-04-30',
            cliente: 'Carlos Castillo',
            tipo: 'Abono',
            monto: 5000.00
        }
    ];

    const formatMoney = (value) => {
        return `$ ${value.toLocaleString('es-DO', { minimumFractionDigits: 0 })}`;
    };

    // Calcular KPIs
    const recaudacionMensual = recibos.reduce((acc, curr) => acc + curr.monto, 0);
    const recibosPagos = recibos.filter(r => r.tipo === 'Pago').length;
    const recibosAbonos = recibos.filter(r => r.tipo === 'Abono').length;
    const recibosTotales = recibos.length;

    const [reciboSeleccionado, setReciboSeleccionado] = useState(null);
    const [mostrarModal, setMostrarModal] = useState(false);

    const recibosFiltrados = recibos.filter(r => {
        if (!busquedaRecibo) return true;
        const query = busquedaRecibo.toLowerCase();
        return r.numero.toLowerCase().includes(query) || r.cliente.toLowerCase().includes(query);
    });

    return (
        <div className="recibos-page">
            <div className="recibos-header">
                <h1 className="recibos-title">Recibos</h1>
            </div>

            <div className="kpi-grid recibos-kpi-grid">
                <div className="kpi-card recibos-kpi-card">
                    <p className="kpi-label">Recaudación mensual</p>
                    <h2 className="kpi-value">{formatMoney(recaudacionMensual)}</h2>
                </div>
                <div className="kpi-card recibos-kpi-card">
                    <p className="kpi-label">Recibos de pagos</p>
                    <h2 className="kpi-value">{recibosPagos}</h2>
                </div>
                <div className="kpi-card recibos-kpi-card">
                    <p className="kpi-label">Recibos de abonos</p>
                    <h2 className="kpi-value">{recibosAbonos}</h2>
                </div>
                <div className="kpi-card recibos-kpi-card">
                    <p className="kpi-label">Recibos totales</p>
                    <h2 className="kpi-value">{recibosTotales}</h2>
                </div>
            </div>

            <div className="recibos-table-card">
                <div className="recibos-table-controls">
                    <h3>Lista de recibos</h3>

                    <div className="search-box">
                        <div className="search-input-wrapper" style={{ width: '410px' }}>
                            <img src={iconBuscar} alt="Buscar" className="search-icon" />
                            <input
                                type="text"
                                placeholder="Ingrese el número de recibo o nombre del cliente"
                                value={busquedaRecibo}
                                onChange={(event) => setBusquedaRecibo(event.target.value)}
                            />
                        </div>
                    </div>
                </div>

                <div className="recibos-table-wrapper">
                    <table className="recibos-table">
                        <thead>
                            <tr>
                                <th>Número de Recibo</th>
                                <th>Fecha del recibo</th>
                                <th>Cliente</th>
                                <th>Tipo de recibo</th>
                                <th>Monto del recibo</th>
                                <th>Acción</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recibosFiltrados.length > 0 ? (
                                recibosFiltrados.map((recibo) => (
                                    <tr key={recibo.id}>
                                        <td>{recibo.numero}</td>
                                        <td>{recibo.fecha}</td>
                                        <td>{recibo.cliente}</td>
                                        <td>{recibo.tipo}</td>
                                        <td>{formatMoney(recibo.monto)}</td>
                                        <td>
                                            <button 
                                                className="btn-ver-recibo" 
                                                type="button"
                                                onClick={() => {
                                                    setReciboSeleccionado(recibo);
                                                    setMostrarModal(true);
                                                }}
                                            >
                                                <img src={iconOjo} alt="Ver recibo" className="btn-ver-icon" />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td className="table-row-empty-cell" colSpan={6}>
                                        {busquedaRecibo ? 'No se encontraron recibos que coincidan con la búsqueda.' : 'No hay recibos para mostrar.'}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>



            {mostrarModal && reciboSeleccionado && (
                reciboSeleccionado.tipo === 'Abono' ? (
                    <ReciboAbonoModal 
                        data={{
                            ...reciboSeleccionado,
                            cliente: {
                                nombre: reciboSeleccionado.cliente,
                                cedula: '047-0012345-6',
                                rnc: ''
                            },
                            nroInterno: 'FAC-000555',
                            facturaNCF: 'B0200000555',
                            metodoPago: 'Transferencia Bancaria',
                            saldoAnterior: 20000.00,
                            nuevoSaldo: 15000.00,
                            total: reciboSeleccionado.monto
                        }}
                        onClose={() => setMostrarModal(false)}
                    />
                ) : (
                    <ReciboPagoModal 
                        data={{
                            ...reciboSeleccionado,
                            cliente: {
                                nombre: reciboSeleccionado.cliente,
                                cedula: '',
                                rnc: '131-07517-2'
                            },
                            nroInterno: 'FAC-000134',
                            facturaNCF: 'B02000000134',
                            metodoPago: 'Efectivo',
                            total: reciboSeleccionado.monto
                        }}
                        onClose={() => setMostrarModal(false)}
                    />
                )
            )}
        </div>
    );
};

export default PanelRecibos;
