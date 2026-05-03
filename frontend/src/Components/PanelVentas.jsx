import React, { useState } from 'react';
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
import ModalBusqueda from './ModalBusqueda';
// TODO: Importar API calls cuando el backend esté listo
// import { fetchVentas, createVenta } from '../api/ventasApi';

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
    const [showBusquedaArticulos, setShowBusquedaArticulos] = useState(false);
    const [showModalTipo, setShowModalTipo] = useState(false);
    const [showModalDescuento, setShowModalDescuento] = useState(false);
    const [showFacturacion, setShowFacturacion] = useState(false);
    const [showConfirmar, setShowConfirmar] = useState(false);
    const [ventaActual, setVentaActual] = useState(null);
    const [showExito, setShowExito] = useState(false);
    const [showErrorVentaVacia, setShowErrorVentaVacia] = useState(false);
    const [articulosVenta, setArticulosVenta] = useState([]);

    // TODO: useEffect para cargar datos desde backend
    // useEffect(() => {
    //     const loadData = async () => {
    //         const [ventasData, kpisData] = await Promise.all([
    //             fetchVentas(busqueda),
    //             fetchKpisVentas()
    //         ]);
    //         setVentas(ventasData);
    //         setKpis(kpisData);
    //     };
    //     loadData();
    // }, [busqueda]);

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
                <button className="btn-nueva-venta" type="button" onClick={() => { 
                    setVentaActual(null);
                    setArticulosVenta([]);
                    setShowBusquedaArticulos(true);
                }}>
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
                                    <tr key={index}>
                                        <td>{venta.id || `V-${index}`}</td>
                                        <td>{venta.cliente}</td>
                                        <td>{venta.condicion}</td>
                                        <td>{venta.metodoPago}</td>
                                        <td>{venta.tipoVenta}</td>
                                        <td>{venta.descuento}%</td>
                                        <td>{venta.articulos?.length || 0}</td>
                                        <td>{formatMoney(venta.total)}</td>
                                        <td>{venta.fecha}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modales para Nueva Venta */}
            
            {/* 1. Modal de Búsqueda de Artículos */}
            {showBusquedaArticulos && (
                <ModalBusqueda
                    isOpen={showBusquedaArticulos}
                    onClose={() => setShowBusquedaArticulos(false)}
                    onSeleccionar={(articulos) => {
                        setArticulosVenta(articulos);
                        setShowBusquedaArticulos(false);
                        setShowFacturacion(true);
                    }}
                />
            )}

            {/* 2. Modal de Selección de Cliente */}
            {showModalNuevaVenta && (
                <ModalSeleccionCliente
                    isOpen={showModalNuevaVenta}
                    onClose={() => setShowModalNuevaVenta(false)}
                    onSelect={(cliente) => {
                        setVentaActual(prev => ({ ...prev, cliente }));
                        setShowModalNuevaVenta(false);
                    }}
                />
            )}

            {/* 3. Modal de Selección de Tipo de Venta */}
            {showModalTipo && (
                <ModalSeleccionTipo
                    isOpen={showModalTipo}
                    onClose={() => setShowModalTipo(false)}
                    onSelect={(tipo) => {
                        setVentaActual(prev => ({ ...prev, tipoVenta: tipo }));
                        setShowModalTipo(false);
                    }}
                />
            )}

            {/* 4. Modal de Selección de Descuento */}
            {showModalDescuento && (
                <ModalSeleccionDescuento
                    isOpen={showModalDescuento}
                    onClose={() => setShowModalDescuento(false)}
                    onSelect={(descuento) => {
                        setVentaActual(prev => ({ ...prev, descuento }));
                        setShowModalDescuento(false);
                    }}
                />
            )}

            {/* 5. Modal de Facturación */}
            {showFacturacion && (
                <ModalFacturacion
                    isOpen={showFacturacion}
                    onClose={() => setShowFacturacion(false)}
                    venta={{ ...ventaActual, articulos: articulosVenta }}
                    onVolver={() => {
                        setShowFacturacion(false);
                        setShowBusquedaArticulos(true);
                    }}
                    onConfirmarVenta={() => {
                        setShowFacturacion(false);
                        setShowConfirmar(true);
                    }}
                />
            )}

            {/* 6. Modal de Confirmación */}
            {showConfirmar && (
                <ModalConfirmar
                    isOpen={showConfirmar}
                    onClose={() => setShowConfirmar(false)}
                    onConfirmar={() => {
                        setShowConfirmar(false);
                        setShowExito(true);
                    }}
                    title="Confirmar Venta"
                    mensaje="¿Está seguro de que desea procesar esta venta?"
                />
            )}

            {showExito && (
                <ModalExito
                    isOpen={showExito}
                    onClose={() => setShowExito(false)}
                    title="Éxito"
                    subtitle="Venta procesada correctamente"
                />
            )}

            {showErrorVentaVacia && (
                <ModalErrorVentaVacia
                    isOpen={showErrorVentaVacia}
                    onClose={() => setShowErrorVentaVacia(false)}
                />
            )}
        </div>
    );
};

export default PanelVentas;
