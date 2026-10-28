// Diálogo para confirmar acciones peligrosas (por ejemplo, eliminar).

import { useState } from 'react';
import Modal from './Modal';
import Boton from './Boton';
import Icono from './Icono';

export default function DialogoConfirmacion({ abierto, titulo, mensaje, textoConfirmar = 'Eliminar', onConfirmar, onCancelar }) {
  const [procesando, setProcesando] = useState(false);

  const confirmar = async () => {
    setProcesando(true);
    await onConfirmar();
    setProcesando(false);
  };

  return (
    <Modal abierto={abierto} titulo={titulo} onCerrar={onCancelar} ancho="pequeno">
      <div className="confirmacion">
        <div className="confirmacion__icono">
          <Icono nombre="eliminar" tamano={28} />
        </div>
        <p>{mensaje}</p>
        <div className="formulario__acciones">
          <Boton variante="secundario" onClick={onCancelar} disabled={procesando}>
            Cancelar
          </Boton>
          <Boton variante="peligro" icono="eliminar" onClick={confirmar} cargando={procesando}>
            {textoConfirmar}
          </Boton>
        </div>
      </div>
    </Modal>
  );
}
