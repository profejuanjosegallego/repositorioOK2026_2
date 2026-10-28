// Campo de formulario: etiqueta, input del tipo adecuado y mensaje de error.
// El tipo de input se elige según "campo.tipo" (ver src/config/grupos.js).

const TIPO_INPUT = {
  texto: 'text',
  email: 'email',
  telefono: 'tel',
  numero: 'number',
  fecha: 'date',
  fechaHora: 'datetime-local',
};

export default function Campo({ campo, valor, error, onCambiar, onSalir }) {
  const id = `campo-${campo.nombre}`;
  const idError = `${id}-error`;
  const propsComunes = {
    id,
    name: campo.nombre,
    onBlur: () => onSalir(campo.nombre),
    'aria-invalid': Boolean(error),
    'aria-describedby': error ? idError : undefined,
  };

  // Interruptor para valores verdadero/falso
  if (campo.tipo === 'booleano') {
    return (
      <div className="campo campo--interruptor">
        <label className="interruptor" htmlFor={id}>
          <input {...propsComunes} type="checkbox" checked={Boolean(valor)} onChange={(e) => onCambiar(campo.nombre, e.target.checked)} />
          <span className="interruptor__pista" aria-hidden="true" />
          <span className="interruptor__texto">{campo.etiqueta}</span>
        </label>
      </div>
    );
  }

  let control;
  if (campo.tipo === 'textoLargo') {
    control = (
      <textarea {...propsComunes} rows={3} value={valor} maxLength={campo.max} placeholder={campo.placeholder}
        onChange={(e) => onCambiar(campo.nombre, e.target.value)} />
    );
  } else if (campo.tipo === 'seleccion') {
    control = (
      <select {...propsComunes} value={valor} onChange={(e) => onCambiar(campo.nombre, e.target.value)}>
        <option value="">Selecciona una opción…</option>
        {campo.opciones.map((op) => (
          <option key={op} value={op}>{op.charAt(0).toUpperCase() + op.slice(1)}</option>
        ))}
      </select>
    );
  } else {
    control = (
      <input
        {...propsComunes}
        type={TIPO_INPUT[campo.tipo] ?? 'text'}
        value={valor}
        placeholder={campo.placeholder}
        // En números, min/max son límites de valor; en textos, max es la longitud
        min={campo.tipo === 'numero' ? campo.min : undefined}
        max={campo.tipo === 'numero' ? campo.max : undefined}
        maxLength={campo.tipo !== 'numero' ? campo.max : undefined}
        onChange={(e) => onCambiar(campo.nombre, e.target.value)}
      />
    );
  }

  const largo = campo.tipo === 'textoLargo';
  const contador = campo.max && campo.tipo !== 'numero' && typeof valor === 'string';

  return (
    <div className={`campo ${largo ? 'campo--ancho' : ''} ${error ? 'campo--error' : ''}`}>
      <label htmlFor={id}>
        {campo.etiqueta}
        {campo.requerido && <span className="campo__requerido" title="Obligatorio">*</span>}
      </label>
      {control}
      <div className="campo__pie">
        {error ? <span id={idError} className="campo__error">{error}</span> : <span />}
        {contador && <span className="campo__contador">{valor.length}/{campo.max}</span>}
      </div>
    </div>
  );
}
