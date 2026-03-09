import checkcomplete from "./Components/checkComplete.js"; // lalma al componente
import deletIcon from "./Components/DeleteIcon.js";

(() => {
    // Seleccionamos el botón usando el data-attribute para separar la lógica de los estilos (clases)
    const btn = document.querySelector('[data-form-btn]');

    const createTask = (event) => {
        // Detiene el comportamiento por defecto del formulario (recarga de página)
        event.preventDefault(); 
        
        const input = document.querySelector('[data-form-input]');
        const value = input.value; // Recupero el valor del input
        if (value.trim() === '') {
            alert("Por favor escribe una tarea");
            return;
        }
        
        const list = document.querySelector('[data-list]');
        
        // Para crear datos en el DOM se usa .createElement y definimos el tipo (li)
        const task = document.createElement('li');
        task.classList.add('card');
        
        // Limpiamos el input después de capturar el valor
        input.value = '';

        // Creamos el contenido del task (el div que agrupa check y texto)
        const contTask = document.createElement('div');
        
        const tittleTask = document.createElement('span');
        tittleTask.classList.add('task');
        // Unimos el valor del input con el innerText del span
        tittleTask.innerText = value;

        // Agregamos el check al div (se usan paréntesis por ser ejecución de función)
        contTask.appendChild(checkcomplete()); 
        contTask.appendChild(tittleTask); // Agregamos el título (texto)
        
        // Armamos la estructura final de la card
        task.appendChild(contTask);
        task.appendChild(deletIcon());
        
        // Inyectamos la nueva tarea en la lista del HTML
        list.appendChild(task);
    }

    // Escuchador de eventos para el botón
    btn.addEventListener('click', createTask);

    /*
    const checkcomplete = () => {
        const i = document.createElement('i');
        i.classList.add('far', 'fa-check-square', 'icon');
        i.addEventListener('click', color);
        return i; // Es vital retornar el elemento para que appendChild lo encuentre
    }

    const color = (evento) => {
        const element = evento.target; 
        element.classList.toggle('fas'); 
        element.classList.toggle('completeIcon');
        element.classList.toggle('far');
    };
    */

    /*
    const deletIcon = () => {
        const i = document.createElement('i');
        i.classList.add('fas', 'fa-trash-alt', 'trashIcon', 'icon');
        i.addEventListener('click', deletTask);
        return i;
    };

    const deletTask = (event) => {
        // Accedemos al padre del icono (el li.card) para eliminarlo por completo
        const parent = event.target.parentElement; 
        parent.remove(); 
    }
        */
})();