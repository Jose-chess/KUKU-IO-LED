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
// TODO: Importar API calls cuando el backend esté listo
// import { fetchVentas, createVenta } from '../api/ventasApi';



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

            />



            <ModalSeleccionCliente

                isOpen={showSeleccionCliente}

                onClose={handleCloseSeleccionCliente}

                clientes={[]}

                onSelect={(cliente) => setSelectedCliente(cliente.nombre || '')}

                position={modalPositionCliente}

            />



            <ModalSeleccionTipo

                isOpen={showSeleccionTipo}

                onClose={handleCloseSeleccionTipo}

                onSelect={(tipo) => {

                    setSelectedTipo(tipo.nombre || '');

                    if (tipo.id === 'por_mayor') {

                        const descuentoAuto = calcularDescuentoAutomatico(cantidadArticulos);

                        setSelectedDescuento(descuentoAuto);

                    }

                }}

                position={modalPositionTipo}

            />



            <ModalSeleccionDescuento

                isOpen={showSeleccionDescuento}

                onClose={handleCloseSeleccionDescuento}

                onSelect={(descuento) => setSelectedDescuento(descuento.porcentaje || '0')}

                position={modalPositionDescuento}

            />



            <ModalFacturacion

                key={showFacturacionModal}

                isOpen={showFacturacionModal}

                venta={ventaActual}

                onVolver={() => {

                    setShowFacturacionModal(false);

                    setShowNuevaVentaModal(true);

                }}

                onConfirmarVenta={(datosFinales) => {

                    setVentas([...ventas, datosFinales]);

                    setShowFacturacionModal(false);

                    setShowExitoModal(true);

                }}

            />



            <ModalExito

                isOpen={showExitoModal}

                onClose={() => setShowExitoModal(false)}

                title="Confirmado"

                subtitle="Venta facturada exitosamente!"

                buttonLabel="Salir"

            />



            <ModalErrorVentaVacia 

                isOpen={showErrorVentaVacia}

                onClose={() => setShowErrorVentaVacia(false)}

            />



            <ModalConfirmar

                isOpen={showConfirmSalir}

                onClose={() => {

                    setShowConfirmSalir(false);

                    setShowNuevaVentaModal(true);

                }}

                onConfirm={() => {

                    setShowConfirmSalir(false);

                    setShowNuevaVentaModal(false);

                    setShowFacturacionModal(false);

                }}

                mensaje="¿Está seguro de que desea salir?"

                salirLabel="Retroceder"

                confirmLabel="Confirmar"

            />



            <ModalConfirmar

                isOpen={showConfirmarFacturar}

                onClose={() => setShowConfirmarFacturar(false)}

                onConfirm={() => {

                    setShowConfirmarFacturar(false);

                    setShowNuevaVentaModal(false);

                    setShowFacturacionModal(true);

                }}

                mensaje="¿Está seguro de que desea procesar este registro?"

                salirLabel="Retroceder"

                confirmLabel="Confirmar"

            />

        </div>

    );

};



export default PanelVentas;

