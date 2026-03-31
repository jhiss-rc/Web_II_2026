const Form = (()=>{
        const form = document.querySelector('[data-form]');//accedemos al formulario
        const inputTask = document.querySelector('[data-input-task]');//recupero la tarea
        const inputDescription = document.querySelector('[data-input-descripcion]');//recupero la descripcion
        const inputFecha = document.querySelector('[data-input-fecha]')//recuperamos la fecha

        const datosForm = ()=>{
            return{
                titulo: inputTask.value.trim(),
                descripcion: inputDescription.value.trim(),
                fecha: inputFecha.value.trim(),
            };
        };
        const reset =()=>{
            inputTask.value="";
            inputDescription.value="";
            inputFecha.value="";
        }

        const setDatos=(callback)=>{
            form.addEventListener('submit',(event)=>{
                event.preventDefault();
                callback(datosForm());
                reset();
            });
        };
        return{setDatos,}
    })();
    export default Form;