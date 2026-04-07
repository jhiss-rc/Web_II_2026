const relleno = () => {
  const taskList = document.getElementById('taskList');

  taskList.addEventListener('click', (e) => {
    if (e.target.tagName !== 'LI') return;
    e.target.classList.toggle('resaltado');
    e.target.classList.remove('tachado');
  });
};

export default relleno;
