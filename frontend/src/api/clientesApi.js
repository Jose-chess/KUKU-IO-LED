const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5200/api';

export const fetchNextClienteCode = async () => {
    const response = await fetch(`${API_URL}/clientes/next-code`);
    if (!response.ok) throw new Error('Error al obtener el próximo código');
    return response.json();
};

export const fetchClientes = async (busqueda = '') => {
    const params = busqueda ? `?busqueda=${encodeURIComponent(busqueda)}` : '';
    const response = await fetch(`${API_URL}/clientes${params}`);
    if (!response.ok) throw new Error('Error al obtener clientes');
    const data = await response.json();
    // Normalizar respuesta: algunos endpoints (o clients como Supabase) devuelven
    // un objeto { value: [...] } en lugar de un array directo.
    if (data && typeof data === 'object' && Array.isArray(data.value)) return data.value;
    return data;
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
    if (!response.ok) {
        let errBody = null;
        try { errBody = await response.json(); } catch (e) { /* ignore */ }
        const msg = errBody?.error || errBody?.message || JSON.stringify(errBody) || 'Error al crear cliente';
        throw new Error(msg);
    }
    return response.json();
};

export const updateCliente = async (id, cliente) => {
    const response = await fetch(`${API_URL}/clientes/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cliente),
    });
    if (!response.ok) {
        let errBody = null;
        try { errBody = await response.json(); } catch (e) { /* ignore */ }
        const msg = errBody?.error || errBody?.message || JSON.stringify(errBody) || 'Error al actualizar cliente';
        throw new Error(msg);
    }
    return response.json();
};

export const deleteCliente = async (id) => {
    const response = await fetch(`${API_URL}/clientes/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) throw new Error('Error al eliminar cliente');
    return response.json();
};
