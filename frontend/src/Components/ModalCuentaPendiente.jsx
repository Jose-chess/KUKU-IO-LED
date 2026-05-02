import React, { useState, useEffect } from 'react';
import './ModalCuentaPendiente.css';
import iconSalir from '../assets/arrow-back-up.svg';
import iconPagar from '../assets/circle-check.svg';
import { useModalShake } from './useModalShake';
import ModalConfirmar from './ModalConfirmar';
import ModalConfirmado from './ModalConfirmado';
import ModalExito from './ModalExito';

const ModalCuentaPendiente = ({ isOpen, onClose, onPagar, cuentaData }) => {
    const { isShaking, handleOverlayClick } = useModalShake();
    const [showConfirm, setShowConfirm] = useState(false);
    const [showExito, setShowExito] = useState(false);
    const [valorAPagar, setValorAPagar] = useState('');

    // Calcular deuda pendiente
    const deudaPendiente = cuentaData ? (cuentaData.montoTotal - cuentaData.montoPagado) : 0;

    // Inicializar valor a pagar con la deuda total cuando se abre el modal
    useEffect(() => {
        if (isOpen && cuentaData) {
            setValorAPagar(deudaPendiente.toString());
        }
    }, [isOpen, cuentaData, deudaPendiente]);

    if (!isOpen) return null;

    const formatMoney = (value) => {
        if (!value && value !== 0) return '$ 0';
        return `$ ${Number(value).toLocaleString('es-DO', { minimumFractionDigits: 0 })}`;
    };

    const handleValorAPagarChange = (e) => {
        const value = e.target.value.replace(/[^0-9]/g, '');
        setValorAPagar(value);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleOpenConfirm();
        }
    };

    const handleOpenConfirm = () => {
        const monto = Number(valorAPagar);
        if (monto <= 0) return;
        if (monto > deudaPendiente) {
            alert('El valor a pagar no puede ser mayor que la deuda acumulada');
            return;
        }
        setShowConfirm(true);
    };

    const handleConfirmarPago = async () => {
        setShowConfirm(false);
        
        try {
            const montoPago = Number(valorAPagar);
            const response = await onPagar?.({
                cuentaId: cuentaData?.id,
                montoPagado: montoPago,
                montoTotal: cuentaData?.montoTotal,
                nuevoBalance: deudaPendiente - montoPago
            });

            if (response === false || response?.success === false) {
                console.error('Error al procesar el pago');
                return;
            }

            setShowExito(true);
        } catch (error) {
            console.error('Error al procesar el pago:', error);
        }
    };

    const handleCloseExito = () => {
        setShowExito(false);
        onClose?.();
    };

    const handleClose = () => {
        setShowConfirm(false);
        onClose?.();
    };

    // Mostrar modal de confirmación
    if (showConfirm) {
        return (
            <ModalConfirmar
                isOpen={showConfirm}
                onClose={() => setShowConfirm(false)}
                onConfirm={handleConfirmarPago}
                mensaje="¿Está seguro de que desea registrar el pago?"
                salirLabel="Retroceder"
                confirmLabel="Confirmar pago"
            />
        );
    }

    // Mostrar modal de éxito
    if (showExito) {
        return (
            <ModalExito
                isOpen={showExito}
                onClose={handleCloseExito}
                subtitle="¡Pago registrado exitosamente!"
            />
        );
    }

    return (
        <div className="modal-cuenta-overlay" onClick={handleOverlayClick}>
            <div className={`modal-cuenta-container ${isShaking ? 'shake' : ''}`} onClick={(e) => e.stopPropagation()}>
                <h2 className="modal-cuenta-title">Cuenta Pendiente</h2>

                <div className="modal-cuenta-form-section">
                    <h3 className="modal-cuenta-subtitle">Información de la cuenta</h3>
                    <div className="modal-cuenta-divider-line" />

                    <div className="modal-cuenta-grid-form">
                        <div className="modal-cuenta-input-group">
                            <label>Número de factura:</label>
                            <input
                                type="text"
                                value={cuentaData?.numero || ''}
                                readOnly
                                className="modal-cuenta-input-readonly"
                            />
                        </div>
                        <div className="modal-cuenta-input-group">
                            <label>Cliente:</label>
                            <input
                                type="text"
                                value={cuentaData?.cliente || ''}
                                readOnly
                                className="modal-cuenta-input-readonly"
                            />
                        </div>
                        <div className="modal-cuenta-input-group">
                            <label>Fecha de emisión:</label>
                            <input
                                type="text"
                                value={cuentaData?.fechaEmision || ''}
                                readOnly
                                className="modal-cuenta-input-readonly"
                            />
                        </div>
                    </div>

                    <div className="modal-cuenta-grid-form-2col">
                        <div className="modal-cuenta-input-group">
                            <label>Monto total:</label>
                            <input
                                type="text"
                                value={formatMoney(cuentaData?.montoTotal)}
                                readOnly
                                className="modal-cuenta-input-readonly"
                            />
                        </div>
                        <div className="modal-cuenta-input-group">
                            <label>Monto pagado:</label>
                            <input
                                type="text"
                                value={formatMoney(cuentaData?.montoPagado)}
                                readOnly
                                className="modal-cuenta-input-readonly"
                            />
                        </div>
                    </div>

                    <div className="modal-cuenta-full-width">
                        <div className="modal-cuenta-input-group">
                            <label>Deuda acumulada:</label>
                            <input
                                type="text"
                                value={formatMoney(deudaPendiente)}
                                readOnly
                            />
                        </div>
                    </div>

                    <div className="modal-cuenta-full-width">
                        <div className="modal-cuenta-input-group">
                            <label>Valor a pagar:</label>
                            <input
                                type="text"
                                value={valorAPagar}
                                onChange={handleValorAPagarChange}
                                onKeyDown={handleKeyDown}
                                placeholder="Ingrese el valor a pagar"
                                autoFocus
                            />
                        </div>
                    </div>
                </div>

                <div className="modal-cuenta-footer-line">
                    <button className="btn-salir-cuenta" onClick={handleClose}>
                        <img src={iconSalir} alt="" className="modal-cuenta-btn-icon" />
                        Salir
                    </button>
                    <button className="btn-pagar-cuenta" onClick={handleOpenConfirm}>
                        <img src={iconPagar} alt="" className="modal-cuenta-btn-icon" />
                        Pagar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ModalCuentaPendiente;
