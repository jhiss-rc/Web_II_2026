import {petService} from "../service/pet-service.js";

const crearFila = (nombre, edad, raza, peso, id) =>{ //se e asgina lo que se tiene que recepcionar
    const fila = document.createElement('tr'); //se crea una fila

    // html como variable
    const contenido = `
    <td>${nombre}</td>
    <td>${edad}</td>
    <td>${raza}</td>
    <td>${peso}</td>
    <td>${id}</td>
    <td>
      <ul class="table__button-control">
        <li>
          <a href="../screens/editar_pets.html?id=${id}" class="simple-button simple-button--edit">
            Editar
          </a>
        </li>
        <li>
          <button class="simple-button simple-button--delete" type="button" id="${id}">
            Eliminar
          </button>
        </li>
      </ul>
    </td>
  `;

  fila.innerHTML = contenido; //se asigna el contenido a la fila
  const btn = fila.querySelector("button")

  btn.addEventListener("click", () =>{
    const id = btn.id;

    petService.eliminarPet(id)
    .then(respuesta => {
      alert("El producto fue eliminado");
      window.location.reload() // para cargar una nueva pagina
    })
    .catch(error => alert("Ocurrio un error"));
     

  });

    return fila; //se retorna la fila
  
}

const table = document.querySelector("[data-tablept]"); //se selecciona la tabla
petService.listarpets()
.then((data) => {
    data.forEach(({nombre, edad, raza, peso, id}) =>{
        const nuevafila=crearFila(nombre, edad, raza, peso, id)
        table.appendChild(nuevafila)
    });
}).catch((error) => alert("Ocurrio un error"));


