const postData= () =>{
    const form = document.querySelector('[data-form]');//accedemos al formulario
    const inputTask = document.querySelector('[data-input-task]');//recupero la tarea
    const inputDescription = document.querySelector('[data-input-descripcion]');//recupero la descripcion
    const inputFecha = document.querySelector('[data-input-fecha]')//recuperamos la fecha

    const newPost = {
        titulo:inputTask.value.trim(),
        descripcion:inputDescription.value.trim(),
        fecha: inputFecha.value.trim()
    };
    //llamar al fetch
    fetch(API_URL,{
        method:"POST",
        headers:{"Content-type": "application/json",
            "Accept":"application/json" //va aceptar una aplicacion json
        },
        body: JSON.stringify(newPost)
    })
    .then(response=>{
        if(!response.ok){
            throw new Error(`HTTP error estado: ${response.status}`);
        }
        return response.json();
    }).then(data => showResult(data))
    .catch(error => showResult(error.message,true));
}
