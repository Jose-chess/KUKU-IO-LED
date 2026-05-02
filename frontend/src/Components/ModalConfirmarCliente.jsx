import React from 'react';

import ModalConfirmar from './ModalConfirmar';



const ModalConfirmarCliente = ({ isOpen, onClose, onConfirm, isLoading = false }) => {

    return (

        <ModalConfirmar

            isOpen={isOpen}

            title="Confirmar"

            mensaje="¿Está seguro de que desea agregar este cliente?"

            salirLabel="Retroceder"

            confirmLabel="Confirmar"

            onClose={onClose}

            onConfirm={onConfirm}

            isLoading={isLoading}

        />

    );

};



export default ModalConfirmarCliente;