const deletIcon = () => {
        const i = document.createElement('i');
        i.classList.add('fas', 'fa-window-close', 'trashIcon', 'icon');
        i.addEventListener('click', deletTask);
        return i;
    };

    const deletTask = (event) => {
        // Accedemos al padre del icono (el li.card) para eliminarlo por completo
        const parent = event.target.parentElement; 
        parent.remove(); 
    }
export default deletIcon //exportar