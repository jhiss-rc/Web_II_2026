import { clientService } from "../service/client-service.js";

const formulario = document.querySelector("[data-form]"); //se selecciona el formulario
formulario.addEventListener("submit", (evento) => {
    evento.preventDefault(); //evita que se recargue la pagina
    const nombre = document.querySelector("[data-nombre]").value; //se selecciona el input del nombre
    const email = document.querySelector("[data-email]").value; //se recupera los datos del email

    clientService.crearCliente(nombre, email).then((respuesta) =>{
        console.log("todo chido", respuesta);
        window.location.href = "/screens/registro_completado.html"; //redirecciona a la pagina de registro completado
    }).catch((error) => {
        alert("Todo no chido", error);
    });
        
});

