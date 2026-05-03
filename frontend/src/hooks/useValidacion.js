import { useState, useCallback } from 'react';

/**
 * Hook reutilizable para manejar validaciones de formularios
 * con modales de error integrados
 */
export const useValidacion = () => {
    const [modalValidacion, setModalValidacion] = useState({
        isOpen: false,
        campo: '',
        tipo: 'numerico',
        mensaje: null
    });

    // Abrir modal de validación
    const mostrarError = useCallback((campo, tipo, mensajePersonalizado = null) => {
        setModalValidacion({
            isOpen: true,
            campo,
            tipo,
            mensaje: mensajePersonalizado
        });
    }, []);

    // Cerrar modal
    const cerrarError = useCallback(() => {
        setModalValidacion(prev => ({
            ...prev,
            isOpen: false
        }));
    }, []);

    // Validadores específicos
    const validarSoloNumeros = useCallback((valor, nombreCampo, mostrarModal = true) => {
        if (valor && /[a-zA-Z]/.test(valor)) {
            if (mostrarModal) {
                mostrarError(nombreCampo, 'numerico');
            }
            return false;
        }
        return true;
    }, [mostrarError]);

    const validarSoloLetras = useCallback((valor, nombreCampo, mostrarModal = true) => {
        if (valor && /\d/.test(valor)) {
            if (mostrarModal) {
                mostrarError(nombreCampo, 'letras');
            }
            return false;
        }
        return true;
    }, [mostrarError]);

    const validarObligatorio = useCallback((valor, nombreCampo, mostrarModal = true) => {
        if (!valor || valor.trim() === '') {
            if (mostrarModal) {
                mostrarError(nombreCampo, 'obligatorio');
            }
            return false;
        }
        return true;
    }, [mostrarError]);

    const validarNoNegativo = useCallback((valor, nombreCampo, mostrarModal = true) => {
        const num = parseFloat(valor);
        if (!isNaN(num) && num < 0) {
            if (mostrarModal) {
                mostrarError(nombreCampo, 'positivo');
            }
            return false;
        }
        return true;
    }, [mostrarError]);

    const validarUnico = useCallback((valor, nombreCampo, existeFn, mostrarModal = true) => {
        if (existeFn && existeFn(valor)) {
            if (mostrarModal) {
                mostrarError(nombreCampo, 'unico');
            }
            return false;
        }
        return true;
    }, [mostrarError]);

    // Validar múltiples campos a la vez
    const validarFormulario = useCallback((validaciones) => {
        // validaciones es un array de objetos: { valor, nombre, tipo, customCheck }
        for (const validacion of validaciones) {
            const { valor, nombre, tipo, customCheck } = validacion;
            
            let isValid = true;
            
            switch (tipo) {
                case 'obligatorio':
                    isValid = validarObligatorio(valor, nombre);
                    break;
                case 'soloLetras':
                    isValid = validarSoloLetras(valor, nombre);
                    break;
                case 'soloNumeros':
                    isValid = validarSoloNumeros(valor, nombre);
                    break;
                case 'noNegativo':
                    isValid = validarNoNegativo(valor, nombre);
                    break;
                case 'custom':
                    if (customCheck && !customCheck(valor)) {
                        mostrarError(nombre, 'custom', validacion.mensaje || 'Error de validación');
                        isValid = false;
                    }
                    break;
                default:
                    break;
            }
            
            if (!isValid) {
                return false; // Detener en el primer error
            }
        }
        
        return true;
    }, [validarObligatorio, validarSoloLetras, validarSoloNumeros, validarNoNegativo, mostrarError]);

    return {
        modalValidacion,
        mostrarError,
        cerrarError,
        validarSoloNumeros,
        validarSoloLetras,
        validarObligatorio,
        validarNoNegativo,
        validarUnico,
        validarFormulario
    };
};

export default useValidacion;
