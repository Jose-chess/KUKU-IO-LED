// src/api/clientesApi.js
// Llamadas HTTP al backend para Clientes

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const fetchClientes = async (busqueda = '') => {
    const params = busqueda ? `?busqueda=${encodeURIComponent(busqueda)}` : '';
    const response = await fetch(`${API_URL}/clientes${params}`);
    if (!response.ok) throw new Error('Error al obtener clientes');
    return response.json();
};

export const fetchKpisClientes = async () => {
    const response = await fetch(`${API_URL}/clientes/kpis`);
    if (!response.ok) throw new Error('Error al obtener KPIs');
    return response.json();
};

export const createCliente = async (cliente) => {
    const response = await fetch(`${API_URL}/clientes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cliente),
    });
    if (!response.ok) throw new Error('Error al crear cliente');
    return response.json();
};

export const updateCliente = async (id, cliente) => {
    const response = await fetch(`${API_URL}/clientes/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cliente),
    });
    if (!response.ok) throw new Error('Error al actualizar cliente');
    return response.json();
};

export const deleteCliente = async (id) => {
    const response = await fetch(`${API_URL}/clientes/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) throw new Error('Error al eliminar cliente');
    return response.json();
};
