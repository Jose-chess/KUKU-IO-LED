import React, { useState } from 'react';
import './ModalSeleccion.css';
import iconSalir from '../assets/arrow-back-up.svg';
import { useModalShake } from './useModalShake';
// TODO: Importar API calls cuando el backend esté listo
// import { fetchDescuentos } from '../api/descuentosApi';

const ModalSeleccionDescuento = ({ isOpen, onClose, onSelect = () => { }, position }) => {
    const { isShaking, handleOverlayClick } = useModalShake();

    // Datos del backend (vacíos hasta integrar)
    const [descuentos, setDescuentos] = useState([]);

    // TODO: useEffect para cargar datos desde backend
    // useEffect(() => {
    //     const loadData = async () => {
    //         const data = await fetchDescuentos();
    //         setDescuentos(data);
    //     };
    //     loadData();
    // }, []);

    if (!isOpen) {
        return null;
    }

    const handleSelectDescuento = (descuento) => {
        onSelect?.(descuento);
        onClose?.();
    };

    const modalPositionStyle = position
        ? {
            top: position.top,
            left: position.left,
            width: position.width,
        }
        : {};

    return (
        <div className="modal-seleccion-overlay" onClick={onClose}>
            <div className="modal-seleccion-content" style={modalPositionStyle} onClick={(e) => e.stopPropagation()}>
                <div className="modal-seleccion-header">
                    <h2 className="modal-seleccion-title">Seleccionar Descuento</h2>
                </div>

                <div className="modal-seleccion-body">
                    <div className="modal-seleccion-list">
                        {descuentos.map((descuento) => (
                            <div
                                key={descuento.id}
                                className="modal-seleccion-item modal-seleccion-item-descuento"
                                onClick={() => handleSelectDescuento(descuento)}
                            >
                                <span className="descuento-cantidad">{descuento.cantidad}</span>
                                <span className="descuento-porcentaje">{descuento.porcentaje}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalSeleccionDescuento;
