import { clientService } from "../service/client-service.js";

const formulario = document.querySelector("[data-form]"); //se selecciona el formulario
// estructura asincrona 
const obInfo = async() =>{
    const url = new URL(window.location); //se obtiene la url de la pagina
    const id= (url.searchParams.get("id")) // se recupera el id que s eaumento en el html href="../screens/editar_cliente.html?id=${id}"
    if(id == null){
        window.location.href = "/screens/clientes.html"; // si es error nos envia al html de error :0
    }
    const nombre = document.querySelector("[data-nombre]");
    const email = document.querySelector("[data-email]");

    try{
        const perfil = await clientService.cliente(id); // se espera a que se devuelva el cliente con el id recuperado
        if(perfil.nombre && perfil.email){
            nombre.value = perfil.nombre; // en los espacios donde se va  actlizar se rellena con los valores recuperados desde el JSON
            email.value = perfil.email; // rescata los vlaores del JSON y lo pega al fomrulario
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
    const nombre = document.querySelector("[data-nombre]").value;
    const email = document.querySelector("[data-email]").value;
    clientService.ActualizarCliente(nombre, email, id) // el id solo s eusa para saber a quien llamar
    .then(() =>{
        window.location.href = "../screens/edicion_concluida.html" 
    });
})

export default formulario;