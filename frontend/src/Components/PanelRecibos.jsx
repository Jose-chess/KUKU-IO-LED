import React, { useState } from 'react';
import './PanelRecibos.css';
import iconBuscar from '../assets/search.svg';
import iconOjo from '../assets/eye.svg';
import ReciboPagoModal from './ReciboPagoModal';
import ReciboAbonoModal from './ReciboAbonoModal';
// TODO: Importar API calls cuando el backend esté listo
// import { fetchRecibos } from '../api/recibosApi';

const PanelRecibos = () => {
    const [busquedaRecibo, setBusquedaRecibo] = useState('');

    // Datos del backend (vacíos hasta integrar)
    const [recibos, setRecibos] = useState([]);
    const [kpis, setKpis] = useState({
        recaudacionMensual: 0,
        recibosPagos: 0,
        recibosAbonos: 0,
        recibosTotales: 0
    });

    // TODO: useEffect para cargar datos desde backend
    // useEffect(() => {
    //     const loadData = async () => {
    //         const [recibosData, kpisData] = await Promise.all([
    //             fetchRecibos(busquedaRecibo),
    //             fetchKpisRecibos()
    //         ]);
    //         setRecibos(recibosData);
    //         setKpis(kpisData);
    //     };
    //     loadData();
    // }, [busquedaRecibo]);

    const formatMoney = (value) => {
        if (!value || isNaN(value)) return '$ 0';
        return `$ ${Number(value).toLocaleString('es-DO', { minimumFractionDigits: 0 })}`;
    };

    const [reciboSeleccionado, setReciboSeleccionado] = useState(null);
    const [mostrarModal, setMostrarModal] = useState(false);

    // TODO: El filtrado debe hacerse en el backend
    const recibosFiltrados = recibos;

    return (
        <div className="recibos-page">
            <div className="recibos-header">
                <h1 className="recibos-title">Recibos</h1>
            </div>

            <div className="kpi-grid recibos-kpi-grid">
                <div className="kpi-card recibos-kpi-card">
                    <p className="kpi-label">Recaudación mensual</p>
                    <h2 className="kpi-value">{formatMoney(kpis.recaudacionMensual)}</h2>
                </div>
                <div className="kpi-card recibos-kpi-card">
                    <p className="kpi-label">Recibos de pagos</p>
                    <h2 className="kpi-value">{kpis.recibosPagos}</h2>
                </div>
                <div className="kpi-card recibos-kpi-card">
                    <p className="kpi-label">Recibos de abonos</p>
                    <h2 className="kpi-value">{kpis.recibosAbonos}</h2>
                </div>
                <div className="kpi-card recibos-kpi-card">
                    <p className="kpi-label">Recibos totales</p>
                    <h2 className="kpi-value">{kpis.recibosTotales}</h2>
                </div>
            </div>

            <div className="recibos-table-card">
                <div className="recibos-table-controls">
                    <h3>Lista de recibos</h3>

                    <div className="recibos-search-wrapper">
                        <img src={iconBuscar} alt="Buscar" className="recibos-search-icon" />
                        <input
                            type="text"
                            placeholder="Ingrese el número de recibo o nombre del cliente"
                            value={busquedaRecibo}
                            onChange={(event) => setBusquedaRecibo(event.target.value)}
                            className="recibos-search-input"
                        />
                    </div>
                </div>

                <div className="recibos-table-wrapper">
                    <table className="recibos-table">
                        <thead>
                            <tr>
                                <th>Código</th>
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
                        data={reciboSeleccionado}
                        onClose={() => setMostrarModal(false)}
                    />
                ) : (
                    <ReciboPagoModal 
                        data={reciboSeleccionado}
                        onClose={() => setMostrarModal(false)}
                    />
                )
            )}
        </div>
    );
};

export default PanelRecibos;
