import React from 'react';
import ModalConfirmar from './ModalConfirmar';

const ModalConfirmarSalida = ({ isOpen, onClose, onConfirm }) => {
    return (
        <ModalConfirmar
            isOpen={isOpen}
            title="Confirmar"
            mensaje="¿Estás seguro de que desea salir?"
            salirLabel="Retroceder"
            confirmLabel="Confirmar"
            onClose={onClose}
            onConfirm={onConfirm}
        />
    );
};

export default ModalConfirmarSalida;