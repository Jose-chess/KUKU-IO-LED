import React, { useState, useEffect, useMemo, useRef } from 'react';

import './ModalFacturacion.css';

import iconSalir from '../assets/arrow-back-up.svg';

import iconConfirmar from '../assets/circle-check.svg';

import iconBuscar from '../assets/search.svg';

import iconFlecha from '../assets/chevron-down.svg';

import ModalSeleccionCliente from './ModalSeleccionCliente';

import ModalSeleccionSimple from './ModalSeleccionSimple';

import ModalConfirmar from './ModalConfirmar';

import { useModalShake } from './useModalShake';

import DatePicker, { registerLocale } from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

import { es } from 'date-fns/locale/es';



registerLocale('es', es);



const ModalFacturacion = ({ isOpen, onVolver, onConfirmarVenta, venta }) => {

    // Debug log para rastrear el montaje del componente

    useEffect(() => {

        if (isOpen) {

            console.log("ModalFacturacion abierto con venta:", venta);

        }

    }, [isOpen, venta]);



    const { isShaking, handleOverlayClick, triggerShake } = useModalShake();



    // Estados locales para campos editables

    const [condicion, setCondicion] = useState(venta?.condicion || 'Contado');

    const [metodoPago, setMetodoPago] = useState(venta?.metodoPago || 'Efectivo');

    const [tipoVenta, setTipoVenta] = useState(venta?.tipoVenta || 'Consumidor final');

    const [descuentoManual, setDescuentoManual] = useState(venta?.descuento || 0);

    const [fechaPago, setFechaPago] = useState(null);

    const [errores, setErrores] = useState({});



    // Estados para Modales de Selección

    const [showModalCliente, setShowModalCliente] = useState(false);

    const [showModalCondicion, setShowModalCondicion] = useState(false);

    const [showModalTipo, setShowModalTipo] = useState(false);

    const [showModalMetodo, setShowModalMetodo] = useState(false);

    const [showConfirmarRetroceder, setShowConfirmarRetroceder] = useState(false);

    const [showConfirmarFinalizar, setShowConfirmarFinalizar] = useState(false);



    // Refs para Posicionamiento

    const clienteRef = useRef(null);

    const condicionRef = useRef(null);

    const tipoRef = useRef(null);

    const metodoRef = useRef(null);



    const [modalPosition, setModalPosition] = useState(null);

    const [clienteSeleccionado, setClienteSeleccionado] = useState(venta?.cliente || '');



    // Datos de ejemplo para clientes

    const clientes = [

        { id: 1, nombre: 'José Manuel Guerrero', rnc: '131-07517-2', telefono: '809-555-1234', direccion: 'Calle Principal #123' },

        { id: 2, nombre: 'Electrónica Gómez', rnc: '131-12345-6', telefono: '809-555-5678', direccion: 'Av. Duarte #456' },

        { id: 3, nombre: 'Carlos Castillo', rnc: '047-0012345-6', telefono: '829-555-9012', direccion: 'Calle 27 de Febrero #789' }

    ];



    // Sincronizar con props cuando cambian

    useEffect(() => {

        if (venta) {

            setCondicion(venta.condicion || '');

            setMetodoPago(venta.metodoPago || '');

            setTipoVenta(venta.tipoVenta || '');

            setDescuentoManual(venta.descuento || 0);

        }

    }, [venta]);



    // Limpiar método de pago y fecha de pago al cambiar a Crédito o Contado

    useEffect(() => {

        if (condicion === 'Crédito') {

            setMetodoPago('');

        } else if (condicion === 'Contado' && !metodoPago) {

            setMetodoPago('Efectivo');

            setFechaPago(null);

        }

    }, [condicion]);



    // Resetear descuento manual al cambiar tipo de venta

    useEffect(() => {

        if (tipoVenta === 'Venta al por mayor') {

            setDescuentoManual(0);

        }

    }, [tipoVenta]);



    if (!isOpen) return null;



    // Datos de la venta con seguridad extrema

    const articulos = useMemo(() => venta?.articulos || [], [venta]);



    // Calcular cantidad total de artículos

    const totalArticulos = useMemo(() =>

        articulos.reduce((sum, item) => sum + (Number(item?.cant) || 0), 0)

        , [articulos]);



    // Calcular descuento automático para mayorista

    const calcularDescuentoAutomatico = (cantidad) => {

        if (cantidad >= 10) return 30;

        if (cantidad >= 5) return 20;

        return 0;

    };



    // Determinar descuento final

    const descuentoFinal = useMemo(() => {

        if (tipoVenta === 'Venta al por mayor') {

            return calcularDescuentoAutomatico(totalArticulos);

        }

        return Number(descuentoManual) || 0;

    }, [tipoVenta, totalArticulos, descuentoManual]);



    // Indicar si el descuento es automático

    const esDescuentoAutomatico = tipoVenta === 'Venta al por mayor';



    // Cálculos de la factura con protección contra NaN

    const subtotal = useMemo(() =>

        articulos.reduce((sum, item) => sum + ((Number(item?.cant) || 0) * (Number(item?.precio) || 0)), 0)

        , [articulos]);



    const montoDescuento = subtotal * (descuentoFinal / 100);

    const subtotalConDescuento = subtotal - montoDescuento;

    const itbis = subtotalConDescuento * 0.18;

    const totalFinal = subtotalConDescuento + itbis;



    // Validar antes de confirmar

    const validar = () => {

        const nuevosErrores = {};

        if (!condicion) {

            nuevosErrores.condicion = 'Seleccione una condición';

        }

        if (condicion === 'Contado' && !metodoPago) {

            nuevosErrores.metodoPago = 'Seleccione un método de pago';

        }

        if (condicion === 'Crédito' && !fechaPago) {

            nuevosErrores.fechaPago = 'Seleccione una fecha de pago';

        }

        setErrores(nuevosErrores);

        return Object.keys(nuevosErrores).length === 0;

    };



    // Handler para confirmar - siempre abre el modal sin validar

    const handleConfirmarAction = () => {

        setShowConfirmarFinalizar(true);

    };



    const handleConfirmarFinal = () => {

        setShowConfirmarFinalizar(false);

        onConfirmarVenta({

            ...venta,

            condicion,

            metodoPago: condicion === 'Contado' ? metodoPago : null,

            fechaPago: condicion === 'Crédito' && fechaPago ? fechaPago.toISOString().split('T')[0] : null,

            tipoVenta,

            descuento: descuentoFinal,

            subtotal,

            total: totalFinal

        });

    };



    // Función para manejar clics en el overlay principal

    const handleMainOverlayClick = (e) => {

        if (showModalCliente || showModalCondicion || showModalTipo || showModalMetodo || showConfirmarRetroceder || showConfirmarFinalizar) {

            setShowModalCliente(false);

            setShowModalCondicion(false);

            setShowModalTipo(false);

            setShowModalMetodo(false);

            setShowConfirmarRetroceder(false);

            setShowConfirmarFinalizar(false);

            return;

        }

        

        handleOverlayClick(onClose);

    };



    return (

        <div className="facturacion-overlay" onClick={handleMainOverlayClick}>

            <div

                className={`facturacion-modal anim-scale-up ${isShaking ? 'shake' : ''} ${(showConfirmarRetroceder || showConfirmarFinalizar) ? 'is-hidden-by-confirm' : ''}`}

                onClick={(event) => event.stopPropagation()}

            >

                <h2 className="facturacion-title">Facturación</h2>



                <div className="seccion-articulos">

                    <h3 className="subtitulo-seccion">Facturar artículos</h3>

                    <div className="separador-linea" />



                    <div className="grid-formulario">

                        <div className="columna-formulario">

                            <div className="item-campo">

                                <label>Código de Venta:</label>

                                <input value="2222" disabled readOnly />

                            </div>

                            <div className="item-campo">

                                <label>Fecha de Venta:</label>

                                <input

                                    value={new Date().toLocaleDateString('es-ES')}

                                    disabled

                                    readOnly

                                />

                            </div>

                            <div className="item-campo">

                                <label>Cliente:</label>

                                <div

                                    ref={clienteRef}

                                    className="desplegable-cliente"

                                    onClick={() => {

                                        const rect = clienteRef.current.getBoundingClientRect();

                                        setModalPosition({

                                            top: rect.bottom + window.scrollY + 5,

                                            left: rect.left + window.scrollX,

                                            width: rect.width * 0.85 // Más delgado

                                        });

                                        setShowModalCliente(true);

                                    }}

                                >

                                    <span>{clienteSeleccionado || "Seleccione un cliente"}</span>

                                    <img

                                        src={iconFlecha}

                                        alt=""

                                        className={`icono-flecha-inline ${showModalCliente ? 'open' : ''}`}

                                    />

                                </div>

                            </div>

                            <div className="item-campo">

                                <label>Condición:</label>

                                <div

                                    ref={condicionRef}

                                    className="desplegable-cliente"

                                    onClick={() => {

                                        const rect = condicionRef.current.getBoundingClientRect();

                                        setModalPosition({ top: rect.bottom + window.scrollY + 5, left: rect.left + window.scrollX, width: rect.width * 0.85 });

                                        setShowModalCondicion(true);

                                    }}

                                >

                                    <span>{condicion || "Seleccione la condición"}</span>

                                    <img

                                        src={iconFlecha}

                                        alt=""

                                        className={`icono-flecha-inline ${showModalCondicion ? 'open' : ''}`}

                                    />

                                </div>

                            </div>

                        </div>



                        <div className="columna-formulario">

                            <div className="item-campo">

                                <label>Tipo:</label>

                                <div

                                    ref={tipoRef}

                                    className="desplegable-cliente"

                                    onClick={() => {

                                        const rect = tipoRef.current.getBoundingClientRect();

                                        setModalPosition({ top: rect.bottom + window.scrollY + 5, left: rect.left + window.scrollX, width: rect.width * 0.85 });

                                        setShowModalTipo(true);

                                    }}

                                >

                                    <span>{tipoVenta || "Seleccione el tipo"}</span>

                                    <img

                                        src={iconFlecha}

                                        alt=""

                                        className={`icono-flecha-inline ${showModalTipo ? 'open' : ''}`}

                                    />

                                </div>

                            </div>

                            <div className="item-campo">

                                <label>Descuento:</label>

                                <div style={{ position: 'relative', flex: 1, display: 'flex', alignItems: 'center' }}>

                                    <input

                                        type="number"

                                        value={descuentoFinal}

                                        onChange={(e) => setDescuentoManual(Number(e.target.value))}

                                        disabled={tipoVenta === 'Venta al por mayor'}

                                        style={{

                                            width: '100%',

                                            paddingRight: '45px',

                                            background: tipoVenta === 'Venta al por mayor' ? '#f3f4f6' : '#ffffff',

                                            cursor: tipoVenta === 'Venta al por mayor' ? 'not-allowed' : 'text'

                                        }}

                                    />

                                    <div style={{ position: 'absolute', right: '10px', display: 'flex', alignItems: 'center', gap: '5px' }}>

                                        <div className="custom-spinners" style={{ display: 'flex', flexDirection: 'column', opacity: tipoVenta === 'Venta al por mayor' ? 0.3 : 1 }}>

                                            <div

                                                className="spinner-up"

                                                onClick={() => tipoVenta !== 'Venta al por mayor' && setDescuentoManual(prev => Math.min(prev + 1, 100))}

                                                style={{ cursor: 'pointer', height: '10px', display: 'flex', alignItems: 'center' }}

                                            >

                                                <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><path d="m18 15-6-6-6 6" /></svg>

                                            </div>

                                            <div

                                                className="spinner-down"

                                                onClick={() => tipoVenta !== 'Venta al por mayor' && setDescuentoManual(prev => Math.max(prev - 1, 0))}

                                                style={{ cursor: 'pointer', height: '10px', display: 'flex', alignItems: 'center' }}

                                            >

                                                <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>

                                            </div>

                                        </div>

                                        <span style={{ fontWeight: '700', fontSize: '13px', color: '#6b7280', pointerEvents: 'none' }}>%</span>

                                    </div>

                                </div>

                            </div>

                            <div className="item-campo">

                                <label>Itbis %:</label>

                                <input value="18%" disabled readOnly />

                            </div>



                            {condicion === 'Contado' && (

                                <div className="item-campo">

                                    <label>Método de Pago:</label>

                                    <div

                                        ref={metodoRef}

                                        className="desplegable-cliente"

                                        onClick={() => {

                                            const rect = metodoRef.current.getBoundingClientRect();

                                            setModalPosition({ top: rect.bottom + window.scrollY + 5, left: rect.left + window.scrollX, width: rect.width * 0.85 });

                                            setShowModalMetodo(true);

                                        }}

                                    >

                                        <span>{metodoPago || "Seleccione el metodo de pago"}</span>

                                        <img

                                            src={iconFlecha}

                                            alt=""

                                            className={`icono-flecha-inline ${showModalMetodo ? 'open' : ''}`}

                                        />

                                    </div>

                                </div>

                            )}



                            {condicion === 'Crédito' && (

                                <div className="item-campo custom-datepicker-container">

                                    <label>Fecha de Pago:</label>

                                    <DatePicker

                                        selected={fechaPago}

                                        onChange={(date) => {

                                            setFechaPago(date);

                                            if (errores.fechaPago) {

                                                setErrores({ ...errores, fechaPago: null });

                                            }

                                        }}

                                        dateFormat="dd/MM/yyyy"

                                        locale="es"

                                        placeholderText="dd/mm/aaaa"

                                        className={`datepicker-input ${errores.fechaPago ? 'error-border' : ''}`}

                                    />

                                    {errores.fechaPago && <span style={{ color: '#ff0000', fontSize: '11px', marginTop: '2px', display: 'block' }}>{errores.fechaPago}</span>}

                                </div>

                            )}

                        </div>

                    </div>

                </div>



                <div className="monto-venta-fila">

                    Monto de Venta: <span className="monto-vibrante-verde">{new Intl.NumberFormat('es-DO', { style: 'currency', currency: 'DOP', minimumFractionDigits: 0 }).format(subtotal)}</span>

                </div>



                <div className="seccion-resumen-container">

                    <h3 className="subtitulo-seccion">Resumen de la Venta</h3>

                    <div className="seccion-resumen-box">

                        <div className="fila-resumen">

                            <span>Sub-total:</span>

                            <span className="valor-resumen-negro">{new Intl.NumberFormat('es-DO', { style: 'currency', currency: 'DOP', minimumFractionDigits: 0 }).format(subtotal)}</span>

                        </div>

                        <div className="fila-resumen">

                            <span>Descuento:</span>

                            <span className="valor-resumen-rojo">{descuentoFinal}%</span>

                        </div>

                        <div className="fila-resumen">

                            <span>Itbis:</span>

                            <span className="valor-resumen-negro">{new Intl.NumberFormat('es-DO', { style: 'currency', currency: 'DOP', minimumFractionDigits: 0 }).format(itbis)}</span>

                        </div>

                        <div className="fila-resumen">

                            <span>Total a pagar:</span>

                            <span className="valor-resumen-verde">{new Intl.NumberFormat('es-DO', { style: 'currency', currency: 'DOP', minimumFractionDigits: 0 }).format(totalFinal)}</span>

                        </div>

                    </div>

                </div>



                <div className="pie-modal">

                    <div className="pie-meta-izquierda">

                        Artículos totales: {totalArticulos}

                    </div>

                    <div className="pie-meta-centro">

                        Número de Venta: #2222

                    </div>

                    <div className="pie-botones-derecha">

                        <button

                            className="btn-pie-volver"

                            type="button"

                            onClick={() => setShowConfirmarRetroceder(true)}

                        >

                            <img src={iconSalir} alt="" className="icono-pie" />

                            Retroceder

                        </button>

                        <button

                            className="btn-pie-confirmar"

                            type="button"

                            onClick={(e) => {

                                e.stopPropagation();

                                handleConfirmarAction();

                            }}

                        >

                            <img src={iconConfirmar} alt="" className="icono-pie" />

                            Confirmar Venta

                        </button>

                    </div>

                </div>

            </div>



            <ModalSeleccionCliente

                isOpen={showModalCliente}

                onClose={() => setShowModalCliente(false)}

                position={modalPosition}

                onSelect={(cliente) => {

                    setClienteSeleccionado(cliente.nombre);

                    setShowModalCliente(false);

                }}

                clientes={clientes}

                selectedCliente={clienteSeleccionado}

            />



            <ModalSeleccionSimple

                isOpen={showModalCondicion}

                onClose={() => setShowModalCondicion(false)}

                position={modalPosition}

                options={['Contado', 'Crédito']}

                onSelect={(val) => setCondicion(val)}

                selectedValue={condicion}

            />



            <ModalSeleccionSimple

                isOpen={showModalTipo}

                onClose={() => setShowModalTipo(false)}

                position={modalPosition}

                options={['Consumidor final', 'Venta al por mayor']}

                onSelect={(val) => setTipoVenta(val)}

                selectedValue={tipoVenta}

            />



            <ModalSeleccionSimple

                isOpen={showModalMetodo}

                onClose={() => setShowModalMetodo(false)}

                position={modalPosition}

                options={['Efectivo', 'Tarjeta', 'Transferencia']}

                onSelect={(val) => setMetodoPago(val)}

                selectedValue={metodoPago}

            />



            <ModalConfirmar

                isOpen={showConfirmarRetroceder}

                onClose={() => setShowConfirmarRetroceder(false)}

                onConfirm={onVolver}

                mensaje="¿Estas seguro que desea salir?"

                salirLabel="Retroceder"

                confirmLabel="Confirmar"

            />



            <ModalConfirmar

                isOpen={showConfirmarFinalizar}

                onClose={() => setShowConfirmarFinalizar(false)}

                onConfirm={handleConfirmarFinal}

                mensaje="¿Estas seguro de que desea confirmarla venta?"

                salirLabel="Retroceder"

                confirmLabel="Confirmar"

            />

        </div>

    );

};



export default ModalFacturacion;

