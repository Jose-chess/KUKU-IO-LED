import React from 'react';
import './ModalArticuloNoEncontrado.css';
import logoKuku from '../assets/Captura_de_pantalla_2026-03-30_091031-removebg-preview (1).png';
import iconSalir from '../assets/arrow-back-up.svg';
import { useModalShake } from './useModalShake';

const ModalGastoNoEncontrado = ({
    isOpen = false,
    onClose = () => {},
    buttonLabel = 'Salir',
}) => {
    const { isShaking, handleOverlayClick } = useModalShake();

    if (!isOpen) {
        return null;
    }

    return (
        <div className="articulo-no-encontrado-overlay" onClick={handleOverlayClick}>
            <div className={`articulo-no-encontrado-card scale-up-center ${isShaking ? 'shake' : ''}`} onClick={(event) => event.stopPropagation()}>
                <div className="articulo-no-encontrado-logo-box">
                    <img src={logoKuku} alt="KUKU-IO LED" className="articulo-no-encontrado-logo-img" />
                </div>

                <h1 className="articulo-no-encontrado-titulo">Gasto no encontrado</h1>

                <div className="articulo-no-encontrado-texto-container">
                    <p className="articulo-no-encontrado-texto">No hay registros que coincidan con su búsqueda</p>
                    <p className="articulo-no-encontrado-texto">Intente con otro gasto</p>
                </div>

                <div className="articulo-no-encontrado-footer">
                    <button className="articulo-no-encontrado-btn-salir" type="button" onClick={onClose}>
                        <img src={iconSalir} alt="" className="icon-back" />
                        {buttonLabel}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ModalGastoNoEncontrado;
