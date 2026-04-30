import React, { useState, useEffect } from 'react';
import React, { useState, useRef } from 'react';
import './PanelVentas.css';
import iconNuevaVenta from '../assets/new-section.svg';
import iconBuscar from '../assets/search.svg';
import iconSalir from '../assets/arrow-back-up.svg';
import iconConfirmar from '../assets/circle-check.svg';
import iconFlecha from '../assets/chevron-down.svg';
import ModalExito from './ModalExito';
import ModalVentaEncontrada from './ModalVentaEncontrada';
import ModalVentaNoEncontrada from './ModalVentaNoEncontrada';
import ModalSeleccionCliente from './ModalSeleccionCliente';
import ModalSeleccionTipo from './ModalSeleccionTipo';
import ModalSeleccionDescuento from './ModalSeleccionDescuento';
import { useModalShake } from './useModalShake';

const ConfirmarVentaModal = ({ isOpen, onClose, onConfirm, message, salirLabel, confirmLabel }) => {
    const { isShaking, handleOverlayClick } = useModalShake();

    if (!isOpen) {
        return null;
    }

    return (
        <div className="confirm-overlay" onClick={handleOverlayClick}>
            <div
                className={`confirm-container confirm-modal scale-up-center ${isShaking ? 'shake' : ''}`}
                onClick={(event) => event.stopPropagation()}
            >
                <h1 className="confirm-title confirm-header">Confirmar</h1>

                <div className="confirm-body-card confirm-message-container">
                    <p className="confirm-text confirm-message-text">{message}</p>
                    <div className="confirm-line confirm-decorative-line" />
                </div>

                <div className="confirm-footer confirm-actions">
                    <button className="btn-confirm-salir btn-confirm-red" type="button" onClick={onClose}>
                        <img src={iconSalir} alt="" className="confirm-btn-icon" />
                        {salirLabel}
                    </button>
                    <button className="btn-confirm-aceptar btn-confirm-green" type="button" onClick={onConfirm}>
                        <img src={iconConfirmar} alt="" className="confirm-btn-icon" />
                        {confirmLabel}
                    </button>
                </div>
            </div>
        </div>
    );
};

