import React, { useMemo, useState } from 'react';
import './PanelPrincipal.css';
import ModalGasto from './ModalGasto';

import iconNuevoGasto from '../assets/circle-check.svg';

const MainContent = ({ kpis, ventasRecientes, datosGrafica, estadisticasBarras, loading }) => {
    const [modalAbierto, setModalAbierto] = useState(false);

    const kpiList = [
        { id: 1, label: 'Ingresos del día', value: kpis?.ingresosDia || '$0' },
        { id: 2, label: 'Ingresos mensuales', value: kpis?.ingresosMes || '$0' },
        { id: 3, label: 'Clientes registrados', value: kpis?.totalClientes || '0' },
        { id: 4, label: 'Ventas registradas', value: kpis?.totalVentas || '0' },
    ];

    const chartData = useMemo(() => {
        const sourceData = Array.isArray(estadisticasBarras)
            ? estadisticasBarras
            : Array.isArray(datosGrafica)
                ? datosGrafica
                : [];

        if (sourceData.length === 0) {
            return [];
        }

        const rawValues = sourceData.map((item) => {
            const parsed = Number(item?.valor ?? item?.value ?? item?.monto ?? 0);
            return Number.isFinite(parsed) ? parsed : 0;
        });
        const maxValue = Math.max(...rawValues, 0);

        return sourceData.map((item, index) => {
            const label = item?.dia ?? item?.label ?? item?.nombre ?? `Día ${index + 1}`;
            const value = Number(item?.valor ?? item?.value ?? item?.monto ?? 0) || 0;
            const explicitPercent = Number(item?.porcentaje);
            const percentFromValue = maxValue > 0 ? (value / maxValue) * 100 : 0;
            const percentage = Number.isFinite(explicitPercent)
                ? Math.max(5, Math.min(explicitPercent, 100))
                : Math.max(5, Math.min(percentFromValue, 100));

            return {
                id: item?.id ?? `${label}-${index}`,
                label,
                value,
                percentage,
                isActive: Boolean(item?.esHoy ?? item?.active),
            };
        });
    }, [datosGrafica, estadisticasBarras]);

    return (
        <main className="main-content">
            <header className="main-header">
                <h1 className="main-title no-select">Panel principal</h1>
                <button className="btn-registrar-gasto no-select" onClick={() => setModalAbierto(true)}>
                    <img src={iconNuevoGasto} alt="" className="btn-icon" />
                    <span>Registrar Gasto</span>
                </button>
            </header>

            <section className="kpi-grid">
                {kpiList.map((kpi) => (
                    <div key={kpi.id} className="kpi-card">
                        <span className="kpi-label no-select">{kpi.label}</span>
                        <h2 className="kpi-value">{kpi.value}</h2>
                    </div>
                ))}
            </section>

            <div className="details-grid">
                <div className="details-card chart-section">
                    <div className="chart-info">
                        <h3 className="details-subtitle">Ventas últimos 7 días</h3>
                        <h2 className="chart-total">{kpis?.ventasSemana || '$0'}</h2>
                    </div>
                    <div className="placeholder-chart">
                        {chartData.length > 0 ? (
                            chartData.map((bar) => (
                                <div
                                    key={bar.id}
                                    className={`bar-mock ${bar.isActive ? 'active' : ''}`}
                                    style={{ height: `${bar.percentage}%` }}
                                    title={`${bar.label}: ${bar.value}`}
                                >
                                    <span className="bar-label">{bar.label}</span>
                                </div>
                            ))
                        ) : (
                            <div className="chart-empty">Sin estadisticas para mostrar</div>
                        )}
                    </div>
                </div>

                <div className="details-card table-section">
                    <h3 className="details-subtitle">Ventas mensuales</h3>
                    <div className="mock-table">
                        <div className="table-header">
                            <span>No. Factura</span>
                            <span>Método</span>
                            <span className="text-right">Costo</span>
                        </div>

                        {ventasRecientes?.length > 0 ? (
                            ventasRecientes.map((venta) => (
                                <div key={venta.id} className="table-row">
                                    <div className="venta-info">
                                        <span className="n-factura">#{venta.numero_factura}</span>
                                        <span className="cliente-name">{venta.cliente}</span>
                                    </div>
                                    <span className="metodo-pago">{venta.metodo}</span>
                                    <div className="monto-info text-right">
                                        <span className="monto-verde">${venta.monto}</span>
                                        <span className="fecha-venta">{venta.fecha}</span>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="table-row-empty">
                                {loading ? 'Cargando datos...' : 'No hay ventas registradas'}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <ModalGasto
                isOpen={modalAbierto}
                onClose={() => setModalAbierto(false)}
                onGuardar={(payload) => {
                    console.log('Gasto guardado:', payload);
                }}
            />
        </main>
    );
};

export default MainContent;

