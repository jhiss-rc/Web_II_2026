import {petService} from "../service/pet-service.js";
import { clientService } from "../service/client-service.js";


const selectCliente = document.querySelector("[data-cliente]");

clientService.listarClientes()
  .then(clientes => {
    console.log("CLIENTES:", clientes);
    clientes.forEach(({ nombre, id }) => {
      const option = document.createElement("option");
      option.value = id;      
      option.textContent = nombre; 
      selectCliente.appendChild(option);
    });
  });

const formulario = document.querySelector("[data-formpt]"); //se selecciona el formulario
formulario.addEventListener("submit", (evento) => {
    evento.preventDefault(); //evita que se recargue la pagina
    const nombre = document.querySelector("[data-nombrept]").value; //se selecciona el input del nombre
    const edad = document.querySelector("[data-edadpt]").value; //se recupera los datos de la edad
    const raza = document.querySelector("[data-razapt]").value; //se recupera los datos de la raza
    const peso = document.querySelector("[data-pesopt]").value; //se recupera los datos del peso
    const clienteId = selectCliente.value;

    petService.crearPets(nombre, edad, raza, peso, clienteId).then((respuesta) =>{
        console.log("todo chido", respuesta);
        window.location.href = "/screens/registro_completadopt.html"; //redirecciona a la pagina de registro completado
    }).catch((error) => {
        alert("Todo no chido", error);
    });

});