import React, { useState } from 'react';
import './Inventario.css';
import iconSearch from '../assets/search.svg';
import iconEdit from '../assets/edit.svg';
import iconNew from '../assets/new-section.svg';

const Inventario = () => {

  const [articulos] = useState([]);
  const [busqueda, setBusqueda] = useState("");

  return (
    <div className="inventario-page">
      <header className="inventario-header">
        <h1 className="inventario-title">Inventario</h1>
        <button className="btn-nuevo-articulo" type="button">
          <img src={iconNew} alt="Nuevo" className="btn-nuevo-articulo-icon" />
          Nuevo Artículo
        </button>
      </header>

      <section className="kpi-grid inventario-kpi-grid">
        <div className="kpi-card inventario-kpi-card">
          <p className="kpi-label">Total de artículos</p>
          <h2 className="kpi-value">{articulos.length.toLocaleString()}</h2>
        </div>
        <div className="kpi-card inventario-kpi-card">
          <p className="kpi-label">Artículo más vendido</p>
          <h2 className="kpi-value">0</h2>
        </div>
        <div className="kpi-card inventario-kpi-card">
          <p className="kpi-label">Artículo menos vendido</p>
          <h2 className="kpi-value">0</h2>
        </div>
        <div className="kpi-card inventario-kpi-card">
          <p className="kpi-label">Artículos con existencia baja</p>
          <h2 className="kpi-value">0</h2>
        </div>
      </section>

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
                onChange={e => setBusqueda(e.target.value)}
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
                    <td>${item.costo.toFixed(2)}</td>
                    <td>${item.precio.toFixed(2)}</td>
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
