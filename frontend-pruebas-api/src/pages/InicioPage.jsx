// Página de inicio: banner, tarjetas de recursos con el estado de la conexión
// y una sección que explica cómo está organizado el proyecto.

import { useCallback, useEffect, useState } from 'react';
import Banner from '../components/commons/Banner';
import TarjetaRecurso from '../components/commons/TarjetaRecurso';
import Aparecer from '../components/commons/Aparecer';
import Imagen from '../components/commons/Imagen';
import Icono from '../components/commons/Icono';
import Boton from '../components/commons/Boton';
import { RECURSOS, IMAGEN_APRENDE } from '../config/recursos';
import { useGrupo } from '../context/GrupoContext';
import { empresasService } from '../services/empresasService';
import { categoriasService } from '../services/categoriasService';
import { prioridadesService } from '../services/prioridadesService';
import { retosService } from '../services/retosService';
import { registrosService } from '../services/registrosService';

const SERVICIOS = {
  empresas: empresasService,
  categorias: categoriasService,
  prioridades: prioridadesService,
  retos: retosService,
  registros: registrosService,
};

const PASOS = [
  {
    icono: 'servidor',
    titulo: 'services/',
    texto: 'Funciones con fetch que hablan con la API. Una por endpoint: listar, crear, modificar y eliminar.',
  },
  {
    icono: 'capas',
    titulo: 'components/commons/',
    texto: 'Piezas reutilizables: botones, campos, formulario, tabla, modal, notificaciones y banner.',
  },
  {
    icono: 'codigo',
    titulo: 'pages/',
    texto: 'Cada pantalla une un servicio con los componentes comunes. Son cortas y fáciles de leer.',
  },
];

export default function InicioPage() {
  const { grupo, urlBase } = useGrupo();
  // estados: { empresas: { cargando, total, error } , ... }
  const [estados, setEstados] = useState({});

  // Consulta cada recurso para saber si la API responde y cuántos datos tiene
  const verificar = useCallback(async () => {
    setEstados(Object.fromEntries(RECURSOS.map((r) => [r.clave, { cargando: true }])));
    await Promise.all(
      RECURSOS.map(async (r) => {
        let estado;
        try {
          const lista = await SERVICIOS[r.clave].listar();
          estado = { total: Array.isArray(lista) ? lista.length : 0 };
        } catch (e) {
          estado = { error: e.message };
        }
        setEstados((actual) => ({ ...actual, [r.clave]: estado }));
      }),
    );
  }, []);

  useEffect(() => {
    verificar();
  }, [verificar, grupo.id, urlBase]);

  const mostrarEstado = (clave) => {
    const e = estados[clave];
    if (!e || e.cargando) return <span className="estado-api estado-api--cargando">Consultando…</span>;
    if (e.error) return <span className="estado-api estado-api--error" title={e.error}>Sin conexión</span>;
    return <span className="estado-api estado-api--ok">{e.total} {e.total === 1 ? 'registro' : 'registros'}</span>;
  };

  const conectados = Object.values(estados).filter((e) => e && !e.cargando && !e.error).length;

  return (
    <>
      <Banner />

      <section id="recursos" className="seccion contenedor">
        <Aparecer className="seccion__encabezado">
          <span className="seccion__etiqueta">Recursos de la API</span>
          <h2>Todo lo que puedes probar</h2>
          <p>
            Conectado a <strong>{grupo.nombre}</strong> en <code>{urlBase}</code> ·{' '}
            {conectados}/{RECURSOS.length} recursos responden.
          </p>
          <Boton variante="secundario" icono="refrescar" onClick={verificar} tamano="pequeno">
            Verificar conexión
          </Boton>
        </Aparecer>

        <div className="rejilla-recursos">
          {RECURSOS.map((r, i) => (
            <Aparecer key={r.clave} retraso={i * 90}>
              <TarjetaRecurso recurso={r} estado={mostrarEstado(r.clave)} />
            </Aparecer>
          ))}
        </div>
      </section>

      <section id="como-funciona" className="seccion seccion--alterna">
        <div className="contenedor aprende">
          <Aparecer className="aprende__imagen">
            <Imagen src={IMAGEN_APRENDE} alt="Equipo revisando un proyecto" />
            <div className="aprende__codigo">
              <span className="aprende__codigo-titulo">services/empresasService.js</span>
              <pre>
                <code>{`export function listarEmpresas() {
  return peticion('/api/empresas');
}`}</code>
              </pre>
            </div>
          </Aparecer>

          <div className="aprende__texto">
            <Aparecer>
              <span className="seccion__etiqueta">Construye tu propio front</span>
              <h2>Un proyecto pensado para aprender</h2>
              <p>
                El código está separado en capas con comentarios en español. Úsalo como guía:
                copia la capa de servicios, crea tus páginas y reutiliza los componentes.
              </p>
            </Aparecer>
            <ol className="pasos">
              {PASOS.map((p, i) => (
                <Aparecer key={p.titulo} como="li" retraso={i * 120} className="paso">
                  <span className="paso__icono"><Icono nombre={p.icono} /></span>
                  <div>
                    <h3><code>{p.titulo}</code></h3>
                    <p>{p.texto}</p>
                  </div>
                </Aparecer>
              ))}
            </ol>
          </div>
        </div>
      </section>
    </>
  );
}
