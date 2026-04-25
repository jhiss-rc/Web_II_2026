/*const listarproductos = () => fetch("http://localhost:3001/productos").then((respuesta) => respuesta.json()); //fetch ya funciona como una promesa

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
}*/

/*
//------ SupaBase------
const URL_SUPABASE = 'https://ikaqcssaanratpvhkxip.supabase.co';
const SUPABASE_KEY = 'sb_publishable_zIoTs-zfLdzP2Fel_9Lk6Q_D3o-RqZy';

const table = 'productos';
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

//---get
const listarproductos=() =>{
    return request(`${API_URL}?select=id,nombre,precio`);
}
// get por id
const producto =(id)=>{
    return request(`${API_URL}?id=eq.${id}&select=id,nombre,precio`)
    .then(data=>data?.[0] ?? Promise.reject(new Error ('No se pudo')))
}
//POST
const crearProducto=(nombre,precio)=>{
    return request(API_URL,{
        method: 'POST',
        body: JSON.stringify({nombre,precio})
    }).then(data=>data?.[0]); 
}
//patch
const actualizarProducto = (id,nombre,precio)=>{ //similar a la funcion listarproductos
    return request(`${API_URL}?id=eq.${id}`,{
        method:'PATCH',
        body: JSON.stringify({nombre,precio})
    }).then(data=>data?.[0] ?? Promise.reject(new Error ('No se pudo actualizar Producto, no chido'))); //rechaza si tuviera algun error
}
//Delete
const eliminarProducto =(id)=>{
    return request(`${API_URL}?id=eq.${id}`, {
        method:'DELETE'
    }).then(data=>data?.[0] ?? Promise.reject(new Error ('No se pudo eliminar Producto, no chido')))
}*/

// ------- MySQL -------

const API_BASE_URL = "http://localhost/api/conexionproductos.php";

const listarProductos = () => {
    return fetch(API_BASE_URL).then(response=>{
        if(!response.ok) throw new Error('error productos');
        return response.json();
    })
}

const crearProducto = (nombre, precio) => {
    return fetch(API_BASE_URL ,{
        method: "POST",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify({nombre,precio, id:uuid.v4()})
    }).then(response=>{
        if(!response.ok) throw new Error('error crear producto');
        return response.json();
    })
};

const actualizarProducto = (id, nombre, precio) => { 
    return fetch(API_BASE_URL, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ id, nombre, precio })
    })
    .then(response => {
        if (!response.ok) throw new Error('error actualizar producto');
        return response.json();
    })
    .catch((error) => console.log(error));
};

const eliminarProducto = (id) =>{
    return fetch(`${API_BASE_URL}?id=${id}`,{
        method: "DELETE"
    });
};

const producto = (id) =>{
    return fetch(`${API_BASE_URL}?id=${id}`).then((response)=>response.json());
}


export const productService = {
    listarproductos,
    crearProducto,
    actualizarProducto,
    eliminarProducto,
    producto
}
