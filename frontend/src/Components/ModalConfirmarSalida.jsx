import React from 'react';
import './ModalConfirmarSalida.css';
import iconSalir from '../assets/arrow-back-up.svg';
import iconConfirmar from '../assets/circle-check.svg';

const ModalConfirmarSalida = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) {
        return null;
    }

    return (
        <div className="confirm-salida-overlay">
            <div className="confirm-salida-container scale-up-center">
                <h2 className="confirm-salida-title">Confirmar</h2>

                <div className="confirm-salida-body-card">
                    <p className="confirm-salida-text">Estas seguro de que desea salir ?</p>
                </div>

                <div className="confirm-salida-footer">
                    <button className="btn-confirm-salida-salir" onClick={onClose}>
                        <img src={iconSalir} alt="" className="confirm-salida-btn-icon" />
                        Salir
                    </button>
                    <button className="btn-confirm-salida-aceptar" onClick={onConfirm}>
                        <img src={iconConfirmar} alt="" className="confirm-salida-btn-icon" />
                        Confirmar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ModalConfirmarSalida;