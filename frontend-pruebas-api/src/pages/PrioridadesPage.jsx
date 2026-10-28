// Página de Prioridades.
// Une la configuración visual del recurso con su servicio de API.
//
// 👉 En tu propio frontend, esta página podría tener su propio formulario y su
//    propia tabla escritos a mano; aquí se reutiliza <GestorRecurso /> para
//    que las 5 páginas funcionen igual.

import GestorRecurso from '../components/commons/GestorRecurso';
import { buscarRecurso } from '../config/recursos';
import { prioridadesService } from '../services/prioridadesService';

const recurso = buscarRecurso('prioridades');

export default function PrioridadesPage() {
  return <GestorRecurso recurso={recurso} servicio={prioridadesService} />;
}
