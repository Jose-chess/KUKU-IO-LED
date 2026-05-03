import React, { useState, useRef } from 'react';
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
import ConfirmadoEliminarArticulo from './ConfirmadoEliminarArticulo';
import ModalExito from './ModalExito';
import ModalErrorArticulo from './ModalErrorArticulo';
// TODO: Importar API calls cuando el backend esté listo
// import { fetchArticulos, deleteArticulo } from '../api/articulosApi';

const Inventario = () => {
    // Datos del backend (vacíos hasta integrar)
    const [articulos, setArticulos] = useState([]);
    const [kpis, setKpis] = useState({
        totalArticulos: 0,
        articuloMasVendido: '-',
        articuloMenosVendido: '-',
        articulosExistenciaBaja: 0
    });

    // TODO: useEffect para cargar datos desde backend
    // useEffect(() => {
    //     const loadData = async () => {
    //         const [articulosData, kpisData] = await Promise.all([
    //             fetchArticulos(),
    //             fetchKpisInventario()
    //         ]);
    //         setArticulos(articulosData);
    //         setKpis(kpisData);
    //     };
    //     loadData();
    // }, []);

    const [busqueda, setBusqueda] = useState('');
    const [modalExistenciaBaja, setModalExistenciaBaja] = useState(false);
    const [modalPosition, setModalPosition] = useState({ top: 0, left: 0, width: 0 });
    const [modalNuevoArticulo, setModalNuevoArticulo] = useState(false);
    const [modalEditarArticulo, setModalEditarArticulo] = useState(false);
    const [selectedArticulo, setSelectedArticulo] = useState(null);
    const [showConfirmadoArticulo, setShowConfirmadoArticulo] = useState(false);
    const [showConfirmadoEditar, setShowConfirmadoEditar] = useState(false);
    const [showConfirmadoEliminar, setShowConfirmadoEliminar] = useState(false);
    const [articuloAEliminar, setArticuloAEliminar] = useState(null);
    const [showExitoModal, setShowExitoModal] = useState(false);
    const [exitoSubtitle, setExitoSubtitle] = useState('¡Artículo guardado exitosamente!');
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [showArticuloEncontrado, setShowArticuloEncontrado] = useState(false);
    const [showArticuloNoEncontrado, setShowArticuloNoEncontrado] = useState(false);
    const [articuloEncontrado, setArticuloEncontrado] = useState(null);
    const [entradoDesdeBusqueda, setEntradoDesdeBusqueda] = useState(false);
    const cardExistenciaRef = useRef(null);
    const tableCardRef = useRef(null);

    const handleBusquedaChange = (e) => {
        setBusqueda(e.target.value);
    };

    const handleEditarDesdeEncontrado = (articulo) => {
        setShowArticuloEncontrado(false);
        handleEditarArticulo(articulo);
    };

    const handleEliminarDesdeEncontrado = (articulo) => {
        setShowArticuloEncontrado(false);
        handleEliminarArticulo(articulo);
    };

    const handleCloseArticuloEncontrado = () => {
        setShowArticuloEncontrado(false);
        setArticuloEncontrado(null);
    };

    const handleCloseArticuloNoEncontrado = () => {
        setShowArticuloNoEncontrado(false);
    };

    const articulosBajos = articulos.filter(a => Number(a.actual) <= Number(a.minima));

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

    const handleSaveEditarArticulo = () => {
        setModalEditarArticulo(false);
        setShowConfirmadoEditar(true);
    };

    const handleCloseConfirmadoEditar = () => {
        setShowConfirmadoEditar(false);
        setModalEditarArticulo(true);
    };

    const handleConfirmarEditar = async () => {
        setShowConfirmadoEditar(false);
        try {
            setExitoSubtitle('¡Artículo modificado exitosamente!');
            setShowExitoModal(true);
        } catch {
            setErrorMessage('No se pudo modificar este artículo en la base de datos');
            setShowErrorModal(true);
        }
    };

    const handleEliminarArticulo = (articulo) => {
        setArticuloAEliminar(articulo);
        setShowConfirmadoEliminar(true);
    };

    const handleCloseConfirmadoEliminar = () => {
        if (entradoDesdeBusqueda) {
            setShowConfirmadoEliminar(false);
            setEntradoDesdeBusqueda(false);
            setArticuloEncontrado(articuloAEliminar);
            setShowArticuloEncontrado(true);
            setArticuloAEliminar(null);
        } else {
            setShowConfirmadoEliminar(false);
            setArticuloAEliminar(null);
        }
    };

    const handleConfirmarEliminar = async () => {
        setShowConfirmadoEliminar(false);
        try {
            setExitoSubtitle('¡Artículo eliminado exitosamente!');
            setShowExitoModal(true);
            setArticuloAEliminar(null);
        } catch {
            setErrorMessage('No se pudo eliminar este artículo de la base de datos');
            setShowErrorModal(true);
            setArticuloAEliminar(null);
        }
    };

    const handleSaveNuevoArticulo = () => {
        setModalNuevoArticulo(false);
        setShowConfirmadoArticulo(true);
    };

    const handleCloseConfirmadoArticulo = () => {
        setShowConfirmadoArticulo(false);
        setModalNuevoArticulo(true);
    };

    const handleConfirmarArticulo = async () => {
        setShowConfirmadoArticulo(false);
        try {
            setShowExitoModal(true);
        } catch {
            setErrorMessage('No se pudo guardar este artículo en la base de datos');
            setShowErrorModal(true);
        }
    };

    const handleCloseExito = () => {
        setShowExitoModal(false);
    };

    const handleCloseError = () => {
        setShowErrorModal(false);
        setErrorMessage('');
    };

    const manejarBusquedaArticulo = () => {
        if (!busqueda.trim()) return;
        const encontrado = articulos.find(a => 
            a.codigo.toLowerCase() === busqueda.toLowerCase() ||
            a.descripcion.toLowerCase().includes(busqueda.toLowerCase())
        );
        if (encontrado) {
            setArticuloEncontrado(encontrado);
            setShowArticuloEncontrado(true);
        } else {
            setShowArticuloNoEncontrado(true);
        }
        setBusqueda('');
    };

    // TODO: El filtrado debe hacerse en el backend
    const articulosFiltrados = articulos;

    return (
        <>
            <div className="inventario-page">
                <div className="inventario-header">
                    <h1 className="inventario-title">Inventario</h1>
                    <button 
                        className="btn-nuevo-articulo" 
                        type="button" 
                        onClick={handleOpenNuevoArticulo}
                    >
                        <img src={iconNew} alt="" className="btn-nuevo-articulo-icon" />
                        Nuevo Artículo
                    </button>
                </div>

                <div className="kpi-grid inventario-kpi-grid">
                    <div className="kpi-card inventario-kpi-card">
                        <p className="kpi-label">Artículo más vendido</p>
                        <h2 className="kpi-value">{kpis.articuloMasVendido}</h2>
                    </div>
                    <div className="kpi-card inventario-kpi-card">
                        <p className="kpi-label">Artículo menos vendido</p>
                        <h2 className="kpi-value">{kpis.articuloMenosVendido}</h2>
                    </div>
                    <div className="kpi-card inventario-kpi-card">
                        <p className="kpi-label">Total de artículos</p>
                        <h2 className="kpi-value">{kpis.totalArticulos}</h2>
                    </div>
                    <div 
                        className="kpi-card inventario-kpi-card" 
                        style={{ cursor: 'pointer' }}
                        onClick={handleToggleModal}
                        ref={cardExistenciaRef}
                    >
                        <p className="kpi-label">Artículos con existencia baja</p>
                        <h2 className="kpi-value kpi-value-existencia-baja">{kpis.articulosExistenciaBaja}</h2>
                    </div>
                </div>

                <div className="inventario-table-card" ref={tableCardRef}>
                    <div className="inventario-table-controls">
                        <h3>Lista de artículos</h3>
                        <div className="inventario-search-wrapper">
                            <img src={iconSearch} alt="Buscar" className="inventario-search-icon" />
                            <input
                                type="text"
                                placeholder="Buscar por nombre o código del artículo"
                                value={busqueda}
                                onChange={handleBusquedaChange}
                                className="inventario-search-input"
                            />
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
                                {articulosFiltrados.length > 0 ? (
                                    articulosFiltrados.map((item, index) => (
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
                                                <button className="btn-delete" onClick={() => handleEliminarArticulo(item)}>
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
                onSave={handleSaveEditarArticulo}
                articuloData={selectedArticulo}
            />

            <ConfirmadoArticulo
                isOpen={showConfirmadoArticulo}
                onClose={handleCloseConfirmadoArticulo}
                onConfirm={handleConfirmarArticulo}
            />

            <ConfirmadoArticulo
                isOpen={showConfirmadoEditar}
                onClose={handleCloseConfirmadoEditar}
                onConfirm={handleConfirmarEditar}
                mensaje="¿Está seguro de que desea modificar este artículo?"
            />

            <ConfirmadoEliminarArticulo
                isOpen={showConfirmadoEliminar}
                onClose={handleCloseConfirmadoEliminar}
                onConfirm={handleConfirmarEliminar}
                mensaje="¿Está seguro de que desea eliminar este artículo?"
            />

            <ModalExito
                isOpen={showExitoModal}
                onClose={handleCloseExito}
                title="Confirmado"
                subtitle={exitoSubtitle}
                buttonLabel="Salir"
            />

            <ModalErrorArticulo
                isOpen={showErrorModal}
                onClose={handleCloseError}
                title="Error"
                message={errorMessage}
                retryMessage="Intente de nuevo"
                buttonLabel="Salir"
            />
        </>
    );
};

export default Inventario;
