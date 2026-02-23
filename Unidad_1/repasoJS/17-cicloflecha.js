const paisesDisponibles = ["Bolivia", "Ecuador", "Brasil", "Italia", "Francia", "Argentina"];
const preciosPaises = new Array(100, 200, 300, 400, 500, 600);
const presupuesto = 0;

const buscarPasaje = (precios, presupuesto) =>{
    return precios
    .filter(precio => precio <= presupuesto)
    .map(precio => precio)
}
// contador
let i = 0;

const resultado = buscarPasaje(preciosPaises, presupuesto);
if (i == paisesDisponibles.length)
{
    console.log(`no existe pasaje :(`)
}
else{
    console.log(`puedes comprar el pasaje :)`)
}

