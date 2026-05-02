import React, { useState } from 'react';
import './PanelCuentasCobrar.css';
import iconBuscar from '../assets/search.svg';
import iconOjo from '../assets/eye.svg';
import ModalCuentaPendiente from './ModalCuentaPendiente';
import ModalErrorPago from './ModalErrorPago';

const PanelCuentasCobrar = () => {
    const [busqueda, setBusqueda] = useState('');
    const [showModalCuentaPendiente, setShowModalCuentaPendiente] = useState(false);
    const [selectedCuenta, setSelectedCuenta] = useState(null);
    const [showErrorPago, setShowErrorPago] = useState(false);

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

    const cuentasFiltradas = cuentas.filter(c => {
        if (!busqueda) return true;
        const query = busqueda.toLowerCase();
        return c.numero.toLowerCase().includes(query) || c.cliente.toLowerCase().includes(query);
    });

    const getEstadoClass = (estado) => {
        switch (estado) {
            case 'Pendiente': return 'pendiente';
            case 'Parcial': return 'parcial';
            case 'Vencida': return 'vencida';
            case 'Pagada': return 'pagada';
            default: return '';
        }
    };

    return (
        <div className="cuentas-page">
            <div className="cuentas-header">
                <h1 className="cuentas-title">Cuentas por cobrar</h1>
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
                    <h2 className="kpi-value">{cuentasVencidas}</h2>
                </div>
                <div className="kpi-card cuentas-kpi-card">
                    <p className="kpi-label">Cuentas totales</p>
                    <h2 className="kpi-value">{totalCuentas}</h2>
                </div>
            </div>

            <div className="cuentas-table-card">
                <div className="cuentas-table-controls">
                    <h3>Lista de cuentas por cobrar</h3>

                    <div className="cuentas-search-wrapper">
                        <img src={iconBuscar} alt="" className="cuentas-search-icon" />
                        <input
                            type="text"
                            placeholder="Buscar por número de factura o nombre del cliente"
                            value={busqueda}
                            onChange={(event) => setBusqueda(event.target.value)}
                            className="cuentas-search-input"
                        />
                    </div>
                </div>

                <div className="cuentas-table-wrapper">
                    <table className="cuentas-table">
                        <thead>
                            <tr>
                                <th>Código</th>
                                <th>Cliente</th>
                                <th>Fecha de emisión</th>
                                <th>Monto total</th>
                                <th>Monto pagado</th>
                                <th>Monto pendiente</th>
                                <th>Estado</th>
                                <th>Acción</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cuentasFiltradas.length > 0 ? (
                                cuentasFiltradas.map((cuenta) => (
                                    <tr key={cuenta.id}>
                                        <td>{cuenta.numero}</td>
                                        <td>{cuenta.cliente}</td>
                                        <td>{cuenta.fechaEmision}</td>
                                        <td>{formatMoney(cuenta.montoTotal)}</td>
                                        <td>{formatMoney(cuenta.montoPagado)}</td>
                                        <td>{formatMoney(cuenta.montoTotal - cuenta.montoPagado)}</td>
                                        <td>
                                            <span className={`estado-badge ${getEstadoClass(cuenta.estado)}`}>
                                                {cuenta.estado}
                                            </span>
                                        </td>
                                        <td>
                                            <button
                                                className="btn-ver-cuenta"
                                                type="button"
                                                onClick={() => {
                                                    setSelectedCuenta(cuenta);
                                                    setShowModalCuentaPendiente(true);
                                                }}
                                            >
                                                <img src={iconOjo} alt="" className="btn-ver-cuenta-icon" />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td className="table-row-empty-cell" colSpan={8}>
                                        {busqueda ? 'No se encontraron facturas por cobrar que coincidan con la búsqueda.' : 'No hay facturas por cobrar para mostrar.'}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <ModalCuentaPendiente
                isOpen={showModalCuentaPendiente}
                onClose={() => {
                    setShowModalCuentaPendiente(false);
                    setSelectedCuenta(null);
                }}
                onPagar={async (pagoData) => {
                    console.log('Procesando pago:', pagoData);
                    
                    // Simular error para probar el modal (quitar en producción)
                    // setShowErrorPago(true);
                    // return { success: false };
                    
                    // Actualizar la cuenta localmente
                    const cuentaIndex = cuentas.findIndex(c => c.id === pagoData.cuentaId);
                    if (cuentaIndex >= 0) {
                        const cuenta = cuentas[cuentaIndex];
                        const nuevoMontoPagado = cuenta.montoPagado + pagoData.montoPagado;
                        
                        // Determinar nuevo estado
                        let nuevoEstado = cuenta.estado;
                        if (nuevoMontoPagado >= cuenta.montoTotal) {
                            nuevoEstado = 'Pagada';
                        } else if (nuevoMontoPagado > 0) {
                            nuevoEstado = 'Parcial';
                        }
                        
                        // Actualizar el estado (en producción esto sería una llamada API)
                        cuentas[cuentaIndex] = {
                            ...cuenta,
                            montoPagado: nuevoMontoPagado,
                            estado: nuevoEstado
                        };
                        
                        console.log('Cuenta actualizada:', cuentas[cuentaIndex]);
                    }
                    
                    return { success: true };
                }}
                cuentaData={selectedCuenta}
            />

            <ModalErrorPago
                isOpen={showErrorPago}
                onClose={() => setShowErrorPago(false)}
                mensaje="No se pudo registrar el pago en la base de datos"
                submensaje="¡Intente de nuevo!"
            />
        </div>
    );
};

export default PanelCuentasCobrar;
