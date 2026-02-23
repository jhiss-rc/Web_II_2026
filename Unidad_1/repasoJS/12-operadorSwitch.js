const paisDestino = "Francia";
const paisesDisponibles = ["Bolivia", "Ecuador", "Brasil", "Italia", "Francia"];
let valorPasaje = 0;
/*
if(paisDestino == "Bolivia"){
    valorPasaje=100;
}else if (paisDestino == "Ecuador"){
    valorPasaje = 200;
}*/

//switch
switch(paisDestino){
    case "Bolivia":
        valorPasaje= 200;
        break;
    case "Ecuador":
        valorPasaje= 100;
        break;
    case "Italia":
        valorPasaje = 900;
        break;
    case "Brasil":
        valorPasaje = 250;
        break;
    case "Francia":
        valorPasaje = 300;
        break;
    default:
        console.log(`no existe pasajes para esa ciudad`)
}
if (valorPasaje > 0){
    console.log(`el valor del pasaje para ir a ${paisDestino} es: ${valorPasaje}`)
}
