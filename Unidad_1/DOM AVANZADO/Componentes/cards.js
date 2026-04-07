import tabla from "./tabla.js";

const cards = (() => {
    const taskCards = document.getElementById('taskCards');

    const update = () => {
        const tasks = tabla.getTask(); // Obtenemos todas las tareas de la tabla
        taskCards.innerHTML = ''; //limpiando las cards al momento de refrescar

        tasks.forEach((task) => {
            const card = document.createElement('div');
            
 
            card.className = `taskCard`;
            

            card.innerHTML = `
            <p><strong>Nombre:</strong>${task.task}</p>
            <p><strong>Descripción:</strong> ${task.description}</p>
            <p><strong>Fecha:</strong> ${task.date}</p>
            <p><strong>Prioridad:</strong> ${task.priority}</p>
            <p><strong>Estado:</strong>${task.completed ? 'Completado':'Pendiente'}</p>
            `;
            taskCards.appendChild(card);
        });
    };

    return { update };
})();

export default cards;