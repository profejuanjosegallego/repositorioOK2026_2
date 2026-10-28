// Mensaje amigable cuando no hay datos o cuando ocurrió un error.

import Icono from './Icono';
import Boton from './Boton';

export default function EstadoVacio({ titulo, mensaje, icono = 'vacio', tipo = 'vacio', accion, textoAccion, iconoAccion = 'mas' }) {
  return (
    <div className={`estado-vacio estado-vacio--${tipo}`}>
      <div className="estado-vacio__icono">
        <Icono nombre={icono} tamano={34} grosor={1.6} />
      </div>
      <h3>{titulo}</h3>
      {mensaje && <p>{mensaje}</p>}
      {accion && (
        <Boton variante={tipo === 'error' ? 'secundario' : 'primario'} icono={iconoAccion} onClick={accion}>
          {textoAccion}
        </Boton>
      )}
    </div>
  );
}
