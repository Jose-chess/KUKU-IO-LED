import React from 'react';
import './ModalErrorCliente.css';
import logoKuku from '../assets/Captura_de_pantalla_2026-03-30_091031-removebg-preview (1).png';
import iconSalir from '../assets/arrow-back-up.svg';
import { useModalShake } from './useModalShake';

const ModalVentaNoEncontrada = ({
    isOpen = true,
    onClose = () => {},
    buttonLabel = 'Salir',
}) => {
    const { isShaking, handleOverlayClick } = useModalShake();

    if (!isOpen) {
        return null;
    }

    return (
        <div className="venta-overlay" onClick={handleOverlayClick}>
            <div className={`venta-card-amarilla scale-up-center ${isShaking ? 'shake' : ''}`} onClick={(event) => event.stopPropagation()}>
                <div className="venta-logo-box">
                    <img src={logoKuku} alt="KUKU-IO LED" className="venta-logo-img" />
                </div>

                <h1 className="venta-titulo-error">Venta no encontrada</h1>

                <div className="venta-texto-container">
                    <p className="venta-p-bold">No hay registros que coincidan con su búsqueda</p>
                    <p className="venta-p-bold">Intente con otro cliente</p>
                </div>

                <div className="venta-footer">
                    <button className="btn-venta-salir" type="button" onClick={onClose}>
                        <img src={iconSalir} alt="" className="icon-back" />
                        {buttonLabel}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ModalVentaNoEncontrada;
