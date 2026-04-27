import React, { useState } from 'react';
import './Inventario.css';
import iconNew from '../assets/new-section.svg';
import iconSearch from '../assets/search.svg';
import iconEdit from '../assets/edit.svg';
import iconTrash from '../assets/trash.svg';
import iconFlecha from '../assets/chevron-down.svg';
import ModalExistenciaBaja from './ModalExistenciaBaja';
import ModalNuevoArticulo from './ModalNuevoArticulo';
import ModalEditarArticulo from './ModalEditarArticulo';
import ConfirmadoArticulo from './ConfirmadoArticulo';
import ModalExito from './ModalExito';
import { useRef } from 'react';

const Inventario = () => {
    const [articulos] = useState([
        {
            id: 1,
            codigo: 'ART001',
            descripcion: 'Producto de prueba',
            color: 'Rojo',
            unidad: 'Unidad',
            minima: 10,
            actual: 5,
            costo: 100,
            precio: 150
        }
    ]);
    const [busqueda, setBusqueda] = useState('');
    const [modalExistenciaBaja, setModalExistenciaBaja] = useState(false);
    const [modalPosition, setModalPosition] = useState({ top: 0, left: 0, width: 0 });
    const [modalNuevoArticulo, setModalNuevoArticulo] = useState(false);
    const [modalEditarArticulo, setModalEditarArticulo] = useState(false);
    const [selectedArticulo, setSelectedArticulo] = useState(null);
    const [showConfirmadoArticulo, setShowConfirmadoArticulo] = useState(false);
    const [showExitoModal, setShowExitoModal] = useState(false);
    const cardExistenciaRef = useRef(null);
    const tableCardRef = useRef(null);

    const totalArticulos = articulos.length;
    const articuloMasVendido = 0;
    const articuloMenosVendido = 0;
    const articulosBajos = articulos.filter(a => Number(a.actual) <= Number(a.minima));
    const articulosExistenciaBaja = articulosBajos.length;

    const formatMoney = (value) => {
        const numericValue = Number(String(value ?? '').replace(/[^\d.]/g, ''));
        if (Number.isNaN(numericValue)) {
            return '$ 0';
        }
        return `$ ${numericValue.toLocaleString('es-DO')}`;
    };


    const handleToggleModal = () => {
        if (modalExistenciaBaja) setModalExistenciaBaja(false);
        else {
            const rect = cardExistenciaRef.current.getBoundingClientRect();
            setModalPosition({ top: rect.bottom + window.scrollY + 8, left: rect.left + window.scrollX, width: rect.width });
            setModalExistenciaBaja(true);
        }
    };

    const handleOpenNuevoArticulo = () => {
        setModalNuevoArticulo(true);
    };

    const handleCloseNuevoArticulo = () => {
        setModalNuevoArticulo(false);
    };

    const handleEditarArticulo = (articulo) => {
        setSelectedArticulo(articulo);
        setModalEditarArticulo(true);
    };

    const handleCloseEditarArticulo = () => {
        setModalEditarArticulo(false);
        setSelectedArticulo(null);
    };

    const handleSaveNuevoArticulo = () => {
        setModalNuevoArticulo(false);
        setShowConfirmadoArticulo(true);
    };

    const handleCloseConfirmadoArticulo = () => {
        setShowConfirmadoArticulo(false);
        setModalNuevoArticulo(true);
    };

    const handleConfirmarArticulo = () => {
        setShowConfirmadoArticulo(false);
        setShowExitoModal(true);
    };

    const handleCloseExito = () => {
        setShowExitoModal(false);
    };

    return (
        <>
            <div className="inventario-page">
                <div className="inventario-header">
                    <h1 className="inventario-title">Inventario</h1>
                    <button className="btn-nuevo-articulo" type="button" onClick={handleOpenNuevoArticulo}>
                        <img src={iconNew} alt="" className="btn-nuevo-articulo-icon" />
                        Nuevo Artículo
                    </button>
                </div>

                <div className="kpi-grid inventario-kpi-grid" style={{ position: 'relative' }}>
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
                    <div
                        className="kpi-card inventario-kpi-card"
                        ref={cardExistenciaRef}
                        style={{ cursor: 'pointer' }}
                        onClick={handleToggleModal}
                    >
                        <div className="existencia-baja-row">
                            <div>
                                <p className="kpi-label">Artículos con existencia baja</p>
                                <h2 className="kpi-value">{articulosExistenciaBaja}</h2>
                            </div>
                            <img
                                src={iconFlecha}
                                alt="Flecha"
                                className={`icon-flecha-existencia-baja ${modalExistenciaBaja ? 'flecha-volteada' : ''}`}
                            />
                        </div>
                    </div>
                </div>

                <div className="inventario-table-card" ref={tableCardRef}>
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
                                                <button className="btn-edit" onClick={() => handleEditarArticulo(item)}>
                                                    <img src={iconEdit} alt="Editar" className="btn-edit-icon" />
                                                </button>
                                                <button className="btn-delete">
                                                    <img src={iconTrash} alt="Eliminar" className="btn-delete-icon" />
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
            {modalExistenciaBaja && (
                <ModalExistenciaBaja
                    isOpen={modalExistenciaBaja}
                    onClose={() => setModalExistenciaBaja(false)}
                    articulos={articulosBajos}
                    position={modalPosition}
                />
            )}
            <ModalNuevoArticulo
                isOpen={modalNuevoArticulo}
                onClose={handleCloseNuevoArticulo}
                onSave={handleSaveNuevoArticulo}
            />
            <ModalEditarArticulo
                isOpen={modalEditarArticulo}
                onClose={handleCloseEditarArticulo}
                onSave={handleCloseEditarArticulo}
                articuloData={selectedArticulo}
            />
            <ConfirmadoArticulo
                isOpen={showConfirmadoArticulo}
                onClose={handleCloseConfirmadoArticulo}
                onConfirm={handleConfirmarArticulo}
            />

            <ModalExito
                isOpen={showExitoModal}
                onClose={handleCloseExito}
                title="Confirmado"
                subtitle="Artículo guardado exitosamente!"
                buttonLabel="Salir"
            />
        </>
    );
};

export default Inventario;
