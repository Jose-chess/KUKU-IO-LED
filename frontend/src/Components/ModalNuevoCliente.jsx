import React, { useState, useEffect } from 'react';
import './ModalNuevoCliente.css';
import iconSalir from '../assets/arrow-back-up.svg';
import iconGuardar from '../assets/circle-check.svg';
import ModalConfirmarSalida from './ModalConfirmarSalida';
import ModalValidacion from './ModalValidacion';
import { useModalShake } from './useModalShake';
import { useValidacion } from '../hooks/useValidacion';

// Funciones de utilidad
const capitalizeFirstLetter = (str) => {
    if (!str) return str;
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

const formatPhone = (value) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 6) return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
    return `${numbers.slice(0, 3)}-${numbers.slice(3, 6)}-${numbers.slice(6, 10)}`;
};

const formatCurrency = (value) => {
    const numbers = value.replace(/[^\d]/g, '');
    if (!numbers) return '';
    const num = parseInt(numbers, 10);
    return `$ ${num.toLocaleString('es-DO')}`;
};

const parseCurrency = (value) => {
    if (!value) return 0;
    return parseFloat(value.replace(/[$,]/g, '')) || 0;
};

const formatRncCedula = (value) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 10) return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
    return `${numbers.slice(0, 3)}-${numbers.slice(3, 10)}-${numbers.slice(10, 11)}`;
};

