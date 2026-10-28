// Formulario genérico: dibuja un <Campo /> por cada campo de la configuración,
// valida antes de enviar y deshabilita el botón mientras se guarda.
//
// Uso:
//   <Formulario campos={campos} valoresIniciales={empresa} onEnviar={guardar} onCancelar={cerrar} />
//
// "onEnviar" recibe los datos ya convertidos para la API y debe devolver
// true si se guardó bien (así el formulario sabe que puede cerrarse).

import { useState } from 'react';
import { useFormulario } from '../../hooks/useFormulario';
import Campo from './Campo';
import Boton from './Boton';

export default function Formulario({ campos, valoresIniciales, onEnviar, onCancelar, textoEnviar = 'Guardar' }) {
  const { valores, errores, cambiar, tocar, validarTodo, datosParaApi } = useFormulario(campos, valoresIniciales);
  const [enviando, setEnviando] = useState(false);

  const alEnviar = async (evento) => {
    evento.preventDefault(); // evita que el navegador recargue la página
    if (!validarTodo()) return;
    setEnviando(true);
    await onEnviar(datosParaApi());
    setEnviando(false);
  };

  const hayErrores = Object.values(errores).some(Boolean);

  return (
    <form className="formulario" onSubmit={alEnviar} noValidate>
      <div className="formulario__rejilla">
        {campos.map((campo) => (
          <Campo key={campo.nombre} campo={campo} valor={valores[campo.nombre]} error={errores[campo.nombre]}
            onCambiar={cambiar} onSalir={tocar} />
        ))}
      </div>

      {hayErrores && <p className="formulario__aviso">Revisa los campos marcados antes de continuar.</p>}

      <div className="formulario__acciones">
        <Boton variante="secundario" onClick={onCancelar} disabled={enviando}>
          Cancelar
        </Boton>
        <Boton type="submit" icono="exito" cargando={enviando}>
          {textoEnviar}
        </Boton>
      </div>
    </form>
  );
}
