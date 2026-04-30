import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CerrarSesionModal from './CerrarSessiónModal';

import logokuku from '../assets/Captura_de_pantalla_2026-03-30_091031-removebg-preview (1).png';
import iconCasa from '../assets/home.svg';
import iconCliente from '../assets/user.svg';
import iconVenta from '../assets/coin.svg';
import iconInventario from '../assets/forklift.svg';
import iconFactura from '../assets/file-analytics.svg';
import iconCuentaCobrar from '../assets/file-invoice.svg';
import iconFinanzas from '../assets/abacus.svg';
import iconConfiguracion from '../assets/settings.svg';  
import iconFlecha from '../assets/chevron-down.svg';
import iconUsuario from '../assets/user (1).svg';
import iconCerrarSesion from '../assets/login-2.svg';
import iconRecibo from '../assets/receipt.svg';

const Sidebar = ({ user, activeSection, setActiveSection }) => {
    const navigate = useNavigate();
    const [showFinanzas, setShowFinanzas] = useState(false);
    const [showConfiguracion, setShowConfiguracion] = useState(false);
    const [showGraficos, setShowGraficos] = useState(false);
    const [selectedFinanzasOption, setSelectedFinanzasOption] = useState('');
    const [selectedGraficoOption, setSelectedGraficoOption] = useState('');
    const [selectedConfiguracionOption, setSelectedConfiguracionOption] = useState('');
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    useEffect(() => {
        const handleDocumentClick = (event) => {
            if (!(event.target instanceof Element)) {
                return;
            }

            const clickEnFinanzas = event.target.closest('.finanzas-trigger');
            const clickEnConfiguracion = event.target.closest('.configuracion-trigger');
            const clickEnMenu = event.target.closest('.floating-menu');
            const clickEnSubmenu = event.target.closest('.sub-floating-menu');

            if (clickEnFinanzas || clickEnConfiguracion || clickEnMenu || clickEnSubmenu) {
                return;
            }

            setShowFinanzas(false);
            setShowConfiguracion(false);
            setShowGraficos(false);
        };

        document.addEventListener('click', handleDocumentClick);

        return () => {
            document.removeEventListener('click', handleDocumentClick);
        };
    }, []);

    const handleLogoutClick = () => {
        setShowLogoutModal(true);
    };

    const handleConfirmLogout = () => {
        setShowLogoutModal(false);
        navigate('/');
    };

    const modulos = [
        { nombre: 'Panel principal', icon: iconCasa},
        { nombre: 'Clientes', icon: iconCliente },
        { nombre: 'Ventas', icon: iconVenta },  
        { nombre: 'Inventario', icon: iconInventario },
        { nombre: 'Historial de Ventas', icon: iconFactura },
        { nombre: 'Recibos', icon: iconRecibo },
        { nombre: 'Cuentas por cobrar', icon: iconCuentaCobrar },
        { nombre: 'Finanzas', icon: iconFinanzas, tieneFlecha: true },
        { nombre: 'Configuración', icon: iconConfiguracion, tieneFlecha: true },
    ];

    return (
        <>
            <aside className="sidebar no-select">
                <div className="sidebar-header">
                    <img src={logokuku} alt="KUKU-IO LED" className="sidebar-logo" />
                    <span className="brand-name">KUKU-IO LED</span>
                </div>

                <div className="sidebar-section-title">Módulos</div>

                <nav className="sidebar-nav">
                    <ul>
                        {modulos.map((modulo, index) => (
                            !(modulo.nombre === 'Configuración' && showFinanzas) && (
                            <li
                                key={index}
                                className={`sidebar-item ${modulo.nombre === 'Finanzas' ? 'finanzas-trigger' : ''} ${modulo.nombre === 'Configuración' ? 'configuracion-trigger' : ''} ${activeSection === modulo.nombre ? 'active' : ''}`}
                                onClick={() => {
                                    if (modulo.nombre === 'Finanzas') {
                                        const openingFinanzas = !showFinanzas;
                                        setShowFinanzas(openingFinanzas);
                                        setShowConfiguracion(false);
                                        setShowGraficos(false);
                                    } else if (modulo.nombre === 'Configuración') {
                                        const openingConfiguracion = !showConfiguracion;
                                        setShowConfiguracion(openingConfiguracion);
                                        setShowFinanzas(false);
                                        setShowGraficos(false);
                                    } else {
                                        setActiveSection(modulo.nombre);
                                        setShowFinanzas(false);
                                        setShowConfiguracion(false);
                                        setShowGraficos(false);
                                    }
                                }}
                                style={{ position: 'relative' }}
                            >
                                <div className="modulo-info">
                                    <img src={modulo.icon} alt="" className="sidebar-icon" />
                                    <span className="sidebar-item-text">{modulo.nombre}</span>
                                </div>
                                
                                {modulo.tieneFlecha && (
                                    <img src={iconFlecha} alt="" className="sidebar-chevron" />
                                )}

                                {modulo.nombre === 'Finanzas' && showFinanzas && (
                                    <div className="floating-menu finance-floating-menu" onClick={(e) => e.stopPropagation()}>
                                        <div 
                                            className={`menu-option-item ${showGraficos ? 'selected-yellow' : ''}`}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setSelectedFinanzasOption('Graficos');
                                                setShowGraficos(!showGraficos);
                                            }}
                                        >
                                            <span>Gráficos</span>
                                            <img src={iconFlecha} alt="" className="arrow-right" />

                                            {showGraficos && (
                                                <div className="sub-floating-menu" onClick={(e) => e.stopPropagation()}>
                                                    <div
                                                        className={`menu-option-item ${selectedGraficoOption === 'Gráfico de barras' ? 'selected-yellow' : ''}`}
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setSelectedGraficoOption('Gráfico de barras');
                                                            setShowGraficos(false);
                                                            setShowFinanzas(false);
                                                        }}
                                                    >
                                                        Gráfico de barras
                                                    </div>
                                                    <div className="line-separator"></div>
                                                    <div
                                                        className={`menu-option-item ${selectedGraficoOption === 'Gráfico de pastel' ? 'selected-yellow' : ''}`}
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setSelectedGraficoOption('Gráfico de pastel');
                                                            setShowGraficos(false);
                                                            setShowFinanzas(false);
                                                        }}
                                                    >
                                                        Gráfico de pastel
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        <div className="line-separator"></div>
                                        <div
                                            className={`menu-option-item ${selectedFinanzasOption === 'Reportes' ? 'selected-yellow' : ''}`}
                                            onClick={() => {
                                                setSelectedFinanzasOption('Reportes');
                                                setShowGraficos(false);
                                                setShowFinanzas(false);
                                            }}
                                        >
                                            Reportes
                                        </div>
                                        <div className="line-separator"></div>
                                        <div
                                            className={`menu-option-item ${selectedFinanzasOption === 'Cierre de caja' ? 'selected-yellow' : ''}`}
                                            onClick={() => {
                                                setSelectedFinanzasOption('Cierre de caja');
                                                setShowGraficos(false);
                                                setShowFinanzas(false);
                                            }}
                                        >
                                            Cierre de caja
                                        </div>
                                        <div className="line-separator"></div>
                                        <div
                                            className={`menu-option-item ${activeSection === 'Gastos' ? 'selected-yellow' : ''}`}
                                            onClick={() => {
                                                setActiveSection('Gastos');
                                                setShowFinanzas(false);
                                            }}
                                        >
                                            Gastos
                                        </div>
                                    </div>
                                )}

                                {modulo.nombre === 'Configuración' && showConfiguracion && (
                                    <div className="floating-menu" onClick={(e) => e.stopPropagation()}>
                                        <div
                                            className={`menu-option-item ${selectedConfiguracionOption === 'Información empresarial' ? 'selected-yellow' : ''}`}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setSelectedConfiguracionOption('Información empresarial');
                                                setActiveSection('Informacion empresarial');
                                                setShowConfiguracion(false);
                                            }}
                                        >
                                            Información empresarial
                                        </div>
                                        <div className="line-separator"></div>

                                        <div
                                            className={`menu-option-item ${selectedConfiguracionOption === 'Unidades de medidas' ? 'selected-yellow' : ''}`}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setSelectedConfiguracionOption('Unidades de medidas');
                                                setShowConfiguracion(false);
                                            }}
                                        >
                                            Unidades de medidas
                                        </div>

                                        <div className="line-separator"></div>
                                        <div
                                            className={`menu-option-item ${selectedConfiguracionOption === 'Usuarios del sistema' ? 'selected-yellow' : ''}`}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setSelectedConfiguracionOption('Usuarios del sistema');
                                                setShowConfiguracion(false);
                                            }}
                                        >
                                            Usuarios del sistema
                                        </div>
                                    </div>
                                )}
                            </li>
                            )
                        ))}
                    </ul>
                </nav>

                <div className="sidebar-footer">
                    <div className="user-profile">
                        <div className="user-avatar-bg">
                            <img src={iconUsuario} alt="" className="user-icon-img" />
                        </div>
                        <div className="user-text">
                            <span className="user-name">{user?.nombre || "---"}</span>
                            <span className="user-role">{user?.rol || "---"}</span>
                        </div>
                    </div>
                    
                    <button className="logout-button" onClick={handleLogoutClick}>
                        <img src={iconCerrarSesion} alt="" className="logout-icon" />
                        <span>Cerrar Sesión</span>
                    </button>
                </div>
            </aside>

            <CerrarSesionModal 
                isOpen={showLogoutModal}
                onClose={() => setShowLogoutModal(false)}
                onConfirm={handleConfirmLogout}
            />
        </>
    );
};

export default Sidebar;