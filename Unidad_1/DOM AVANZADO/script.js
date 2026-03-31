import Form from "./Componentes/Form.js";
import tabla from "./Componentes/tabla.js";
import cards from "./Componentes/cards.js";

(() => {
    // Inicializamos la escucha del formulario
    Form.setDatos((task) => {
        tabla.addTask(task); // Agrega a la tabla
        cards.update();      // Actualiza las cards de abajo
    });
})();