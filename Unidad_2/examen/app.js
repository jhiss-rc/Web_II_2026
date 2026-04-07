import lista from './lista.js';
import relleno from './relleno.js';
import contador from './contador.js';
import eliminar from './eliminar.js';
import card from './card.js';

lista();
relleno();
contador();
card();
eliminar();


const tachado = document.getElementById('toggleBtn');

tachado.addEventListener('click', () => {
  const items = document.querySelectorAll('#taskList .item');
  if (!items.length) return;
  items[items.length - 1].classList.toggle('tachado');
}); 
