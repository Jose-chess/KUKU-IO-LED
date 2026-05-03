import React, { useState } from 'react';
import './ModalBusqueda.css';
import iconBuscar from '../assets/search.svg';
import iconSalir from '../assets/arrow-back-up.svg';
import iconConfirmar from '../assets/circle-check.svg';

const ModalBusqueda = ({ isOpen, onClose, onSeleccionar }) => {
    const [busqueda, setBusqueda] = useState('');
    const [articulosSeleccionados, setArticulosSeleccionados] = useState([]);

    // TODO: Datos del backend (vacíos hasta integrar)
    const [articulos, setArticulos] = useState([]);

    if (!isOpen) return null;

    const articulosFiltrados = articulos.filter(a =>
        a.codigo?.toLowerCase().includes(busqueda.toLowerCase()) ||
        a.descripcion?.toLowerCase().includes(busqueda.toLowerCase())
    );

    const handleSeleccionar = (articulo) => {
        const yaSeleccionado = articulosSeleccionados.find(a => a.id === articulo.id);
        if (yaSeleccionado) {
            setArticulosSeleccionados(articulosSeleccionados.filter(a => a.id !== articulo.id));
        } else {
            setArticulosSeleccionados([...articulosSeleccionados, { ...articulo, cantidad: 1 }]);
        }
    };

    const handleConfirmar = () => {
        onSeleccionar?.(articulosSeleccionados);
        onClose?.();
    };

    const formatMoney = (value) => {
        if (!value || isNaN(value)) return '$ 0';
        return `$ ${Number(value).toLocaleString('es-DO')}`;
    };

    return (
        <div className="busqueda-overlay" onClick={onClose}>
            <div className="busqueda-card" onClick={(e) => e.stopPropagation()}>
                <h2 className="busqueda-title">Seleccionar Artículos</h2>

                <div className="busqueda-search-wrapper" style={{ marginBottom: '20px' }}>
                    <img src={iconBuscar} alt="Buscar" style={{ position: 'absolute', left: '14px', width: '16px', height: '16px', opacity: 0.6 }} />
                    <input
                        type="text"
                        placeholder="Buscar por código o descripción..."
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                        style={{
                            width: '100%',
                            height: '40px',
                            padding: '8px 14px 8px 40px',
                            border: '1px solid #D3D6DB',
                            borderRadius: '8px',
                            fontSize: '14px',
                            fontWeight: 600
                        }}
                    />
                </div>

                <div className="table-wrapper-busqueda">
                    <table className="tabla-resultado">
                        <thead className="header-amarillo">
                            <tr>
                                <th>Código</th>
                                <th>Descripción</th>
                                <th>Precio</th>
                                <th>Existencia</th>
                                <th>Seleccionar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {articulosFiltrados.length > 0 ? (
                                articulosFiltrados.map((articulo) => {
                                    const seleccionado = articulosSeleccionados.find(a => a.id === articulo.id);
                                    return (
                                        <tr key={articulo.id}>
                                            <td>{articulo.codigo}</td>
                                            <td>{articulo.descripcion}</td>
                                            <td>{formatMoney(articulo.precio)}</td>
                                            <td>{articulo.existencia}</td>
                                            <td>
                                                <input
                                                    type="checkbox"
                                                    checked={!!seleccionado}
                                                    onChange={() => handleSeleccionar(articulo)}
                                                />
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td colSpan="5" style={{ textAlign: 'center', padding: '20px' }}>
                                        No hay artículos disponibles
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="busqueda-footer">
                    <span style={{ fontSize: '14px', color: '#64748b' }}>
                        {articulosSeleccionados.length} artículo(s) seleccionado(s)
                    </span>
                    <div style={{ display: 'flex', gap: '15px' }}>
                        <button className="btn-salir-rojo" onClick={onClose}>
                            <img src={iconSalir} alt="" className="busqueda-btn-icon" />
                            Salir
                        </button>
                        <button className="btn-confirmar-verde" onClick={handleConfirmar}>
                            <img src={iconConfirmar} alt="" className="busqueda-btn-icon" />
                            Confirmar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalBusqueda;
