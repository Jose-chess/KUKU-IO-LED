import React, { useState } from 'react';
import './PanelPrincipal.css';
import ModalGasto from './ModalGasto';

import iconNuevoGasto from '../assets/new-section.svg';

const MainContent = () => {
    const [modalAbierto, setModalAbierto] = useState(false);

    return (
        <main className="main-content">
            <header className="main-header">
                <h1 className="main-title no-select">Panel principal</h1>
                <button className="btn-registrar-gasto no-select" type="button" onClick={() => setModalAbierto(true)}>
                    <img src={iconNuevoGasto} alt="" className="btn-icon" />
                    <span>Registrar Gasto</span>
                </button>
            </header>

            <section className="kpi-grid">
                <div className="kpi-card">
                    <p className="kpi-label">Ingresos del día</p>
                    <h2 className="kpi-value">$0</h2>
                </div>
                <div className="kpi-card">
                    <p className="kpi-label">Ingresos mensuales</p>
                    <h2 className="kpi-value">$0</h2>
                </div>
                <div className="kpi-card">
                    <p className="kpi-label">Clientes registrados</p>
                    <h2 className="kpi-value">0</h2>
                </div>
                <div className="kpi-card">
                    <p className="kpi-label">Ventas registradas</p>
                    <h2 className="kpi-value">0</h2>
                </div>
            </section>

            <div className="details-grid">
                <div className="details-card chart-section">
                    <div className="chart-info">
                        <h3 className="details-subtitle">Ventas últimos 7 días</h3>
                        <h2 className="chart-total"></h2>
                    </div>
                    <div className="placeholder-chart">
                        <div className="chart-empty"></div>
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

                        <div className="table-row-empty"></div>
                    </div>
                </div>
            </div>

            <ModalGasto
                isOpen={modalAbierto}
                onClose={() => setModalAbierto(false)}
                onGuardar={(payload) => {
                    console.log('Gasto guardado:', payload);
                    return { success: true, data: payload };
                }}
            />
        </main>
    );
};

export default MainContent;

