import React, { useState, useEffect, useRef } from 'react';
import './PanelCierreCaja.css';
import iconPdf from '../assets/file-type-pdf.svg';
import iconCheck from '../assets/circle-check.svg';
import iconChevron from '../assets/chevron-down.svg';
import iconRetroceder from '../assets/arrow-back-up.svg';
import ModalConfirmar from './ModalConfirmar';
import ModalConfirmado from './ModalConfirmado';

const PanelCierreCaja = () => {
    const [showHistorial, setShowHistorial] = useState(false);
    const [selectedFecha, setSelectedFecha] = useState('4/4/2026');
    const [showConfirmCerrar, setShowConfirmCerrar] = useState(false);
    const [showConfirmPDF, setShowConfirmPDF] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowHistorial(false);
            }
        };

        if (showHistorial) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showHistorial]);

    const handleCerrarCaja = () => {
        setShowConfirmCerrar(true);
    };

    const handleConfirmCerrar = () => {
        setShowConfirmCerrar(false);
        setSuccessMessage('¡El cierre de caja se ha realizado exitosamente!');
        setShowSuccess(true);
    };

    const handleConfirmPDF = () => {
        setShowConfirmPDF(false);
        // Aquí iría la lógica para generar el PDF
        setSuccessMessage('¡PDF generado exitosamente!');
        setShowSuccess(true);
    };

    return (
        <div className="cierre-caja-container">
            <div className="cierre-caja-header">
                <h1 className="cierre-caja-title">Cierre de caja</h1>
                <div className="historial-wrapper" ref={dropdownRef}>
                    <button className="btn-historial" onClick={() => setShowHistorial(!showHistorial)}>
                        Historial
                        <img src={iconChevron} alt="" className={`icon-chevron ${showHistorial ? 'open' : ''}`} />
                    </button>
                    {showHistorial && (
                        <div className="historial-dropdown">
                            <div className="dropdown-header">Seleccione una fecha</div>
                            <div className="dropdown-option" onClick={() => { setSelectedFecha('4/4/2026'); setShowHistorial(false); }}>4/4/2026</div>
                            <div className="dropdown-option" onClick={() => { setSelectedFecha('3/4/2026'); setShowHistorial(false); }}>3/4/2026</div>
                        </div>
                    )}
                </div>
            </div>

            <div className="cierre-caja-meta">
                <div className="meta-fecha">Fecha: {selectedFecha}</div>
                <div className="meta-ventas">Total de ventas: <span className="bold">23 facturas</span></div>
            </div>

            <div className="cierre-caja-kpis">
                <div className="kpi-card">
                    <span className="kpi-label">Total facturado</span>
                    <span className="kpi-value positive">$ 550,850</span>
                </div>
                <div className="kpi-card">
                    <span className="kpi-label">Itbis</span>
                    <span className="kpi-value neutral">$ 82,800</span>
                </div>
                <div className="kpi-card">
                    <span className="kpi-label">Descuentos</span>
                    <span className="kpi-value negative">-$ 12,000</span>
                </div>
            </div>

            <div className="cierre-caja-grid">
                <div className="grid-card">
                    <h3 className="card-title">Por método</h3>
                    <div className="card-row">
                        <div className="row-label">Contado <span className="badge green">14</span></div>
                        <div className="row-value">$ 340,500</div>
                    </div>
                    <div className="card-row">
                        <div className="row-label">Crédito <span className="badge yellow">9</span></div>
                        <div className="row-value">$ 210,350</div>
                    </div>
                </div>

                <div className="grid-card">
                    <h3 className="card-title">Por tipo</h3>
                    <div className="card-row">
                        <div className="row-label">Consumidor final <span className="badge green">18</span></div>
                        <div className="row-value">$ 390,200</div>
                    </div>
                    <div className="card-row">
                        <div className="row-label">Ventas al por mayor <span className="badge yellow">5</span></div>
                        <div className="row-value">$ 160,650</div>
                    </div>
                </div>

                <div className="grid-card">
                    <h3 className="card-title">Desglose de ingresos</h3>
                    <div className="card-row">
                        <span className="row-label-gray">Sub-total de ventas</span>
                        <span className="row-value-bold">$340,500</span>
                    </div>
                    <div className="card-row">
                        <span className="row-label-gray">Itbis</span>
                        <span className="row-value-bold">$82,800</span>
                    </div>
                    <div className="card-row">
                        <span className="row-label-gray">Descuentos</span>
                        <span className="row-value-red">-$12,400</span>
                    </div>
                    <div className="card-row">
                        <span className="row-label-gray">Egresos</span>
                        <span className="row-value-red">-$15,200</span>
                    </div>
                </div>

                <div className="grid-card">
                    <h3 className="card-title">Resumen del cierre</h3>
                    <div className="card-row">
                        <span className="row-label-gray">Total ingresos del día</span>
                        <span className="row-value-bold">$ 550,500</span>
                    </div>
                    <div className="card-row">
                        <span className="row-label-gray">Total egresos del día</span>
                        <span className="row-value-red">-$15,200</span>
                    </div>
                    <div className="card-row total-neto">
                        <span className="row-label-black">Total neto del día</span>
                        <span className="row-value-bold-large">$550,850</span>
                    </div>
                </div>
            </div>

            <div className="cierre-caja-footer">
                <button className="btn-pdf" onClick={() => setShowConfirmPDF(true)}>
                    <img src={iconPdf} alt="PDF" />
                </button>
                {selectedFecha === '4/4/2026' ? (
                    <button className="btn-cerrar" onClick={handleCerrarCaja}>
                        <img src={iconCheck} alt="" />
                        Cerrar caja
                    </button>
                ) : (
                    <button className="btn-retroceder-footer" onClick={() => setSelectedFecha('4/4/2026')}>
                        <img src={iconRetroceder} alt="" className="icon-retroceder" />
                        Retroceder
                    </button>
                )}
            </div>

            <ModalConfirmar
                isOpen={showConfirmCerrar}
                onClose={() => setShowConfirmCerrar(false)}
                onConfirm={handleConfirmCerrar}
                mensaje="¿Está seguro de que desea realizar el cierre de caja?"
            />

            <ModalConfirmar
                isOpen={showConfirmPDF}
                onClose={() => setShowConfirmPDF(false)}
                onConfirm={handleConfirmPDF}
                mensaje="¿Está seguro de que desea convertir a PDF?"
            />

            <ModalConfirmado
                isOpen={showSuccess}
                onClose={() => setShowSuccess(false)}
                onConfirm={() => setShowSuccess(false)}
                subtitle={successMessage}
            />
        </div>
    );
};

export default PanelCierreCaja;
