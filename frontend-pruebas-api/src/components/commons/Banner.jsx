// Banner principal (hero) de la página de inicio: imagen de fondo en línea,
// degradado, formas animadas y textos que aparecen de forma escalonada.

import { Link } from 'react-router-dom';
import { IMAGEN_BANNER } from '../../config/recursos';
import { useGrupo } from '../../context/GrupoContext';
import Icono from './Icono';

export default function Banner() {
  const { grupo, urlBase } = useGrupo();

  return (
    <section className="banner">
      <div className="banner__fondo" style={{ backgroundImage: `url(${IMAGEN_BANNER})` }} aria-hidden="true" />
      <div className="banner__velo" aria-hidden="true" />
      <div className="banner__forma banner__forma--1" aria-hidden="true" />
      <div className="banner__forma banner__forma--2" aria-hidden="true" />
      <div className="banner__rejilla" aria-hidden="true" />

      <div className="banner__contenido contenedor">
        <span className="banner__etiqueta entrada" style={{ '--retraso': '0ms' }}>
          <span className="punto-vivo" /> Jornada Sábado · Spring Boot + React
        </span>

        <h1 className="banner__titulo entrada" style={{ '--retraso': '120ms' }}>
          Prueba tu API de <span className="texto-degradado">retos empresariales</span> en segundos
        </h1>

        <p className="banner__texto entrada" style={{ '--retraso': '240ms' }}>
          Un panel listo para crear, consultar, editar y eliminar empresas, categorías, prioridades,
          retos y registros. Elige tu grupo, enciende tu backend y empieza a probar.
        </p>

        <div className="banner__acciones entrada" style={{ '--retraso': '360ms' }}>
          <Link to="/empresas" className="boton boton--primario boton--grande">
            <span>Comenzar a probar</span>
            <Icono nombre="flecha" tamano={18} />
          </Link>
          <a href="#como-funciona" className="boton boton--claro boton--grande">
            <Icono nombre="codigo" tamano={18} />
            <span>Cómo está construido</span>
          </a>
        </div>

        <dl className="banner__datos entrada" style={{ '--retraso': '480ms' }}>
          <div>
            <dt>API activa</dt>
            <dd>{grupo.nombre}</dd>
          </div>
          <div>
            <dt>Backend</dt>
            <dd><code>{urlBase}</code></dd>
          </div>
          <div>
            <dt>Recursos</dt>
            <dd>5 CRUD completos</dd>
          </div>
        </dl>
      </div>

      <a href="#recursos" className="banner__scroll" aria-label="Bajar a los recursos">
        <span />
      </a>
    </section>
  );
}
