import React, { useState, useEffect, useRef } from 'react';

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
                                    <th>Cantidad</th>
                                    <th>Acción</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="table-row-empty-cell" colSpan={5}>
                                        No hay artículos agregados.
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="nueva-venta-footer">
                    <div className="nueva-venta-meta-izquierda">
                        <div className="nueva-venta-meta">
                            <span>Artículos totales:</span>
                            <strong>0</strong>
                        </div>
                        <div className="nueva-venta-meta">
                            <span>Subtotal:</span>
                            <strong className="subtotal-verde">$ 0</strong>
                        </div>
                    </div>

                    <div className="nueva-venta-botones-derecha">
                        <button className="btn-confirm-salir btn-confirm-red" type="button" onClick={onSalir}>
                            <img src={iconSalir} alt="" className="confirm-btn-icon" />
                            Salir
                        </button>
                        <button className="btn-confirm-aceptar btn-confirm-green" type="button" onClick={onFacturar}>
                            <img src={iconConfirmar} alt="" className="confirm-btn-icon" />
                            Facturar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

};



const PanelVentas = () => {

    const [ventas, setVentas] = useState([]);

    const [ventaActual, setVentaActual] = useState({

        articulos: [

            { codigo: 'A001', nombre: 'Panel LED', precio: 1000, cant: 2 }

        ],

        descuento: 0,

        condicion: '',

        metodoPago: '',

        cliente: '',

        tipoVenta: '',

        fecha: new Date().toLocaleDateString(),

    });

    const [showNuevaVentaModal, setShowNuevaVentaModal] = useState(false);

    const [showFacturacionModal, setShowFacturacionModal] = useState(false);

    const [showConfirmSalir, setShowConfirmSalir] = useState(false);

    const [showConfirmarFacturar, setShowConfirmarFacturar] = useState(false);

    const [showExitoModal, setShowExitoModal] = useState(false);

    const [showErrorVentaVacia, setShowErrorVentaVacia] = useState(false);

    const [showSeleccionCliente, setShowSeleccionCliente] = useState(false);

    const [showSeleccionTipo, setShowSeleccionTipo] = useState(false);

    const [showSeleccionDescuento, setShowSeleccionDescuento] = useState(false);

    const [modalPositionCliente, setModalPositionCliente] = useState({ top: 0, left: 0, width: 0 });

    const [modalPositionTipo, setModalPositionTipo] = useState({ top: 0, left: 0, width: 0 });

    const [modalPositionDescuento, setModalPositionDescuento] = useState({ top: 0, left: 0, width: 0 });

    const [selectedTipo, setSelectedTipo] = useState('');

    const [selectedCliente, setSelectedCliente] = useState('');

    const [selectedDescuento, setSelectedDescuento] = useState('');

    const [cantidadArticulos, setCantidadArticulos] = useState(0);

    const [isDescuentoManual, setIsDescuentoManual] = useState(false);

    const [busquedaVenta, setBusquedaVenta] = useState('');

    const inputClienteRef = useRef(null);

    const inputTipoRef = useRef(null);

    const inputDescuentoRef = useRef(null);



    const ventasFiltradas = ventas.filter(v => {

        if (!busquedaVenta) return true;

        const termino = busquedaVenta.toLowerCase();

        return v.cliente && v.cliente.toLowerCase().includes(termino);

    });







    const handleOpenSeleccionCliente = () => {

        if (showSeleccionCliente) {

            setShowSeleccionCliente(false);

        } else {

            const rect = inputClienteRef.current.getBoundingClientRect();

            setModalPositionCliente({ top: rect.bottom + window.scrollY + 8, left: rect.left + window.scrollX, width: rect.width });

            setShowSeleccionCliente(true);

        }

    };



    const handleOpenSeleccionTipo = () => {

        if (showSeleccionTipo) {

            setShowSeleccionTipo(false);

        } else {

            const rect = inputTipoRef.current.getBoundingClientRect();

            setModalPositionTipo({ top: rect.bottom + window.scrollY + 8, left: rect.left + window.scrollX, width: rect.width });

            setShowSeleccionTipo(true);

        }

    };



    const handleOpenSeleccionDescuento = () => {

        if (showSeleccionDescuento) {

            setShowSeleccionDescuento(false);

        } else {

            const rect = inputDescuentoRef.current.getBoundingClientRect();

            setModalPositionDescuento({ top: rect.bottom + window.scrollY + 8, left: rect.left + window.scrollX, width: rect.width });

            setShowSeleccionDescuento(true);

        }

    };



    const handleCloseSeleccionCliente = () => setShowSeleccionCliente(false);

    const handleCloseSeleccionTipo = () => setShowSeleccionTipo(false);

    const handleCloseSeleccionDescuento = () => setShowSeleccionDescuento(false);



    const calcularDescuentoAutomatico = (cantidad) => {

        if (cantidad >= 10) return '30%';

        else if (cantidad >= 5) return '20%';

        return '0';

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

                <div className="kpi-card ventas-kpi-card"><p className="kpi-label">Ventas del día</p><h2 className="kpi-value">0</h2></div>

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
                            value={busquedaVenta}
                            onChange={(event) => setBusquedaVenta(event.target.value)}
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

                                        {busquedaVenta ? 'No se encontraron ventas que coincidan con la búsqueda.' : 'No hay ventas para mostrar.'}

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

                                        <td>{venta.total}</td>

                                        <td>{venta.fecha}</td>

                                    </tr>

                                ))

                            )}

                        </tbody>

                    </table>

                </div>

            </div>



            <ModalNuevaVenta

                isOpen={showNuevaVentaModal && !showConfirmSalir && !showConfirmarFacturar}

                onSalir={() => {

                    setShowNuevaVentaModal(false);

                    setShowConfirmSalir(true);

                }}

                onFacturar={() => {

                    if (ventaActual.articulos.length === 0) {

                        setShowErrorVentaVacia(true);

                    } else {

                        setShowConfirmarFacturar(true);

                    }

                }}

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

                mensaje="¿Estás seguro que desea salir?"

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

                mensaje="¿Estás seguro de que deseas procesar este registro?"

                salirLabel="Retroceder"

                confirmLabel="Confirmar"

            />

        </div>

    );

};



export default PanelVentas;

