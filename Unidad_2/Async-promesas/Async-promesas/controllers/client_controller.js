import { clientService } from "../service/client-service.js";

const crearFila = (nombre, email, id) =>{ //se e asgina lo que se tiene que recepcionar
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
            href="../screens/editar_cliente.html?id=${id}"
            class="simple-button simple-button--edit"
          >
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
    clientService.eliminarCliente(id)
    .then(respuesta => {alert("El cliente fue eliminado")
    .window.location.reload() // para cargar una nueva pagina
    }).catch(error => alert("Ocurrio un error"))
     

  })

    return fila; //se retorna la fila
  
}

const table = document.querySelector("[data-table]"); //se selecciona la tabla
clientService.listarClientes()
.then((data) => {
    data.forEach(({nombre, email, id}) =>{
        const nuevafila=crearFila(nombre,email,id)
        table.appendChild(nuevafila)
    });
}).catch((error) => alert("Ocurrio un error"));

export default crearFila;

