import React from 'react';
import './FacturaModal.css';
import iconSalir from '../assets/arrow-back-up.svg';
import iconPDF from '../assets/file-type-pdf.svg';
import logoKIO from '../assets/Captura_de_pantalla_2026-03-30_091031-removebg-preview (1).png';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const FacturaModal = ({ data, onClose }) => {
  if (!data) return null;

  // Generar PDF visualmente igual al modal
  const handlePDF = async () => {
    const modal = document.querySelector('.factura-card');
    const accionesBar = modal?.querySelector('.acciones-bar');
    if (!modal) return;
    // Guardar estilos originales
    const originalWidth = modal.style.width;
    const originalMaxWidth = modal.style.maxWidth;
    const originalMinWidth = modal.style.minWidth;
    const originalMinHeight = modal.style.minHeight;
    // Expandir el modal al ancho de A4 (794px aprox) y alto mínimo de 600px
    modal.style.width = '794px';
    modal.style.maxWidth = '794px';
    modal.style.minWidth = '794px';
    modal.style.minHeight = '600px';
    // Ocultar la barra de botones antes de capturar
    if (accionesBar) accionesBar.style.display = 'none';
    // Esperar un frame para asegurar el cambio
    await new Promise(r => setTimeout(r, 50));
    const canvas = await html2canvas(modal, { scale: 2, useCORS: true });
    // Restaurar la barra de botones y el tamaño original
    if (accionesBar) accionesBar.style.display = '';
    modal.style.width = originalWidth;
    modal.style.maxWidth = originalMaxWidth;
    modal.style.minWidth = originalMinWidth;
    modal.style.minHeight = originalMinHeight;
    const imgData = canvas.toDataURL('image/png');
    // Definir el ancho de la página igual al de A4 (794px), y el alto proporcional al contenido
    const pageWidth = 794; // px (A4)
    const margin = 20;
    let imgWidth = pageWidth - margin * 2;
    let imgHeight = (canvas.height * imgWidth) / canvas.width;
    // El alto de la página será el de la imagen + márgenes
    const pageHeight = imgHeight + margin * 2;
    // Crear PDF con tamaño personalizado
    const pdf = new jsPDF({ orientation: 'portrait', unit: 'px', format: [pageWidth, pageHeight] });
    const x = margin;
    const y = margin;
    pdf.addImage(imgData, 'PNG', x, y, imgWidth, imgHeight);
    const pdfBlob = pdf.output('blob');
    const blobUrl = URL.createObjectURL(pdfBlob);
    window.open(blobUrl, '_blank');
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="factura-card" onClick={(e) => e.stopPropagation()}>
        
        {/* Encabezado Principal */}
        <header className="factura-header-principal">
          <div className="empresa-header">
            <img src={logoKIO} alt="Kuku-Io Led Logo" className="logo-principal" />
            <div className="empresa-info-principal">
              <h1 className="empresa-nombre">KUKU IO LED, SRL</h1>
              <p className="empresa-direccion">Dirección: Aut. Duarte, La Sabanita No. 1, Burende</p>
              <p className="empresa-rnc">RNC: 133-07517-2</p>
              <p className="empresa-contacto">Tel: 809-277-2918, Cel: 849-279-2200</p>
            </div>
          </div>
          
          <div className="factura-info-box">
            <h2 className="factura-titulo">FACTURA</h2>
            <span className="factura-valor-fiscal">VALOR FISCAL</span>
            <p className="factura-ncf">NCF: B02000000134</p>
          </div>
        </header>

        {/* Sección Cliente y Factura Info */}
        <section className="info-seccion">
          {/* Info Cliente - Izquierda */}
          <div className="cliente-box">
            <div className="cliente-label">Cliente</div>
            <table className="cliente-table">
              <tbody>
                <tr>
                  <td className="label-cell">Nombre</td>
                  <td className="value-cell">{data.cliente.nombre}</td>
                </tr>
                <tr>
                  <td className="label-cell">RNC</td>
                  <td className="value-cell">{data.cliente.rnc || '44-665-898'}</td>
                </tr>
                <tr>
                  <td className="label-cell">Dirección</td>
                  <td className="value-cell">{data.cliente.direccion || 'Oficina #5'}</td>
                </tr>
                <tr>
                  <td className="label-cell">Ciudad</td>
                  <td className="value-cell">{data.cliente.ciudad || 'Santo Domingo'}</td>
                </tr>
                <tr>
                  <td className="label-cell">Teléfono</td>
                  <td className="value-cell">+1 (829) 551-1725</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          {/* Info Factura - Derecha */}
          <div className="factura-datos-box">
            <div className="factura-datos-header">VÁLIDO HASTA</div>
            <div className="factura-datos-content">
              <table className="factura-datos-table">
                <tbody>
                  <tr>
                    <td className="label-cell">Válido hasta</td>
                    <td className="value-cell text-right">31/12/2026</td>
                  </tr>
                  <tr>
                    <td className="label-cell">Fecha de emisión</td>
                    <td className="value-cell text-right">30/3/2026</td>
                  </tr>
                  <tr>
                    <td className="label-cell">Condición</td>
                    <td className="value-cell text-right condicion">Contado</td>
                  </tr>
                  <tr>
                    <td className="label-cell">Nro.</td>
                    <td className="value-cell text-right">2222</td>
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
          <div className="productos-scroll">
            <table className="productos-tabla">
              <thead>
                <tr>
                  <th className="col-cant">Cant.</th>
                  <th className="col-desc">Descripción</th>
                  <th className="col-precio text-right">Precio Unitario</th>
                  <th className="col-total text-right">Total</th>
                </tr>
              </thead>
              <tbody>
                {data.items.map((item, index) => (
                  <tr key={index}>
                    <td className="col-cant">{item.cant}</td>
                    <td className="col-desc">{item.desc}</td>
                    <td className="col-precio text-right">{item.precio.toLocaleString('es-DO', {minimumFractionDigits: 2})}</td>
                    <td className="col-total text-right">{(item.cant * item.precio).toLocaleString('es-DO', {minimumFractionDigits: 2})}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>

        {/* Totales */}
        <footer className="totales-seccion">
          <div className="totales-box">
            <table className="totales-tabla">
              <tbody>
                <tr>
                  <td className="total-label">SUB-TOTAL</td>
                  <td className="total-currency"></td>
                  <td className="total-value">{data.subtotal.toLocaleString('es-DO', {minimumFractionDigits: 2})}</td>
                </tr>
                <tr>
                  <td className="total-label">Descuento</td>
                  <td className="total-currency"></td>
                  <td className="total-value">0.00</td>
                </tr>
                <tr>
                  <td className="total-label">Itbis</td>
                  <td className="total-currency"></td>
                  <td className="total-value">{data.itbis.toLocaleString('es-DO', {minimumFractionDigits: 2})}</td>
                </tr>
                <tr className="total-final">
                  <td className="total-label">TOTAL</td>
                  <td className="total-currency"></td>
                  <td className="total-value">{data.total.toLocaleString('es-DO', {minimumFractionDigits: 2})}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </footer>

        {/* Botones de Acción */}
        <div className="acciones-bar">
          <button className="btn-salir" onClick={onClose}>
            <img src={iconSalir} alt="Salir" className="btn-icon" />
            Salir
          </button>
          <button className="btn-pdf" onClick={handlePDF} type="button">
            <img src={iconPDF} alt="PDF" className="btn-icon" />
            PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default FacturaModal;
