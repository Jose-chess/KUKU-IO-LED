// src/api/articulosApi.js
// Llamadas HTTP al backend para Artículos/Inventario

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5200/api';

export const fetchArticulos = async () => {
    const response = await fetch(`${API_URL}/articulos`);
    if (!response.ok) throw new Error('Error al obtener artículos');
    return response.json();
};

export const fetchKpisInventario = async () => {
    const response = await fetch(`${API_URL}/articulos/kpis`);
    if (!response.ok) throw new Error('Error al obtener KPIs');
    return response.json();
};

export const createArticulo = async (articulo) => {
    const response = await fetch(`${API_URL}/articulos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(articulo),
    });
    if (!response.ok) throw new Error('Error al crear artículo');
    return response.json();
};

export const updateArticulo = async (id, articulo) => {
    const response = await fetch(`${API_URL}/articulos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(articulo),
    });
    if (!response.ok) throw new Error('Error al actualizar artículo');
    return response.json();
};

export const deleteArticulo = async (id) => {
    const response = await fetch(`${API_URL}/articulos/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) throw new Error('Error al eliminar artículo');
    return response.json();
};
