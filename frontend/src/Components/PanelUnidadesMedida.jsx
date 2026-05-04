import React, { useState, useEffect } from 'react';
import './PanelUnidadesMedida.css';
import iconBuscar from '../assets/search.svg';
import iconEditar from '../assets/edit.svg';
import iconEliminar from '../assets/trash.svg';
import iconNuevo from '../assets/new-section.svg';
import ModalNuevaUnidadMedida from './ModalNuevaUnidadMedida';
import ModalEditarUnidadMedida from './ModalEditarUnidadMedida';
import ModalConfirmado from './ModalConfirmado';
import ModalConfirmar from './ModalConfirmar';
import ModalErrorUnidadMedida from './ModalErrorUnidadMedida';
import ModalErrorEliminarUnidad from './ModalErrorEliminarUnidad';
import { fetchUnidadesMedida, createUnidadMedida, updateUnidadMedida, deleteUnidadMedida } from '../api/unidadesMedidaApi';

const PanelUnidadesMedida = () => {
    const [busqueda, setBusqueda] = useState('');
    const [isModalNuevaUnidadOpen, setIsModalNuevaUnidadOpen] = useState(false);
    const [isModalEditarUnidadOpen, setIsModalEditarUnidadOpen] = useState(false);
    const [unidadAEditar, setUnidadAEditar] = useState(null);
    const [isConfirmarEliminarOpen, setIsConfirmarEliminarOpen] = useState(false);
    const [unidadAEliminar, setUnidadAEliminar] = useState(null);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [showErrorEliminarModal, setShowErrorEliminarModal] = useState(false);
    const [successSubtitle, setSuccessSubtitle] = useState('');
    const [loading, setLoading] = useState(false);
    const [unidades, setUnidades] = useState([]);
    const [showConfirmarNueva, setShowConfirmarNueva] = useState(false);
    const [pendingNuevaUnidad, setPendingNuevaUnidad] = useState(null);
    const [showConfirmarSalirNueva, setShowConfirmarSalirNueva] = useState(false);
    const [showConfirmarMod, setShowConfirmarMod] = useState(false);
    const [pendingModUnidad, setPendingModUnidad] = useState(null);

    const loadUnidades = async () => {
        setLoading(true);
        try {
            const data = await fetchUnidadesMedida();
            setUnidades(data);
        } catch (error) {
            console.error('Error cargando unidades:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadUnidades();
    }, []);

    const unidadesFiltradas = unidades.filter(u => {
        if (!busqueda) return true;
        const t = busqueda.toLowerCase();
        return (u.codigo || '').toLowerCase().includes(t) ||
               (u.descripcion || '').toLowerCase().includes(t);
    });

    const handleEditar = (id) => {
        const unidad = unidades.find(u => u.id === id);
        if (unidad) {
            setUnidadAEditar(unidad);
            setIsModalEditarUnidadOpen(true);
        }
    };

    const handleEliminar = (id) => {
        const unidad = unidades.find(u => u.id === id);
        if (unidad) {
            setUnidadAEliminar(unidad);
            setIsConfirmarEliminarOpen(true);
        }
    };

    const handleConfirmEliminar = async () => {
        if (!unidadAEliminar) return;
        try {
            await deleteUnidadMedida(unidadAEliminar.id);
            setIsConfirmarEliminarOpen(false);
            setUnidadAEliminar(null);
            setSuccessSubtitle('¡Unidad de medida eliminada exitosamente!');
            setShowSuccessModal(true);
            loadUnidades();
        } catch {
            setIsConfirmarEliminarOpen(false);
            setShowErrorEliminarModal(true);
        }
    };

    const handleSaveUnidad = ({ codigo, descripcion }) => {
        setPendingNuevaUnidad({ codigo, descripcion });
        setShowConfirmarNueva(true);
    };

    const ejecutarGuardarNuevaUnidad = async () => {
        if (!pendingNuevaUnidad) return;
        try {
            await createUnidadMedida(pendingNuevaUnidad);
            setShowConfirmarNueva(false);
            setIsModalNuevaUnidadOpen(false);
            setPendingNuevaUnidad(null);
            setSuccessSubtitle('¡Unidad de medida guardada exitosamente!');
            setShowSuccessModal(true);
            loadUnidades();
        } catch {
            setShowConfirmarNueva(false);
            setIsModalNuevaUnidadOpen(false);
            setPendingNuevaUnidad(null);
            setShowErrorModal(true);
        }
    };

    const handleUpdateUnidad = ({ id, codigo, descripcion }) => {
        setPendingModUnidad({ id, codigo, descripcion });
        setShowConfirmarMod(true);
    };

    const ejecutarModificarUnidad = async () => {
        if (!pendingModUnidad) return;
        try {
            await updateUnidadMedida(pendingModUnidad.id, { 
                codigo: pendingModUnidad.codigo, 
                descripcion: pendingModUnidad.descripcion 
            });
            setShowConfirmarMod(false);
            setIsModalEditarUnidadOpen(false);
            setPendingModUnidad(null);
            setSuccessSubtitle('¡Unidad de medida modificada exitosamente!');
            setShowSuccessModal(true);
            loadUnidades();
        } catch {
            setShowConfirmarMod(false);
            setIsModalEditarUnidadOpen(false);
            setPendingModUnidad(null);
            setShowErrorModal(true);
        }
    };

    return (
        <div className="unidades-page">
            <div className="unidades-header">
                <h1 className="unidades-title">Unidades de Medida</h1>
                <button className="unidades-btn-nuevo" onClick={() => setIsModalNuevaUnidadOpen(true)}>
                    <img src={iconNuevo} alt="" className="unidades-btn-icon" />
                    Ingresar Unidades
                </button>
            </div>

            <div className="kpi-grid unidades-kpi-grid">
                <div className="kpi-card unidades-kpi-card">
                    <p className="kpi-label">Total activas</p>
                    <h2 className="kpi-value">{unidades.length}</h2>
                </div>
                <div className="kpi-card unidades-kpi-card">
                    <p className="kpi-label">Primera registrada</p>
                    <h2 className="kpi-value">{unidades[0]?.codigo || '-'}</h2>
                </div>
                <div className="kpi-card unidades-kpi-card">
                    <p className="kpi-label">Última registrada</p>
                    <h2 className="kpi-value">{unidades[unidades.length - 1]?.codigo || '-'}</h2>
                </div>
                <div className="kpi-card unidades-kpi-card">
                    <p className="kpi-label">Total en búsqueda</p>
                    <h2 className="kpi-value">{unidadesFiltradas.length}</h2>
                </div>
            </div>

            <div className="unidades-table-card">
                <div className="unidades-table-controls">
                    <h3>Lista de unidades</h3>
                    <div className="unidades-search-wrapper">
                        <img src={iconBuscar} alt="" className="unidades-search-icon" />
                        <input
                            type="text"
                            placeholder="Buscar por código o descripción"
                            value={busqueda}
                            onChange={(e) => setBusqueda(e.target.value)}
                            className="unidades-search-input"
                        />
                    </div>
                </div>

                <div className="unidades-table-wrapper">
                    <table className="unidades-table">
                        <thead>
                            <tr>
                                <th>Código</th>
                                <th>Descripción</th>
                                <th>Acción</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr><td className="table-row-empty-cell" colSpan={3}>Cargando...</td></tr>
                            ) : unidadesFiltradas.length > 0 ? (
                                unidadesFiltradas.map((unidad) => (
                                    <tr key={unidad.id}>
                                        <td>{unidad.codigo}</td>
                                        <td>{unidad.descripcion}</td>
                                        <td>
                                            <div className="unidades-acciones">
                                                <button className="btn-unidad-editar" onClick={() => handleEditar(unidad.id)}>
                                                    <img src={iconEditar} alt="" className="btn-unidad-icon" />
                                                </button>
                                                <button className="btn-unidad-eliminar" onClick={() => handleEliminar(unidad.id)}>
                                                    <img src={iconEliminar} alt="" className="btn-unidad-icon" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td className="table-row-empty-cell" colSpan={3}>
                                        {busqueda ? 'No se encontraron unidades.' : 'No hay unidades de medida para mostrar.'}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <ModalNuevaUnidadMedida
                isOpen={isModalNuevaUnidadOpen && !showConfirmarNueva && !showConfirmarSalirNueva}
                onClose={() => setShowConfirmarSalirNueva(true)}
                onSave={handleSaveUnidad}
                initialData={pendingNuevaUnidad}
            />
            <ModalConfirmar
                isOpen={showConfirmarNueva}
                onClose={() => setShowConfirmarNueva(false)}
                onConfirm={ejecutarGuardarNuevaUnidad}
                mensaje="¿Está seguro de que desea guardar esta unidad de medida?"
            />
            <ModalConfirmar
                isOpen={showConfirmarSalirNueva}
                onClose={() => setShowConfirmarSalirNueva(false)}
                onConfirm={() => {
                    setShowConfirmarSalirNueva(false);
                    setIsModalNuevaUnidadOpen(false);
                }}
                mensaje="¿Está seguro de que desea salir?"
            />
            <ModalEditarUnidadMedida
                isOpen={isModalEditarUnidadOpen && !showConfirmarMod}
                onClose={() => {
                    setIsModalEditarUnidadOpen(false);
                    setPendingModUnidad(null);
                }}
                onSave={handleUpdateUnidad}
                unidad={unidadAEditar}
            />
            <ModalConfirmar
                isOpen={showConfirmarMod}
                onClose={() => setShowConfirmarMod(false)}
                onConfirm={ejecutarModificarUnidad}
                mensaje="¿Está seguro de que desea modificar esta unidad de medida?"
            />
            <ModalConfirmado
                isOpen={showSuccessModal}
                onClose={() => setShowSuccessModal(false)}
                title="Confirmado"
                subtitle={successSubtitle}
            />
            <ModalConfirmar
                isOpen={isConfirmarEliminarOpen}
                onClose={() => setIsConfirmarEliminarOpen(false)}
                onConfirm={handleConfirmEliminar}
                mensaje="¿Está seguro de que desea eliminar esta unidad de medida?"
            />
            <ModalErrorUnidadMedida
                isOpen={showErrorModal}
                onClose={() => setShowErrorModal(false)}
            />
            <ModalErrorEliminarUnidad
                isOpen={showErrorEliminarModal}
                onClose={() => setShowErrorEliminarModal(false)}
            />
        </div>
    );
};

export default PanelUnidadesMedida;