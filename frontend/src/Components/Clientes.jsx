import React, { useState, useEffect, useRef } from 'react';
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
import ModalConfirmar from './ModalConfirmar';
import { createCliente, fetchClientes, fetchNextClienteCode, updateCliente } from '../api/clientesApi';

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
    const searchInputRef = useRef(null);
    const [selectedCliente, setSelectedCliente] = useState(null);
    const [nextClienteCode, setNextClienteCode] = useState('');
    const [loading, setLoading] = useState(false);
    const [pendingNuevoCliente, setPendingNuevoCliente] = useState(null);
    const [showConfirmarSalirNuevo, setShowConfirmarSalirNuevo] = useState(false);
    
    // Datos del backend
    const [clientes, setClientes] = useState([]);
    const [kpis, setKpis] = useState({
        totalClientes: 0,
        clientesNuevosMes: 0,
        clientesFrecuentes: 0,
        promedioCompra: 0
    });

    // Obtener próximo código de cliente
    const fetchNextCode = async () => {
        try {
            const data = await fetchNextClienteCode();
            setNextClienteCode(data.codigo);
        } catch (error) {
            console.error('Error obteniendo código:', error);
            setNextClienteCode('C-0001');
        }
    };

    const handleOpenNuevoCliente = () => {
        setIsModalNuevoClienteOpen(true);
    };

    // Precargar código y cargar clientes al montar componente
    useEffect(() => {
        fetchNextCode();
        loadClientes();
    }, []);

    // Cargar clientes desde backend
    const loadClientes = async () => {
        setLoading(true);
        try {
            const clientesData = await fetchClientes(busquedaCliente);
            setClientes(clientesData);
            
            // Debug: Ver qué está llegando del backend
            console.log('Clientes recibidos:', clientesData);
            if (clientesData.length > 0) {
                console.log('Primer cliente:', clientesData[0]);
                console.log('CreatedAt del primer cliente:', clientesData[0].createdAt);
            }

            // Calcular KPIs basados en datos reales
            const now = new Date();
            const currentMonth = now.getMonth();
            const currentYear = now.getFullYear();
            
            // Clientes nuevos este mes (con fecha de creación en el mes actual)
            const clientesNuevosMes = clientesData.filter(c => {
                // Manejar diferentes nombres de campo posibles
                const fechaCreacion = c.createdAt || c.created_at || c.CreatedAt;
                if (!fechaCreacion || fechaCreacion === '0001-01-01T00:00:00') {
                    console.log('Cliente sin fecha de creación válida:', c.codigo);
                    return false;
                }
                const created = new Date(fechaCreacion);
                // Verificar que la fecha sea válida (no año 1)
                if (created.getFullYear() < 2000) {
                    console.log('Fecha inválida para cliente:', c.codigo, fechaCreacion);
                    return false;
                }
                console.log('Cliente', c.codigo, 'creado:', created.toISOString().split('T')[0]);
                return created.getMonth() === currentMonth && created.getFullYear() === currentYear;
            }).length;
            
            // TODO: calcular clientes frecuentes desde el módulo de ventas - un cliente es frecuente cuando tiene más de una compra registrada
            const clientesFrecuentes = 0;
            
            // Promedio de balance (como proxy de compra hasta tener datos de ventas)
            const promedioCompra = clientesData.length > 0 
                ? clientesData.reduce((sum, c) => sum + (c.balance_actual || 0), 0) / clientesData.length 
                : 0;
            
            setKpis({
                totalClientes: clientesData.length,
                clientesNuevosMes: clientesNuevosMes,
                clientesFrecuentes: clientesFrecuentes,
                promedioCompra: promedioCompra
            });
        } catch (error) {
            console.error('Error cargando clientes:', error);
        } finally {
            setLoading(false);
        }
    };

    // Recargar cuando cambia la búsqueda
    useEffect(() => {
        loadClientes();
    }, [busquedaCliente]);

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

    const ejecutarGuardarNuevoCliente = async () => {
        if (!pendingNuevoCliente) {
            return;
        }

        try {
            await createCliente(pendingNuevoCliente);

            setShowConfirmarNuevo(false);
            setIsModalNuevoClienteOpen(false);
            setExitoSubtitle('¡Cliente guardado exitosamente!');
            setShowExitoModal(true);
            setBusquedaCliente('');
            setTimeout(() => {
                setShowExitoModal(false);
                loadClientes();
            }, 3000);
            setSelectedCliente(null);
            setPendingNuevoCliente(null);
        } catch (error) {
            console.error('Error al crear cliente:', error);
            alert('Error al guardar cliente: ' + error.message);
        }
    };

    const [modificarClienteData, setModificarClienteData] = useState(null);

    const handleGuardarModificacion = (formData) => {
        setModificarClienteData(formData);
        setShowConfirmarMod(true);
    };

    const ejecutarUpdate = async () => {
        if (!modificarClienteData || !selectedCliente) return;

        try {
            const clientePayload = {
                nombre: modificarClienteData.nombre,
                apellido: modificarClienteData.apellido,
                rncCedula: modificarClienteData.rncCedula,
                direccion: modificarClienteData.direccion,
                sector: modificarClienteData.sector,
                ciudad: modificarClienteData.ciudad,
                telefono: modificarClienteData.telefono,
                limiteCredito: parseFloat(modificarClienteData.limiteCredito) || 0,
                balanceActual: parseFloat(modificarClienteData.balanceActual) || 0,
                observacion: modificarClienteData.observacion,
                activo: true
            };

            await updateCliente(selectedCliente.id, clientePayload);

            setShowConfirmarMod(false);
            setShowModificarModal(false);
            setExitoSubtitle('¡Cliente modificado exitosamente!');
            setShowExitoModal(true);
            setBusquedaCliente('');
            setModificarClienteData(null);
            // Recargar lista de clientes
            loadClientes();
        } catch (error) {
            console.error('Error:', error);
            alert('Error al actualizar cliente: ' + error.message);
        }
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
                    onClick={handleOpenNuevoCliente}
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
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    setBusquedaCliente('');
                                }
                                if (e.key === 'Escape') {
                                    setBusquedaCliente('');
                                    searchInputRef.current?.blur();
                                }
                            }}
                            ref={searchInputRef}
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
                                <th>RNC/Cédula</th>
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
                            {loading ? (
                                <tr>
                                    <td className="table-row-empty-cell" colSpan={12}>
                                        Cargando clientes...
                                    </td>
                                </tr>
                            ) : clientesFiltrados.length === 0 ? (
                                <tr>
                                    <td className="table-row-empty-cell" colSpan={12}>
                                        {busquedaCliente ? 'No se encontraron clientes que coincidan con la búsqueda.' : 'No hay clientes para mostrar.'}
                                    </td>
                                </tr>
                            ) : (
                                clientesFiltrados.map((cliente) => (
                                    <tr key={cliente.id}>
                                        <td>{cliente.codigo}</td>
                                        <td>{cliente.nombre}</td>
                                        <td>{cliente.apellido}</td>
                                        <td>{cliente.rnc_cedula}</td>
                                        <td>{cliente.direccion}</td>
                                        <td>{cliente.sector}</td>
                                        <td>{cliente.ciudad}</td>
                                        <td>{cliente.telefono}</td>
                                        <td>{formatMoney(cliente.limite_credito)}</td>
                                        <td>{formatMoney(cliente.balance_actual)}</td>
                                        <td
                                            className="cell-observacion"
                                            onClick={() => handleAbrirObs(cliente.observacion)}
                                            title={cliente.observacion || 'Sin observaciones'}
                                        >
                                            {cliente.observacion 
                                                ? (cliente.observacion.length > 17 
                                                    ? cliente.observacion.substring(0, 17) + '...' 
                                                    : cliente.observacion)
                                                : 'Sin observaciones'}
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
                isOpen={isModalNuevoClienteOpen && !showConfirmarNuevo && !showConfirmarSalirNuevo}
                onClose={() => setShowConfirmarSalirNuevo(true)}
                onSave={(payload) => {
                    setPendingNuevoCliente(payload);
                    handleGuardarNuevoCliente();
                }}
                codigo={nextClienteCode}
            />

            <ModalConfirmar
                isOpen={showConfirmarNuevo}
                onClose={() => setShowConfirmarNuevo(false)}
                onConfirm={ejecutarGuardarNuevoCliente}
                mensaje="¿Está seguro de que desea guardar este cliente?"
            />
            <ModalConfirmar
                isOpen={showConfirmarSalirNuevo}
                onClose={() => setShowConfirmarSalirNuevo(false)}
                onConfirm={() => {
                    setShowConfirmarSalirNuevo(false);
                    setIsModalNuevoClienteOpen(false);
                }}
                mensaje="¿Está seguro de que desea salir?"
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