import React, { useState } from 'react';

import './ReciboModal.css';

import iconSalir from '../assets/arrow-back-up.svg';

import iconPDF from '../assets/file-type-pdf.svg';

import logoKIO from '../assets/Captura_de_pantalla_2026-03-30_091031-removebg-preview (1).png';

import { useModalShake } from './useModalShake';

import ModalConfirmar from './ModalConfirmar';

import ModalConfirmado from './ModalConfirmado';

import ModalErrorFactura from './ModalErrorFactura';



const ReciboPagoModal = ({ data, onClose }) => {

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

      console.log("Generando PDF de Recibo de PAGO...");

      setShowConfirmPDF(false); 

      setShowSuccessPDF(true);

    } catch (error) {

      console.error("Error al generar PDF de Recibo de PAGO:", error);

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

        subtitle="¡PDF de recibo de pago generado exitosamente!"

      />

    );

  }



  if (showErrorPDF) {

    return (

      <ModalErrorFactura

        isOpen={showErrorPDF}

        onClose={() => setShowErrorPDF(false)}

        mensaje="No se pudo generar el PDF"

        submensaje="¡Intente de nuevo!"

      />

    );

  }



  if (showConfirmPDF) {

    return (

      <ModalConfirmar

        isOpen={showConfirmPDF}

        onClose={() => setShowConfirmPDF(false)}

        onConfirm={handleConfirmPDF}

        mensaje="¿Está seguro de que desea convertir a PDF?"

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

        mensaje="¿Estas seguro de que desea salir?"

        salirLabel="Retroceder"

        confirmLabel="Confirmar"

      />

    );

  }



  return (

    <div className="modal-overlay" onClick={handleOverlayClick}>

      <div className={`recibo-modal-container ${isShaking ? 'shake' : ''}`} onClick={(e) => e.stopPropagation()}>

        

        {/* Cuerpo del Recibo */}

        <div className="recibo-card-body">

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

              <h2 className="recibo-tipo-titulo">RECIBO DE PAGO</h2>

              <div className="recibo-top-meta">

                <p className="recibo-numero">No. {data.numero || '0001'}</p>

                <p className="recibo-fecha-destacada">FECHA: {data.fecha || '2026-04-29'}</p>

              </div>

            </div>

          </header>



          {/* Sección Cliente */}

          <section className="recibo-cliente-seccion">

            <div className="recibo-field">

              <span className="recibo-label">RECIBO DE:</span>

              <span className="recibo-value-name">{data.cliente.nombre}</span>

            </div>

            <div className="recibo-double-field">

              <div className="recibo-field">

                <span className="recibo-label">CÉDULA:</span>

                <span className="recibo-value">{data.cliente.cedula || '---'}</span>

              </div>

              <div className="recibo-field">

                <span className="recibo-label">RNC:</span>

                <span className="recibo-value">{data.cliente.rnc || '---'}</span>

              </div>

            </div>

          </section>



          <hr className="recibo-divider" />



          {/* Sección Concepto y Datos Pago */}

          <section className="recibo-pago-main-info">

            <div className="recibo-field-large">

              <span className="recibo-label">CONCEPTO:</span>

              <div className="recibo-value-text">

                <div style={{ color: '#111827', fontWeight: '600', fontSize: '14px' }}>

                  Pago correspondiente al registro de venta #{data.nroInterno || '---'}

                </div>

                {data.facturaNCF && (

                  <div style={{ fontSize: '11px', color: '#6b7280', marginTop: '2px', fontWeight: '400' }}>

                    Referencia externa (NCF): {data.facturaNCF}

                  </div>

                )}

              </div>

            </div>

            

            <div className="recibo-pago-row">

              <div className="recibo-field">

                <span className="recibo-label">MÉTODO DE PAGO:</span>

                <span className="recibo-value">{data.metodoPago || 'Efectivo'}</span>

              </div>

              <div className="recibo-field">

                <span className="recibo-label">NCF FACTURA:</span>

                <span className="recibo-value">{data.facturaNCF || '---'}</span>

              </div>

            </div>

          </section>



          <hr className="recibo-divider" />



          {/* Total Pagado */}

          <section className="recibo-total-final-seccion">

            <div className="recibo-total-line highlight">

              <span className="recibo-total-label-final">TOTAL PAGADO</span>

              <span className="recibo-total-value-final">$RD {data.total.toLocaleString('es-DO', { minimumFractionDigits: 0 })}</span>

            </div>

          </section>



          {/* Firma */}



          

          <div style={{ padding: '10px 40px', fontSize: '10px', color: '#6b7280', textAlign: 'center', borderTop: '1px solid #f5f5f5', marginTop: 'auto', borderBottomLeftRadius: '12px', borderBottomRightRadius: '12px' }}>

            Este documento es para uso interno y no sustituye un comprobante fiscal emitido por la DGII.

          </div>

        </div>



        {/* Acciones Separadas */}

        <div className="acciones-bar-separated">

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



export default ReciboPagoModal;

