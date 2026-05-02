import React, { useState, useEffect } from 'react';
import './ModalEditarUsuario.css';
import iconSalir from '../assets/arrow-back-up.svg';
import iconGuardar from '../assets/circle-check.svg';
import iconChevron from '../assets/chevron-down.svg';
import ModalConfirmar from './ModalConfirmar';
import { useModalShake } from './useModalShake';

const ModalEditarUsuario = ({ isOpen, onClose, onUpdate, usuarioData }) => {
    const [showConfirmExit, setShowConfirmExit] = useState(false);
    const [showConfirmSave, setShowConfirmSave] = useState(false);
    const { isShaking, handleOverlayClick } = useModalShake();

    const [usuario, setUsuario] = useState('');
    const [nombre, setNombre] = useState('');
    const [estado, setEstado] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [rol, setRol] = useState('');

    const [showEstadoMenu, setShowEstadoMenu] = useState(false);
    const [showRolMenu, setShowRolMenu] = useState(false);

    useEffect(() => {
        if (usuarioData && isOpen) {
            setUsuario(usuarioData.usuario || '');
            setNombre(usuarioData.nombre || '');
            setEstado(usuarioData.estado || '');
            setContrasena(usuarioData.contrasena || '');
            setRol(usuarioData.rol || '');
        }
    }, [usuarioData, isOpen]);

    if (!isOpen) return null;

    const handleSaveClick = () => {
        setShowConfirmSave(true);
    };

    const handleConfirmSave = () => {
        onUpdate?.({ ...usuarioData, usuario, nombre, estado, contrasena, rol });
        setShowConfirmSave(false);
    };

    const handleClose = () => {
        setShowConfirmExit(false);
        onClose();
    };

    return (
        <>
            {!showConfirmSave && !showConfirmExit && (
                <div className="modal-usuario-overlay" onClick={() => handleOverlayClick(handleClose)}>
                    <div className={`modal-usuario-container ${isShaking ? 'shake' : ''}`} onClick={(e) => e.stopPropagation()}>
                        <h2 className="modal-usuario-title">Editar Usuario</h2>

                        <div className="modal-usuario-form-grid">
                            <div className="modal-usuario-row">
                                <div className="modal-usuario-input-group half">
                                    <label>Usuario:</label>
                                    <input
                                        type="text"
                                        placeholder="Ingrese el usuario"
                                        value={usuario}
                                        onChange={(e) => setUsuario(e.target.value)}
                                    />
                                </div>
                                <div className="modal-usuario-input-group half">
                                    <label>Nombre:</label>
                                    <input
                                        type="text"
                                        placeholder="Ingrese el nombre"
                                        value={nombre}
                                        onChange={(e) => setNombre(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="modal-usuario-row">
                                <div className="modal-usuario-input-group half">
                                    <label>Estado:</label>
                                    <div className="premium-dropdown" onClick={() => { setShowEstadoMenu(!showEstadoMenu); setShowRolMenu(false); }}>
                                        <div className="dropdown-trigger">
                                            <span style={{ color: estado ? '#000' : '#64748b' }}>
                                                {estado || 'Seleccione un estado'}
                                            </span>
                                            <img src={iconChevron} alt="" className={`dropdown-arrow ${showEstadoMenu ? 'open' : ''}`} />
                                        </div>
                                        {showEstadoMenu && (
                                            <div className="dropdown-menu">
                                                <div 
                                                    className={`dropdown-option ${estado === 'Activo' ? 'selected' : ''}`}
                                                    onClick={(e) => { e.stopPropagation(); setEstado('Activo'); setShowEstadoMenu(false); }}
                                                >
                                                    Activo
                                                </div>
                                                <div 
                                                    className={`dropdown-option ${estado === 'Inactivo' ? 'selected' : ''}`}
                                                    onClick={(e) => { e.stopPropagation(); setEstado('Inactivo'); setShowEstadoMenu(false); }}
                                                >
                                                    Inactivo
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="modal-usuario-input-group half">
                                    <label>Contraseña:</label>
                                    <input
                                        type="text"
                                        placeholder="Ingrese la contraseña"
                                        value={contrasena}
                                        onChange={(e) => setContrasena(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="modal-usuario-input-group full">
                                <label>Rol:</label>
                                <div className="premium-dropdown" onClick={() => { setShowRolMenu(!showRolMenu); setShowEstadoMenu(false); }}>
                                    <div className="dropdown-trigger">
                                        <span style={{ color: rol ? '#000' : '#64748b' }}>
                                            {rol || 'Seleccione un rol'}
                                        </span>
                                        <img src={iconChevron} alt="" className={`dropdown-arrow ${showRolMenu ? 'open' : ''}`} />
                                    </div>
                                    {showRolMenu && (
                                        <div className="dropdown-menu">
                                            <div 
                                                className={`dropdown-option ${rol === 'Administrador' ? 'selected' : ''}`}
                                                onClick={(e) => { e.stopPropagation(); setRol('Administrador'); setShowRolMenu(false); }}
                                            >
                                                Administrador
                                            </div>
                                            <div 
                                                className={`dropdown-option ${rol === 'Operador' ? 'selected' : ''}`}
                                                onClick={(e) => { e.stopPropagation(); setRol('Operador'); setShowRolMenu(false); }}
                                            >
                                                Operador
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="modal-usuario-footer">
                            <button className="btn-usuario-salir" onClick={() => setShowConfirmExit(true)}>
                                <img src={iconSalir} alt="" className="modal-usuario-btn-icon" />
                                Salir
                            </button>
                            <button className="btn-usuario-guardar" onClick={handleSaveClick}>
                                <img src={iconGuardar} alt="" className="modal-usuario-btn-icon" />
                                Guardar cambios
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <ModalConfirmar
                isOpen={showConfirmExit}
                onClose={() => setShowConfirmExit(false)}
                onConfirm={handleClose}
                mensaje="¿Está seguro de que desea salir?"
            />

            <ModalConfirmar
                isOpen={showConfirmSave}
                onClose={() => setShowConfirmSave(false)}
                onConfirm={handleConfirmSave}
                mensaje="¿Está seguro de que desea modificar este usuario?"
            />
        </>
    );
};

export default ModalEditarUsuario;
