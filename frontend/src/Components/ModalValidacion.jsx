import React from 'react';
import './ModalValidacion.css';
import iconSalir from '../assets/arrow-back-up.svg';
import logoKuku from '../assets/Captura_de_pantalla_2026-03-30_091031-removebg-preview (1).png';
import { useModalShake } from './useModalShake';

// Componente reutilizable para mensajes de validación
const ModalValidacion = ({
    isOpen,
    onClose,
    title = 'Aviso',
    campo = '',
    tipo = 'numerico', // 'numerico', 'letras', 'obligatorio', 'custom'
    mensaje = null, // Mensaje personalizado opcional
}) => {
    const { isShaking, handleOverlayClick } = useModalShake();

    if (!isOpen) return null;

    // Generar mensaje según el tipo
    const getMensaje = () => {
        if (mensaje) return mensaje;
        
        // Campos que no pueden quedar vacíos (obligatorios)
        const camposObligatorios = ['Nombre', 'Apellido', 'Teléfono', 'Límite de Crédito', 'Balance Actual'];
        const campoConAsterisco = camposObligatorios.includes(campo) ? `${campo} *` : campo;
        
        switch (tipo) {
            case 'numerico':
                return (
                    <>
                        En (<strong>{campoConAsterisco}</strong>) solo se puede introducir caracteres numéricos
                        <br />
                        Intente de nuevo!
                    </>
                );
            case 'letras':
                return (
                    <>
                        En (<strong>{campoConAsterisco}</strong>) solo se puede introducir caracteres de letra
                        <br />
                        Intente de nuevo!
                    </>
                );
            case 'obligatorio':
                return (
                    <>
                        En este campo (<strong>{campoConAsterisco}</strong>) no puede quedar vacío
                        <br />
                        Intente de nuevo!
                    </>
                );
            case 'unico':
                return (
                    <>
                        El valor (<strong>{campoConAsterisco}</strong>) ya está registrado
                        <br />
                        Intente con otro!
                    </>
                );
            case 'positivo':
                return (
                    <>
                        El campo (<strong>{campoConAsterisco}</strong>) no puede ser negativo
                        <br />
                        Intente de nuevo!
                    </>
                );
            default:
                return mensaje || 'Error de validación';
        }
    };

    return (
        <div className="validacion-overlay" onClick={handleOverlayClick}>
            <div className={`validacion-card scale-up-center ${isShaking ? 'shake' : ''}`} onClick={(e) => e.stopPropagation()}>
                {/* Logo */}
                <div className="validacion-logo-container">
                    <img src={logoKuku} alt="KUKU-IO LED" className="validacion-logo-img" />
                </div>

                {/* Content */}
                <div className="validacion-content">
                    <h1 className="validacion-title">{title}</h1>
                    <p className="validacion-mensaje">{getMensaje()}</p>
                </div>

                {/* Footer */}
                <div className="validacion-footer">
                    <button className="btn-salir-validacion" onClick={onClose}>
                        <img src={iconSalir} alt="" className="validacion-btn-icon" />
                        Retroceder
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ModalValidacion;
