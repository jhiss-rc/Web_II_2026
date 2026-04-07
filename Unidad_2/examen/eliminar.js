const eliminar = () => {
  const taskList = document.querySelector('[data-list]');

  taskList.addEventListener('dblclick', (e) => {
    if (!e.target.classList.contains('item')) return;

    const li = e.target;

    li.classList.remove('item');
    li.classList.add('itemEliminado');

    listaElimados.appendChild(li);
    
    //taskList.removeChild(e.target);
    //e.target.remove();
  });
};

export default eliminar;
