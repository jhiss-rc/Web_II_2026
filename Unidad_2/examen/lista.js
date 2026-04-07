const lista = () => {
  const agregar = document.getElementById('addBtn');
  const newItem = document.getElementById('newItem');
  const taskList = document.getElementById('taskList');

  agregar.addEventListener('click', () => {
    const value = newItem.value.trim();
    if (!value) return alert('Debe ingresar una tarea por favor ;-;');
    if(value.length < 3) return alert ('debe ingresar una tarea mas larga');

    const li = document.createElement('li');
    li.classList.add('item');
    li.textContent = value;
    taskList.appendChild(li);

    newItem.value = '';
  });
};

export default lista;
