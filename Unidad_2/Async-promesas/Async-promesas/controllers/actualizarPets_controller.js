import {petService} from "../service/pet-service.js";


const formulario = document.querySelector("[data-formpt]"); //se selecciona el formulario
// estructura asincrona 
const obInfo = async() =>{
    const url = new URL(window.location); //se obtiene la url de la pagina
    const id= (url.searchParams.get("id")) // se recupera el id que s eaumento en el html href="../screens/editar_cliente.html?id=${id}"
    if(id == null){
        window.location.href = "/screens/error.html"; // si es error nos envia al html de error :0
    }
    const nombre = document.querySelector("[data-nombrept]");
    const edad = document.querySelector("[data-edadpt]");
    const raza = document.querySelector("[data-razapt]");
    const peso = document.querySelector("[data-pesopt]");
    try{
        const pets = await petService.pet(id); // se espera a que se devuelva el producto con el id recuperado
        if(pets.nombre && pets.edad && pets.raza && pets.peso){
            nombre.value = pets.nombre; // en los espacios donde se va  actlizar se rellena con los valores recuperados desde el JSON
            edad.value = pets.edad;
            raza.value = pets.raza;
            peso.value = pets.peso;
        }
        else
        {
            throw new Error(); // si no se recupera el nombre o email se lanza un error
        }
    }
    catch(error){
        window.location.href = "../screens/error.html"; 
    }
};
obInfo(); // se llama a la funcion para que se ejecute

formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();
    const url = new URL(window.location);
    const id= (url.searchParams.get("id"));
    const nombre = document.querySelector("[data-nombrept]").value;
    const edad = document.querySelector("[data-edadpt]").value;
    const raza = document.querySelector("[data-razapt]").value;
    const peso = document.querySelector("[data-pesopt]").value;
    petService.ActualizarPet(nombre, edad, raza, peso,  id) // el id solo s eusa para saber a quien llamar
    .then(() =>{
        window.location.href = "../screens/edicion_concluidapt.html" 
    });
})

