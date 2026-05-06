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
import ModalErrorModificarUnidad from './ModalErrorModificarUnidad';
import ModalErrorEliminarUnidad from './ModalErrorEliminarUnidad';
import { fetchUnidadesMedida, createUnidadMedida, updateUnidadMedida, deleteUnidadMedida } from '../api/unidadesMedidaApi';

const PanelUnidadesMedida = () => {
    // Estados UI
    const [busqueda, setBusqueda] = useState('');
    const [isModalNuevaUnidadOpen, setIsModalNuevaUnidadOpen] = useState(false);
    const [isModalEditarUnidadOpen, setIsModalEditarUnidadOpen] = useState(false);
    const [unidadAEditar, setUnidadAEditar] = useState(null);
    const [isConfirmarEliminarOpen, setIsConfirmarEliminarOpen] = useState(false);
    const [unidadAEliminar, setUnidadAEliminar] = useState(null);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [showErrorModificarModal, setShowErrorModificarModal] = useState(false);
    const [showErrorEliminarModal, setShowErrorEliminarModal] = useState(false);
    const [successSubtitle, setSuccessSubtitle] = useState('');
    const [errorMessage, setErrorMessage] = useState('No se pudo guardar esta unidad de medida en la base de datos');
    
    // Datos del backend (vacíos hasta integrar)
    const [unidades, setUnidades] = useState([]);

    useEffect(() => {
        const loadData = async () => {
            try {
                const data = await fetchUnidadesMedida();
                setUnidades(data);
            } catch (error) {
                console.error('Error al cargar unidades de medida:', error);
            }
        };
        loadData();
    }, []);

    // TODO: El filtrado debe hacerse en el backend
    const unidadesFiltradas = unidades;

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
        if (unidadAEliminar) {
            try {
                await deleteUnidadMedida(unidadAEliminar.id);
                setUnidades(unidades.filter(u => u.id !== unidadAEliminar.id));
                setIsConfirmarEliminarOpen(false);
                setUnidadAEliminar(null);
                setSuccessSubtitle('¡Unidad de medida eliminada exitosamente!');
                setShowSuccessModal(true);
            } catch (error) {
                console.error('Error al eliminar unidad de medida:', error);
                setShowErrorEliminarModal(true);
            }
        }
    };

    const handleSaveUnidad = async (nuevaUnidad) => {
        try {
            const response = await createUnidadMedida(nuevaUnidad);
            setUnidades([...unidades, response]);
            setIsModalNuevaUnidadOpen(false);
            setSuccessSubtitle('¡Unidad de medida guardada exitosamente!');
            setShowSuccessModal(true);
        } catch (error) {
            console.error('Error al guardar unidad de medida:', error);
            setShowErrorModal(true);
        }
    };

    const handleUpdateUnidad = async (unidadActualizada) => {
        try {
            const response = await updateUnidadMedida(unidadActualizada.id, unidadActualizada);
            setUnidades(unidades.map(u => u.id === unidadActualizada.id ? response : u));
            setIsModalEditarUnidadOpen(false);
            setSuccessSubtitle('¡Unidad de medida modificada exitosamente!');
            setShowSuccessModal(true);
        } catch (error) {
            console.error('Error al actualizar unidad de medida:', error);
            setShowErrorModificarModal(true);
        }
    };

    // Calcular KPIs
    const totalUnidades = unidades.length;
    const unidadesPeso = unidades.filter(u => ['KG', 'GR'].includes(u.codigo)).length;
    const unidadesVolumen = unidades.filter(u => ['LT', 'ML', 'GL'].includes(u.codigo)).length;
    const unidadesLongitud = unidades.filter(u => ['MT', 'CM', 'MM'].includes(u.codigo)).length;

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
                    <h2 className="kpi-value">{totalUnidades}</h2>
                </div>
                <div className="kpi-card unidades-kpi-card">
                    <p className="kpi-label">Más usada</p>
                    <h2 className="kpi-value">{unidades[0]?.codigo || '-'}</h2>
                </div>
                <div className="kpi-card unidades-kpi-card">
                    <p className="kpi-label">Menos usada</p>
                    <h2 className="kpi-value">{unidades[unidades.length - 1]?.codigo || '-'}</h2>
                </div>
                <div className="kpi-card unidades-kpi-card">
                    <p className="kpi-label">Última agregada</p>
                    <h2 className="kpi-value">{unidades[unidades.length - 1]?.codigo || '-'}</h2>
                </div>
            </div>

            <div className="unidades-table-card">
                <div className="unidades-table-controls">
                    <h3>Lista de unidades</h3>
                    <div className="unidades-search-wrapper">
                        <img src={iconBuscar} alt="" className="unidades-search-icon" />
                        <input
                            type="text"
                            placeholder="Buscar por código de la unidad"
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
                            {unidadesFiltradas.length > 0 ? (
                                unidadesFiltradas.map((unidad) => (
                                    <tr key={unidad.id}>
                                        <td>{unidad.codigo}</td>
                                        <td>{unidad.descripcion}</td>
                                        <td>
                                            <div className="unidades-acciones">
                                                <button
                                                    className="btn-unidad-editar"
                                                    onClick={() => handleEditar(unidad.id)}
                                                    title="Editar"
                                                >
                                                    <img src={iconEditar} alt="" className="btn-unidad-icon" />
                                                </button>
                                                <button
                                                    className="btn-unidad-eliminar"
                                                    onClick={() => handleEliminar(unidad.id)}
                                                    title="Eliminar"
                                                >
                                                    <img src={iconEliminar} alt="" className="btn-unidad-icon" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td className="table-row-empty-cell" colSpan={3}>
                                        {busqueda ? 'No se encontraron unidades que coincidan con la búsqueda.' : 'No hay unidades de medida para mostrar.'}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <ModalNuevaUnidadMedida
                isOpen={isModalNuevaUnidadOpen}
                onClose={() => setIsModalNuevaUnidadOpen(false)}
                onSave={handleSaveUnidad}
            />

            <ModalEditarUnidadMedida
                isOpen={isModalEditarUnidadOpen}
                onClose={() => setIsModalEditarUnidadOpen(false)}
                onSave={handleUpdateUnidad}
                unidad={unidadAEditar}
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

            <ModalErrorModificarUnidad
                isOpen={showErrorModificarModal}
                onClose={() => setShowErrorModificarModal(false)}
            />

            <ModalErrorEliminarUnidad
                isOpen={showErrorEliminarModal}
                onClose={() => setShowErrorEliminarModal(false)}
            />
        </div>
    );
};

export default PanelUnidadesMedida;
