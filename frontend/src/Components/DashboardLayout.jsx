import React, { useState } from 'react';
import Sidebar from './Sidebar';
import MainContent from './PanelPrincipal';
import Clientes from './Clientes';
import PanelVentas from './PanelVentas';
import './DashboardLayout.css';

const DashboardLayout = () => {
    const [userData] = useState({
        nombre: "", 
        rol: ""     
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