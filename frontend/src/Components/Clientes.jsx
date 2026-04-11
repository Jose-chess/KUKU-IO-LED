import React, { useState } from 'react';
import './Clientes.css';
import iconNuevoCliente from '../assets/new-section.svg';
import iconBuscar from '../assets/search.svg';
import ModalNuevoCliente from './ModalNuevoCliente';

const Clientes = () => {
    const [isModalNuevoClienteOpen, setIsModalNuevoClienteOpen] = useState(false);
    const totalClientes = 0;
    const clientesNuevosMes = 0;
    const clientesFrecuentes = 0;
    const promedioCompra = 0;

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
                            <input type="text" placeholder="Buscar por nombre del cliente" />
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
                            <tr>
                                <td colSpan="11">&nbsp;</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <ModalNuevoCliente
                isOpen={isModalNuevoClienteOpen}
                onClose={() => setIsModalNuevoClienteOpen(false)}
                onSave={(cliente) => {
                    console.log('Cliente guardado:', cliente);
                }}
            />
        </div>
    );
};

export default Clientes;