import React, { useState } from 'react';
import './ModalSeleccion.css';
import iconSalir from '../assets/arrow-back-up.svg';
import { useModalShake } from './useModalShake';
// TODO: Importar API calls cuando el backend esté listo
// import { fetchTiposVenta } from '../api/tiposVentaApi';

const ModalSeleccionTipo = ({ isOpen, onClose, onSelect = () => { }, position }) => {
    const { isShaking, handleOverlayClick } = useModalShake();

    // Datos del backend (vacíos hasta integrar)
    const [tipos, setTipos] = useState([]);

    // TODO: useEffect para cargar datos desde backend
    // useEffect(() => {
    //     const loadData = async () => {
    //         const data = await fetchTiposVenta();
    //         setTipos(data);
    //     };
    //     loadData();
    // }, []);

    if (!isOpen) {
        return null;
    }

    const handleSelectTipo = (tipo) => {
        onSelect?.(tipo);
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
                    <h2 className="modal-seleccion-title">Seleccionar Tipo</h2>
                </div>

                <div className="modal-seleccion-body">
                    <div className="modal-seleccion-list">
                        {tipos.map((tipo) => (
                            <div
                                key={tipo.id}
                                className="modal-seleccion-item"
                                onClick={() => handleSelectTipo(tipo)}
                            >
                                <span>{tipo.nombre}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalSeleccionTipo;
