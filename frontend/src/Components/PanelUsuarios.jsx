import React, { useState } from 'react';
import ModalConfirmado from './ModalConfirmado';
import ModalNuevoUsuario from './ModalNuevoUsuario';
import ModalEditarUsuario from './ModalEditarUsuario';
import ModalErrorUsuario from './ModalErrorUsuario';
import './PanelUsuarios.css';
import iconBuscar from '../assets/search.svg';
import iconEditar from '../assets/edit.svg';
import iconNuevo from '../assets/new-section.svg';
// TODO: Importar API calls cuando el backend esté listo
// import { fetchUsuarios, createUsuario, updateUsuario } from '../api/usuariosApi';

const PanelUsuarios = () => {
    // Estados UI
    const [busqueda, setBusqueda] = useState('');
    const [isModalNuevoOpen, setIsModalNuevoOpen] = useState(false);
    const [isModalEditarOpen, setIsModalEditarOpen] = useState(false);
    const [usuarioAEditar, setUsuarioAEditar] = useState(null);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successSubtitle, setSuccessSubtitle] = useState('');
    
    // Datos del backend (vacíos hasta integrar)
    const [usuarios, setUsuarios] = useState([]);
    const [kpis, setKpis] = useState({
        totalUsuarios: 0,
        usuariosActivos: 0,
        administradores: 0
    });

    // TODO: useEffect para cargar datos desde backend
    // useEffect(() => {
    //     const loadData = async () => {
    //         const [usuariosData, kpisData] = await Promise.all([
    //             fetchUsuarios(),
    //             fetchKpisUsuarios()
    //         ]);
    //         setUsuarios(usuariosData);
    //         setKpis(kpisData);
    //     };
    //     loadData();
    // }, []);

    // TODO: El filtrado debe hacerse en el backend
    const usuariosFiltrados = usuarios;

    const handleEditar = (usuario) => {
        setUsuarioAEditar(usuario);
        setIsModalEditarOpen(true);
    };

    const handleSaveUsuario = (nuevoUsuario) => {
        // TODO: Llamar al backend para guardar
        // const response = await createUsuario(nuevoUsuario);
        // setUsuarios([...usuarios, response]);
        setIsModalNuevoOpen(false);
        setSuccessSubtitle('¡Usuario guardado exitosamente!');
        setShowSuccessModal(true);
    };

    const handleUpdateUsuario = (usuarioEditado) => {
        setUsuarios(usuarios.map(u => u.id === usuarioEditado.id ? usuarioEditado : u));
        setIsModalEditarOpen(false);
        setSuccessSubtitle('¡Usuario actualizado exitosamente!');
        setShowSuccessModal(true);
    };

    return (
        <div className="usuarios-page">
            <div className="usuarios-header">
                <h1 className="usuarios-title">Usuarios del Sistema</h1>
                <button className="usuarios-btn-nuevo" onClick={() => setIsModalNuevoOpen(true)}>
                    <img src={iconNuevo} alt="" className="usuarios-btn-icon" />
                    Ingresar Usuarios
                </button>
            </div>

            <div className="usuarios-kpi-grid">
                <div className="usuarios-kpi-card">
                    <p className="kpi-label">Total de Usuarios</p>
                    <h3 className="kpi-value">{kpis.totalUsuarios}</h3>
                </div>
                <div className="usuarios-kpi-card">
                    <p className="kpi-label">Usuarios Activos</p>
                    <h3 className="kpi-value">{kpis.usuariosActivos}</h3>
                </div>
                <div className="usuarios-kpi-card">
                    <p className="kpi-label">Administradores</p>
                    <h3 className="kpi-value">{kpis.administradores}</h3>
                </div>
                <div className="usuarios-kpi-card">
                    <p className="kpi-label">Último Ingreso</p>
                    <h3 className="kpi-value">-</h3>
                </div>
            </div>

            <div className="usuarios-table-card">
                <div className="usuarios-table-controls">
                    <h3>Lista de usuarios</h3>
                    <div className="usuarios-search-wrapper">
                        <img src={iconBuscar} alt="" className="usuarios-search-icon" />
                        <input
                            type="text"
                            placeholder="Buscar por nombre"
                            value={busqueda}
                            onChange={(e) => setBusqueda(e.target.value)}
                            className="usuarios-search-input"
                        />
                    </div>
                </div>



                <div className="usuarios-table-wrapper">
                    <table className="usuarios-table">
                        <thead>
                            <tr>
                                <th>Usuario</th>
                                <th>Nombre</th>
                                <th>Estado</th>
                                <th>Contraseña</th>
                                <th>Rol</th>
                                <th>Acción</th>
                            </tr>
                        </thead>
                        <tbody>
                            {usuariosFiltrados.length > 0 ? (
                                usuariosFiltrados.map((usuario) => (
                                    <tr key={usuario.id}>
                                        <td>{usuario.usuario}</td>
                                        <td>{usuario.nombre}</td>
                                        <td>{usuario.estado}</td>
                                        <td>{usuario.contrasena}</td>
                                        <td>{usuario.rol}</td>
                                        <td>
                                            <div className="usuarios-acciones">
                                                <button
                                                    className="btn-usuario-editar"
                                                    onClick={() => handleEditar(usuario)}
                                                    title="Editar"
                                                >
                                                    <img src={iconEditar} alt="" className="btn-usuario-icon" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td className="table-row-empty-cell" colSpan={6}>
                                        {busqueda ? 'No se encontraron usuarios que coincidan con la búsqueda.' : 'No hay usuarios para mostrar.'}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            <ModalConfirmado
                isOpen={showSuccessModal}
                onClose={() => setShowSuccessModal(false)}
                title="Confirmado"
                subtitle={successSubtitle}
            />

            <ModalNuevoUsuario
                isOpen={isModalNuevoOpen}
                onClose={() => setIsModalNuevoOpen(false)}
                onSave={handleSaveUsuario}
            />

            <ModalEditarUsuario
                isOpen={isModalEditarOpen}
                onClose={() => setIsModalEditarOpen(false)}
                onUpdate={handleUpdateUsuario}
                usuarioData={usuarioAEditar}
            />

            <ModalErrorUsuario
                isOpen={showErrorModal}
                onClose={() => setShowErrorModal(false)}
                message={errorMessage}
            />
        </div>
    );
};

export default PanelUsuarios;
