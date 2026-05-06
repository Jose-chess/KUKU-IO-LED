import React, { useState, useEffect } from 'react';
import './PanelVentas.css';
import iconNuevaVenta from '../assets/new-section.svg';
import iconBuscar from '../assets/search.svg';
import ModalExito from './ModalExito';
import ModalSeleccionCliente from './ModalSeleccionCliente';
import ModalSeleccionTipo from './ModalSeleccionTipo';
import ModalSeleccionDescuento from './ModalSeleccionDescuento';
import ModalFacturacion from './ModalFacturacion';
import ModalErrorVentaVacia from './ModalErrorVentaVacia';
import ModalConfirmar from './ModalConfirmar';
import ModalNuevaVenta from './ModalNuevaVenta';

const PanelVentas = () => {
    const [ventas, setVentas] = useState([]);
    const [kpis, setKpis] = useState({ totalVentas: 0, ingresoTotal: 0, ventasHoy: 0, ticketPromedio: 0, balancePendiente: 0 });
    const [busqueda, setBusqueda] = useState('');
    const [showNuevaVentaModal, setShowNuevaVentaModal] = useState(false);
    const [showSeleccionCliente, setShowSeleccionCliente] = useState(false);
    const [selectedCliente, setSelectedCliente] = useState('');
    const [modalPositionCliente, setModalPositionCliente] = useState({ top: 0, left: 0 });
    const [showSeleccionTipo, setShowSeleccionTipo] = useState(false);
    const [selectedTipo, setSelectedTipo] = useState('');
    const [modalPositionTipo, setModalPositionTipo] = useState({ top: 0, left: 0 });
    const [showSeleccionDescuento, setShowSeleccionDescuento] = useState(false);
    const [selectedDescuento, setSelectedDescuento] = useState('0');
    const [modalPositionDescuento, setModalPositionDescuento] = useState({ top: 0, left: 0 });
    const [cantidadArticulos, setCantidadArticulos] = useState(0);
    const [showFacturacionModal, setShowFacturacionModal] = useState(false);
    const [showExitoModal, setShowExitoModal] = useState(false);
    const [showErrorVentaVacia, setShowErrorVentaVacia] = useState(false);
    const [showConfirmSalir, setShowConfirmSalir] = useState(false);
    const [showConfirmarFacturar, setShowConfirmarFacturar] = useState(false);
    const [ventaActual, setVentaActual] = useState(null);

    const calcularDescuentoAutomatico = (cantidad) => cantidad > 10 ? '10' : '0';
    const ventasFiltradas = ventas;
    const formatMoney = (value) => {
        if (!value || isNaN(value)) return '$ 0';
        return `$ ${Number(value).toLocaleString('es-DO', { minimumFractionDigits: 0 })}`;
    };

    return (
        <div className="ventas-page">
            <div className="ventas-header">
                <h1 className="ventas-title">Ventas</h1>
                <button className="btn-nueva-venta" type="button" onClick={() => setShowNuevaVentaModal(true)}>
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
                            onChange={(e) => setBusqueda(e.target.value)}
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
                                <tr><td className="table-row-empty-cell" colSpan={9}>No hay ventas para mostrar.</td></tr>
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
            <ModalSeleccionCliente
                isOpen={showSeleccionCliente}
                onClose={() => setShowSeleccionCliente(false)}
                clientes={[]}
                onSelect={(cliente) => setSelectedCliente(cliente.nombre || '')}
                position={modalPositionCliente}
            />
            <ModalSeleccionTipo
                isOpen={showSeleccionTipo}
                onClose={() => setShowSeleccionTipo(false)}
                onSelect={(tipo) => {
                    setSelectedTipo(tipo.nombre || '');
                    if (tipo.id === 'por_mayor') setSelectedDescuento(calcularDescuentoAutomatico(cantidadArticulos));
                }}
                position={modalPositionTipo}
            />
            <ModalSeleccionDescuento
                isOpen={showSeleccionDescuento}
                onClose={() => setShowSeleccionDescuento(false)}
                onSelect={(descuento) => setSelectedDescuento(descuento.porcentaje || '0')}
                position={modalPositionDescuento}
            />
            <ModalFacturacion
                key={String(showFacturacionModal)}
                isOpen={showFacturacionModal}
                venta={ventaActual}
                onVolver={() => { setShowFacturacionModal(false); setShowNuevaVentaModal(true); }}
                onConfirmarVenta={(datosFinales) => { setVentas([...ventas, datosFinales]); setShowFacturacionModal(false); setShowExitoModal(true); }}
            />
            <ModalExito
                isOpen={showExitoModal}
                onClose={() => setShowExitoModal(false)}
                title="Confirmado"
                subtitle="Venta facturada exitosamente!"
                buttonLabel="Salir"
            />
            <ModalNuevaVenta
                isOpen={showNuevaVentaModal}
                onSalir={() => setShowNuevaVentaModal(false)}
                onFacturar={(datos) => {
                    setVentaActual(datos);
                    setShowNuevaVentaModal(false);
                    setShowNuevaVentaModal(true);
                }}
            />
            <ModalErrorVentaVacia
                isOpen={showErrorVentaVacia}
                onClose={() => setShowErrorVentaVacia(false)}
            />
            <ModalConfirmar
                isOpen={showConfirmSalir}
                onClose={() => { setShowConfirmSalir(false); setShowNuevaVentaModal(true); }}
                onConfirm={() => { setShowConfirmSalir(false); setShowNuevaVentaModal(false); setShowFacturacionModal(false); }}
                mensaje="¿Está seguro de que desea salir?"
                salirLabel="Retroceder"
                confirmLabel="Confirmar"
            />
            <ModalConfirmar
                isOpen={showConfirmarFacturar}
                onClose={() => setShowConfirmarFacturar(false)}
                onConfirm={() => { setShowConfirmarFacturar(false); setShowNuevaVentaModal(false); setShowNuevaVentaModal(true); }}
                mensaje="¿Está seguro de que desea procesar este registro?"
                salirLabel="Retroceder"
                confirmLabel="Confirmar"
            />
        </div>
    );
};

export default PanelVentas;