const ModalNuevoCliente = ({ isOpen, onClose, onSave, codigo }) => {
    const [showConfirmExit, setShowConfirmExit] = useState(false);
    const { isShaking, handleOverlayClick } = useModalShake();
    const { modalValidacion, cerrarError, validarFormulario, mostrarError } = useValidacion();

    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        rncCedula: '',
        direccion: '',
        sector: '',
        ciudad: '',
        telefono: '',
        limiteCredito: '',
        observacion: ''
    });

    const [errors, setErrors] = useState({});

    // Resetear formulario cuando se abre
    useEffect(() => {
        const resetForm = () => {
            setFormData({
                nombre: '',
                apellido: '',
                rncCedula: '',
                direccion: '',
                sector: '',
                ciudad: '',
                telefono: '',
                limiteCredito: '',
                observacion: ''
            });
            setErrors({});
        };
    }, [isOpen]);

    const validateField = (name, value) => {
        const newErrors = { ...errors };

        switch (name) {
            case 'nombre':
                if (!value || value.trim() === '') {
                    newErrors.nombre = 'El nombre es obligatorio';
                } else if (/\d/.test(value)) {
                    newErrors.nombre = 'El nombre solo puede contener letras';
                } else {
                    delete newErrors.nombre;
                }
                break;
            case 'apellido':
                if (value && /\d/.test(value)) {
                    newErrors.apellido = 'El apellido solo puede contener letras';
                } else {
                    delete newErrors.apellido;
                }
                break;
            case 'ciudad':
                if (value && /\d/.test(value)) {
                    newErrors.ciudad = 'La ciudad solo puede contener letras';
                } else {
                    delete newErrors.ciudad;
                }
                break;
            case 'telefono':
                if (value && /[a-zA-Z]/.test(value)) {
                    newErrors.telefono = 'El teléfono solo puede contener números';
                } else {
                    delete newErrors.telefono;
                }
                break;
            case 'limiteCredito':
                const limite = parseCurrency(value);
                if (limite < 0) {
                    newErrors.limiteCredito = 'El límite no puede ser negativo';
                } else {
                    delete newErrors.limiteCredito;
                }
                break;
            default:
                break;
        }

        setErrors(newErrors);
    };

    const handleInputValidation = (e) => {
        const { name } = e.target;
        const key = e.key;
        
        // Bloquear caracteres no permitidos y mostrar modal
        if (key.length === 1) { // Solo caracteres escritos, no teclas especiales
            const fieldName = name;
            
            // Campos que solo aceptan letras
            if (['nombre', 'apellido', 'ciudad', 'sector'].includes(fieldName)) {
                if (/\d/.test(key)) {
                    e.preventDefault();
                    const campoNombre = fieldName.charAt(0).toUpperCase() + fieldName.slice(1);
                    mostrarError(campoNombre, 'letras');
                    return;
                }
            }
            
            // Campos que solo aceptan números
            if (['telefono', 'rncCedula'].includes(fieldName)) {
                if (/[a-zA-Z]/.test(key)) {
                    e.preventDefault();
                    const campoNombre = fieldName === 'rncCedula' ? 'RNC/Cédula' : 'Teléfono';
                    mostrarError(campoNombre, 'numerico');
                    return;
                }
            }
            
            // Límite de crédito solo acepta números
            if (fieldName === 'limiteCredito') {
                if (/[a-zA-Z]/.test(key) && key !== '$' && key !== ' ') {
                    e.preventDefault();
                    mostrarError('Límite de Crédito', 'numerico');
                    return;
                }
            }
        }
        
        // Manejar navegación con Enter si no se bloqueó el carácter
        if (key === 'Enter') {
            e.preventDefault();
            const container = e.target.closest('.modal-cliente-container');
            const inputs = Array.from(container.querySelectorAll('input:not([readOnly]), textarea'));
            const currentIndex = inputs.indexOf(e.target);
            const nextIndex = currentIndex + 1;
            if (nextIndex < inputs.length) {
                inputs[nextIndex].focus();
            }
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        let formattedValue = value;

        // Aplicar formato según el campo
        switch (name) {
            case 'nombre':
            case 'apellido':
            case 'ciudad':
                // Solo letras, primera letra mayúscula
                if (value && !/\d/.test(value)) {
                    formattedValue = capitalizeFirstLetter(value);
                }
                break;
            case 'direccion':
            case 'sector':
                // Primera letra mayúscula, permite letras y números
                formattedValue = capitalizeFirstLetter(value);
                break;
            case 'observacion':
                formattedValue = capitalizeFirstLetter(value);
                break;
            case 'rncCedula':
                // Formato RNC dominicano: XXX-XXXXXXX-X
                formattedValue = formatRncCedula(value);
                break;
            case 'telefono':
                // Solo números con formato automático
                formattedValue = formatPhone(value);
                break;
            case 'limiteCredito':
                // Formato moneda
                formattedValue = formatCurrency(value);
                break;
            default:
                break;
        }

        setFormData(prev => ({ ...prev, [name]: formattedValue }));
        validateField(name, formattedValue);
    };

    const validateForm = () => {
        const newErrors = {};

        // Nombre es obligatorio
        if (!formData.nombre || formData.nombre.trim() === '') {
            newErrors.nombre = 'El nombre es obligatorio';
        } else if (/\d/.test(formData.nombre)) {
            newErrors.nombre = 'El nombre solo puede contener letras';
        }

        // Validar límites negativos
        if (parseCurrency(formData.limiteCredito) < 0) {
            newErrors.limiteCredito = 'El límite no puede ser negativo';
        }
        // balanceActual eliminado - no se permite edición

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSave = () => {
        // Validar con modales
        const isValid = validarFormulario([
            { valor: formData.nombre, nombre: 'Nombre', tipo: 'obligatorio' },
            { valor: formData.nombre, nombre: 'Nombre', tipo: 'soloLetras' },
            { valor: formData.apellido, nombre: 'Apellido', tipo: 'obligatorio' },
            { valor: formData.apellido, nombre: 'Apellido', tipo: 'soloLetras' },
            { valor: formData.telefono, nombre: 'Teléfono', tipo: 'obligatorio' },
            { valor: formData.limiteCredito, nombre: 'Límite de Crédito', tipo: 'obligatorio' },
            { valor: formData.limiteCredito, nombre: 'Límite de Crédito', tipo: 'noNegativo' }
        ]);

        if (!isValid) {
            return;
        }

        const payload = {
            nombre: formData.nombre.trim(),
            apellido: formData.apellido.trim() || null,
            rncCedula: formData.rncCedula.trim() || null,
            direccion: formData.direccion.trim() || null,
            sector: formData.sector.trim() || null,
            ciudad: formData.ciudad.trim() || null,
            telefono: formData.telefono.trim() || null,
            limiteCredito: parseCurrency(formData.limiteCredito),
            // balanceActual eliminado - se maneja en el backend
            observacion: formData.observacion.trim() || null
        };

        onSave?.(payload);
    };

    const handleClose = () => {
        setShowConfirmExit(false);
        onClose?.();
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const container = e.target.closest('.modal-cliente-container');
            const inputs = Array.from(container.querySelectorAll('input:not([readOnly]), textarea'));
            const currentIndex = inputs.indexOf(e.target);
            const nextIndex = currentIndex + 1;
            if (nextIndex < inputs.length) {
                inputs[nextIndex].focus();
            }
        }
    };

    if (!isOpen) return null;

    // Si hay modal de validación abierto, no mostrar el contenido del modal
    if (modalValidacion.isOpen) {
        return (
            <ModalValidacion
                isOpen={modalValidacion.isOpen}
                onClose={cerrarError}
                campo={modalValidacion.campo}
                tipo={modalValidacion.tipo}
                mensaje={modalValidacion.mensaje}
            />
        );
    }

    if (showConfirmExit) {
        return (
            <ModalConfirmarSalida
                isOpen={showConfirmExit}
                onClose={() => setShowConfirmExit(false)}
                onConfirm={handleClose}
            />
        );
    }

    return (
        <div className="modal-cliente-overlay" onClick={() => handleOverlayClick(onClose)}>
            <div className={`modal-cliente-container ${isShaking ? 'shake' : ''}`} onClick={(e) => e.stopPropagation()}>
                <h2 className="modal-cliente-title">Añadir Cliente</h2>

                <div className="modal-cliente-form-section">
                    <h3 className="modal-cliente-subtitle">Informacion del cliente</h3>
                    <div className="modal-cliente-divider-line" />

                    <div className="modal-cliente-grid-form">
                        <div className="modal-cliente-input-group">
                            <label>Código del cliente:</label>
                            <input autoComplete="off"
                                type="text"
                                value={codigo || ''}
                                placeholder="Cargando..."
                                onKeyDown={handleKeyDown}
                                readOnly
                            />
                        </div>
                        <div className="modal-cliente-input-group">
                            <label>Nombre: *</label>
                            <input autoComplete="off"
                                type="text"
                                name="nombre"
                                value={formData.nombre}
                                onChange={handleChange}
                                onKeyDown={handleInputValidation}
                                placeholder="Ingrese el nombre"
                                className={errors.nombre ? 'input-error' : ''}
                            />
                            {errors.nombre && <span className="error-message">{errors.nombre}</span>}
                        </div>
                        <div className="modal-cliente-input-group">
                            <label>Apellido: *</label>
                            <input autoComplete="off"
                                type="text"
                                name="apellido"
                                value={formData.apellido}
                                onChange={handleChange}
                                onKeyDown={handleInputValidation}
                                placeholder="Ingrese el apellido"
                                className={errors.apellido ? 'input-error' : ''}
                            />
                            {errors.apellido && <span className="error-message">{errors.apellido}</span>}
                        </div>
                        <div className="modal-cliente-input-group">
                            <label>RNC/Cédula:</label>
                            <input autoComplete="off"
                                type="text"
                                name="rncCedula"
                                value={formData.rncCedula}
                                onChange={handleChange}
                                onKeyDown={handleInputValidation}
                                placeholder="000-0000000-0"
                                maxLength={13}
                            />
                        </div>
                        <div className="modal-cliente-input-group">
                            <label>Dirección:</label>
                            <input autoComplete="off"
                                type="text"
                                name="direccion"
                                value={formData.direccion}
                                onChange={handleChange}
                                onKeyDown={handleKeyDown}
                                placeholder="Ingrese la dirección"
                            />
                        </div>
                        <div className="modal-cliente-input-group">
                            <label>Sector:</label>
                            <input autoComplete="off"
                                type="text"
                                name="sector"
                                value={formData.sector}
                                onChange={handleChange}
                                onKeyDown={handleInputValidation}
                                placeholder="Ingrese el sector"
                            />
                        </div>
                        <div className="modal-cliente-input-group">
                            <label>Ciudad:</label>
                            <input autoComplete="off"
                                type="text"
                                name="ciudad"
                                value={formData.ciudad}
                                onChange={handleChange}
                                onKeyDown={handleInputValidation}
                                placeholder="Ingrese la ciudad"
                                className={errors.ciudad ? 'input-error' : ''}
                            />
                            {errors.ciudad && <span className="error-message">{errors.ciudad}</span>}
                        </div>
                        <div className="modal-cliente-input-group">
                            <label>Teléfono: *</label>
                            <input autoComplete="off"
                                type="text"
                                name="telefono"
                                value={formData.telefono}
                                onChange={handleChange}
                                onKeyDown={handleInputValidation}
                                placeholder="Ingrese el número teléfonico"
                                maxLength={12}
                                className={errors.telefono ? 'input-error' : ''}
                            />
                            {errors.telefono && <span className="error-message">{errors.telefono}</span>}
                        </div>
                        <div className="modal-cliente-input-group">
                            <label>Límite de crédito: *</label>
                            <input autoComplete="off"
                                type="text"
                                name="limiteCredito"
                                value={formData.limiteCredito}
                                onChange={handleChange}
                                onKeyDown={handleInputValidation}
                                placeholder="$ 0"
                                className={errors.limiteCredito ? 'input-error' : ''}
                            />
                            {errors.limiteCredito && <span className="error-message">{errors.limiteCredito}</span>}
                        </div>
                        {/* Balance actual eliminado - no editable por el usuario */}
                    </div>

                    <div className="modal-cliente-input-group modal-cliente-full-width">
                        <label>Observación:</label>
                        <textarea
                            name="observacion"
                            value={formData.observacion}
                            onChange={handleChange}
                            placeholder="Ingrese una observación"
                            rows="4"
                            onKeyDown={handleKeyDown}
                        />
                    </div>
                </div>

                <div className="modal-cliente-footer-line">
                    <button className="btn-salir-cliente" onClick={() => setShowConfirmExit(true)}>
                        <img src={iconSalir} alt="" className="modal-cliente-btn-icon" />
                        Retroceder
                    </button>
                    <button className="btn-guardar-cliente" onClick={handleSave}>
                        <img src={iconGuardar} alt="" className="modal-cliente-btn-icon" />
                        Guardar cliente
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ModalNuevoCliente;
