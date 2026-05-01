import React, { useState, useEffect } from 'react';

import Sidebar from './Sidebar';

import MainContent from './PanelPrincipal';

import Clientes from './Clientes';

import PanelVentas from './PanelVentas';



import PanelRecibos from './PanelRecibos';

import PanelGastos from './PanelGastos';

import InformacionEmpresarial from './InformacionEmpresarial';

import Inventario from './Inventario';

import Factura from './Factura';

import PanelCuentasCobrar from './PanelCuentasCobrar';

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



    // Globalmente eliminar tooltips nativos (atributos title) para toda la aplicación

    useEffect(() => {

        const observer = new MutationObserver((mutations) => {

            mutations.forEach((mutation) => {

                if (mutation.type === 'childList') {

                    mutation.addedNodes.forEach((node) => {

                        if (node.nodeType === 1) { // Element node

                            if (node.hasAttribute && node.hasAttribute('title')) {

                                node.removeAttribute('title');

                            }

                            if (node.querySelectorAll) {

                                node.querySelectorAll('[title]').forEach(el => el.removeAttribute('title'));

                            }

                        }

                    });

                } else if (mutation.type === 'attributes' && mutation.attributeName === 'title') {

                    if (mutation.target.hasAttribute('title')) {

                        mutation.target.removeAttribute('title');

                    }

                }

            });

        });



        observer.observe(document.body, {

            childList: true,

            subtree: true,

            attributes: true,

            attributeFilter: ['title']

        });



        document.querySelectorAll('[title]').forEach(el => el.removeAttribute('title'));



        return () => observer.disconnect();

    }, []);



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



        if (activeSection === 'Historial de Ventas') {

            return <Factura />;

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



        if (activeSection === 'Gastos') {

            return <PanelGastos />;

        }



        if (activeSection === 'Cuentas por cobrar') {

            return <PanelCuentasCobrar />;

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