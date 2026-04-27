import React, { useState } from 'react';
import './Inventario.css';
import iconNew from '../assets/new-section.svg';
import iconSearch from '../assets/search.svg';
import iconEdit from '../assets/edit.svg';

const Inventario = () => {
    const [articulos] = useState([]);
    const [busqueda, setBusqueda] = useState('');

    const totalArticulos = articulos.length;
    const articuloMasVendido = 0;
    const articuloMenosVendido = 0;
    const articulosExistenciaBaja = 0;

    const formatMoney = (value) => {
        const numericValue = Number(String(value ?? '').replace(/[^\d.]/g, ''));
        if (Number.isNaN(numericValue)) {
            return '$ 0';
        }
        return `$ ${numericValue.toLocaleString('es-DO')}`;
    };

    return (
        <div className="inventario-page">
            <div className="inventario-header">
                <h1 className="inventario-title">Inventario</h1>
                <button className="btn-nuevo-articulo" type="button">
                    <img src={iconNew} alt="" className="btn-nuevo-articulo-icon" />
                    Nuevo Artículo
                </button>
            </div>

            <div className="kpi-grid inventario-kpi-grid">
                <div className="kpi-card inventario-kpi-card">
                    <p className="kpi-label">Total de artículos</p>
                    <h2 className="kpi-value">{totalArticulos}</h2>
                </div>
                <div className="kpi-card inventario-kpi-card">
                    <p className="kpi-label">Artículo más vendido</p>
                    <h2 className="kpi-value">{articuloMasVendido}</h2>
                </div>
                <div className="kpi-card inventario-kpi-card">
                    <p className="kpi-label">Artículo menos vendido</p>
                    <h2 className="kpi-value">{articuloMenosVendido}</h2>
                </div>
                <div className="kpi-card inventario-kpi-card">
                    <p className="kpi-label">Artículos con existencia baja</p>
                    <h2 className="kpi-value">{articulosExistenciaBaja}</h2>
                </div>
            </div>

            <div className="inventario-table-card">
                <div className="inventario-table-controls">
                    <div>
                        <h3>Lista de artículos</h3>
                    </div>
                    <div className="search-box">
                        <div className="search-input-wrapper">
                            <img src={iconSearch} alt="Buscar" className="search-icon" />
                            <input
                                type="text"
                                placeholder="Buscar por nombre del artículo"
                                value={busqueda}
                                onChange={(e) => setBusqueda(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                <div className="inventario-table-wrapper">
                    <table className="inventario-table">
                        <thead>
                            <tr>
                                <th>Código</th>
                                <th>Descripción</th>
                                <th>Color</th>
                                <th>Unidad</th>
                                <th>Existencia mínima</th>
                                <th>Existencia actual</th>
                                <th>Costo de compra</th>
                                <th>Precio de venta</th>
                                <th>Acción</th>
                            </tr>
                        </thead>
                        <tbody>
                            {articulos.length > 0 ? (
                                articulos.map((item, index) => (
                                    <tr key={item.id || index}>
                                        <td>{item.codigo}</td>
                                        <td>{item.descripcion}</td>
                                        <td>{item.color}</td>
                                        <td>{item.unidad}</td>
                                        <td>{item.minima}</td>
                                        <td>{item.actual}</td>
                                        <td>{formatMoney(item.costo)}</td>
                                        <td>{formatMoney(item.precio)}</td>
                                        <td className="accion-cell">
                                            <button className="btn-edit">
                                                <img src={iconEdit} alt="Editar" className="btn-edit-icon" />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td className="table-row-empty-cell" colSpan="9">
                                        No hay artículos para mostrar.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Inventario;
