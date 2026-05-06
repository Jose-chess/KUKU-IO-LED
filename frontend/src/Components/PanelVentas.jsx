import React, { useState, useEffect } from 'react';
import './PanelVentas.css';
import iconNuevaVenta from '../assets/new-section.svg';
import iconBuscar from '../assets/search.svg';
import iconSalir from '../assets/arrow-back-up.svg';
import iconConfirmar from '../assets/circle-check.svg';
import ModalExito from './ModalExito';
import ModalSeleccionCliente from './ModalSeleccionCliente';
import ModalSeleccionTipo from './ModalSeleccionTipo';
import ModalSeleccionDescuento from './ModalSeleccionDescuento';
import { useModalShake } from './useModalShake';
import ModalFacturacion from './ModalFacturacion';
import ModalErrorVentaVacia from './ModalErrorVentaVacia';
import ModalConfirmar from './ModalConfirmar';
import { fetchVentas, createVenta, fetchKpisVentas } from '../api/ventasApi';



const ModalNuevaVenta = ({ isOpen, onSalir, onFacturar }) => {

    const { isShaking, handleOverlayClick } = useModalShake();



    if (!isOpen) {

        return null;

    }



    return (
        <div className="nueva-venta-overlay" onClick={handleOverlayClick}>
            <div className={`nueva-venta-modal scale-up-center ${isShaking ? 'shake' : ''}`} onClick={(event) => event.stopPropagation()}>
                <div className="nueva-venta-content">
                    <h2 className="nueva-venta-title">Nueva Venta</h2>

                    <div className="nueva-venta-field">
                        <label>Buscar artículo</label>
                        <div className="nueva-venta-search-wrapper">
                            <img src={iconBuscar} alt="Buscar" className="nueva-venta-search-icon" />
                            <input type="text" placeholder="Buscar por nombre del artículo" className="nueva-venta-search-input" />
                        </div>
                    </div>

                    <div className="nueva-venta-table-wrapper">
                        <table className="nueva-venta-table">
                            <thead>
                                <tr>
                                    <th>Código</th>
                                    <th>Artículo</th>
                                    <th>Precio unitario</th>
                                </tr>
                            </thead>
                            <tbody></tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};


const PanelVentas = () => {
    // Estados UI
    const [ventas, setVentas] = useState([]);
    const [kpis, setKpis] = useState({
        totalVentas: 0,
        ingresoTotal: 0,
        ventasHoy: 0,
        ticketPromedio: 0,
        balancePendiente: 0
    });
    const [busqueda, setBusqueda] = useState('');
    const [showModalNuevaVenta, setShowModalNuevaVenta] = useState(false);
    const [showFacturacion, setShowFacturacion] = useState(false);
    const [ventaActual, setVentaActual] = useState(null);
    const [showExito, setShowExito] = useState(false);
    const [showErrorVentaVacia, setShowErrorVentaVacia] = useState(false);

    useEffect(() => {
        const loadData = async () => {
            try {
                const [ventasData, kpisData] = await Promise.all([
                    fetchVentas(),
                    fetchKpisVentas()
                ]);
                setVentas(ventasData);
                setKpis(kpisData);
            } catch (error) {
                console.error('Error al cargar datos de ventas:', error);
            }
        };
        loadData();
    }, []);

    // Datos vacíos hasta que el backend esté listo
    const ventasFiltradas = ventas;

    const formatMoney = (value) => {
        if (!value || isNaN(value)) return '$ 0';
        return `$ ${Number(value).toLocaleString('es-DO', { minimumFractionDigits: 0 })}`;
    };

    return (
        <div className="ventas-page">
            <div className="ventas-header">
                <h1 className="ventas-title">Ventas</h1>
                <button className="btn-nueva-venta" type="button" onClick={() => setShowModalNuevaVenta(true)}>
                    <img src={iconNuevaVenta} alt="" className="btn-nueva-venta-icon" />
                    Nueva Venta
                </button>
            </div>

            <div className="kpi-grid ventas-kpi-grid">
                <div className="kpi-card ventas-kpi-card"><p className="kpi-label">Ventas del día</p><h2 className="kpi-value">{kpis.ventasHoy}</h2></div>
                <div className="kpi-card ventas-kpi-card"><p className="kpi-label">Ventas de la semana</p><h2 className="kpi-value">0</h2></div>
                <div className="kpi-card ventas-kpi-card"><p className="kpi-label">Ventas del mes</p><h2 className="kpi-value">0</h2></div>
                <div className="kpi-card ventas-kpi-card"><p className="kpi-label">Cantidad de ventas</p><h2 className="kpi-value">0</h2></div>
            </div>

            <div className="ventas-table-card">
                <div className="ventas-table-controls">
                    <h3>Lista de ventas</h3>
                    <div className="ventas-search-wrapper">
                        <img src={iconBuscar} alt="Buscar" className="ventas-search-icon" />
                        <input
                            type="text"
                            placeholder="Buscar venta por nombre del cliente"
                            value={busqueda}
                            onChange={(event) => setBusqueda(event.target.value)}
                            className="ventas-search-input"
                        />
                    </div>
                </div>

                <div className="ventas-table-wrapper">
                    <table className="ventas-table">
                        <thead>
                            <tr>
                                <th>Código</th>
                                <th>Cliente</th>
                                <th>Condición</th>
                                <th>Método</th>
                                <th>Tipo</th>
                                <th>Descuento</th>
                                <th>Cantidad de productos</th>
                                <th>Total</th>
                                <th>Fecha</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ventasFiltradas.length === 0 ? (
                                <tr>
                                    <td className="table-row-empty-cell" colSpan={9}>
                                        No hay ventas para mostrar.
                                    </td>
                                </tr>
                            ) : (
                                ventasFiltradas.map((venta, index) => (
                                    <tr key={venta.id || index}>
                                        <td>{`VNT-${venta.id}`}</td>
                                        <td>{venta.clienteId || 'Cliente'}</td>
                                        <td>{venta.condicion || 'Contado'}</td>
                                        <td>{venta.metodoPago || '-'}</td>
                                        <td>{venta.tipoVenta || 'ConsumidorFinal'}</td>
                                        <td>0%</td>
                                        <td>0</td>
                                        <td>{formatMoney(venta.total)}</td>
                                        <td>{new Date(venta.fechaVenta).toLocaleDateString()}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>



            <ModalFacturacion
                isOpen={showFacturacion}
                venta={ventaActual}
                onVolver={() => {
                    setShowFacturacion(false);
                    setShowModalNuevaVenta(true);
                }}
                onConfirmarVenta={(datosFinales) => {
                    setVentas([...ventas, datosFinales]);
                    setShowFacturacion(false);
                    setShowExito(true);
                }}
            />

            <ModalExito
                isOpen={showExito}
                onClose={() => setShowExito(false)}
                title="Confirmado"
                subtitle="Venta facturada exitosamente!"
                buttonLabel="Salir"
            />

            <ModalErrorVentaVacia 
                isOpen={showErrorVentaVacia}
                onClose={() => setShowErrorVentaVacia(false)}
            />

        </div>

    );

};



export default PanelVentas;

