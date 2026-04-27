import React from 'react';
import './ModalExistenciaBaja.css';

const ModalExistenciaBaja = ({ isOpen, onClose, articulos, position }) => {
    if (!isOpen) return null;


    const modalPositionStyle = position
        ? {
            top: position.top,
            left: position.left,
            width: position.width,
        }
        : {};

    return (
        <div className="existencia-baja-modal-overlay" onClick={onClose}>
            <div className="existencia-baja-modal-card" style={modalPositionStyle} onClick={e => e.stopPropagation()}>
                <h2>Artículos con existencia baja</h2>
                <div className="existencia-baja-table-container">
                    <table className="existencia-baja-table">
                        <thead>
                            <tr>
                                <th>Código</th>
                                <th>Descripción</th>
                                <th>Existencia</th>
                            </tr>
                        </thead>
                        <tbody>
                            {articulos.length > 0 ? (
                                articulos.map((item, idx) => (
                                    <tr key={item.id || idx}>
                                        <td>{item.codigo}</td>
                                        <td>{item.descripcion}</td>
                                        <td>{item.actual}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="3">No hay artículos con existencia baja.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ModalExistenciaBaja;
