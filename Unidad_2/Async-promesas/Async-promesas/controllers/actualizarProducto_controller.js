import { productService } from "../service/producto-service.js";

const formulario = document.querySelector("[data-formp]"); //se selecciona el formulario
// estructura asincrona 
const obInfo = async() =>{
    const url = new URL(window.location); //se obtiene la url de la pagina
    const id= (url.searchParams.get("id")) // se recupera el id que s eaumento en el html href="../screens/editar_cliente.html?id=${id}"
    if(id == null){
        window.location.href = "/screens/error.html"; // si es error nos envia al html de error :0
    }
    const nombre = document.querySelector("[data-nombrep]");
    const precio = document.querySelector("[data-precio]");

    try{
        const productos = await productService.producto(id); // se espera a que se devuelva el producto con el id recuperado
        if(productos.nombre && productos.precio){
            nombre.value = productos.nombre; // en los espacios donde se va  actlizar se rellena con los valores recuperados desde el JSON
            precio.value = productos.precio; // rescata los vlaores del JSON y lo pega al fomrulario
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
    const nombre = document.querySelector("[data-nombrep]").value;
    const precio = document.querySelector("[data-precio]").value;
    productService.actualizarProducto(id, nombre, precio) // el id solo s eusa para saber a quien llamar
    .then(() =>{
        window.location.href = "../screens/edicion_concluidap.html" 
    });
})

