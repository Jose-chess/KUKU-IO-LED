import React, { useState } from 'react';
import './Clientes.css';
import iconNuevoCliente from '../assets/new-section.svg';
import iconBuscar from '../assets/search.svg';
import iconEdit from '../assets/edit.svg';
import ModalNuevoCliente from './ModalNuevoCliente';
import ModalModificarCliente from './ModalModificarCliente';
import ModalConfirmarCliente from './ModalConfirmarCliente';
import ModalConfirmarModificacion from './ModalConfirmarModificacion';
import ModalExito from './ModalExito';
import ModalObservacion from './ModalObservacion';
// TODO: Importar API calls cuando el backend esté listo
// import { fetchClientes, createCliente, updateCliente } from '../api/clientesApi';

const Clientes = () => {
    // Estados UI
    const [isModalNuevoClienteOpen, setIsModalNuevoClienteOpen] = useState(false);
    const [showConfirmarNuevo, setShowConfirmarNuevo] = useState(false);
    const [showModificarModal, setShowModificarModal] = useState(false);
    const [showConfirmarMod, setShowConfirmarMod] = useState(false);
    const [showExitoModal, setShowExitoModal] = useState(false);
    const [exitoSubtitle, setExitoSubtitle] = useState('');
    const [showObservacionModal, setShowObservacionModal] = useState(false);
    const [observacionActual, setObservacionActual] = useState('');
    const [busquedaCliente, setBusquedaCliente] = useState('');
    const [selectedCliente, setSelectedCliente] = useState(null);
    
    // Datos del backend (vacíos hasta integrar)
    const [clientes, setClientes] = useState([]);
    const [kpis, setKpis] = useState({
        totalClientes: 0,
        clientesNuevosMes: 0,
        clientesFrecuentes: 0,
        promedioCompra: 0
    });

    // TODO: useEffect para cargar datos desde backend
    // useEffect(() => {
    //     const loadData = async () => {
    //         const [clientesData, kpisData] = await Promise.all([
    //             fetchClientes(busquedaCliente),
    //             fetchKpisClientes()
    //         ]);
    //         setClientes(clientesData);
    //         setKpis(kpisData);
    //     };
    //     loadData();
    // }, [busquedaCliente]);

    // TODO: Mover a utils/formatters.js
    const formatMoney = (value) => {
        if (!value || isNaN(value)) return '$ 0';
        return `$ ${Number(value).toLocaleString('es-DO')}`;
    };

    const handleOpenModificar = (cliente) => {
        setSelectedCliente(cliente);
        setShowModificarModal(true);
    };

    const handleGuardarNuevoCliente = () => {
        setShowConfirmarNuevo(true);
    };

    const ejecutarGuardarNuevoCliente = () => {
        setShowConfirmarNuevo(false);
        setIsModalNuevoClienteOpen(false);
        setExitoSubtitle('¡Cliente guardado exitosamente!');
        setShowExitoModal(true);
    };

    const handleGuardarModificacion = () => {
        setShowConfirmarMod(true);
    };

    const ejecutarUpdate = () => {
        setShowConfirmarMod(false);
        setShowModificarModal(false);
        setExitoSubtitle('¡Cliente modificado exitosamente!');
        setShowExitoModal(true);
    };

    const handleCloseExito = () => {
        setShowExitoModal(false);
        setExitoSubtitle('');
        setSelectedCliente(null);
    };

    const handleAbrirObs = (contenido) => {
        setObservacionActual(contenido || 'Sin observaciones registradas.');
        setShowObservacionModal(true);
    };

    const handleCerrarObs = () => {
        setShowObservacionModal(false);
        setObservacionActual('');
    };

    const clientesFiltrados = clientes.filter(cliente => {
        if (!busquedaCliente) return true;
        const termino = busquedaCliente.toLowerCase();
        return [cliente.codigo, cliente.nombre, cliente.apellido]
            .filter(Boolean)
            .some(valor => String(valor).toLowerCase().includes(termino));
    });

    return (
        <div className="clientes-page">
            <div className="clientes-header">
                <div>
                    <h1 className="clientes-title">Clientes</h1>
                </div>

                <button
                    className="btn-nuevo-cliente"
                    type="button"
                    onClick={() => setIsModalNuevoClienteOpen(true)}
                >
                    <img src={iconNuevoCliente} alt="" className="btn-nuevo-cliente-icon" />
                    Nuevo Cliente
                </button>
            </div>

            <div className="kpi-grid clientes-kpi-grid">
                <div className="kpi-card clientes-kpi-card">
                    <p className="kpi-label">Total de clientes registrados</p>
                    <h3 className="kpi-value">{kpis.totalClientes}</h3>
                </div>
                <div className="kpi-card clientes-kpi-card">
                    <p className="kpi-label">Clientes nuevos este mes</p>
                    <h3 className="kpi-value">{kpis.clientesNuevosMes}</h3>
                </div>
                <div className="kpi-card clientes-kpi-card">
                    <p className="kpi-label">Clientes mas frecuentes</p>
                    <h2 className="kpi-value">{kpis.clientesFrecuentes}</h2>
                </div>
                <div className="kpi-card clientes-kpi-card">
                    <p className="kpi-label">Promedio de compra por cliente</p>
                    <h2 className="kpi-value">{formatMoney(kpis.promedioCompra)}</h2>
                </div>
            </div>

            <div className="clientes-table-card">
                <div className="clientes-table-controls">
                    <div>
                        <h3>Lista de clientes</h3>
                    </div>

                    <div className="clientes-search-wrapper">
                        <img src={iconBuscar} alt="Buscar" className="clientes-search-icon" />
                        <input
                            type="text"
                            placeholder="Buscar por nombre del cliente"
                            value={busquedaCliente}
                            onChange={(e) => setBusquedaCliente(e.target.value)}
                            className="clientes-search-input"
                        />
                    </div>
                </div>

                <div className="clientes-table-wrapper">
                    <table className="clientes-table">
                        <thead>
                            <tr>
                                <th>Código</th>
                                <th>Nombre</th>
                                <th>Apellido</th>
                                <th>Dirección</th>
                                <th>Sector</th>
                                <th>Ciudad</th>
                                <th>Teléfono</th>
                                <th>Límite de Crédito</th>
                                <th>Balance</th>
                                <th>Observaciones</th>
                                <th>Acción</th>
                            </tr>
                        </thead>
                        <tbody>
                            {clientesFiltrados.length === 0 ? (
                                <tr>
                                    <td className="table-row-empty-cell" colSpan={11}>
                                        {busquedaCliente ? 'No se encontraron clientes que coincidan con la búsqueda.' : 'No hay clientes para mostrar.'}
                                    </td>
                                </tr>
                            ) : (
                                clientesFiltrados.map((cliente) => (
                                    <tr key={cliente.id}>
                                        <td>{cliente.codigo}</td>
                                        <td>{cliente.nombre}</td>
                                        <td>{cliente.apellido}</td>
                                        <td>{cliente.direccion}</td>
                                        <td>{cliente.sector}</td>
                                        <td>{cliente.ciudad}</td>
                                        <td>{cliente.telefono}</td>
                                        <td>{formatMoney(cliente.limiteCredito)}</td>
                                        <td>{formatMoney(cliente.balanceActual)}</td>
                                        <td
                                            className="cell-observacion"
                                            onClick={() => handleAbrirObs(cliente.observacion)}
                                        >
                                            {cliente.observacion || 'Sin observaciones'}
                                        </td>
                                        <td className="accion-cell">
                                            <button
                                                className="btn-edit"
                                                type="button"
                                                onClick={() => handleOpenModificar(cliente)}
                                                aria-label="Editar cliente"
                                            >
                                                <img src={iconEdit} alt="" className="btn-edit-icon" />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <ModalNuevoCliente
                isOpen={isModalNuevoClienteOpen && !showConfirmarNuevo}
                onClose={() => setIsModalNuevoClienteOpen(false)}
                onSave={handleGuardarNuevoCliente}
            />

            <ModalConfirmarCliente
                isOpen={showConfirmarNuevo}
                onClose={() => setShowConfirmarNuevo(false)}
                onConfirm={ejecutarGuardarNuevoCliente}
            />

            <ModalModificarCliente
                isOpen={showModificarModal && !showConfirmarMod}
                onClose={() => setShowModificarModal(false)}
                onUpdate={handleGuardarModificacion}
                clienteData={selectedCliente}
            />

            <ModalConfirmarModificacion
                isOpen={showConfirmarMod}
                onClose={() => setShowConfirmarMod(false)}
                onConfirm={ejecutarUpdate}
            />

            <ModalExito
                isOpen={showExitoModal}
                onClose={handleCloseExito}
                title="Confirmado"
                subtitle={exitoSubtitle}
                buttonLabel="Salir"
            />

            <ModalObservacion
                isOpen={showObservacionModal}
                onClose={handleCerrarObs}
                contenido={observacionActual}
            />
        </div>
    );
};

export default Clientes;