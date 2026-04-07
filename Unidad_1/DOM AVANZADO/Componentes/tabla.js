import cards from "./cards.js";

const tabla = (() => {
    const cuerpoTabla = document.querySelector('#taskTable tbody');

    const addTask = (task) => {
        const row = cuerpoTabla.insertRow();
        row.innerHTML = `
            <td>${task.task}</td>
            <td>${task.description}</td>
            <td>${task.date}</td>
            <td>${task.priority}</td>
        `;

        const actionsCell = row.insertCell(4);
        const div = document.createElement('div');
        div.className = 'actions';

        const btnDone = document.createElement('button');
        btnDone.className = 'done';
        btnDone.innerHTML = '<i class="fas fa-check"></i>';
        btnDone.title = "Marcar como terminada";
        btnDone.onclick = () => {
            row.classList.toggle('completed-card');
            cards.update(); 
        };

        const btnDel = document.createElement('button');
        btnDel.className = 'delete';
        btnDel.innerHTML = '<i class="fas fa-trash"></i>';
        btnDel.onclick = () => {
            if(confirm("¿Eliminar tarea?")) {
                row.remove();
                cards.update();
            }
        };

        div.append(btnDone, btnDel);
        actionsCell.appendChild(div);
        
        // Llamamos a update aquí también para que la card aparezca al agregar
        cards.update(); 
    };

    const getTask = () => {
        
        return Array.from(cuerpoTabla.rows).map(row => ({
            task: row.cells[0].textContent,
            description: row.cells[1].textContent, 
            date: row.cells[2].textContent,        
            priority: row.cells[3].textContent,
            isCompleted: row.classList.contains('completed-row')
        }));
    };

    return { addTask, getTask };
})();

export default tabla;