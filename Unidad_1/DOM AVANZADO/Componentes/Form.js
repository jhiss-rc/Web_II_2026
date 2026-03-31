const Form = (() => {
    const form = document.querySelector('[data-form]');
    const btnSubmit = form.querySelector('.btnCreate');
    
    const inputs = {
        task: document.querySelector('[data-input-task]'),
        description: document.querySelector('[data-input-descripcion]'),
        date: document.querySelector('[data-input-fecha]'),
        priority: document.querySelector('[data-input-prioridad]'),
        categoria: document.querySelector('[data-input-categoria]'),
        ubicacion: document.querySelector('[data-input-ubicacion]'),
        asignado: document.querySelector('[data-input-asignado]')
    };

    // Función para cargar datos cuando clickeas "Editar" en la tabla
    const cargarDatosParaEditar = (datos, row) => {
        for (let key in inputs) {
            if (inputs[key]) inputs[key].value = datos[key];
        }
        btnSubmit.innerHTML = 'Actualizar Tarea <i class="fas fa-sync-alt"></i>';
        btnSubmit.style.background = "#f39c12"; // Color naranja de edición
        row.remove(); // Borra la fila vieja para que al dar "Agregar" se cree la nueva con cambios
    };

    const setDatos = (callback) => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const taskData = {};
            for (let key in inputs) {
                taskData[key] = inputs[key].value;
            }
            callback(taskData);
            form.reset();
            btnSubmit.innerHTML = 'Agregar <i class="fas fa-plus-circle"></i>';
            btnSubmit.style.background = ""; // Vuelve al color original
        });
    };

    return { setDatos, cargarDatosParaEditar };
})();

export default Form;