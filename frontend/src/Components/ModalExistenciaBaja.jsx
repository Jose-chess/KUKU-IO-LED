import React from 'react';
import './ModalExistenciaBaja.css';

const ModalExistenciaBaja = ({ isOpen, onClose, articulos, position }) => {
    if (!isOpen) return null;

    const overlayStyle = {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 1000,
        background: 'transparent',
    };
    const modalStyle = position
        ? {
            position: 'absolute',
            top: position.top,
            left: position.left,
            width: position.width,
            zIndex: 1001,
        }
        : {};

    return (
        <div className="existencia-baja-modal-overlay" style={overlayStyle} onClick={onClose}>
            <div className="existencia-baja-modal-card" style={modalStyle} onClick={e => e.stopPropagation()}>
                <h2>Artículos con existencia baja</h2>
                <table className="existencia-baja-table">
                    <thead>
                        <tr>
                            <th>Código</th>
                            <th>Nombre</th>
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
                <button className="btn-cerrar-existencia-baja" onClick={onClose}>Cerrar</button>
            </div>
        </div>
    );
};

export default ModalExistenciaBaja;
