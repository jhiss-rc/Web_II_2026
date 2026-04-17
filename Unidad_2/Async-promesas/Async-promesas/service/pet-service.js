const listarpets = () => fetch("http://localhost:3001/pets").then((respuesta) => respuesta.json()); //fetch ya funciona como una promesa

const crearPets= (nombre, edad, raza, peso) => {
    return fetch("http://localhost:3001/pets" ,{
        method: "POST",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify({nombre, edad, raza, peso, id:uuid.v4()}) //esta linea envia nom
    });
};

const ActualizarPet =(nombre, edad, raza, peso, id) =>{ //solo modifico el nombre y el precio
    return fetch(`http://localhost:3001/pets/${id}`, //dato de referncia para buscar a quien actualizar ,{}
    { 
        method: "PUT",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify({nombre, edad, raza, peso})
    }).then(respuesta => console.log(respuesta)).catch((error)=> console.log(error));

}

const eliminarPet = (id) =>{
    console.log("eliminar: ",id);
    return fetch(`http://localhost:3001/pets/${id}`,{
        method: "DELETE"
    });
    
};
//REFERENCIA ID
const pet = (id) =>{
    return fetch(`http://localhost:3001/pets/${id}`)
    .then((respuesta) => respuesta.json())

    .catch((error) => console.log('error aqui', error));
}

export const petService = {
    listarpets,
    crearPets,
    ActualizarPet,
    eliminarPet,
    pet
}