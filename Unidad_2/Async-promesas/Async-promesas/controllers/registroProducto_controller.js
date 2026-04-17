import { productService } from "../service/producto-service.js";

const formulario = document.querySelector("[data-formp]"); //se selecciona el formulario
formulario.addEventListener("submit", (evento) => {
    evento.preventDefault(); //evita que se recargue la pagina
    const nombre = document.querySelector("[data-nombrep]").value; //se selecciona el input del nombre
    const precio = document.querySelector("[data-precio]").value; //se recupera los datos del precio

    productService.crearProducto(nombre, precio).then((respuesta) =>{
        console.log("todo chido", respuesta);
        window.location.href = "/screens/registro_completadop.html"; //redirecciona a la pagina de registro completado
    }).catch((error) => {
        alert("Todo no chido", error);
    });
        
});