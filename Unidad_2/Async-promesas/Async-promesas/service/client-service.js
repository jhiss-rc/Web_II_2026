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
    return fetch(`http://localhost:3001/perfil/${id}`)
    .then((respuesta) => respuesta.json())

    .catch((error) => console.log('error aqui', error));
}
    */


// -------- CON MySql ------
 const API_BASE_URL = "http://localhost/api/conexion.php";

const listarClientes =()=>{
    return fetch(API_BASE_URL).then(response=>{
        if(!response.ok)throw new Error('error clientes');
        return response.json();
    })
}

const crearCliente = (nombre, email) => {
    return fetch(API_BASE_URL ,{
        method: "POST",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify({nombre,email, id:uuid.v4()}) //esta linea envia nom
    }).then(response=>{
        if(!response.ok)throw new Error('error crear cliente');
        return response.json();
    })
};

const actualizarCliente = (id, nombre, email) => { 
    return fetch(API_BASE_URL, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ id, nombre, email })
    })
    .then(response => {
        if (!response.ok) throw new Error('error actualizar cliente');
        return response.json();
    })
    .catch((error) => console.log(error));
};

const eliminarCliente = (id) =>{
    return fetch(`${API_BASE_URL}?id=${id}`,{
        method: "DELETE"
    });
    
    //.then((response)=>response.json())
};

const cliente= (id) =>{
    return fetch(`${API_BASE_URL}?id=${id}`).then((response)=>response.json());
}

/*
// -------- CON SUPABASE ------
const URL_SUPABASE = 'https://ikaqcssaanratpvhkxip.supabase.co';
const SUPABASE_KEY = 'sb_publishable_zIoTs-zfLdzP2Fel_9Lk6Q_D3o-RqZy';

const table = 'clientes';
const API_URL = `${URL_SUPABASE}/rest/v1/${table}`

const HEADERS ={
    'apikey': SUPABASE_KEY,
    'Authorization': `Bearer ${SUPABASE_KEY}`,
    'Content-Type': 'application/json', //tipo de contenido
    'Prefer': 'return=representation'//devuelve simepre lo que se esta modificando
}

//respueat que evita que se use fetch en cada funcion
//conexion y gestion de errores
const request = async(url, option ={})=>{ //funcion flecha asincrona (todo lo que este dentro lo sera)
 //funcion asincrona, await (respuesta), entrada (conexion (url) y las opciones)
 const res = await fetch(url,{headers: HEADERS, ...option}); //espera de una promesa {HEADERS} que va a devolver los datos
 const text = await res.text(); //todo lo que se va a recibir de res y lo va a convertir en texto
 const data = text ? JSON.parse(text):null;

 if(!res.ok){
    const mensaje = data?.message ?? data?.error ?? text ?? 'Error';
    throw new Error(mensaje);
 }
 return data;

};

//---------------------------------//
//get
const listarClientes=() =>{
    return request(`${API_URL}?select=id,nombre,email`);
}
// get por id
const cliente =(id)=>{
    return request(`${API_URL}?id=eq.${id}&select=id,nombre,email`)
    .then(data=>data?.[0] ?? Promise.reject(new Error ('No se pudo')))
}
//POST
const crearCliente=(nombre,email)=>{
    return request(API_URL,{
        method: 'POST',
        body: JSON.stringify({nombre,email})
    }).then(data=>data?.[0]); 
}
//patch
const actualizarCliente = (id,nombre,email)=>{ //similar a la funcion listarCLiente
    return request(`${API_URL}?id=eq.${id}`,{
        method:'PATCH',
        body: JSON.stringify({nombre,email})
    }).then(data=>data?.[0] ?? Promise.reject(new Error ('No se pudo actualizar CLiente, no chido'))); //rechaza si tuviera algun error
}
//Delete
const eliminarCliente =(id)=>{
    return request(`${API_URL}?id=eq.${id}`, {
        method:'DELETE'
    }).then(data=>data?.[0] ?? Promise.reject(new Error ('No se pudo eliminar CLiente, no chido')))
}*/
export const clientService = {
    listarClientes,
    crearCliente,
    actualizarCliente,
    eliminarCliente,
    cliente
}
    

