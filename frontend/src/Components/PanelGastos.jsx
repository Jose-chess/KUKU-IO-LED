import React, { useState } from 'react';
import './PanelGastos.css';
import iconNew from '../assets/new-section.svg';
import iconFlecha from '../assets/chevron-down.svg';
import ModalGasto from './ModalGasto';
import ModalObservacion from './ModalObservacion';
// TODO: Importar API calls cuando el backend esté listo
// import { fetchGastos, createGasto } from '../api/gastosApi';

const PanelGastos = () => {
    // Estados UI
    const [mesSeleccionado, setMesSeleccionado] = useState('Todos');
    const [anioSeleccionado, setAnioSeleccionado] = useState('Todos');
    const [showMesDropdown, setShowMesDropdown] = useState(false);
    const [showAnioDropdown, setShowAnioDropdown] = useState(false);
    const [modalGastoAbierto, setModalGastoAbierto] = useState(false);
    const [showObservacionModal, setShowObservacionModal] = useState(false);
    const [observacionActual, setObservacionActual] = useState('');
    
    // Datos del backend (vacíos hasta integrar)
    const [gastos, setGastos] = useState([]);
    const [totalGastos, setTotalGastos] = useState(0);

    // TODO: useEffect para cargar datos desde backend
    // useEffect(() => {
    //     const loadData = async () => {
    //         const [gastosData, totalData] = await Promise.all([
    //             fetchGastos(mesSeleccionado, anioSeleccionado),
    //             fetchTotalGastos(mesSeleccionado, anioSeleccionado)
    //         ]);
    //         setGastos(gastosData);
    //         setTotalGastos(totalData);
    //     };
    //     loadData();
    // }, [mesSeleccionado, anioSeleccionado]);

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

    const handleDocumentClick = () => {
        setShowMesDropdown(false);
        setShowAnioDropdown(false);
    };

    React.useEffect(() => {
        document.addEventListener('click', handleDocumentClick);
        return () => document.removeEventListener('click', handleDocumentClick);
    }, []);

    const meses = ["Todos", "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    const anios = ["Todos", 2024, 2025, 2026];

    // TODO: El filtrado debe hacerse en el backend
    const gastosFiltrados = gastos;

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
                    <h2 className="kpi-value">${totalGastos.toLocaleString('es-DO')}</h2>
                </div>
                <div className="kpi-card gastos-kpi-card">
                    <p className="kpi-label">Total histórico</p>
                    <h2 className="kpi-value">$0</h2>
                </div>
            </div>

            <div className="gastos-table-card">
                <div className="gastos-table-controls">
                    <h3>Lista de gastos</h3>
                    <div className="gastos-filters">
                        <div className="filter-group">
                            <label>Mes:</label>
                            <div className="premium-dropdown" onClick={(e) => { e.stopPropagation(); setShowMesDropdown(!showMesDropdown); setShowAnioDropdown(false); }}>
                                <div className="dropdown-trigger">
                                    <span>{mesSeleccionado}</span>
                                    <img src={iconFlecha} alt="" className={`dropdown-arrow ${showMesDropdown ? 'open' : ''}`} />
                                </div>
                                {showMesDropdown && (
                                    <div className="dropdown-menu">
                                        {meses.map(m => (
                                            <div 
                                                key={m} 
                                                className={`dropdown-option ${mesSeleccionado === m ? 'selected' : ''}`}
                                                onClick={() => { setMesSeleccionado(m); setShowMesDropdown(false); }}
                                            >
                                                {m}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="filter-group">
                            <label>Año:</label>
                            <div className="premium-dropdown" onClick={(e) => { e.stopPropagation(); setShowAnioDropdown(!showAnioDropdown); setShowMesDropdown(false); }}>
                                <div className="dropdown-trigger">
                                    <span>{anioSeleccionado}</span>
                                    <img src={iconFlecha} alt="" className={`dropdown-arrow ${showAnioDropdown ? 'open' : ''}`} />
                                </div>
                                {showAnioDropdown && (
                                    <div className="dropdown-menu">
                                        {anios.map(a => (
                                            <div 
                                                key={a} 
                                                className={`dropdown-option ${anioSeleccionado === a.toString() ? 'selected' : ''}`}
                                                onClick={() => { setAnioSeleccionado(a.toString()); setShowAnioDropdown(false); }}
                                            >
                                                {a}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {(mesSeleccionado !== 'Todos' || anioSeleccionado !== 'Todos') && (
                            <button 
                                className="btn-clear-filters" 
                                onClick={() => { setMesSeleccionado('Todos'); setAnioSeleccionado('Todos'); }}
                            >
                                Limpiar
                            </button>
                        )}
                    </div>
                </div>

                <div className="gastos-table-wrapper">
                    <table className="gastos-table">
                        <thead>
                            <tr>
                                <th>Código</th>
                                <th>Descripción</th>
                                <th>Monto</th>
                                <th>Fecha</th>
                            </tr>
                        </thead>
                        <tbody>
                            {gastosFiltrados.length === 0 ? (
                                <tr>
                                    <td className="table-row-empty-cell" colSpan="4">
                                        No hay gastos para el periodo seleccionado.
                                    </td>
                                </tr>
                            ) : (
                                gastosFiltrados.map(gasto => (
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
