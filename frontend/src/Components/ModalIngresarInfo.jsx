import React, { useEffect, useState } from 'react';
import './ModalEmpresa.css';
import iconSalir from '../assets/arrow-back-up.svg';
import iconGuardar from '../assets/circle-check.svg';
import { useModalShake } from './useModalShake';
import ModalConfirmarInfo from './ModalConfirmarInfo';
import ModalConfirmarSalida from './ModalConfirmarSalida';

const ModalIngresarInfo = ({ isOpen, onClose, onSave }) => {
    const { isShaking, handleOverlayClick } = useModalShake();
    const [nombre, setNombre] = useState('');
    const [direccion, setDireccion] = useState('');
    const [telefono, setTelefono] = useState('');
    const [celular, setCelular] = useState('');
    const [rnc, setRnc] = useState('');
    const [email, setEmail] = useState('');
    const [showConfirmSave, setShowConfirmSave] = useState(false);
    const [showConfirmExit, setShowConfirmExit] = useState(false);
    const showAnyConfirm = showConfirmSave || showConfirmExit;

    useEffect(() => {
        if (isOpen) {
            return;
        }

        setShowConfirmSave(false);
        setShowConfirmExit(false);
    }, [isOpen]);

    if (!isOpen) {
        return null;
    }

    const handleSave = () => {
        setShowConfirmSave(true);
    };

    const handleConfirmSave = () => {
        onSave?.({ nombre, direccion, telefono, celular, rnc, email });
        setShowConfirmSave(false);
        onClose?.();
    };

    const handleConfirmExit = () => {
        setShowConfirmExit(false);
        onClose?.();
    };

    return (
        <div className={`modal-empresa-overlay ${showAnyConfirm ? 'modal-empresa-overlay-confirm-open' : ''}`} onClick={handleOverlayClick}>
            <div className={`modal-empresa-card scale-up-center ${isShaking ? 'shake' : ''} ${showAnyConfirm ? 'modal-empresa-card-hidden' : ''}`} onClick={(event) => event.stopPropagation()}>
                <h2 className="modal-empresa-title">Ingrese la información de la empresa</h2>

                <div className="modal-empresa-form-body">
                    <div className="modal-empresa-input-group modal-empresa-full-width">
                        <label>Nombre de la empresa:</label>
                        <input
                            type="text"
                            className="modal-empresa-input-field"
                            value={nombre}
                            placeholder="Ingrese el nombre de la empresa"
                            onChange={(event) => setNombre(event.target.value)}
                        />
                    </div>

                    <div className="modal-empresa-input-group modal-empresa-full-width">
                        <label>Dirección:</label>
                        <input
                            type="text"
                            className="modal-empresa-input-field"
                            value={direccion}
                            placeholder="Ingrese la dirección de la empresa"
                            onChange={(event) => setDireccion(event.target.value)}
                        />
                    </div>

                    <div className="modal-empresa-input-row-dual">
                        <div className="modal-empresa-input-group">
                            <label>Teléfono:</label>
                            <input
                                type="text"
                                className="modal-empresa-input-field"
                                value={telefono}
                                placeholder="Ingrese el teléfono de la empresa"
                                onChange={(event) => setTelefono(event.target.value)}
                            />
                        </div>
                        <div className="modal-empresa-input-group">
                            <label>Celular:</label>
                            <input
                                type="text"
                                className="modal-empresa-input-field"
                                value={celular}
                                placeholder="Ingrese el celular de la empresa"
                                onChange={(event) => setCelular(event.target.value)}
                            />
                        </div>
                    </div>

                    <div className="modal-empresa-input-group modal-empresa-full-width">
                        <label>RNC:</label>
                        <input
                            type="text"
                            className="modal-empresa-input-field"
                            value={rnc}
                            placeholder="Ingrese el RNC de la empresa"
                            onChange={(event) => setRnc(event.target.value)}
                        />
                    </div>

                    <div className="modal-empresa-input-group modal-empresa-full-width">
                        <label>Correo electrónico:</label>
                        <input
                            type="email"
                            className="modal-empresa-input-field"
                            value={email}
                            placeholder="Ingrese el correo electrónico al que se enviarán los reportes"
                            onChange={(event) => setEmail(event.target.value)}
                        />
                    </div>
                </div>

                <hr className="modal-empresa-divider" />

                <div className="modal-empresa-footer-btns">
                    <button className="modal-empresa-btn-red" type="button" onClick={() => setShowConfirmExit(true)}>
                        <img src={iconSalir} alt="" className="modal-empresa-btn-icon" />
                        Salir
                    </button>
                    <button className="modal-empresa-btn-green" type="button" onClick={handleSave}>
                        <img src={iconGuardar} alt="" className="modal-empresa-btn-icon" />
                        Guardar información
                    </button>
                </div>
            </div>

            <ModalConfirmarInfo
                isOpen={showConfirmSave}
                onClose={() => setShowConfirmSave(false)}
                onConfirm={handleConfirmSave}
            />

            <ModalConfirmarSalida
                isOpen={showConfirmExit}
                onClose={() => setShowConfirmExit(false)}
                onConfirm={handleConfirmExit}
            />

        </div>
    );
};

export default ModalIngresarInfo;
