// src/api/articulosApi.js
import { apiFetch } from './apiConfig';

export const fetchArticulos = async (busqueda = '') => {
    const params = busqueda ? `?busqueda=${encodeURIComponent(busqueda)}` : '';
    const response = await apiFetch(`/articulos${params}`);
    if (!response.ok) throw new Error('Error al obtener artículos');
    return response.json();
};

export const fetchNextArticuloCode = async () => {
    const response = await apiFetch('/articulos/next-code');
    if (!response.ok) throw new Error('Error al obtener código');
    return response.json();
};

export const createArticulo = async (articulo) => {
    const response = await apiFetch('/articulos', {
        method: 'POST',
        body: JSON.stringify(articulo),
    });
    if (!response.ok) {
        let err = null;
        try { err = await response.json(); } catch {}
        throw new Error(err?.error || 'Error al crear artículo');
    }
    return response.json();
};

export const updateArticulo = async (id, articulo) => {
    const response = await apiFetch(`/articulos/${id}`, {
        method: 'PUT',
        body: JSON.stringify(articulo),
    });
    if (!response.ok) {
        let err = null;
        try { err = await response.json(); } catch {}
        throw new Error(err?.error || 'Error al actualizar artículo');
    }
    return response.json();
};

export const deleteArticulo = async (id) => {
    const response = await apiFetch(`/articulos/${id}`, { method: 'DELETE' });
    if (!response.ok) throw new Error('Error al eliminar artículo');
    return response.json();
};