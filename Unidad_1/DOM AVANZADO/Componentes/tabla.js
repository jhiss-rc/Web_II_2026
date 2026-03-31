import cards from "./cards.js";
import Form from "./Form.js";

const tabla = (() => {
    const cuerpoTabla = document.querySelector('#taskTable tbody');

    const addTask = (task) => {
        const row = cuerpoTabla.insertRow();
        row.innerHTML = `
            <td>${task.task}</td>
            <td>${task.description}</td>
            <td>${task.date}</td>
            <td>${task.priority}</td>
            <td>${task.categoria}</td>
            <td>${task.ubicacion}</td>
            <td>${task.asignado}</td>
        `;

        const actionsCell = row.insertCell(7);
        const div = document.createElement('div');
        div.className = 'actions';

        const btnDone = document.createElement('button');
        btnDone.className = 'done';
        btnDone.innerHTML = '<i class="fas fa-check"></i>';
        btnDone.title = "Marcar como terminada";
        btnDone.onclick = () => {
            row.classList.toggle('completed-row');
            cards.update(); 
        };

        const btnEdit = document.createElement('button');
        btnEdit.className = 'edit';
        btnEdit.innerHTML = '<i class="fas fa-edit"></i>';
        btnEdit.onclick = () => Form.cargarDatosParaEditar(task, row);

        const btnDel = document.createElement('button');
        btnDel.className = 'delete';
        btnDel.innerHTML = '<i class="fas fa-trash"></i>';
        btnDel.onclick = () => {
            if(confirm("¿Eliminar tarea?")) {
                row.remove();
                cards.update();
            }
        };

        div.append(btnDone, btnEdit, btnDel);
        actionsCell.appendChild(div);
        
        // Llamamos a update aquí también para que la card aparezca al agregar
        cards.update(); 
    };

    const getTask = () => {
        // CORRECCIÓN: Capturamos los 7 índices de las celdas (0 al 6)
        return Array.from(cuerpoTabla.rows).map(row => ({
            task: row.cells[0].textContent,
            description: row.cells[1].textContent, // Nuevo
            date: row.cells[2].textContent,        // Nuevo
            priority: row.cells[3].textContent,
            categoria: row.cells[4].textContent,
            ubicacion: row.cells[5].textContent,   // Nuevo
            asignado: row.cells[6].textContent,
            isCompleted: row.classList.contains('completed-row')
        }));
    };

    return { addTask, getTask };
})();

export default tabla;