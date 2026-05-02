import React from 'react';
import './ModalHistorialReportes.css';
import iconCerrar from '../assets/arrow-back-up.svg';
import { useModalShake } from './useModalShake';

const ModalHistorialReportes = ({ isOpen, onClose }) => {
    const { isShaking, handleOverlayClick } = useModalShake();

    if (!isOpen) return null;

    const historial = [
        { id: 1, tipo: 'Mensual', periodo: 'Abril 2026', fecha: '30/04/2026', ganancias: 1135200, estado: 'Completado' },
        { id: 2, tipo: 'Mensual', periodo: 'Marzo 2026', fecha: '31/03/2026', ganancias: 985400, estado: 'Completado' },
        { id: 3, tipo: 'Mensual', periodo: 'Febrero 2026', fecha: '28/02/2026', ganancias: 875200, estado: 'Completado' },
        { id: 4, tipo: 'Mensual', periodo: 'Enero 2026', fecha: '31/01/2026', ganancias: 1205600, estado: 'Completado' },
        { id: 5, tipo: 'Anual', periodo: '2025', fecha: '31/12/2025', ganancias: 12584000, estado: 'Completado' },
        { id: 6, tipo: 'Semanal', periodo: 'Semana 15 - Abril', fecha: '13/04/2026', ganancias: 284600, estado: 'Completado' },
        { id: 7, tipo: 'Semanal', periodo: 'Semana 14 - Abril', fecha: '06/04/2026', ganancias: 312400, estado: 'Completado' },
        { id: 8, tipo: 'Semanal', periodo: 'Semana 13 - Marzo', fecha: '30/03/2026', ganancias: 265800, estado: 'Completado' },
    ];

    const formatearDinero = (valor) => {
        return new Intl.NumberFormat('es-DO', {
            style: 'currency',
            currency: 'DOP',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(valor);
    };

    const getTipoColor = (tipo) => {
        switch (tipo) {
            case 'Semanal': return '#4ADE80';
            case 'Mensual': return '#FACC15';
            case 'Anual': return '#60A5FA';
            default: return '#9CA3AF';
        }
    };

    return (
        <div className="historial-overlay" onClick={handleOverlayClick}>
            <div className={`historial-container scale-up-center ${isShaking ? 'shake' : ''}`} onClick={(e) => e.stopPropagation()}>
                <div className="historial-header">
                    <h2 className="historial-title">Historial de Reportes</h2>
                    <button className="btn-cerrar-historial" onClick={onClose}>
                        <img src={iconCerrar} alt="" className="btn-cerrar-icon" />
                        Cerrar
                    </button>
                </div>

                <div className="historial-divider" />

                <div className="historial-content">
                    <div className="historial-table-wrapper">
                        <table className="historial-table">
                            <thead>
                                <tr>
                                    <th>Tipo</th>
                                    <th>Período</th>
                                    <th>Fecha Generado</th>
                                    <th>Ganancias</th>
                                    <th>Estado</th>
                                </tr>
                            </thead>
                            <tbody>
                                {historial.map((item) => (
                                    <tr key={item.id}>
                                        <td>
                                            <span 
                                                className="tipo-badge" 
                                                style={{ backgroundColor: getTipoColor(item.tipo) }}
                                            >
                                                {item.tipo}
                                            </span>
                                        </td>
                                        <td className="periodo-cell">{item.periodo}</td>
                                        <td>{item.fecha}</td>
                                        <td className="ganancias-cell">{formatearDinero(item.ganancias)}</td>
                                        <td>
                                            <span className="estado-badge">{item.estado}</span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="historial-footer">
                    <p className="historial-total">
                        Total de reportes generados: <strong>{historial.length}</strong>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ModalHistorialReportes;
