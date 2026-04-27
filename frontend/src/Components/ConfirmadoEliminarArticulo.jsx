import React from 'react';
import './ModalConfirmado.css';
import logoKuku from '../assets/Captura_de_pantalla_2026-03-30_091031-removebg-preview (1).png';
import iconSalir from '../assets/arrow-back-up.svg';
import { useModalShake } from './useModalShake';

const ConfirmadoEliminarArticulo = ({
    isOpen,
    onClose,
    onConfirm,
    title = 'Confirmar',
    subtitle = '¿Estas seguro de que desea eliminar este artículo?',
    buttonLabel = 'Eliminar',
}) => {
    const { isShaking, handleOverlayClick } = useModalShake();

    if (!isOpen) {
        return null;
    }

    return (
        <div className="confirmado-toast" role="status" aria-live="polite" onClick={handleOverlayClick}>
            <div className={`confirmado-card scale-up-center ${isShaking ? 'shake' : ''}`} onClick={(event) => event.stopPropagation()}>
                <div className="confirmado-logo-container">
                    <img src={logoKuku} alt="KUKU-IO LED" className="logo-confirmado" />
                </div>

                <div className="confirmado-body">
                    <h2 className="confirmado-title">{title}</h2>
                    <p className="confirmado-text">{subtitle}</p>
                </div>

                <div className="confirmado-footer">
                    <button className="btn-salir-rojo-final" type="button" onClick={onClose}>
                        <img src={iconSalir} alt="" className="confirmado-btn-icon" />
                        Cancelar
                    </button>
                    <button className="btn-salir-rojo-final" type="button" onClick={onConfirm}>
                        {buttonLabel}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmadoEliminarArticulo;
