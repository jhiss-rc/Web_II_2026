const paisesDisponibles = ["Bolivia", "Ecuador", "Brasil", "Italia", "Francia", "Argentina"];
const preciosPaises = new Array(100, 200, 300, 400, 500, 600);
const presupuesto = 250;

// contador
let i = 0;

while(preciosPaises[i] > presupuesto && i< paisesDisponibles.length){
    i++;
}
if (i == paisesDisponibles.length)
{
    console.log(`no existe pasaje :(`)
}
else{
    console.log(`puedes comprar el pasaje :)`)
}