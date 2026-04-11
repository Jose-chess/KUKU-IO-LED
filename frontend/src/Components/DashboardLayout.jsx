import React, { useState } from 'react';
import Sidebar from './Sidebar';
import MainContent from './PanelPrincipal';
import './DashboardLayout.css';

const DashboardLayout = () => {
    const [userData, setUserData] = useState({
        nombre: "", 
        rol: ""     
    });

    const [activeSection, setActiveSection] = useState('Panel principal');

    return (
        <div className="dashboard-container">
            <Sidebar user={userData} activeSection={activeSection} setActiveSection={setActiveSection} />
            {activeSection === 'Panel principal' && <MainContent />}
        </div>
    );
};

export default DashboardLayout;