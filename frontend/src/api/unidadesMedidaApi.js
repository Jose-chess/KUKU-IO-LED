const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5200/api';

export const fetchUnidadesMedida = async () => {
    const response = await fetch(`${API_URL}/UnidadesMedida`);
    if (!response.ok) throw new Error('Error al obtener unidades de medida');
    const data = await response.json();
    if (data && typeof data === 'object' && Array.isArray(data.value)) return data.value;
    return data;
};

export const createUnidadMedida = async (unidad) => {
    const response = await fetch(`${API_URL}/UnidadesMedida`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(unidad),
    });
    if (!response.ok) throw new Error('Error al crear unidad de medida');
    return response.json();
};

export const updateUnidadMedida = async (id, unidad) => {
    const response = await fetch(`${API_URL}/UnidadesMedida/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(unidad),
    });
    if (!response.ok) throw new Error('Error al actualizar unidad de medida');
    return response.json();
};

export const deleteUnidadMedida = async (id) => {
    const response = await fetch(`${API_URL}/UnidadesMedida/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) throw new Error('Error al eliminar unidad de medida');
};
