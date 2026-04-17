import {  productService } from "../service/producto-service.js";

const crearFila = (nombre, precio, id) =>{ //se e asgina lo que se tiene que recepcionar
    const fila = document.createElement('tr'); //se crea una fila

    // html como variable
    const contenido = `
    <td class="td" data-td>
      ${nombre}
    </td>
    <td>${precio}</td>
    <td>
      <ul class="table__button-control">
        <li>
          <a
            href="../screens/editar_producto.html?id=${id}"
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

    productService.eliminarProducto(id)
    .then(respuesta => {
      alert("El producto fue eliminado");
      window.location.reload() // para cargar una nueva pagina
    })
    .catch(error => alert("Ocurrio un error"));
     

  });

    return fila; //se retorna la fila
  
}

const table = document.querySelector("[data-tablep]"); //se selecciona la tabla
productService.listarproductos()
.then((data) => {
    data.forEach(({nombre, precio, id}) =>{
        const nuevafila=crearFila(nombre,precio,id)
        table.appendChild(nuevafila)
    });
}).catch((error) => alert("Ocurrio un error"));


