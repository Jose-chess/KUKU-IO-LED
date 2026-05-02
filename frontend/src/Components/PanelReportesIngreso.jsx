import React, { useState } from 'react';
import './PanelReportesIngreso.css';
import iconFlecha from '../assets/chevron-down.svg';
import iconPDF from '../assets/printer.svg';

const PanelReportesIngreso = () => {
    const [periodoSeleccionado, setPeriodoSeleccionado] = useState('Semana 2 de Abril');
    const [showPeriodoDropdown, setShowPeriodoDropdown] = useState(false);

    const periodos = [
        'Semana 1 de Abril',
        'Semana 2 de Abril', 
        'Semana 3 de Abril',
        'Semana 4 de Abril',
        'Abril 2026',
        'Marzo 2026',
        'Febrero 2026',
        'Enero 2026'
    ];

    // Datos del reporte semanal
    const datosReporte = {
        tipo: 'REPORTE SEMANAL',
        semana: '2 del mes de Abril',
        anio: '2026',
        resumen: 'Durante la semana analizada se registró una actividad constante en el sistema, destacándose un incremento en las ventas hacia el final de la semana.',
        dias: [
            { dia: 'Lunes', clientes: 3, articulos: 12, ganancias: 20640 },
            { dia: 'Martes', clientes: 5, articulos: 18, ganancias: 30960 },
            { dia: 'Miércoles', clientes: 4, articulos: 15, ganancias: 25800 },
            { dia: 'Jueves', clientes: 6, articulos: 22, ganancias: 37840 },
            { dia: 'Viernes', clientes: 8, articulos: 30, ganancias: 51600 },
            { dia: 'Sábado', clientes: 10, articulos: 40, ganancias: 68800 },
            { dia: 'Domingo', clientes: 7, articulos: 25, ganancias: 43000 },
        ],
        totalClientes: 43,
        totalArticulos: 162,
        totalGanancias: 278640,
        productoTop: 'KUKU-IO MINI color blanco amarillo'
    };

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
                <h1 className="reportes-title">Reportes de Ingresos</h1>
                <div className="reportes-controls">
                    <div className="periodo-selector" onClick={(e) => { e.stopPropagation(); setShowPeriodoDropdown(!showPeriodoDropdown); }}>
                        <span className="selector-label">Seleccione el rango de tiempo</span>
                        <img src={iconFlecha} alt="" className={`selector-arrow ${showPeriodoDropdown ? 'open' : ''}`} />
                        {showPeriodoDropdown && (
                            <div className="dropdown-menu selector-dropdown">
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

                    <button className="btn-pdf" title="Generar PDF">
                        <img src={iconPDF} alt="PDF" />
                    </button>
                </div>
            </div>

            {/* Reporte Content */}
            <div className="reporte-documento">
                <div className="reporte-tipo">{datosReporte.tipo}</div>
                <div className="reporte-info">
                    <p><strong>Semana:</strong> {datosReporte.semana}</p>
                    <p><strong>Año:</strong> {datosReporte.anio}</p>
                </div>

                <div className="reporte-resumen">
                    <p><strong>Resumen general:</strong> {datosReporte.resumen}</p>
                </div>

                <div className="reporte-resultados">
                    <p><strong>Resultados:</strong></p>
                    <p><strong>Comportamiento diario:</strong></p>
                    <ul className="lista-dias">
                        {datosReporte.dias.map((dia, index) => (
                            <li key={index}>
                                • <strong>{dia.dia}:</strong> {dia.clientes} clientes registrados, {dia.articulos} artículos vendidos, {formatearDinero(dia.ganancias)} en ganancias.
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="reporte-total">
                    <p>
                        Para un total de <strong>{datosReporte.totalClientes} clientes</strong> registrados, <strong>{datosReporte.totalArticulos} artículos vendidos</strong> y con un total en ganancias de <strong>{formatearDinero(datosReporte.totalGanancias)}</strong> en la semana. 
                        Siendo el <strong>{datosReporte.productoTop}</strong> más vendido.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PanelReportesIngreso;
