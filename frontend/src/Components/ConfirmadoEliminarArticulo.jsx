import React from 'react';

import ModalConfirmar from './ModalConfirmar';



const ConfirmadoEliminarArticulo = ({ isOpen, onClose, onConfirm, isLoading = false, mensaje = "¿Estas seguro de que desea eliminar este artículo?" }) => {

    return (

        <ModalConfirmar

            isOpen={isOpen}

            title="Confirmar"

            mensaje={mensaje}

            salirLabel="Retroceder"

            confirmLabel="Confirmar"

            onClose={onClose}

            onConfirm={onConfirm}

            isLoading={isLoading}

        />

    );

};



export default ConfirmadoEliminarArticulo;

