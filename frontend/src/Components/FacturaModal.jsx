import React, { useState } from 'react';
import './FacturaModal.css';
import iconSalir from '../assets/arrow-back-up.svg';
import iconPDF from '../assets/file-type-pdf.svg';
import logoKIO from '../assets/Captura_de_pantalla_2026-03-30_091031-removebg-preview (1).png';
import { useModalShake } from './useModalShake';
import ModalConfirmar from './ModalConfirmar';
import ModalConfirmado from './ModalConfirmado';
import ModalErrorFactura from './ModalErrorFactura';

const FacturaModal = ({ data, onClose }) => {
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
      // Simulamos la generación del PDF
      console.log("Generando PDF...");
      setShowConfirmPDF(false); 
      
      // Aquí irá la llamada al backend. 
      // Por ahora simulamos éxito:
      setShowSuccessPDF(true);
      
    } catch (error) {
      console.error("Error al generar PDF:", error);
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
        subtitle="PDF generado exitosamente!"
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
      <div className={`factura-card ${isShaking ? 'shake' : ''}`} onClick={(e) => e.stopPropagation()}>

        {/* Header Principal */}
        <header className="factura-header-principal">
          <div className="empresa-header">
            <img src={logoKIO} alt="Kuku-Io Led Logo" className="logo-img" />
            <div className="empresa-info-text">
              <h1 className="empresa-nombre">KUKU IO LED, SRL</h1>
              <p className="empresa-direccion">Dirección: Aut. Duarte, La Sabanita No. 1, Burende</p>
              <p className="empresa-rnc">RNC: 133-07517-2</p>
              <p className="empresa-contacto">Tel: 809-277-2918, Cel: 849-279-2200</p>
            </div>
          </div>

          <div className="factura-info-box">
            <h2 className="factura-titulo">FACTURA</h2>
            <div className="factura-valor-fiscal">VALOR FISCAL</div>
            <p className="factura-ncf">NCF: B02000000134</p>
          </div>
        </header>

        {/* Sección Info (Cliente + Factura Datos) */}
        <section className="info-seccion">
          {/* Cliente Box (Izquierda) */}
          <div className="cliente-box">
            <div className="cliente-label">CLIENTE</div>
            <table className="cliente-table">
              <tbody>
                <tr>
                  <td className="label-cell">Nombre</td>
                  <td className="value-cell">{data.cliente.nombre}</td>
                </tr>
                <tr>
                  <td className="label-cell">RNC</td>
                  <td className="value-cell">{data.cliente.rnc}</td>
                </tr>
                <tr>
                  <td className="label-cell">Dirección</td>
                  <td className="value-cell">{data.cliente.direccion}</td>
                </tr>
                <tr>
                  <td className="label-cell">Ciudad</td>
                  <td className="value-cell">{data.cliente.ciudad}</td>
                </tr>
                <tr>
                  <td className="label-cell">Teléfono</td>
                  <td className="value-cell">{data.cliente.telefono}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Info Factura - Derecha */}
          <div className="factura-datos-box">
            <div className="factura-datos-header">INFORMACIÓN DE LA FACTURA</div>
            <div className="factura-datos-content">
              <table className="factura-datos-table">
                <tbody>
                  <tr>
                    <td className="label-cell">Válido hasta</td>
                    <td className="value-cell text-right">31/12/2026</td>
                  </tr>
                  <tr>
                    <td className="label-cell">Fecha de emisión</td>
                    <td className="value-cell text-right">{data.fecha || '30/3/2026'}</td>
                  </tr>
                  <tr>
                    <td className="label-cell">Condición</td>
                    <td className="value-cell text-right condicion">{data.condicion || 'Contado'}</td>
                  </tr>
                  <tr>
                    <td className="label-cell">Nro.</td>
                    <td className="value-cell text-right">{data.nro || '2222'}</td>
                  </tr>
                  <tr>
                    <td className="label-cell">Vendedor</td>
                    <td className="value-cell text-right">Carlos castillo</td>
                  </tr>
                  <tr>
                    <td className="label-cell">Tipo</td>
                    <td className="value-cell text-right">Consumidor final</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Tabla de Productos */}
        <main className="productos-seccion">
          <table className="productos-tabla">
            <thead>
              <tr>
                <th className="col-cant">CANT.</th>
                <th className="col-desc">DESCRIPCIÓN</th>
                <th className="col-precio text-center">PRECIO UNITARIO</th>
                <th className="col-total text-right">TOTAL</th>
              </tr>
            </thead>
            <tbody>
              {data.items.map((item, index) => (
                <tr key={index}>
                  <td className="col-cant">{item.cant}</td>
                  <td className="col-desc">{item.desc}</td>
                  <td className="col-precio text-right">{item.precio.toLocaleString('es-DO', { minimumFractionDigits: 2 })}</td>
                  <td className="col-total text-right">{(item.cant * item.precio).toLocaleString('es-DO', { minimumFractionDigits: 2 })}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </main>

        {/* Totales */}
        <footer className="totales-seccion">
          <div className="totales-box">
            <table className="totales-tabla">
              <tbody>
                <tr>
                  <td className="total-label">SUB-TOTAL</td>
                  <td className="total-value text-right">{data.subtotal.toLocaleString('es-DO', { minimumFractionDigits: 2 })}</td>
                </tr>
                <tr>
                  <td className="total-label">Descuento</td>
                  <td className="total-value text-right">0.00</td>
                </tr>
                <tr>
                  <td className="total-label">Itbis</td>
                  <td className="total-value text-right">{data.itbis.toLocaleString('es-DO', { minimumFractionDigits: 2 })}</td>
                </tr>
                <tr className="total-final">
                  <td className="total-label">TOTAL</td>
                  <td className="total-value text-right">{data.total.toLocaleString('es-DO', { minimumFractionDigits: 2 })}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </footer>

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

export default FacturaModal;
