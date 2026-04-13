import React, { useState } from 'react';
import './InformacionEmpresarial.css';
import iconNuevo from '../assets/new-section.svg';
import iconEditar from '../assets/edit.svg';
import ModalIngresarInfo from './ModalIngresarInfo';
import ModalEditarInfo from './ModalEditarInfo';
import ModalConfirmado from './ModalConfirmado';

const InformacionEmpresarial = ({ datos = {}, onUpdateDatos }) => {
    const [showModalIngresar, setShowModalIngresar] = useState(false);
    const [showModalEditar, setShowModalEditar] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const espacioInvisible = '\u00A0';

    const info = {
        nombre: datos.nombre || '',
        direccion: datos.direccion || '',
        telefono: datos.telefono || '',
        celular: datos.celular || '',
        rnc: datos.rnc || '',
        email: datos.email || '',
    };

    const handleSaveCompanyInfo = (nextInfo) => {
        onUpdateDatos?.(nextInfo);
        setShowModalEditar(false);
        setShowSuccessModal(true);
    };

    const handleSaveNewCompanyInfo = (nextInfo) => {
        onUpdateDatos?.(nextInfo);
        setShowModalIngresar(false);
        setShowSuccessModal(true);
    };

    const handleSuccessClose = () => {
        setShowSuccessModal(false);
    };

    return (
        <main className="empresa-page">
            <header className="empresa-header">
                <h1 className="empresa-title">Información Empresarial</h1>
                <button className="btn-ingresar-info" type="button" onClick={() => setShowModalIngresar(true)}>
                    <img src={iconNuevo} alt="" className="btn-ingresar-icon" />
                    Ingresar Información
                </button>
            </header>

            <section className="empresa-card">
                <button className="empresa-edit-icon-container" type="button" onClick={() => setShowModalEditar(true)} aria-label="Editar información empresarial">
                    <img src={iconEditar} alt="" className="empresa-edit-icon" />
                </button>

                <div className="empresa-form-group-full">
                    <label className="empresa-label">Nombre de la empresa:</label>
                    <div className="empresa-info-field-box">{info.nombre || espacioInvisible}</div>
                </div>

                <div className="empresa-form-group-full">
                    <label className="empresa-label">Dirección:</label>
                    <div className="empresa-info-field-box">{info.direccion || espacioInvisible}</div>
                </div>

                <div className="empresa-form-row-dual">
                    <div className="empresa-form-group">
                        <label className="empresa-label">Teléfono:</label>
                        <div className="empresa-info-field-box">{info.telefono || espacioInvisible}</div>
                    </div>
                    <div className="empresa-form-group">
                        <label className="empresa-label">Celular:</label>
                        <div className="empresa-info-field-box">{info.celular || espacioInvisible}</div>
                    </div>
                </div>

                <div className="empresa-form-group-full">
                    <label className="empresa-label">RNC:</label>
                    <div className="empresa-info-field-box">{info.rnc || espacioInvisible}</div>
                </div>

                <div className="empresa-form-group-full">
                    <label className="empresa-label">Correo electrónico para reportes:</label>
                    <div className="empresa-info-field-box">{info.email || espacioInvisible}</div>
                </div>

                <div className="empresa-info-alert">
                    <span className="empresa-alert-icon" aria-hidden="true">i</span>
                    Esta información aparecerá en todas las facturas y documentos generados por el sistema.
                </div>
            </section>

            <ModalIngresarInfo
                isOpen={showModalIngresar}
                onClose={() => setShowModalIngresar(false)}
                onSave={handleSaveNewCompanyInfo}
            />

            <ModalEditarInfo
                isOpen={showModalEditar}
                datosActuales={info}
                onClose={() => setShowModalEditar(false)}
                onSave={handleSaveCompanyInfo}
            />

            <ModalConfirmado
                isOpen={showSuccessModal}
                onClose={handleSuccessClose}
                title="Confirmado"
                subtitle="Información empresarial guardada exitosamente!"
                buttonLabel="Salir"
            />
        </main>
    );
};

export default InformacionEmpresarial;
