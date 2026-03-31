import tabla from "./tabla.js";

const cards = (() => {
    const taskCards = document.getElementById('taskCards');

    const update = () => {
        const tasks = tabla.getTask(); // Obtenemos todas las tareas de la tabla
        taskCards.innerHTML = ''; // Limpiamos el contenedor antes de redibujar

        tasks.forEach((task) => {
            const card = document.createElement('div');
            
            // Aplicamos la clase de completado si corresponde
            card.className = `taskCard ${task.isCompleted ? 'completed-card' : ''}`;
            
            // AQUÍ AGREGAMOS LOS 7 CAMPOS
            card.innerHTML = `
                <h4>${task.isCompleted ? '✅' : '🚀'} ${task.task}</h4>
                <p><strong>Descripción:</strong> ${task.description}</p>
                <p><strong>Fecha:</strong> ${task.date}</p>
                <p><strong>Prioridad:</strong> ${task.priority}</p>
                <p><strong>Categoría:</strong> ${task.categoria}</p>
                <p><strong>Ubicación:</strong> ${task.ubicacion}</p>
                <p><strong>Asignado a:</strong> ${task.asignado}</p>
                ${task.isCompleted ? '<div style="margin-top:10px; color: #27ae60; font-weight: bold; text-align:right;">¡TAREA TERMINADA!</div>' : ''}
            `;
            taskCards.appendChild(card);
        });
    };

    return { update };
})();

export default cards;