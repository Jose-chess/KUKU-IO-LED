import React from 'react';
import './ModalConfirmar.css';
import iconSalir from '../assets/arrow-back-up.svg';
import iconConfirmar from '../assets/circle-check.svg';

const ModalConfirmar = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) {
        return null;
    }

    return (
        <div className="confirm-overlay">
            <div className="confirm-container scale-up-center">
                <h2 className="confirm-title">Confirmar</h2>

                <div className="confirm-body-card">
                    <p className="confirm-text">Estas seguro de que desea realizar este gasto ?</p>
                </div>

                <div className="confirm-footer">
                    <button className="btn-confirm-salir" onClick={onClose}>
                        <img src={iconSalir} alt="" className="confirm-btn-icon" />
                        Salir
                    </button>
                    <button className="btn-confirm-aceptar" onClick={onConfirm}>
                        <img src={iconConfirmar} alt="" className="confirm-btn-icon" />
                        Confirmar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ModalConfirmar;
