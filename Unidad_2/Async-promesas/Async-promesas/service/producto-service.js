const listarproductos = () => fetch("http://localhost:3001/productos").then((respuesta) => respuesta.json()); //fetch ya funciona como una promesa

const crearProducto = (nombre, precio) => {
    return fetch("http://localhost:3001/productos" ,{
        method: "POST",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify({nombre,precio, id:uuid.v4()}) //esta linea envia nom
    });
};

const ActualizarProducto =(nombre, precio, id) =>{ //solo modifico el nombre y el precio
    return fetch(`http://localhost:3001/productos/${id}`, //dato de referncia para buscar a quien actualizar ,{}
    { 
        method: "PUT",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify({nombre,precio})
    }).then(respuesta => console.log(respuesta)).catch((error)=> console.log(error));

}

const eliminarProducto = (id) =>{
    console.log("eliminar: ",id);
    return fetch(`http://localhost:3001/productos/${id}`,{
        method: "DELETE"
    });
    
};
//REFERENCIA ID
const producto = (id) =>{
    return fetch(`http://localhost:3001/productos/${id}`)
    .then((respuesta) => respuesta.json())

    .catch((error) => console.log('error aqui', error));
}

export const productService = {
    listarproductos,
    crearProducto,
    ActualizarProducto,
    eliminarProducto,
    producto
}