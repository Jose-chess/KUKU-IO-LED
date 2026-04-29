import React, { useState } from 'react';
import './ReciboModal.css';
import iconSalir from '../assets/arrow-back-up.svg';
import iconPDF from '../assets/file-type-pdf.svg';
import logoKIO from '../assets/Captura_de_pantalla_2026-03-30_091031-removebg-preview (1).png';
import { useModalShake } from './useModalShake';
import ModalConfirmar from './ModalConfirmar';
import ModalConfirmado from './ModalConfirmado';
import ModalErrorFactura from './ModalErrorFactura';

const ReciboModal = ({ data, onClose }) => {
  const { isShaking, handleOverlayClick } = useModalShake();
  const [showConfirmPDF, setShowConfirmPDF] = useState(false);
  const [showConfirmarSalir, setShowConfirmarSalir] = useState(false);
  const [showSuccessPDF, setShowSuccessPDF] = useState(false);
  const [showErrorPDF, setShowErrorPDF] = useState(false);

  if (!data) return null;

  const handlePDFClick = () => {
    setShowConfirmPDF(true);
  };

  const handleConfirmPDF = async () => {
    try {
      console.log("Generando PDF de Recibo...");
      setShowConfirmPDF(false); 
      setShowSuccessPDF(true);
    } catch (error) {
      console.error("Error al generar PDF de Recibo:", error);
      setShowConfirmPDF(false);
      setShowErrorPDF(true);
    }
  };

  if (showSuccessPDF) {
    return (
      <ModalConfirmado
        isOpen={showSuccessPDF}
        onClose={onClose}
        title="Confirmado"
        subtitle="PDF de recibo generado exitosamente!"
      />
    );
  }

  if (showErrorPDF) {
    return (
      <ModalErrorFactura
        isOpen={showErrorPDF}
        onClose={() => setShowErrorPDF(false)}
        mensaje="No se pudo generar el PDF"
        submensaje="Intente de nuevo!"
      />
    );
  }

  if (showConfirmPDF) {
    return (
      <ModalConfirmar
        isOpen={showConfirmPDF}
        onClose={() => setShowConfirmPDF(false)}
        onConfirm={handleConfirmPDF}
        mensaje="Estas seguro de que desea convertir a PDF ?"
        salirLabel="Retroceder"
        confirmLabel="Confirmar"
      />
    );
  }

  if (showConfirmarSalir) {
    return (
      <ModalConfirmar
        isOpen={showConfirmarSalir}
        onClose={() => setShowConfirmarSalir(false)}
        onConfirm={onClose}
        mensaje="Estas seguro de que desea salir?"
        salirLabel="Retroceder"
        confirmLabel="Confirmar"
      />
    );
  }

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className={`recibo-card ${isShaking ? 'shake' : ''}`} onClick={(e) => e.stopPropagation()}>
        
        {/* Header con Logo e Info Empresa */}
        <header className="recibo-header">
          <div className="recibo-logo-box">
            <img src={logoKIO} alt="Logo" className="recibo-logo-img" />
          </div>
          <div className="recibo-empresa-info">
            <h1 className="recibo-empresa-name">KUKU-IO LED, SRL</h1>
            <p className="recibo-empresa-detail">RNC: 133-07517-2</p>
            <p className="recibo-empresa-detail">TEL: 809-277-2918 CEL: 849-279-2200</p>
            <p className="recibo-empresa-detail">Aut. Duarte, La Sabanita No 1, Burende</p>
            <h2 className="recibo-tipo-titulo">RECIBO DE {data.tipo === 'Abono' ? 'ABONO' : 'PAGO'}</h2>
            <p className="recibo-numero-fecha">No. {data.numero}-{data.fecha}</p>
          </div>
        </header>

        {/* Sección Cliente */}
        <section className="recibo-cliente-seccion">
          <div className="recibo-field">
            <span className="recibo-label">RECIBO DE</span>
            <span className="recibo-value-name">{data.cliente.nombre}</span>
          </div>
          <div className="recibo-field">
            <span className="recibo-label">RNC/CÉDULA:</span>
            <span className="recibo-value">{data.cliente.rnc}</span>
          </div>
        </section>

        <hr className="recibo-divider" />

        {/* Sección Concepto */}
        <section className="recibo-concepto-seccion">
          <h3 className="recibo-seccion-title">CONCEPTO</h3>
          {data.tipo === 'Abono' ? (
            <p className="recibo-concepto-texto">{data.concepto || 'Abono a cuenta pendiente'}</p>
          ) : (
            <ul className="recibo-items-list">
              {data.items.map((item, index) => (
                <li key={index} className="recibo-item">
                  {item.cant}X {item.desc}
                </li>
              ))}
            </ul>
          )}
        </section>

        <hr className="recibo-divider" />

        {/* Detalle de Pago */}
        <section className="recibo-detalle-pago">
          <h3 className="recibo-seccion-title">DETALLE DE PAGO</h3>
          {data.tipo === 'Abono' ? (
            <>
              <div className="recibo-total-line">
                <span className="recibo-total-label">Saldo anterior</span>
                <span className="recibo-total-value">$RD {data.saldoAnterior.toLocaleString('es-DO', { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="recibo-total-line">
                <span className="recibo-total-label">Abono realizado</span>
                <span className="recibo-total-value">$RD {data.monto.toLocaleString('es-DO', { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="recibo-total-line">
                <span className="recibo-total-label">Nuevo saldo pendiente</span>
                <span className="recibo-total-value">$RD {data.nuevoSaldo.toLocaleString('es-DO', { minimumFractionDigits: 2 })}</span>
              </div>
            </>
          ) : (
            <>
              <div className="recibo-total-line">
                <span className="recibo-total-label">SUB-TOTAL</span>
                <span className="recibo-total-value">$RD {data.subtotal.toLocaleString('es-DO', { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="recibo-total-line">
                <span className="recibo-total-label">ITBIS(18%)</span>
                <span className="recibo-total-value">$RD {data.itbis.toLocaleString('es-DO', { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="recibo-total-line">
                <span className="recibo-total-label">DESCUENTO</span>
                <span className="recibo-total-value">$RD {data.descuento || 0}</span>
              </div>
            </>
          )}
        </section>

        <hr className="recibo-divider" />

        {/* Total Pagado */}
        <section className="recibo-total-final-seccion">
          <div className="recibo-total-line highlight">
            <span className="recibo-total-label-final">TOTAL PAGADO</span>
            <span className="recibo-total-value-final">$RD {data.total.toLocaleString('es-DO', { minimumFractionDigits: 2 })}</span>
          </div>
        </section>

        {/* Acciones */}
        <div className="acciones-bar">
          <button className="btn-salir" onClick={() => setShowConfirmarSalir(true)}>
            <img src={iconSalir} alt="Salir" className="btn-icon" />
            Salir
          </button>
          <button className="btn-pdf" onClick={handlePDFClick}>
            <img src={iconPDF} alt="PDF" className="btn-icon" />
            PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReciboModal;
