// =============================================================================
// GESTOR DE RECURSO (CRUD completo)
// -----------------------------------------------------------------------------
// Une las piezas comunes para administrar cualquier recurso:
//   - useCrud: datos y operaciones contra la API (a través del servicio)
//   - TablaDatos: lista con buscador
//   - Modal + Formulario: crear y editar
//   - DialogoConfirmacion: eliminar
//
// Las páginas solo le dicen QUÉ recurso mostrar y con QUÉ servicio.
// =============================================================================

import { useState } from 'react';
import { useCrud } from '../../hooks/useCrud';
import { useGrupo } from '../../context/GrupoContext';
import EncabezadoPagina from './EncabezadoPagina';
import TablaDatos from './TablaDatos';
import Modal from './Modal';
import Formulario from './Formulario';
import DialogoConfirmacion from './DialogoConfirmacion';
import Cargando from './Cargando';
import EstadoVacio from './EstadoVacio';
import Boton from './Boton';
import Aparecer from './Aparecer';

export default function GestorRecurso({ recurso, servicio }) {
  const { grupo, urlBase } = useGrupo();
  const campos = grupo.campos[recurso.clave];
  const { datos, cargando, error, cargar, crear, modificar, eliminar } = useCrud(servicio, recurso.conArticulo);

  // null = cerrado | {} = crear | objeto con id = editar
  const [enEdicion, setEnEdicion] = useState(null);
  const [aEliminar, setAEliminar] = useState(null);

  const esNuevo = enEdicion && !enEdicion.id;

  const guardar = async (valores) => {
    const ok = esNuevo ? await crear(valores) : await modificar(enEdicion.id, valores);
    if (ok) setEnEdicion(null);
  };

  const confirmarEliminacion = async () => {
    const ok = await eliminar(aEliminar.id);
    if (ok) setAEliminar(null);
  };

  // Contenido principal según el estado de la petición
  let contenido;
  if (cargando) {
    contenido = <Cargando columnas={Math.min(campos.length + 1, 6)} />;
  } else if (error) {
    contenido = (
      <EstadoVacio tipo="error" icono="error" titulo="No se pudo cargar la información" mensaje={error}
        accion={cargar} textoAccion="Reintentar" iconoAccion="refrescar" />
    );
  } else if (datos.length === 0) {
    const femenino = recurso.conArticulo.startsWith('la ');
    contenido = (
      <EstadoVacio titulo={`Aún no hay ${recurso.titulo.toLowerCase()}`} mensaje={femenino ? 'Crea la primera para verla aquí.' : 'Crea el primero para verlo aquí.'}
        accion={() => setEnEdicion({})} textoAccion={`Crear ${recurso.singular}`} />
    );
  } else {
    contenido = <TablaDatos campos={campos} datos={datos} onEditar={setEnEdicion} onEliminar={setAEliminar} />;
  }

  return (
    <>
      <EncabezadoPagina titulo={recurso.titulo} descripcion={recurso.descripcion} imagen={recurso.imagen}
        icono={recurso.icono} ruta={`${urlBase}${grupo.rutas[recurso.clave]}`}>
        <Boton variante="claro" icono="refrescar" onClick={cargar} cargando={cargando}>Recargar</Boton>
        <Boton icono="mas" onClick={() => setEnEdicion({})}>Nuevo</Boton>
      </EncabezadoPagina>

      <section className="contenedor seccion-gestor">
        <Aparecer className="panel">{contenido}</Aparecer>
      </section>

      <Modal
        abierto={Boolean(enEdicion)}
        titulo={esNuevo ? `Crear ${recurso.singular}` : `Editar ${recurso.singular}`}
        subtitulo={esNuevo ? 'Completa los datos y guarda.' : `ID: ${enEdicion?.id}`}
        onCerrar={() => setEnEdicion(null)}
        ancho="grande"
      >
        {/* "key" fuerza un formulario limpio cada vez que cambia el elemento editado */}
        <Formulario key={enEdicion?.id ?? 'nuevo'} campos={campos} valoresIniciales={esNuevo ? null : enEdicion}
          onEnviar={guardar} onCancelar={() => setEnEdicion(null)} textoEnviar={esNuevo ? 'Crear' : 'Guardar cambios'} />
      </Modal>

      <DialogoConfirmacion
        abierto={Boolean(aEliminar)}
        titulo={`Eliminar ${recurso.singular}`}
        mensaje={`¿Seguro que quieres eliminar ${recurso.conArticulo}? Esta acción no se puede deshacer.`}
        onConfirmar={confirmarEliminacion}
        onCancelar={() => setAEliminar(null)}
      />
    </>
  );
}
