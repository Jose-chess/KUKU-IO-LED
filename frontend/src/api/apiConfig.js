// Configuración centralizada de la API
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5200/api';

/**
 * Obtiene los headers de autenticación incluyendo el token JWT
 * @returns {Object} Headers con Content-Type y Authorization
 */
export const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : ''
    };
};

/**
 * Wrapper de fetch que agrega automáticamente headers de autenticación
 * @param {string} url - URL de la petición (relativa a API_URL o absoluta)
 * @param {Object} options - Opciones de fetch
 * @returns {Promise<Response>} Respuesta de fetch
 */
export const apiFetch = async (url, options = {}) => {
    const fullUrl = url.startsWith('http') ? url : `${API_URL}${url}`;
    
    const defaultOptions = {
        headers: {
            ...getAuthHeaders(),
            ...(options.headers || {})
        }
    };
    
    const mergedOptions = {
        ...options,
        headers: {
            ...defaultOptions.headers,
            ...(options.headers || {})
        }
    };
    
    const response = await fetch(fullUrl, mergedOptions);
    
    // Si el token es inválido o expiró, redirigir al login
    if (response.status === 401) {
        console.error('401 en URL:', fullUrl);
        localStorage.removeItem('token');
        window.location.href = '/';
        return response;
    }
    
    return response;
};

export { API_URL };
