import { apiFetch } from './apiConfig';

export const fetchUnidadesMedida = async () => {
    const response = await apiFetch('/unidadesmedida');
    if (!response.ok) throw new Error('Error al obtener unidades');
    return response.json();
};

export const fetchNextUnidadCode = async () => {
    const response = await apiFetch('/unidadesmedida/next-code');
    if (!response.ok) throw new Error('Error al obtener código');
    return response.json();
};

export const createUnidadMedida = async (unidad) => {
    const response = await apiFetch('/unidadesmedida', {
        method: 'POST',
        body: JSON.stringify(unidad),
    });
    if (!response.ok) {
        let err = null;
        try { err = await response.json(); } catch {}
        throw new Error(err?.error || 'Error al crear unidad');
    }
    return response.json();
};

export const updateUnidadMedida = async (id, unidad) => {
    const response = await apiFetch(`/unidadesmedida/${id}`, {
        method: 'PUT',
        body: JSON.stringify(unidad),
    });
    if (!response.ok) {
        let err = null;
        try { err = await response.json(); } catch {}
        throw new Error(err?.error || 'Error al actualizar unidad');
    }
    return response.json();
};

export const deleteUnidadMedida = async (id) => {
    const response = await apiFetch(`/unidadesmedida/${id}`, { method: 'DELETE' });
    if (!response.ok) throw new Error('Error al eliminar unidad');
    return response.json();
};