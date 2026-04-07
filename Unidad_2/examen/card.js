const card = () => {
    const card = document.createElement('div');
    card.id = 'cardElimados';

    const titulo = document.createElement('h2');
    titulo.textContent = 'Tareas eliminadas';

    titulo.classList.add('tituloCard');

    const lista = document.createElement('ul');
    lista.id = 'listaElimados';

    card.appendChild(titulo);
    card.appendChild(lista);
    
    container.appendChild(card);
}

export default card;