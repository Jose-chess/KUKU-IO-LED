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
import ModalErrorCliente from './ModalErrorCliente';
import ModalObservacion from './ModalObservacion';
import ModalClienteEncontrado from './ModalClienteEncontrado';

const Clientes = () => {
    const [isModalNuevoClienteOpen, setIsModalNuevoClienteOpen] = useState(false);
    const [showConfirmarNuevo, setShowConfirmarNuevo] = useState(false);
    const [showModificarModal, setShowModificarModal] = useState(false);
    const [showConfirmarMod, setShowConfirmarMod] = useState(false);
    const [showExitoModal, setShowExitoModal] = useState(false);
    const [exitoSubtitle, setExitoSubtitle] = useState('');
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [showObservacionModal, setShowObservacionModal] = useState(false);
    const [observacionActual, setObservacionActual] = useState('');
    const [busquedaCliente, setBusquedaCliente] = useState('');
    const [showClienteEncontradoModal, setShowClienteEncontradoModal] = useState(false);
    const [clienteEncontradoData, setClienteEncontradoData] = useState(null);
    const [selectedCliente, setSelectedCliente] = useState(null);
    const [clientes] = useState([]);

    const clientesBusquedaDemo = [];

    const totalClientes = clientes.length;
    const clientesNuevosMes = clientes.length;
    const clientesFrecuentes = clientes.length;
    const promedioCompra = 0;

    const formatMoney = (value) => {
        const numericValue = Number(String(value ?? '').replace(/[^\d.]/g, ''));
        if (Number.isNaN(numericValue)) {
            return '$ 0';
        }
        return `$ ${numericValue.toLocaleString('es-DO')}`;
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
        setExitoSubtitle('Cliente guardado exitosamente!');
        setShowExitoModal(true);
    };

    const handleGuardarModificacion = () => {
        setShowConfirmarMod(true);
    };

    const ejecutarUpdate = () => {
        setShowConfirmarMod(false);
        setShowModificarModal(false);
        setExitoSubtitle('Cliente modificado exitosamente!');
        setShowExitoModal(true);
    };

    const handleCloseExito = () => {
        setShowExitoModal(false);
        setExitoSubtitle('');
        setSelectedCliente(null);
    };

    const handleCloseError = () => {
        setShowErrorModal(false);
    };

    const handleAbrirObs = (contenido) => {
        setObservacionActual(contenido || 'Sin observaciones registradas.');
        setShowObservacionModal(true);
    };

    const handleCerrarObs = () => {
        setShowObservacionModal(false);
        setObservacionActual('');
    };

    const handleBuscarCliente = () => {
        const termino = busquedaCliente.trim().toLowerCase();
        if (!termino) {
            setShowErrorModal(true);
            return;
        }

        const fuenteBusqueda = clientes.length > 0 ? clientes : clientesBusquedaDemo;
        const clienteEncontrado = fuenteBusqueda.find((cliente) =>
            [cliente.codigo, cliente.nombre, cliente.apellido]
                .filter(Boolean)
                .some((valor) => String(valor).toLowerCase().includes(termino)),
        );

        if (clienteEncontrado) {
            setClienteEncontradoData(clienteEncontrado);
            setShowClienteEncontradoModal(true);
            setShowErrorModal(false);
        } else {
            setShowErrorModal(true);
        }
    };

    const handleCerrarClienteEncontrado = () => {
        setShowClienteEncontradoModal(false);
        setClienteEncontradoData(null);
    };

    const handleEditarDesdeClienteEncontrado = (cliente) => {
        if (!cliente) {
            return;
        }

        setSelectedCliente({
            ...cliente,
            limiteCredito: cliente.limiteCredito ?? cliente.limite ?? '',
            balanceActual: cliente.balanceActual ?? cliente.balance ?? '',
            observacion: cliente.observacion ?? cliente.observaciones ?? '',
        });
        setShowClienteEncontradoModal(false);
        setShowModificarModal(true);
    };

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
                    <h2 className="kpi-value">{totalClientes}</h2>
                </div>
                <div className="kpi-card clientes-kpi-card">
                    <p className="kpi-label">Clientes nuevos este mes</p>
                    <h2 className="kpi-value">{clientesNuevosMes}</h2>
                </div>
                <div className="kpi-card clientes-kpi-card">
                    <p className="kpi-label">Clientes mas frecuentes</p>
                    <h2 className="kpi-value">{clientesFrecuentes}</h2>
                </div>
                <div className="kpi-card clientes-kpi-card">
                    <p className="kpi-label">Promedio de compra por cliente</p>
                    <h2 className="kpi-value">${promedioCompra.toLocaleString()}</h2>
                </div>
            </div>

            <div className="clientes-table-card">
                <div className="clientes-table-controls">
                    <div>
                        <h3>Lista de clientes</h3>
                    </div>

                    <div className="search-box">
                        <div className="search-input-wrapper">
                            <img src={iconBuscar} alt="Buscar" className="search-icon" />
                            <input
                                type="text"
                                placeholder="Buscar por nombre del cliente"
                                value={busquedaCliente}
                                onChange={(e) => setBusquedaCliente(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        handleBuscarCliente();
                                    }
                                }}
                            />
                        </div>
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
                            {clientes.length === 0 ? (
                                <tr>
                                    <td className="table-row-empty-cell" colSpan={11}>
                                        No hay clientes para mostrar.
                                    </td>
                                </tr>
                            ) : (
                                clientes.map((cliente) => (
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

            <ModalErrorCliente
                isOpen={showErrorModal}
                onClose={handleCloseError}
                title="Cliente no encontrado"
                message=""
                retryMessage=""
            />

            <ModalObservacion
                isOpen={showObservacionModal}
                onClose={handleCerrarObs}
                contenido={observacionActual}
            />

            <ModalClienteEncontrado
                isOpen={showClienteEncontradoModal}
                onClose={handleCerrarClienteEncontrado}
                clienteData={clienteEncontradoData}
                onEdit={handleEditarDesdeClienteEncontrado}
            />
        </div>
    );
};

export default Clientes;