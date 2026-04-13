import React from 'react';
import './ModalAviso.css';
import logoKuku from '../assets/Captura_de_pantalla_2026-03-30_091031-removebg-preview (1).png';
import { useModalShake } from './useModalShake';

const ModalErrorDiseno = () => {
    const { isShaking, handleOverlayClick } = useModalShake();
    const isVisibleStatic = true;

    if (!isVisibleStatic) {
        return null;
    }

    return (
        <div className="aviso-overlay static-view" onClick={handleOverlayClick}>
            <div className={`aviso-card-bg-yellow ${isShaking ? 'shake' : ''}`} onClick={(e) => e.stopPropagation()}>
                <div className="aviso-logo-container">
                    <img src={logoKuku} alt="KUKU-IO LED" className="aviso-logo-kuku" />
                </div>

                <div className="aviso-content-error">
                    <h1 className="aviso-title-main">Error</h1>
                    <div className="aviso-text-block">
                        <p className="aviso-text-p">No se pudo guardar este cliente en la base de datos</p>
                        <p className="aviso-text-p">¡Intente de nuevo!</p>
                    </div>
                </div>

                <div className="aviso-footer-right">
                    <button className="btn-aviso-red" type="button">
                        <span className="icon-back">↩</span>
                        Salir
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ModalErrorDiseno;
