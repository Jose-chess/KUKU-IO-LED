import React from 'react';
import './CerrarSesiónModal.css';
import logokuku from '../assets/Captura_de_pantalla_2026-03-30_091031-removebg-preview (1).png';
import iconCerrarSesion from '../assets/arrow-back-up.svg';
import iconCheck from '../assets/circle-check.svg'; 

const CerrarSesionModal = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content scale-up-center">
                <div className="modal-header">
                    <img src={logokuku} alt="KUKU-IO LED" className="modal-logo" />
                </div>

                <div className="modal-body">
                    <h2>Seguro que desea cerrar sesión?</h2>
                </div>

                <div className="modal-footer-container">
                    {/* Esta es la línea corta y centrada */}
                    <div className="modal-linea-corta"></div>
                    
                    {/* Este contenedor mueve los botones */}
                    <div className="modal-botones-flex">
                        <button className="btn-cancel" onClick={onClose}>
                            <img src={iconCerrarSesion} alt="" className="btn-icon" />
                            Retroceder
                        </button>
                        <button className="btn-confirm" onClick={onConfirm}>
                            <img src={iconCheck} alt="" className="btn-icon" />
                            Confirmar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CerrarSesionModal;