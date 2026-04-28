import React from 'react';
import './FacturaModal.css';
import iconSalir from '../assets/arrow-back-up.svg';
import iconPDF from '../assets/file-type-pdf.svg';

const FacturaModal = ({ data, onClose }) => {
  if (!data) return null;

  return (
    <div className="modal-overlay">
      <div className="factura-card">
        
        {/* Encabezado */}
        <header className="factura-header">
          <div className="empresa-info">
            <div className="logo-placeholder">
               <span className="logo-text">K-IO</span>
            </div>
            <div className="empresa-detalles">
              <h1>KUKU IO LED, SRL</h1>
              <p>Aut. Duarte, La Sabanita No. 1, Burende</p>
              <p><strong>RNC:</strong> 133-07517-2</p>
              <p><strong>Tel:</strong> 809-277-2918 | <strong>Cel:</strong> 849-279-2200</p>
            </div>
          </div>
          
          <div className="factura-meta">
            <h2 className="titulo-factura">FACTURA</h2>
            <span className="tag-fiscal">VALOR FISCAL</span>
            <p className="ncf-texto">NCF: B02000000134</p>
          </div>
        </header>

        {/* Información del Cliente */}
        <section className="cliente-seccion">
          <div className="cliente-datos">
            <label>CLIENTE</label>
            <h3>{data.cliente.nombre}</h3>
            <p>RNC: {data.cliente.rnc}</p>
            <p>{data.cliente.direccion}</p>
            <p>{data.cliente.ciudad}</p>
          </div>
          <div className="venta-datos">
            <div className="dato-grupo">
              <label>VÁLIDO HASTA</label>
              <p>31/12/2026</p>
            </div>
            <div className="dato-grupo text-right">
              <label>FECHA EMISIÓN</label>
              <p>30/03/2026</p>
            </div>
            <div className="dato-grupo">
              <label>CONDICIÓN</label>
              <p className="status-pago">CONTADO</p>
            </div>
            <div className="dato-grupo text-right">
              <label>VENDEDOR</label>
              <p>Carlos Castillo</p>
            </div>
          </div>
        </section>

        {/* Tabla de Productos */}
        <main className="tabla-contenedor">
          <table className="factura-tabla">
            <thead>
              <tr>
                <th>CANT.</th>
                <th>DESCRIPCIÓN</th>
                <th className="text-right">PRECIO UNIT.</th>
                <th className="text-right">TOTAL</th>
              </tr>
            </thead>
            <tbody>
              {data.items.map((item, index) => (
                <tr key={index}>
                  <td>{item.cant}</td>
                  <td>{item.desc}</td>
                  <td className="text-right">$RD {item.precio.toLocaleString()}</td>
                  <td className="text-right font-bold">$RD {(item.cant * item.precio).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </main>

        {/* Totales */}
        <footer className="factura-footer">
          <div className="totales-contenedor">
            <div className="total-fila">
              <span>SUB-TOTAL</span>
              <span>$RD {data.subtotal.toLocaleString()}</span>
            </div>
            <div className="total-fila">
              <span>ITBIS (18%)</span>
              <span>$RD {data.itbis.toLocaleString()}</span>
            </div>
            <div className="total-fila final">
              <span>TOTAL</span>
              <span>$RD {data.total.toLocaleString()}</span>
            </div>
          </div>
        </footer>

        {/* Botones de Acción */}
        <div className="acciones-bar">
          <button className="btn-salir" onClick={onClose}>
            <img src={iconSalir} alt="Salir" className="btn-icon" />
            Salir
          </button>
          <button className="btn-pdf">
            <img src={iconPDF} alt="PDF" className="btn-icon" />
            PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default FacturaModal;
