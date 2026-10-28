// Página de Empresas.
// Une la configuración visual del recurso con su servicio de API.
//
// 👉 En tu propio frontend, esta página podría tener su propio formulario y su
//    propia tabla escritos a mano; aquí se reutiliza <GestorRecurso /> para
//    que las 5 páginas funcionen igual.

import GestorRecurso from '../components/commons/GestorRecurso';
import { buscarRecurso } from '../config/recursos';
import { empresasService } from '../services/empresasService';

const recurso = buscarRecurso('empresas');

export default function EmpresasPage() {
  return <GestorRecurso recurso={recurso} servicio={empresasService} />;
}
