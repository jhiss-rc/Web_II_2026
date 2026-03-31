import getData from "./get.js";
import postData from "./post.js";
import putData from "./put.js";
import deleteData from "./delete.js";

document.addEventListener("DOMContentLoaded", () => {

    document.querySelector(".btn-get")
        .addEventListener("click", getData);

    document.querySelector(".btn-post")
        .addEventListener("click", () => {
            postData({
                titulo: "ejemplo",
                descripcion: "ejemplo",
                fecha: new Date().toISOString()
            });
        });

    document.querySelector(".btn-put")
        .addEventListener("click", () => putData());

    document.querySelector(".btn-delete")
        .addEventListener("click", () => deleteData());

});