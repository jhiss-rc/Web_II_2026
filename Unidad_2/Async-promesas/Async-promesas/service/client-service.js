// recepcion de datos
/*const crearFila = (nombre, email) =>{ //se e asgina lo que se tiene que recepcionar
    const fila = document.createElement('tr'); //se crea una fila

    // html como variable
    const contenido = `
    <td class="td" data-td>
      ${nombre}
    </td>
    <td>${email}</td>
    <td>
      <ul class="table__button-control">
        <li>
          <a
            href="../screens/editar_cliente.html"
            class="simple-button simple-button--edit"
          >
            Editar
          </a>
        </li>
        <li>
          <button class="simple-button simple-button--delete" type="button">
            Eliminar
          </button>
        </li>
      </ul>
    </td>
  `;

  fila.innerHTML = contenido; //se asigna el contenido a la fila
    return fila; //se retorna la fila
  
}*/

// const table = document.querySelector("[data-table]"); //se selecciona la tabla
/*
const listarCLientes = () =>{
    const promesa = new Promise((resolve, reject) =>{
        const http = new XMLHttpRequest(); // variable para request con http, recupera las respuestas
        http.open("GET","http://localhost:3001/perfil"); // cuando setrabaja con get es cuando se quiere obtener informacion conectarse con el servidor.
        http.send(); 
        http.onload = () =>{
            const response = JSON.parse(http.response) //JSON.parse() convierte el sting a JSON //solo almacena la respuesta del servidor

            if(http.response >= 400){ //error 400 si el servidor no responde bien.
                reject(response)
            }else{
                resolve(response) //si el servidor responde bien se resuelve la promesa
            }
        }

    })
    return promesa; 
}

listarCLientes()
    .then((data) =>{
    data.forEach((perfil)=>{ //llamar a cada elmeto de mi perfil
        const nuevafila= crearFila(perfil.nombre, perfil.email) //se crea una nueva fila con el nombre y email del perfil
        table.appendChild(nuevafila) //se agrega la nueva fila a la tabla
    }) 
})
.catch((error) =>alert("Ocurrio un error")) //si ocurre un error se muestra un mensaje de alerta 

*/


//////---Optimizado ----///
const listarClientes = () => fetch("http://localhost:3001/perfil").then((respuesta) => respuesta.json()); //fetch ya funciona como una promesa

const crearCliente = (nombre, email) => {
    return fetch("http://localhost:3001/perfil" ,{
        method: "POST",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify({nombre,email, id:uuid.v4()}) //esta linea envia nom
    });
};

const ActualizarCliente =(nombre, email, id) =>{ //solo modifico el nombre y el email
    return fetch(`http://localhost:3001/perfil/${id}`, //dato de referncia para buscar a quien actualizar ,{}
    { 
        method: "PUT",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify({nombre,email})
    }).then(respuesta => console.log(respuesta)).catch((error)=> console.log(error));

}

const eliminarCliente = (id) =>{
    console.log("eliminar: ",id);
    return fetch(`http://localhost:3001/perfil/${id}`,{
        method: "DELETE"
    });
    
};
//REFERENCIA ID
const cliente = (id) =>{
    return fetch(`http://localhost:3001/perfil/${id}`).then((respuesta) => respuesta.json);
}
export const clientService = {
    listarClientes,
    crearCliente,
    ActualizarCliente,
    eliminarCliente,
    cliente
}