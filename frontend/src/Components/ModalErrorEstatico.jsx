import React from 'react';
import './ModalAviso.css';
import logoKuku from '../assets/Captura_de_pantalla_2026-03-30_091031-removebg-preview (1).png';
import { useModalShake } from './useModalShake';

const ModalErrorEstatico = () => {
    const { isShaking, handleOverlayClick } = useModalShake();
    const mostrarParaDiseno = true;

    if (!mostrarParaDiseno) {
        return null;
    }

    return (
        <div className="aviso-overlay vista-diseno" onClick={handleOverlayClick}>
            <div className={`aviso-container-amarillo ${isShaking ? 'shake' : ''}`} onClick={(e) => e.stopPropagation()}>
                <div className="aviso-logo-wrapper">
                    <img src={logoKuku} alt="KUKU-IO LED" className="aviso-logo-img" />
                </div>

                <div className="aviso-body">
                    <h1 className="aviso-titulo">Error</h1>
                    <div className="aviso-mensajes">
                        <p className="aviso-p-bold">No se pudo modificar este cliente en la base de datos</p>
                        <p className="aviso-p-bold">Intente de nuevo!</p>
                    </div>
                </div>

                <div className="aviso-footer">
                    <button className="btn-aviso-salir" type="button">
                        <span className="icon-regresar">↩</span>
                        Salir
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ModalErrorEstatico;
