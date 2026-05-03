// src/utils/formatters.js
// Funciones de formateo reutilizables

/**
 * Formatea un número como moneda en formato dominicano (DOP)
 * @param {number} value - Valor a formatear
 * @returns {string} - String formateado como moneda
 */
export const formatMoney = (value) => {
    if (!value || isNaN(value)) return '$ 0';
    return `$ ${Number(value).toLocaleString('es-DO', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
    })}`;
};

/**
 * Formatea una fecha a formato local
 * @param {string|Date} date - Fecha a formatear
 * @returns {string} - Fecha formateada
 */
export const formatDate = (date) => {
    if (!date) return '-';
    const d = new Date(date);
    return d.toLocaleDateString('es-DO', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
};

/**
 * Formatea un número con separadores de miles
 * @param {number} value - Valor a formatear
 * @returns {string} - String formateado
 */
export const formatNumber = (value) => {
    if (!value || isNaN(value)) return '0';
    return Number(value).toLocaleString('es-DO');
};
