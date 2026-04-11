import React from 'react';
import './ModalExito.css';
import logoKuku from '../assets/Captura_de_pantalla_2026-03-30_091031-removebg-preview (1).png';
import iconSalir from '../assets/arrow-back-up.svg';

const ModalExito = ({ isOpen, onClose }) => {
    if (!isOpen) {
        return null;
    }

    return (
        <div className="exito-overlay">
            <div className="exito-container scale-up-center">
                <div className="exito-content">
                    <img src={logoKuku} alt="KUKU-IO LED" className="exito-logo" />

                    <h1 className="exito-title">Confirmado</h1>
                    <p className="exito-subtitle">Gasto guardado exitosamente!</p>
                </div>

                <div className="exito-footer-container">
                    <div className="exito-linea-corta"></div>
                    <div className="exito-botones-flex">
                        <button className="btn-exito-salir" onClick={onClose}>
                            <img src={iconSalir} alt="" className="exito-btn-icon" />
                            Salir
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalExito;