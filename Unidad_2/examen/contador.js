const contador = () => {
  const countBtn = document.getElementById('countBtn');
  const output = document.getElementById('output');
  const taskList = document.getElementById('taskList');

  countBtn.addEventListener('click', () => {
    const total = taskList.querySelectorAll('.item').length;
    const tachado = taskList.querySelectorAll('.item.tachado').length;
    output.textContent = `Items en total: ${total} Tachado: ${tachado}`;
  });
};

export default contador;
