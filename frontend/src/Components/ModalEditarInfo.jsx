import React, { useEffect, useState } from 'react';
import './ModalEmpresa.css';
import iconSalir from '../assets/arrow-back-up.svg';
import iconGuardar from '../assets/circle-check.svg';
import { useModalShake } from './useModalShake';
import ModalConfirmarModificacion from './ModalConfirmarModificacion';
import ModalConfirmarSalida from './ModalConfirmarSalida';
import ModalErrorModificar from './ModalErrorModificar';

const ModalEditarInfo = ({ isOpen, datosActuales = {}, onClose, onSave }) => {
    const { isShaking, handleOverlayClick } = useModalShake();
    const [nombre, setNombre] = useState('');
    const [direccion, setDireccion] = useState('');
    const [telefono, setTelefono] = useState('');
    const [celular, setCelular] = useState('');
    const [rnc, setRnc] = useState('');
    const [email, setEmail] = useState('');
    const [showConfirmSave, setShowConfirmSave] = useState(false);
    const [showConfirmExit, setShowConfirmExit] = useState(false);
    const [showErrorModificar, setShowErrorModificar] = useState(false);

    useEffect(() => {
        if (!isOpen) {
            return;
        }

        setNombre(datosActuales.nombre || '');
        setDireccion(datosActuales.direccion || '');
        setTelefono(datosActuales.telefono || '');
        setCelular(datosActuales.celular || '');
        setRnc(datosActuales.rnc || '');
        setEmail(datosActuales.email || '');
    }, [isOpen, datosActuales]);

    useEffect(() => {
        if (isOpen) {
            return;
        }

        setShowConfirmSave(false);
        setShowConfirmExit(false);
        setShowErrorModificar(false);
    }, [isOpen]);

    if (!isOpen) {
        return null;
    }

    const handleSave = () => {
        setShowConfirmSave(true);
    };

    const handleConfirmSave = async () => {
        try {
            const result = await Promise.resolve(
                onSave?.({ nombre, direccion, telefono, celular, rnc, email }),
            );

            if (result === false) {
                throw new Error('Update rejected');
            }

            setShowConfirmSave(false);
            onClose?.();
        } catch {
            setShowConfirmSave(false);
            setShowErrorModificar(true);
        }
    };

    const handleConfirmExit = () => {
        setShowConfirmExit(false);
        onClose?.();
    };

    const showAnyConfirm = showConfirmSave || showConfirmExit || showErrorModificar;

    return (
        <div className={`modal-empresa-overlay ${showAnyConfirm ? 'modal-empresa-overlay-confirm-open' : ''}`} onClick={handleOverlayClick}>
            <div className={`modal-empresa-card scale-up-center ${isShaking ? 'shake' : ''} ${showAnyConfirm ? 'modal-empresa-card-hidden' : ''}`} onClick={(event) => event.stopPropagation()}>
                <h2 className="modal-empresa-title">Edite la información de la empresa</h2>

                <div className="modal-empresa-form-body">
                    <div className="modal-empresa-input-group modal-empresa-full-width">
                        <label>Nombre de la empresa:</label>
                        <input
                            type="text"
                            className="modal-empresa-input-field modal-empresa-input-field-edit"
                            value={nombre}
                            onChange={(event) => setNombre(event.target.value)}
                        />
                    </div>

                    <div className="modal-empresa-input-group modal-empresa-full-width">
                        <label>Dirección:</label>
                        <input
                            type="text"
                            className="modal-empresa-input-field modal-empresa-input-field-edit"
                            value={direccion}
                            onChange={(event) => setDireccion(event.target.value)}
                        />
                    </div>

                    <div className="modal-empresa-input-row-dual">
                        <div className="modal-empresa-input-group">
                            <label>Teléfono:</label>
                            <input
                                type="text"
                                className="modal-empresa-input-field modal-empresa-input-field-edit"
                                value={telefono}
                                onChange={(event) => setTelefono(event.target.value)}
                            />
                        </div>
                        <div className="modal-empresa-input-group">
                            <label>Celular:</label>
                            <input
                                type="text"
                                className="modal-empresa-input-field modal-empresa-input-field-edit"
                                value={celular}
                                onChange={(event) => setCelular(event.target.value)}
                            />
                        </div>
                    </div>

                    <div className="modal-empresa-input-group modal-empresa-full-width">
                        <label>RNC:</label>
                        <input
                            type="text"
                            className="modal-empresa-input-field modal-empresa-input-field-edit"
                            value={rnc}
                            onChange={(event) => setRnc(event.target.value)}
                        />
                    </div>

                    <div className="modal-empresa-input-group modal-empresa-full-width">
                        <label>Correo electrónico:</label>
                        <input
                            type="email"
                            className="modal-empresa-input-field modal-empresa-input-field-edit"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                        />
                    </div>
                </div>

                <hr className="modal-empresa-divider-edit" />

                <div className="modal-empresa-footer-btns">
                    <button className="modal-empresa-btn-red" type="button" onClick={() => setShowConfirmExit(true)}>
                        <img src={iconSalir} alt="" className="modal-empresa-btn-icon" />
                        Salir
                    </button>
                    <button className="modal-empresa-btn-green" type="button" onClick={handleSave}>
                        <img src={iconGuardar} alt="" className="modal-empresa-btn-icon" />
                        Guardar cambios
                    </button>
                </div>
            </div>

            <ModalConfirmarModificacion
                isOpen={showConfirmSave}
                onClose={() => setShowConfirmSave(false)}
                onConfirm={handleConfirmSave}
                title="Confirmar"
                mensaje="¿Estás seguro de que desea modificar esta información?"
                salirLabel="Retroceder"
                confirmLabel="Confirmar"
            />

            <ModalConfirmarSalida
                isOpen={showConfirmExit}
                onClose={() => setShowConfirmExit(false)}
                onConfirm={handleConfirmExit}
            />

            <ModalErrorModificar
                isOpen={showErrorModificar}
                onClose={() => setShowErrorModificar(false)}
            />

        </div>
    );
};

export default ModalEditarInfo;