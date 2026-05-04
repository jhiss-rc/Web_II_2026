/*const listarpets = () => fetch("http://localhost:3001/pets").then((respuesta) => respuesta.json()); //fetch ya funciona como una promesa

const crearPets= (nombre, edad, raza, peso, clienteId) => {
    return fetch("http://localhost:3001/pets" ,{
        method: "POST",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify({nombre, edad, raza, peso, clienteId, id:uuid.v4()}) //esta linea envia nom
    });
};

const ActualizarPet =(nombre, edad, raza, peso, clienteId, id) =>{ //solo modifico el nombre y el precio
    return fetch(`http://localhost:3001/pets/${id}`, //dato de referncia para buscar a quien actualizar ,{}
    { 
        method: "PUT",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify({nombre, edad, raza, peso, clienteId, id})
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
}*/

/*
//----- SupaBase ------
const URL_SUPABASE = 'https://ikaqcssaanratpvhkxip.supabase.co';
const SUPABASE_KEY = 'sb_publishable_zIoTs-zfLdzP2Fel_9Lk6Q_D3o-RqZy';

const table = 'pets';
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
// get
const listarpets = () => {
    return request(`${API_URL}?select=id,nombre,edad,raza,peso,cliente_id,clientes(nombre,email)`);
};

// get por id
const pet = (id) => {
    return request(`${API_URL}?id=eq.${id}&select=*`)
        .then(data => data?.[0] ?? Promise.reject(new Error('No se pudo')));
};

//POST
const crearPets = (nombre, edad, raza, peso, cliente_id) => {
    return request(API_URL, {
        method: 'POST',
        body: JSON.stringify({ nombre, edad, raza, peso, cliente_id })
    }).then(data => data?.[0]);
};

//PATCH
const ActualizarPet = (id, nombre, edad, raza, peso, cliente_id) => {
    return request(`${API_URL}?id=eq.${id}`, {
        method: 'PATCH',
        body: JSON.stringify({ nombre, edad, raza, peso, cliente_id })
    }).then(data => data?.[0] ?? Promise.reject(new Error('No se pudo actualizar')));
};

//DELETE
const eliminarPet = (id) => {
    return request(`${API_URL}?id=eq.${id}`, {
        method: 'DELETE'
    }).then(data => data?.[0] ?? Promise.reject(new Error('No se pudo eliminar')));
};

// ------- MySQL -------
const API_BASE_URL = "http://localhost/api/pets.php";

const listarpets = () => {
    return fetch(API_BASE_URL).then(response => {
        if (!response.ok) throw new Error('error pets');
        return response.json();
    })
}

const crearPets = (nombre, edad, raza, peso, cliente_id) => {
    return fetch(API_BASE_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nombre,
            edad,
            raza,
            peso,
            cliente_id,
            id: uuid.v4()
        })
    }).then(response => {
        if (!response.ok) throw new Error('error crear pet');
        return response.json();
    })
};

const ActualizarPet = (id, nombre, edad, raza, peso, cliente_id) => {
    return fetch(API_BASE_URL, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id,
            nombre,
            edad,
            raza,
            peso,
            cliente_id
        })
    })
    .then(response => {
        if (!response.ok) throw new Error('error actualizar pet');
        return response.json();
    })
    .catch((error) => console.log(error));
};

const eliminarPet = (id) => {
    return fetch(`${API_BASE_URL}?id=${id}`, {
        method: "DELETE"
    });
};

const pet = (id) => {
    return fetch(`${API_BASE_URL}?id=${id}`)
        .then((response) => response.json());
};

// ------- SQL SERVER -------
const API_BASE_URL = "http://localhost:3001/pet";

const listarpets = () => {
    return fetch(API_BASE_URL).then(response => {
        if (!response.ok) throw new Error('error pets');
        return response.json();
    });
};

const crearPets = (nombre, edad, raza, peso, cliente_id) => {
    return fetch(API_BASE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, edad, raza, peso, cliente_id })
    }).then(response => {
        if (!response.ok) throw new Error('error crear pet');
        return response.json();
    });
};

const ActualizarPet = (id, nombre, edad, raza, peso, cliente_id) => {
    return fetch(`${API_BASE_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, edad, raza, peso, cliente_id })
    }).then(response => {
        if (!response.ok) throw new Error('error actualizar pet');
        return response.json();
    }).catch(error => console.log(error));
};

const eliminarPet = (id) => {
    return fetch(`${API_BASE_URL}/${id}`, { method: "DELETE" });
};

const pet = (id) => {
    return fetch(`${API_BASE_URL}/${id}`).then(response => response.json());
};

export const petService = {
    listarpets,
    crearPets,
    ActualizarPet,
    eliminarPet,
    pet
}*/

const BASE_URL = "http://localhost:3000"; //3306 unicamente para mysql asi que se usara el puerto 3000
const petService ={
    // get 
    listarpets: async () =>{
        const res = await fetch(`${BASE_URL}/pets`);
        return res.json();
    },

    // get por id
    pet: async (id) =>{
        const res = await fetch(`${BASE_URL}/pets/${id}`);
        return res.json();
    },

    //post
    crearPets: async (nombre, edad, raza, peso, cliente_id) =>{
        const res = await fetch(`${BASE_URL}/pets`,{
           method: "POST",
           headers:{"Content-Type": "application/json"},
           body: JSON.stringify({nombre, edad, raza, peso, cliente_id, id:uuid.v4()})
        });
        return res.json();
    },

    //PUT
    ActualizarPet: async (id, nombre, edad, raza, peso, cliente_id) =>{
        const res = await fetch(`${BASE_URL}/pets/${id}`,{
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({nombre, edad, raza, peso, cliente_id})
        })
        return res.json();
    },

    //DELETE 
    eliminarPet: async (id) =>{
        const res = await fetch(`${BASE_URL}/pets/${id}`,{
            method: "DELETE"
        });
        return res.json();
    }
};
export {petService};