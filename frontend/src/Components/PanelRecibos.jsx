import React, { useState } from 'react';
import './PanelRecibos.css';
import iconBuscar from '../assets/search.svg';
import iconOjo from '../assets/eye.svg';
import ModalReciboNoEncontrado from './ModalReciboNoEncontrado';
import ReciboModal from './ReciboModal';

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
        return `$ ${value.toLocaleString('es-DO', { minimumFractionDigits: 2 })}`;
    };

    const [reciboSeleccionado, setReciboSeleccionado] = useState(null);
    const [mostrarModal, setMostrarModal] = useState(false);
    const [mostrarErrorBusqueda, setMostrarErrorBusqueda] = useState(false);

    const manejarBusquedaRecibo = (event) => {
        if (event.key !== 'Enter') return;
        event.preventDefault();

        const query = busquedaRecibo.toLowerCase().trim();
        if (!query) return;

        const reciboEncontrado = recibos.find(r =>
            r.numero.toLowerCase().includes(query) ||
            r.cliente.toLowerCase().includes(query)
        );

        if (reciboEncontrado) {
            console.log('Recibo encontrado:', reciboEncontrado);
            setReciboSeleccionado(reciboEncontrado);
            setMostrarModal(true);
            setBusquedaRecibo('');
        } else {
            console.log('Recibo no encontrado:', busquedaRecibo);
            setMostrarErrorBusqueda(true);
            setBusquedaRecibo('');
        }
    };

    return (
        <div className="recibos-page">
            <div className="recibos-header">
                <h1 className="recibos-title">Recibos</h1>
            </div>

            <div className="kpi-grid recibos-kpi-grid">
                <div className="kpi-card recibos-kpi-card">
                    <p className="kpi-label">Recaudación mensual</p>
                    <h2 className="kpi-value">$20,000.00</h2>
                </div>
                <div className="kpi-card recibos-kpi-card">
                    <p className="kpi-label">Promedio por recibo</p>
                    <h2 className="kpi-value">$10,000.00</h2>
                </div>
                <div className="kpi-card recibos-kpi-card">
                    <p className="kpi-label">Recibo más alto</p>
                    <h2 className="kpi-value">$15,000.00</h2>
                </div>
                <div className="kpi-card recibos-kpi-card">
                    <p className="kpi-label">Recibos totales</p>
                    <h2 className="kpi-value">2</h2>
                </div>
            </div>

            <div className="recibos-table-card">
                <div className="recibos-table-controls">
                    <h3>Lista de recibos</h3>

                    <div className="search-box">
                        <div className="search-input-wrapper">
                            <img src={iconBuscar} alt="Buscar" className="search-icon" />
                            <input
                                type="text"
                                placeholder="Ingrese el número del recibo o nombre del cliente"
                                value={busquedaRecibo}
                                onChange={(event) => setBusquedaRecibo(event.target.value)}
                                onKeyDown={manejarBusquedaRecibo}
                            />
                        </div>
                    </div>
                </div>

                <div className="recibos-table-wrapper">
                    <table className="recibos-table">
                        <thead>
                            <tr>
                                <th>Número del recibo</th>
                                <th>Fecha del recibo</th>
                                <th>Cliente</th>
                                <th>Tipo de recibo</th>
                                <th>Monto del recibo</th>
                                <th>Acción</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recibos.length > 0 ? (
                                recibos.map((recibo) => (
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
                                        No hay recibos para mostrar.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <ModalReciboNoEncontrado
                isOpen={mostrarErrorBusqueda}
                onClose={() => setMostrarErrorBusqueda(false)}
            />

            {mostrarModal && (
                <ReciboModal 
                    data={reciboSeleccionado ? (reciboSeleccionado.tipo === 'Abono' ? {
                        ...reciboSeleccionado,
                        cliente: {
                            nombre: reciboSeleccionado.cliente,
                            rnc: '044-685-898-0'
                        },
                        concepto: 'Abono a cuenta pendiente - Factura #5555',
                        saldoAnterior: 20000.00,
                        nuevoSaldo: 15000.00,
                        total: reciboSeleccionado.monto
                    } : {
                        ...reciboSeleccionado,
                        cliente: {
                            nombre: reciboSeleccionado.cliente,
                            rnc: '044-685-898-0'
                        },
                        items: [
                            { cant: 3, desc: 'KUKU-IO MINI' },
                            { cant: 1, desc: 'RAMAL ALÁMBRICO' },
                            { cant: 4, desc: 'SWITCH DE CARRO' }
                        ],
                        subtotal: 20000.00,
                        itbis: 3600.00,
                        descuento: 0,
                        total: 23600.00
                    }) : null}
                    onClose={() => setMostrarModal(false)}
                />
            )}
        </div>
    );
};

export default PanelRecibos;