const ModalNuevaVenta = ({ isOpen, onSalir, onFacturar }) => {
    const { isShaking, handleOverlayClick } = useModalShake();

    if (!isOpen) {
        return null;
    }

    return (
        <div className="nueva-venta-overlay" onClick={handleOverlayClick}>
            <div className={`nueva-venta-modal scale-up-center ${isShaking ? 'shake' : ''}`} onClick={(event) => event.stopPropagation()}>
                <h2 className="nueva-venta-title">Nueva Venta</h2>

                <div className="nueva-venta-field">
                    <label>Buscar artículo</label>
                    <div className="nueva-venta-search-input-wrapper">
                        <img src={iconBuscar} alt="Buscar" className="nueva-venta-search-icon" />
                        <input type="text" placeholder="Buscar por nombre" />
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

                <div className="nueva-venta-footer">
                    <div className="nueva-venta-meta">
                        <span>Artículos totales:</span>
                        <strong>0</strong>
                    </div>
                    <div className="nueva-venta-meta">
                        <span>Subtotal:</span>
                        <strong className="subtotal-verde">$ 0</strong>
                    </div>

                    <div className="nueva-venta-actions">
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

const ModalFacturacion = ({ isOpen, onVolver, onConfirmarVenta, onOpenSeleccionTipo, onOpenSeleccionCliente, inputClienteRef, inputTipoRef, showSeleccionCliente, showSeleccionTipo, selectedTipo, selectedCliente, selectedDescuento, isDescuentoManual, setSelectedDescuento }) => {
    const { isShaking, handleOverlayClick } = useModalShake();

    if (!isOpen) return null;

    const subtotal = articulos.reduce((sum, item) => sum + (item.cant * item.precio), 0);
    const montoDescuento = subtotal * (descuento / 100);
    const subtotalConDescuento = subtotal - montoDescuento;
    const itbis = subtotalConDescuento * 0.18;
    const totalFinal = subtotalConDescuento + itbis;

    const manejarConfirmar = () => {
        if (!condicion) { shake(); return; }
        if (condicion === 'Contado' && !metodoPago) { shake(); return; }
        onConfirmarVenta();
    };

    const closeAllDropdowns = () => {
        setOpenCondicion(false);
        setOpenTipoVenta(false);
        setOpenMetodo(false);
        setOpenCliente(false);
    };

    return (
        <div className="facturacion-overlay" onClick={handleOverlayClick}>
            <div
                className={`facturacion-modal scale-up-center ${isShaking ? 'shake' : ''}`}
                onClick={(event) => {
                    event.stopPropagation();
                    closeAllDropdowns();
                }}
            >
                <h2 className="facturacion-title">Facturación</h2>

                <section className="facturacion-bloque">
                    <h3 className="facturacion-subtitle">Facturar Artículos</h3>
                    <div className="facturacion-line" />

                    <div className="facturacion-grid">
                        <div className="facturacion-item" onClick={(e) => e.stopPropagation()}>
                            <label>Número de Factura:</label>
                            <input value="B02000000XXX" disabled readOnly />
                        </div>
                        <div className="facturacion-item">
                            <label>Tipo:</label>
                            <div className="facturacion-input-with-icon" ref={inputTipoRef} onClick={onOpenSeleccionTipo}>
                                <input value={selectedTipo} placeholder="Seleccione el tipo" disabled readOnly style={{ pointerEvents: 'none' }} />
                                <img src={iconFlecha} alt="" className="facturacion-arrow-icon" style={{ transform: showSeleccionTipo ? 'translateY(-50%) rotate(180deg)' : 'translateY(-50%)' }} />
                            </div>
                        </div>

                        {/* Dropdown Tipo de Venta */}
                        <div className="facturacion-item" onClick={(e) => e.stopPropagation()}>
                            <label>Tipo de venta:</label>
                            <div className="facturacion-dropdown-wrap">
                                <div className="facturacion-dropdown-trigger" onClick={(e) => { e.stopPropagation(); closeAllDropdowns(); setOpenTipoVenta(!openTipoVenta); }}>
                                    {tipoVenta}
                                    <img src={iconChevron} alt="" className={`facturacion-dropdown-icon ${openTipoVenta ? 'open' : ''}`} />
                                </div>
                                {openTipoVenta && (
                                    <div className="facturacion-dropdown-menu">
                                        <div className={`facturacion-dropdown-option ${tipoVenta === 'Consumidor final' ? 'selected' : ''}`}
                                            onClick={() => { setTipoVenta('Consumidor final'); closeAllDropdowns(); }}>
                                            Consumidor final
                                        </div>
                                        <div className={`facturacion-dropdown-option ${tipoVenta === 'Venta al por mayor' ? 'selected' : ''}`}
                                            onClick={() => { setTipoVenta('Venta al por mayor'); closeAllDropdowns(); }}>
                                            Venta al por mayor
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="facturacion-item">
                            <label>Descuento:</label>
                            <div className="facturacion-input-with-icon">
                                <input 
                                    value={selectedDescuento} 
                                    onChange={(e) => isDescuentoManual && setSelectedDescuento(e.target.value)}
                                    placeholder={isDescuentoManual ? "Ingrese descuento" : "-"}
                                    readOnly={!isDescuentoManual}
                                    style={{ backgroundColor: isDescuentoManual ? '#f3f4f6' : '#e5e7eb' }}
                                />
                            </div>
                        </div>

                        <div className="facturacion-item">
                            <label>Cliente:</label>
                            <div className="facturacion-input-with-icon" ref={inputClienteRef} onClick={onOpenSeleccionCliente}>
                                <input value={selectedCliente} placeholder="Seleccione un cliente" disabled readOnly style={{ pointerEvents: 'none' }} />
                                <img src={iconFlecha} alt="" className="facturacion-arrow-icon" style={{ transform: showSeleccionCliente ? 'translateY(-50%) rotate(180deg)' : 'translateY(-50%)' }} />
                            </div>
                        </div>

                        {/* Dropdown Cliente */}
                        <div className="facturacion-item" onClick={(e) => e.stopPropagation()}>
                            <label>Cliente:</label>
                            <div className="facturacion-dropdown-wrap">
                                <div className="facturacion-dropdown-trigger" onClick={(e) => { e.stopPropagation(); closeAllDropdowns(); setOpenCliente(!openCliente); }}>
                                    {cliente}
                                    <img src={iconChevron} alt="" className={`facturacion-dropdown-icon ${openCliente ? 'open' : ''}`} />
                                </div>
                                {openCliente && (
                                    <div className="facturacion-dropdown-menu">
                                        <div className={`facturacion-dropdown-option ${cliente === 'José Manuel Guerrero' ? 'selected' : ''}`}
                                            onClick={() => { setCliente('José Manuel Guerrero'); closeAllDropdowns(); }}>
                                            José Manuel Guerrero
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Dropdown Método de Pago (Condicional) */}
                        {condicion === 'Contado' && (
                            <div className="facturacion-item" onClick={(e) => e.stopPropagation()}>
                                <label>Método de pago:</label>
                                <div className="facturacion-dropdown-wrap">
                                    <div className="facturacion-dropdown-trigger" onClick={(e) => { e.stopPropagation(); closeAllDropdowns(); setOpenMetodo(!openMetodo); }}>
                                        {metodoPago || 'Seleccione método'}
                                        <img src={iconChevron} alt="" className={`facturacion-dropdown-icon ${openMetodo ? 'open' : ''}`} />
                                    </div>
                                    {openMetodo && (
                                        <div className="facturacion-dropdown-menu">
                                            <div className={`facturacion-dropdown-option ${metodoPago === 'Efectivo' ? 'selected' : ''}`}
                                                onClick={() => { setMetodoPago('Efectivo'); closeAllDropdowns(); }}>
                                                Efectivo
                                            </div>
                                            <div className={`facturacion-dropdown-option ${metodoPago === 'Tarjeta' ? 'selected' : ''}`}
                                                onClick={() => { setMetodoPago('Tarjeta'); closeAllDropdowns(); }}>
                                                Tarjeta
                                            </div>
                                            <div className={`facturacion-dropdown-option ${metodoPago === 'Transferencia' ? 'selected' : ''}`}
                                                onClick={() => { setMetodoPago('Transferencia'); closeAllDropdowns(); }}>
                                                Transferencia
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        <div className="facturacion-item">
                            <label>Itbis %:</label>
                            <input value="18%" disabled readOnly />
                        </div>
                    </div>
                </section>

                <section className="facturacion-bloque sin-borde-superior">
                    <div className="monto-venta-row">
                        <span>Monto de Venta:</span>
                        <strong className="subtotal-verde">$ {subtotal.toLocaleString()}</strong>
                    </div>
                    <div className="facturacion-line" />

                    <h3 className="facturacion-subtitle resumen-title">Resumen de la Factura</h3>
                    <div className="resumen-box">
                        <p><span>Sub-total:</span><strong>$ {subtotal.toLocaleString()}</strong></p>
                        <p className="descuento">
                            <span>Descuento ({descuento}%):</span>
                            <strong>- $ {montoDescuento.toLocaleString()}</strong>
                        </p>
                        <p><span>Itbis (18%):</span><strong>$ {itbis.toLocaleString()}</strong></p>
                        <p className="total"><span>Total a pagar:</span><strong>$ {totalFinal.toLocaleString()}</strong></p>
                    </div>
                </section>

                <div className="facturacion-footer">
                    <div className="facturacion-meta">Artículos totales: <strong>{articulos.reduce((s, i) => s + i.cant, 0)}</strong></div>
                    <div className="facturacion-meta">N.º de factura: <strong>B02000000XXX</strong></div>
                    <div className="facturacion-actions">
                        <button className="btn-confirm-salir btn-confirm-red" type="button" onClick={onVolver}>
                            <img src={iconSalir} alt="" className="confirm-btn-icon" />
                            Retroceder
                        </button>
                        <button className="btn-confirm-aceptar btn-confirm-green" type="button" onClick={manejarConfirmar}>
                            <img src={iconConfirmar} alt="" className="confirm-btn-icon" />
                            Confirmar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const PanelVentas = () => {
    const [showNuevaVentaModal, setShowNuevaVentaModal] = useState(false);
    const [showFacturacionModal, setShowFacturacionModal] = useState(false);
    const [showConfirmSalir, setShowConfirmSalir] = useState(false);
    const [showConfirmVenta, setShowConfirmVenta] = useState(false);
    const [showExitoModal, setShowExitoModal] = useState(false);
    const [showBusquedaVentaModal, setShowBusquedaVentaModal] = useState(false);
    const [showVentaNoEncontradaModal, setShowVentaNoEncontradaModal] = useState(false);
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

    const manejarBusquedaVenta = (event) => {
        if (event.key !== 'Enter') {
            return;
        }

        event.preventDefault();

        if (busquedaVenta.trim() === '') {
            setShowVentaNoEncontradaModal(true);
            return;
        }

        setShowBusquedaVentaModal(true);
        setBusquedaVenta('');
    };

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

    const handleCloseSeleccionCliente = () => {
        setShowSeleccionCliente(false);
    };

    const handleCloseSeleccionTipo = () => {
        setShowSeleccionTipo(false);
    };

    const handleCloseSeleccionDescuento = () => {
        setShowSeleccionDescuento(false);
    };

    const calcularDescuentoAutomatico = (cantidad) => {
        if (cantidad >= 10) {
            return '30%';
        } else if (cantidad >= 5) {
            return '20%';
        }
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
                <div className="kpi-card ventas-kpi-card">
                    <p className="kpi-label">Ventas del día</p>
                    <h2 className="kpi-value">0</h2>
                </div>
                <div className="kpi-card ventas-kpi-card">
                    <p className="kpi-label">Ventas de la semana</p>
                    <h2 className="kpi-value">0</h2>
                </div>
                <div className="kpi-card ventas-kpi-card">
                    <p className="kpi-label">Ventas del mes</p>
                    <h2 className="kpi-value">0</h2>
                </div>
                <div className="kpi-card ventas-kpi-card">
                    <p className="kpi-label">Cantidad de ventas</p>
                    <h2 className="kpi-value">0</h2>
                </div>
            </div>

            <div className="ventas-table-card">
                <div className="ventas-table-controls">
                    <h3>Lista de ventas</h3>

                    <div className="search-box">
                        <div className="search-input-wrapper">
                            <img src={iconBuscar} alt="Buscar" className="search-icon" />
                            <input
                                type="text"
                                placeholder="Buscar venta por nombre del cliente"
                                value={busquedaVenta}
                                onChange={(event) => setBusquedaVenta(event.target.value)}
                                onKeyDown={manejarBusquedaVenta}
                            />
                        </div>
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
                            <tr>
                                <td className="table-row-empty-cell" colSpan={9}>
                                    No hay ventas para mostrar.
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <ModalNuevaVenta
                isOpen={showNuevaVentaModal}
                onSalir={() => {
                    setShowNuevaVentaModal(false);
                    setShowConfirmSalir(true);
                }}
                onFacturar={() => {
                    setShowNuevaVentaModal(false);
                    setShowFacturacionModal(true);
                }}
            />

            <ModalVentaEncontrada
                isOpen={showBusquedaVentaModal}
                onClose={() => setShowBusquedaVentaModal(false)}
                data={null}
                onVerFactura={() => {
                    setShowBusquedaVentaModal(false);
                    setShowFacturacionModal(true);
                }}
            />

            <ModalVentaNoEncontrada
                isOpen={showVentaNoEncontradaModal}
                onClose={() => setShowVentaNoEncontradaModal(false)}
                buttonLabel="Salir"
            />

            <ModalSeleccionCliente
                isOpen={showSeleccionCliente}
                onClose={handleCloseSeleccionCliente}
                clientes={[]}
                onSelect={(cliente) => {
                    setSelectedCliente(cliente.nombre || '');
                    console.log('Cliente seleccionado:', cliente);
                }}
                position={modalPositionCliente}
            />

            <ModalSeleccionTipo
                isOpen={showSeleccionTipo}
                onClose={handleCloseSeleccionTipo}
                onSelect={(tipo) => {
                    setSelectedTipo(tipo.nombre || '');
                    if (tipo.id === 'por_mayor') {
                        setIsDescuentoManual(false);
                        const descuentoAuto = calcularDescuentoAutomatico(cantidadArticulos);
                        setSelectedDescuento(descuentoAuto);
                    } else if (tipo.id === 'consumidor_final') {
                        setIsDescuentoManual(true);
                        setSelectedDescuento('');
                    }
                    console.log('Tipo seleccionado:', tipo);
                }}
                position={modalPositionTipo}
            />

            <ModalSeleccionDescuento
                isOpen={showSeleccionDescuento}
                onClose={handleCloseSeleccionDescuento}
                onSelect={(descuento) => {
                    setSelectedDescuento(descuento.porcentaje || '0');
                    console.log('Descuento seleccionado:', descuento);
                }}
                position={modalPositionDescuento}
            />

            <ModalFacturacion
                isOpen={showFacturacionModal}
                onVolver={() => {
                    setShowFacturacionModal(false);
                    setShowNuevaVentaModal(true);
                }}
                onConfirmarVenta={() => {
                    setShowFacturacionModal(false);
                    setShowConfirmVenta(true);
                }}
                onOpenSeleccionTipo={handleOpenSeleccionTipo}
                onOpenSeleccionCliente={handleOpenSeleccionCliente}
                inputClienteRef={inputClienteRef}
                inputTipoRef={inputTipoRef}
                showSeleccionCliente={showSeleccionCliente}
                showSeleccionTipo={showSeleccionTipo}
                selectedTipo={selectedTipo}
                selectedCliente={selectedCliente}
                selectedDescuento={selectedDescuento}
                isDescuentoManual={isDescuentoManual}
                setSelectedDescuento={setSelectedDescuento}
            />

            <ConfirmarVentaModal
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
                message="¿Estás seguro de que deseas salir?"
                salirLabel="Retroceder"
                confirmLabel="Confirmar"
            />

            <ConfirmarVentaModal
                isOpen={showConfirmVenta}
                onClose={() => {
                    setShowConfirmVenta(false);
                    setShowFacturacionModal(true);
                }}
                onConfirm={() => {
                    setShowConfirmVenta(false);
                    setShowExitoModal(true);
                }}
                message="¿Estás seguro de que deseas confirmar la venta?"
                salirLabel="Retroceder"
                confirmLabel="Confirmar"
            />

            <ModalExito
                isOpen={showExitoModal}
                onClose={() => setShowExitoModal(false)}
                title="Confirmado"
                subtitle="Venta facturada exitosamente!"
                buttonLabel="Salir"
            />
        </div>
    );
};

export default PanelVentas;
