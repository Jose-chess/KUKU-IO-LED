import React, { useState } from 'react';
import './ModalNuevaVenta.css';
import iconSalir from '../assets/arrow-back-up.svg';
import iconConfirmar from '../assets/circle-check.svg';
import iconBuscar from '../assets/search.svg';
import iconFlecha from '../assets/chevron-down.svg';
import { useModalShake } from './useModalShake';

const ModalNuevaVenta = ({ isOpen, onSalir, onFacturar }) => {
    const { isShaking, handleOverlayClick } = useModalShake();

    const [busquedaArticulo, setBusquedaArticulo] = useState('');
    const [articulosSeleccionados, setArticulosSeleccionados] = useState([]);

    const handleAgregarArticulo = () => {
        // Simular agregar artículo
        if (busquedaArticulo.trim()) {
            const nuevoArticulo = {
                id: Date.now(),
                nombre: busquedaArticulo,
                cantidad: 1,
                precio: 100,
                total: 100
            };
            setArticulosSeleccionados([...articulosSeleccionados, nuevoArticulo]);
            setBusquedaArticulo('');
        }
    };

    const handleEliminarArticulo = (id) => {
        setArticulosSeleccionados(articulosSeleccionados.filter(art => art.id !== id));
    };

    const handleCantidadChange = (id, nuevaCantidad) => {
        setArticulosSeleccionados(articulosSeleccionados.map(art => 
            art.id === id ? { ...art, cantidad: nuevaCantidad, total: art.precio * nuevaCantidad } : art
        ));
    };

    const calcularTotal = () => {
        return articulosSeleccionados.reduce((total, art) => total + art.total, 0);
    };
    const handleSalir = () => { onSalir(); };
    const handleFacturar = () => { onFacturar({ articulos: articulosSeleccionados, total: calcularTotal(), fecha: new Date().toLocaleDateString() }); };


    const formatMoney = (value) => {
        return `$ ${Number(value).toLocaleString('es-DO', { minimumFractionDigits: 0 })}`;
    };

    return (
        <>
            {isOpen && (<div className="nueva-venta-overlay" onClick={handleOverlayClick}>
                <div className={`nueva-venta-modal scale-up-center ${isShaking ? 'shake' : ''}`} onClick={(event) => event.stopPropagation()}>
                    <div className="nueva-venta-content">
                        <div className="nueva-venta-header">
                            <h2 className="nueva-venta-title">Nueva Venta</h2>
                        </div>

                        <div className="nueva-venta-body">
                            <div className="nueva-venta-busqueda-section">
                                <label className="nueva-venta-label">Buscar artículo</label>
                                <div className="nueva-venta-search-wrapper">
                                    <img src={iconBuscar} alt="Buscar" className="nueva-venta-search-icon" />
                                    <input
                                        type="text"
                                        placeholder="Buscar por código o nombre"
                                        value={busquedaArticulo}
                                        onChange={(e) => setBusquedaArticulo(e.target.value)}
                                        className="nueva-venta-search-input"
                                        onKeyPress={(e) => e.key === 'Enter' && handleAgregarArticulo()}
                                    />
                                </div>
                            </div>

                            <div className="nueva-venta-articulos-section">
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
                                            {articulosSeleccionados.length === 0 ? (
                                                <tr>
                                                    <td colSpan="5" className="nueva-venta-empty-cell">
                                                        No hay artículos agregados
                                                    </td>
                                                </tr>
                                            ) : (
                                                articulosSeleccionados.map((articulo) => (
                                                    <tr key={articulo.id}>
                                                        <td className="nueva-venta-codigo">{articulo.id.toString().slice(-4)}</td>
                                                        <td className="nueva-venta-nombre">{articulo.nombre}</td>
                                                        <td className="nueva-venta-precio">{formatMoney(articulo.precio)}</td>
                                                        <td className="nueva-venta-cantidad">
                                                            <input
                                                                type="number"
                                                                min="1"
                                                                value={articulo.cantidad}
                                                                onChange={(e) => handleCantidadChange(articulo.id, parseInt(e.target.value) || 1)}
                                                                className="nueva-venta-cantidad-input"
                                                            />
                                                        </td>
                                                        <td className="nueva-venta-accion">
                                                            <button 
                                                                className="nueva-venta-eliminar-btn"
                                                                onClick={() => handleEliminarArticulo(articulo.id)}
                                                            >
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                                    <polyline points="3 6 5 6 21 6"></polyline>
                                                                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                                                </svg>
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        <div className="nueva-venta-footer">
                            <div className="nueva-venta-articulos-totales">
                                <span className="nueva-venta-label-totales">Artículos totales:</span>
                                <span className="nueva-venta-valor-totales">{articulosSeleccionados.length}</span>
                            </div>
                            <div className="nueva-venta-subtotal">
                                <span className="nueva-venta-label-subtotal">Subtotal:</span>
                                <span className="nueva-venta-valor-subtotal">{formatMoney(calcularTotal())}</span>
                            </div>
                            <div className="nueva-venta-botones">
                                <button className="nueva-venta-btn-salir" onClick={handleSalir}>
                                    <img src={iconSalir} alt="Salir" className="nueva-venta-btn-icon" />
                                    Salir
                                </button>
                                <button 
                                    className="nueva-venta-btn-facturar"
                                    onClick={handleFacturar}
                                >
                                    <img src={iconConfirmar} alt="Facturar" className="nueva-venta-btn-icon" />
                                    Facturar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>)}
        </>
    );
};

export default ModalNuevaVenta;
