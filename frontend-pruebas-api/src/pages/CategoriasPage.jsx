// Página de Categorías.
// Une la configuración visual del recurso con su servicio de API.
//
// 👉 En tu propio frontend, esta página podría tener su propio formulario y su
//    propia tabla escritos a mano; aquí se reutiliza <GestorRecurso /> para
//    que las 5 páginas funcionen igual.

import GestorRecurso from '../components/commons/GestorRecurso';
import { buscarRecurso } from '../config/recursos';
import { categoriasService } from '../services/categoriasService';

const recurso = buscarRecurso('categorias');

export default function CategoriasPage() {
  return <GestorRecurso recurso={recurso} servicio={categoriasService} />;
}
