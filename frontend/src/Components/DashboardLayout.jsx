import React, { useState } from 'react';
import Sidebar from './Sidebar';
import MainContent from './PanelPrincipal';
import Clientes from './Clientes';
import PanelVentas from './PanelVentas';
import PanelFactura from './PanelFactura';
import PanelRecibos from './PanelRecibos';
import InformacionEmpresarial from './InformacionEmpresarial';
import Inventario from './Inventario';
import Factura from './Factura';
import './DashboardLayout.css';

const DashboardLayout = () => {
    const [userData] = useState({
        nombre: "", 
        rol: ""     
    });
    const [companyInfo, setCompanyInfo] = useState({
        nombre: '',
        direccion: '',
        telefono: '',
        celular: '',
        rnc: '',
        email: '',
    });

    const [activeSection, setActiveSection] = useState('Panel principal');

    const renderSection = () => {
        if (activeSection === 'Panel principal') {
            return <MainContent />;
        }

        if (activeSection === 'Clientes') {
            return <Clientes />;
        }

        if (activeSection === 'Ventas') {
            return <PanelVentas />;
        }

        if (activeSection === 'Facturas') {
            return <PanelFactura />;
        }

        if (activeSection === 'Recibos') {
            return <PanelRecibos />;
        }

        if (activeSection === 'Informacion empresarial') {
            return <InformacionEmpresarial datos={companyInfo} onUpdateDatos={setCompanyInfo} />;
        }

        if (activeSection === 'Inventario') {
            return <Inventario />;
        }

        if (activeSection === 'Facturas') {
            return <Factura />;
        }

        return null;
    };

    return (
        <div className="dashboard-container">
            <Sidebar user={userData} activeSection={activeSection} setActiveSection={setActiveSection} />
            {renderSection()}
        </div>
    );
};

export default DashboardLayout;