// Página de Registros.
// Une la configuración visual del recurso con su servicio de API.
//
// 👉 En tu propio frontend, esta página podría tener su propio formulario y su
//    propia tabla escritos a mano; aquí se reutiliza <GestorRecurso /> para
//    que las 5 páginas funcionen igual.

import GestorRecurso from '../components/commons/GestorRecurso';
import { buscarRecurso } from '../config/recursos';
import { registrosService } from '../services/registrosService';

const recurso = buscarRecurso('registros');

export default function RegistrosPage() {
  return <GestorRecurso recurso={recurso} servicio={registrosService} />;
}
