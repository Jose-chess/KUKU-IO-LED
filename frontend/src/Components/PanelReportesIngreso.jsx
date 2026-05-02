import React, { useState } from 'react';
import './PanelReportesIngreso.css';
import iconFlecha from '../assets/chevron-down.svg';
import iconHistorial from '../assets/file-analytics.svg';
import ModalHistorialReportes from './ModalHistorialReportes';

const PanelReportesIngreso = () => {
    const [periodoSeleccionado, setPeriodoSeleccionado] = useState('Mensual');
    const [mesSeleccionado, setMesSeleccionado] = useState('Abril');
    const [anioSeleccionado, setAnioSeleccionado] = useState('2026');
    const [showPeriodoDropdown, setShowPeriodoDropdown] = useState(false);
    const [showMesDropdown, setShowMesDropdown] = useState(false);
    const [showAnioDropdown, setShowAnioDropdown] = useState(false);
    const [showHistorialModal, setShowHistorialModal] = useState(false);

    // Datos de ejemplo para el reporte
    const datosReporte = {
        periodo: 'REPORTE MENSUAL',
        mes: 'Abril',
        anio: '2026',
        resumen: 'El mes presentó un crecimiento progresivo en ventas, con un aumento notable en la última semana.',
        semanas: [
            { semana: 1, clientes: 35, articulos: 120, ganancias: 206400 },
            { semana: 2, clientes: 15, articulos: 180, ganancias: 309600 },
            { semana: 3, clientes: 28, articulos: 160, ganancias: 275200 },
            { semana: 4, clientes: 12, articulos: 200, ganancias: 344000 },
        ],
        totalClientes: 90,
        totalArticulos: 660,
        totalGanancias: 1135200,
        productoTop: 'KUKU-IO MINI color blanco amarillo'
    };

    const periodos = ['Semanal', 'Mensual', 'Anual'];
    const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    const anios = ['2024', '2025', '2026'];

    // Datos para los gráficos donut
    const distribucionVentas = [
        { nombre: 'KUKU-IO MINI', porcentaje: 30, color: '#FF9F43' },
        { nombre: 'KUKU-IO MIDI', porcentaje: 25, color: '#FACC15' },
        { nombre: 'KUKU-IO MAXI', porcentaje: 20, color: '#4ADE80' },
        { nombre: 'KUKU-IO PRO', porcentaje: 15, color: '#60A5FA' },
        { nombre: 'KUKU-IO ULTRA', porcentaje: 10, color: '#A78BFA' },
    ];

    const flujoClientes = [
        { nombre: 'Nuevos', porcentaje: 40, color: '#4ADE80' },
        { nombre: 'Recurrentes', porcentaje: 35, color: '#FACC15' },
        { nombre: 'Inactivos', porcentaje: 15, color: '#FB923C' },
        { nombre: 'Perdidos', porcentaje: 10, color: '#9CA3AF' },
    ];

    const gananciasPorArticulo = [
        { nombre: 'KUKU-IO MINI Blanco', porcentaje: 28, color: '#FACC15' },
        { nombre: 'KUKU-IO MINI Negro', porcentaje: 24, color: '#4ADE80' },
        { nombre: 'KUKU-IO MIDI', porcentaje: 20, color: '#60A5FA' },
        { nombre: 'KUKU-IO MAXI', porcentaje: 16, color: '#A78BFA' },
        { nombre: 'KUKU-IO PRO', porcentaje: 12, color: '#FB923C' },
    ];

    const formatearDinero = (valor) => {
        return new Intl.NumberFormat('es-DO', {
            style: 'currency',
            currency: 'DOP',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(valor);
    };

    return (
        <div className="reportes-page">
            <div className="reportes-header">
                <h1 className="reportes-title">Reportes de Ganancias</h1>
                <div className="reportes-controls">
                    <div className="premium-dropdown" onClick={(e) => { e.stopPropagation(); setShowPeriodoDropdown(!showPeriodoDropdown); setShowMesDropdown(false); setShowAnioDropdown(false); }}>
                        <label>Período:</label>
                        <div className="dropdown-trigger">
                            <span>{periodoSeleccionado}</span>
                            <img src={iconFlecha} alt="" className={`dropdown-arrow ${showPeriodoDropdown ? 'open' : ''}`} />
                        </div>
                        {showPeriodoDropdown && (
                            <div className="dropdown-menu">
                                {periodos.map((periodo) => (
                                    <div
                                        key={periodo}
                                        className={`dropdown-item ${periodoSeleccionado === periodo ? 'active' : ''}`}
                                        onClick={() => { setPeriodoSeleccionado(periodo); setShowPeriodoDropdown(false); }}
                                    >
                                        {periodo}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {periodoSeleccionado !== 'Anual' && (
                        <div className="premium-dropdown" onClick={(e) => { e.stopPropagation(); setShowMesDropdown(!showMesDropdown); setShowPeriodoDropdown(false); setShowAnioDropdown(false); }}>
                            <label>Mes:</label>
                            <div className="dropdown-trigger">
                                <span>{mesSeleccionado}</span>
                                <img src={iconFlecha} alt="" className={`dropdown-arrow ${showMesDropdown ? 'open' : ''}`} />
                            </div>
                            {showMesDropdown && (
                                <div className="dropdown-menu">
                                    {meses.map((mes) => (
                                        <div
                                            key={mes}
                                            className={`dropdown-item ${mesSeleccionado === mes ? 'active' : ''}`}
                                            onClick={() => { setMesSeleccionado(mes); setShowMesDropdown(false); }}
                                        >
                                            {mes}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    <div className="premium-dropdown" onClick={(e) => { e.stopPropagation(); setShowAnioDropdown(!showAnioDropdown); setShowPeriodoDropdown(false); setShowMesDropdown(false); }}>
                        <label>Año:</label>
                        <div className="dropdown-trigger">
                            <span>{anioSeleccionado}</span>
                            <img src={iconFlecha} alt="" className={`dropdown-arrow ${showAnioDropdown ? 'open' : ''}`} />
                        </div>
                        {showAnioDropdown && (
                            <div className="dropdown-menu">
                                {anios.map((anio) => (
                                    <div
                                        key={anio}
                                        className={`dropdown-item ${anioSeleccionado === anio ? 'active' : ''}`}
                                        onClick={() => { setAnioSeleccionado(anio); setShowAnioDropdown(false); }}
                                    >
                                        {anio}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <button className="btn-historial" onClick={() => setShowHistorialModal(true)}>
                        <img src={iconHistorial} alt="" className="btn-historial-icon" />
                        Ver Historial
                    </button>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="kpi-grid reportes-kpi-grid">
                <div className="kpi-card reportes-kpi-card">
                    <p className="kpi-label">Total Clientes</p>
                    <h2 className="kpi-value">{datosReporte.totalClientes}</h2>
                </div>
                <div className="kpi-card reportes-kpi-card">
                    <p className="kpi-label">Artículos Vendidos</p>
                    <h2 className="kpi-value">{datosReporte.totalArticulos}</h2>
                </div>
                <div className="kpi-card reportes-kpi-card destacado">
                    <p className="kpi-label">Ganancias Totales</p>
                    <h2 className="kpi-value valor-positivo">{formatearDinero(datosReporte.totalGanancias)}</h2>
                </div>
                <div className="kpi-card reportes-kpi-card">
                    <p className="kpi-label">Producto Top</p>
                    <h2 className="kpi-value producto-top">{datosReporte.productoTop}</h2>
                </div>
            </div>

            {/* Reporte Detallado */}
            <div className="reportes-content-card">
                <div className="reporte-encabezado">
                    <h3 className="reporte-tipo">{datosReporte.periodo}</h3>
                    <p className="reporte-periodo">Mes: {datosReporte.mes} | Año: {datosReporte.anio}</p>
                </div>

                <div className="reporte-seccion">
                    <h4 className="seccion-titulo">Resumen General</h4>
                    <p className="seccion-texto">{datosReporte.resumen}</p>
                </div>

                <div className="reporte-seccion">
                    <h4 className="seccion-titulo">Resultados Semanales</h4>
                    <div className="tabla-semanas">
                        <div className="tabla-header">
                            <span>Semana</span>
                            <span>Clientes</span>
                            <span>Artículos</span>
                            <span>Ganancias</span>
                        </div>
                        {datosReporte.semanas.map((semana, index) => (
                            <div key={index} className="tabla-fila">
                                <span className="semana-num">Semana {semana.semana}</span>
                                <span>{semana.clientes}</span>
                                <span>{semana.articulos}</span>
                                <span className="valor-ganancia">{formatearDinero(semana.ganancias)}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="reporte-total">
                    <p>Para un total de <strong>{datosReporte.totalClientes} clientes</strong> registrados, <strong>{datosReporte.totalArticulos} artículos vendidos</strong> y un total en ganancias de <strong className="valor-total">{formatearDinero(datosReporte.totalGanancias)}</strong> en el mes.</p>
                    <p className="producto-destacado">Siendo el <strong>{datosReporte.productoTop}</strong> más vendido.</p>
                </div>
            </div>

            {/* Gráficos */}
            <div className="charts-grid">
                <div className="chart-card">
                    <h3 className="chart-title">Distribución de Ventas</h3>
                    <div className="donut-chart-container">
                        <svg viewBox="0 0 200 200" className="donut-chart">
                            {distribucionVentas.reduce((acc, item, index) => {
                                const startAngle = acc.angle;
                                const angleSize = (item.porcentaje / 100) * 360;
                                const endAngle = startAngle + angleSize;
                                
                                const x1 = 100 + 70 * Math.cos((startAngle - 90) * Math.PI / 180);
                                const y1 = 100 + 70 * Math.sin((startAngle - 90) * Math.PI / 180);
                                const x2 = 100 + 70 * Math.cos((endAngle - 90) * Math.PI / 180);
                                const y2 = 100 + 70 * Math.sin((endAngle - 90) * Math.PI / 180);
                                
                                const largeArc = angleSize > 180 ? 1 : 0;
                                
                                acc.paths.push(
                                    <path
                                        key={index}
                                        d={`M 100 100 L ${x1} ${y1} A 70 70 0 ${largeArc} 1 ${x2} ${y2} Z`}
                                        fill={item.color}
                                    />
                                );
                                acc.angle = endAngle;
                                return acc;
                            }, { paths: [], angle: 0 }).paths}
                            <circle cx="100" cy="100" r="40" fill="white" />
                        </svg>
                        <div className="chart-legend">
                            {distribucionVentas.map((item, index) => (
                                <div key={index} className="legend-item">
                                    <span className="legend-color" style={{ backgroundColor: item.color }}></span>
                                    <span className="legend-label">{item.nombre}</span>
                                    <span className="legend-value">{item.porcentaje}%</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="chart-card">
                    <h3 className="chart-title">Flujo de Clientes</h3>
                    <div className="donut-chart-container">
                        <svg viewBox="0 0 200 200" className="donut-chart">
                            {flujoClientes.reduce((acc, item, index) => {
                                const startAngle = acc.angle;
                                const angleSize = (item.porcentaje / 100) * 360;
                                const endAngle = startAngle + angleSize;
                                
                                const x1 = 100 + 70 * Math.cos((startAngle - 90) * Math.PI / 180);
                                const y1 = 100 + 70 * Math.sin((startAngle - 90) * Math.PI / 180);
                                const x2 = 100 + 70 * Math.cos((endAngle - 90) * Math.PI / 180);
                                const y2 = 100 + 70 * Math.sin((endAngle - 90) * Math.PI / 180);
                                
                                const largeArc = angleSize > 180 ? 1 : 0;
                                
                                acc.paths.push(
                                    <path
                                        key={index}
                                        d={`M 100 100 L ${x1} ${y1} A 70 70 0 ${largeArc} 1 ${x2} ${y2} Z`}
                                        fill={item.color}
                                    />
                                );
                                acc.angle = endAngle;
                                return acc;
                            }, { paths: [], angle: 0 }).paths}
                            <circle cx="100" cy="100" r="40" fill="white" />
                        </svg>
                        <div className="chart-legend">
                            {flujoClientes.map((item, index) => (
                                <div key={index} className="legend-item">
                                    <span className="legend-color" style={{ backgroundColor: item.color }}></span>
                                    <span className="legend-label">{item.nombre}</span>
                                    <span className="legend-value">{item.porcentaje}%</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="chart-card full-width">
                    <h3 className="chart-title">Ganancias por Artículo</h3>
                    <div className="donut-chart-container">
                        <svg viewBox="0 0 200 200" className="donut-chart">
                            {gananciasPorArticulo.reduce((acc, item, index) => {
                                const startAngle = acc.angle;
                                const angleSize = (item.porcentaje / 100) * 360;
                                const endAngle = startAngle + angleSize;
                                
                                const x1 = 100 + 70 * Math.cos((startAngle - 90) * Math.PI / 180);
                                const y1 = 100 + 70 * Math.sin((startAngle - 90) * Math.PI / 180);
                                const x2 = 100 + 70 * Math.cos((endAngle - 90) * Math.PI / 180);
                                const y2 = 100 + 70 * Math.sin((endAngle - 90) * Math.PI / 180);
                                
                                const largeArc = angleSize > 180 ? 1 : 0;
                                
                                acc.paths.push(
                                    <path
                                        key={index}
                                        d={`M 100 100 L ${x1} ${y1} A 70 70 0 ${largeArc} 1 ${x2} ${y2} Z`}
                                        fill={item.color}
                                    />
                                );
                                acc.angle = endAngle;
                                return acc;
                            }, { paths: [], angle: 0 }).paths}
                            <circle cx="100" cy="100" r="40" fill="white" />
                        </svg>
                        <div className="chart-legend">
                            {gananciasPorArticulo.map((item, index) => (
                                <div key={index} className="legend-item">
                                    <span className="legend-color" style={{ backgroundColor: item.color }}></span>
                                    <span className="legend-label">{item.nombre}</span>
                                    <span className="legend-value">{item.porcentaje}%</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <ModalHistorialReportes 
                isOpen={showHistorialModal} 
                onClose={() => setShowHistorialModal(false)} 
            />
        </div>
    );
};

export default PanelReportesIngreso;
