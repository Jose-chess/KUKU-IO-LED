const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5200/api';

export const fetchVentas = async () => {
    // Nota: El endpoint GET no está implementado en el backend aún
    // Por ahora retornamos un array vacío
    return [];
};

export const createVenta = async (venta) => {
    const response = await fetch(`${API_URL}/ventas`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(venta),
    });
    if (!response.ok) throw new Error('Error al crear venta');
    return response.json();
};

export const fetchKpisVentas = async () => {
    // Nota: Endpoint no implementado aún
    return {
        totalVentas: 0,
        ingresoTotal: 0,
        ventasHoy: 0,
        ticketPromedio: 0,
        balancePendiente: 0
    };
};
