import React, { useState } from 'react';
import './PanelCuentasCobrar.css';
import iconBuscar from '../assets/search.svg';
import iconOjo from '../assets/eye.svg';

const PanelCuentasCobrar = () => {
    const [busqueda, setBusqueda] = useState('');

    // Datos de ejemplo para la tabla de cuentas por cobrar
    const cuentas = [
        {
            id: 1,
            numero: 'CXC-000001',
            cliente: 'José Ramírez',
            fechaEmision: '2026-04-10',
            fechaVencimiento: '2026-05-10',
            montoTotal: 25000,
            montoPagado: 10000,
            estado: 'Parcial'
        },
        {
            id: 2,
            numero: 'CXC-000002',
            cliente: 'Carlos Castillo',
            fechaEmision: '2026-04-15',
            fechaVencimiento: '2026-05-15',
            montoTotal: 18000,
            montoPagado: 0,
            estado: 'Pendiente'
        },
        {
            id: 3,
            numero: 'CXC-000003',
            cliente: 'María López',
            fechaEmision: '2026-03-20',
            fechaVencimiento: '2026-04-20',
            montoTotal: 32000,
            montoPagado: 0,
            estado: 'Vencida'
        }
    ];

    const formatMoney = (value) => {
        return `$ ${value.toLocaleString('es-DO', { minimumFractionDigits: 0 })}`;
    };

    // Calcular KPIs
    const totalPorCobrar = cuentas.reduce((acc, curr) => acc + (curr.montoTotal - curr.montoPagado), 0);
    const cuentasPendientes = cuentas.filter(c => c.estado === 'Pendiente').length;
    const cuentasVencidas = cuentas.filter(c => c.estado === 'Vencida').length;
    const totalCuentas = cuentas.length;

    const handleBusqueda = (event) => {
        if (event.key !== 'Enter') return;
        event.preventDefault();

        const query = busqueda.toLowerCase().trim();
        if (!query) return;

        const cuentaEncontrada = cuentas.find(c =>
            c.numero.toLowerCase().includes(query) ||
            c.cliente.toLowerCase().includes(query)
        );

        if (cuentaEncontrada) {
            console.log('Cuenta encontrada:', cuentaEncontrada);
            setBusqueda('');
        } else {
            console.log('Cuenta no encontrada:', busqueda);
            setBusqueda('');
        }
    };

    const getEstadoClass = (estado) => {
        switch (estado) {
            case 'Pendiente': return 'pendiente';
            case 'Parcial': return 'parcial';
            case 'Vencida': return 'vencida';
            default: return '';
        }
    };

    return (
        <div className="cuentas-page">
            <div className="cuentas-header">
                <h1 className="cuentas-title">Facturas por cobrar</h1>
            </div>

            <div className="kpi-grid cuentas-kpi-grid">
                <div className="kpi-card cuentas-kpi-card">
                    <p className="kpi-label">Total por cobrar</p>
                    <h2 className="kpi-value">{formatMoney(totalPorCobrar)}</h2>
                </div>
                <div className="kpi-card cuentas-kpi-card">
                    <p className="kpi-label">Cuentas pendientes</p>
                    <h2 className="kpi-value">{cuentasPendientes}</h2>
                </div>
                <div className="kpi-card cuentas-kpi-card">
                    <p className="kpi-label">Cuentas vencidas</p>
                    <h2 className="kpi-value" style={{ color: cuentasVencidas > 0 ? '#ff0000' : undefined }}>{cuentasVencidas}</h2>
                </div>
                <div className="kpi-card cuentas-kpi-card">
                    <p className="kpi-label">Cuentas totales</p>
                    <h2 className="kpi-value">{totalCuentas}</h2>
                </div>
            </div>

            <div className="cuentas-table-card">
                <div className="cuentas-table-controls">
                    <h3>Lista de facturas por cobrar</h3>

                    <div className="search-box">
                        <div className="search-input-wrapper">
                            <img src={iconBuscar} alt="" className="search-icon" />
                            <input
                                type="text"
                                placeholder="Buscar por número de factura o nombre del cliente"
                                value={busqueda}
                                onChange={(event) => setBusqueda(event.target.value)}
                                onKeyDown={handleBusqueda}
                            />
                        </div>
                    </div>
                </div>

                <div className="cuentas-table-wrapper">
                    <table className="cuentas-table">
                        <thead>
                            <tr>
                                <th>Número</th>
                                <th>Cliente</th>
                                <th>Fecha de emisión</th>
                                <th>Monto total</th>
                                <th>Monto pagado</th>
                                <th>Estado</th>
                                <th>Acción</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cuentas.length > 0 ? (
                                cuentas.map((cuenta) => (
                                    <tr key={cuenta.id}>
                                        <td>{cuenta.numero}</td>
                                        <td>{cuenta.cliente}</td>
                                        <td>{cuenta.fechaEmision}</td>
                                        <td>{formatMoney(cuenta.montoTotal)}</td>
                                        <td>{formatMoney(cuenta.montoPagado)}</td>
                                        <td>
                                            <span className={`estado-badge ${getEstadoClass(cuenta.estado)}`}>
                                                {cuenta.estado}
                                            </span>
                                        </td>
                                        <td>
                                            <button
                                                className="btn-ver-cuenta"
                                                type="button"
                                                onClick={() => console.log('Ver cuenta:', cuenta)}
                                            >
                                                <img src={iconOjo} alt="" className="btn-ver-cuenta-icon" />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td className="table-row-empty-cell" colSpan={7}>
                                        No hay facturas por cobrar para mostrar.
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

export default PanelCuentasCobrar;
