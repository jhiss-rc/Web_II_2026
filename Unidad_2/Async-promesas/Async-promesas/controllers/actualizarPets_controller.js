import { petService } from "../service/pet-service.js";
import { clientService } from "../service/client-service.js";

const formulario = document.querySelector("[data-formpt]");
const selectCliente = document.querySelector("[data-cliente]");

let clienteIdActual = ""; 

const obInfo = async () => {

    const url = new URL(window.location);
    const id = url.searchParams.get("id");

    if(id == null){
        window.location.href = "/screens/error.html";
    }

    const nombre = document.querySelector("[data-nombrept]");
    const edad = document.querySelector("[data-edadpt]");
    const raza = document.querySelector("[data-razapt]");
    const peso = document.querySelector("[data-pesopt]");

    try {


        const clientes = await clientService.listarClientes();

        clientes.forEach(({ nombre, id }) => {
            const option = document.createElement("option");
            option.value = id;
            option.textContent = nombre;
            selectCliente.appendChild(option);
        });

      
        const pet = await petService.pet(id);

        if(pet.nombre && pet.edad && pet.raza && pet.peso){

            nombre.value = pet.nombre;
            edad.value = pet.edad;
            raza.value = pet.raza;
            peso.value = pet.peso;

            clienteIdActual = pet.cliente_id; 
            selectCliente.value = pet.cliente_id;

        } else {
            throw new Error();
        }

    } catch(error){
        console.log(error);
        window.location.href = "../screens/error.html"; 
    }
};

obInfo();

formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const url = new URL(window.location);
    const id = url.searchParams.get("id");

    const nombre = document.querySelector("[data-nombrept]").value;
    const edad = document.querySelector("[data-edadpt]").value;
    const raza = document.querySelector("[data-razapt]").value;
    const peso = document.querySelector("[data-pesopt]").value;

    const clienteId = selectCliente.value;

    petService.ActualizarPet(
        id,
        nombre,
        parseInt(edad),
        raza,
        parseFloat(peso),
        clienteId
    )
    .then(() => {
        window.location.href = "../screens/edicion_concluidapt.html";
    })
    .catch(error => {
        console.log(error);
        alert("No se pudo actualizar");
    });
});