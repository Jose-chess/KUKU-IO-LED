import React, { useState } from 'react';
import './PanelGastos.css';
import iconNew from '../assets/new-section.svg';
import iconSearch from '../assets/search.svg';
import ModalGasto from './ModalGasto';
import ModalObservacion from './ModalObservacion';

const PanelGastos = () => {
    const [busqueda, setBusqueda] = useState('');
    const [modalGastoAbierto, setModalGastoAbierto] = useState(false);
    const [showObservacionModal, setShowObservacionModal] = useState(false);
    const [observacionActual, setObservacionActual] = useState('');
    const [gastos] = useState([
        {
            id: 1,
            descripcion: 'Pago de factura de electricidad - Oficina Principal Marzo 2024',
            monto: 4500,
            fecha: '29/04/2026'
        },
        {
            id: 2,
            descripcion: 'Compra de suministros de limpieza y papelería para recepción',
            monto: 1250,
            fecha: '28/04/2026'
        },
        {
            id: 3,
            descripcion: 'Mantenimiento preventivo de aire acondicionado (Sala de juntas)',
            monto: 3000,
            fecha: '27/04/2026'
        }
    ]); // Mock data

    const handleOpenModal = () => {
        setModalGastoAbierto(true);
    };

    const handleCloseModal = () => {
        setModalGastoAbierto(false);
    };

    const handleGuardarGasto = (payload) => {
        console.log('Gasto guardado:', payload);
        return { success: true, data: payload };
    };
    
    const handleAbrirObs = (contenido) => {
        setObservacionActual(contenido || 'Sin descripción registrada.');
        setShowObservacionModal(true);
    };

    const handleCerrarObs = () => {
        setShowObservacionModal(false);
        setObservacionActual('');
    };

    return (
        <div className="gastos-page">
            <div className="gastos-header">
                <h1 className="gastos-title">Gastos</h1>
                <button className="btn-nuevo-gasto" type="button" onClick={handleOpenModal}>
                    <img src={iconNew} alt="" className="btn-nuevo-gasto-icon" />
                    Registrar Gasto
                </button>
            </div>

            <div className="kpi-grid gastos-kpi-grid">
                <div className="kpi-card gastos-kpi-card">
                    <p className="kpi-label">Gastos del día</p>
                    <h2 className="kpi-value">$0</h2>
                </div>
                <div className="kpi-card gastos-kpi-card">
                    <p className="kpi-label">Gastos de la semana</p>
                    <h2 className="kpi-value">$0</h2>
                </div>
                <div className="kpi-card gastos-kpi-card">
                    <p className="kpi-label">Gastos del mes</p>
                    <h2 className="kpi-value">$0</h2>
                </div>
                <div className="kpi-card gastos-kpi-card">
                    <p className="kpi-label">Total histórico</p>
                    <h2 className="kpi-value">$0</h2>
                </div>
            </div>

            <div className="gastos-table-card">
                <div className="gastos-table-controls">
                    <h3>Lista de gastos</h3>
                    <div className="search-box">
                        <div className="search-input-wrapper">
                            <img src={iconSearch} alt="Buscar" className="search-icon" />
                            <input
                                type="text"
                                placeholder="Buscar por descripción..."
                                value={busqueda}
                                onChange={(e) => setBusqueda(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                <div className="gastos-table-wrapper">
                    <table className="gastos-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Descripción</th>
                                <th>Monto</th>
                                <th>Fecha</th>
                            </tr>
                        </thead>
                        <tbody>
                            {gastos.length === 0 ? (
                                <tr>
                                    <td className="table-row-empty-cell" colSpan="4">
                                        No hay gastos para mostrar.
                                    </td>
                                </tr>
                            ) : (
                                gastos.filter(g => g.descripcion.toLowerCase().includes(busqueda.toLowerCase())).map(gasto => (
                                    <tr key={gasto.id}>
                                        <td>#{gasto.id}</td>
                                        <td 
                                            className="cell-observacion"
                                            onClick={() => handleAbrirObs(gasto.descripcion)}
                                        >
                                            {gasto.descripcion}
                                        </td>
                                        <td>RD$ {gasto.monto.toLocaleString()}</td>
                                        <td>{gasto.fecha}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <ModalGasto
                isOpen={modalGastoAbierto}
                onClose={handleCloseModal}
                onGuardar={handleGuardarGasto}
            />

            <ModalObservacion
                isOpen={showObservacionModal}
                onClose={handleCerrarObs}
                contenido={observacionActual}
                titulo="Descripción:"
            />
        </div>
    );
};

export default PanelGastos;
