// === valor absoluto que si o si debe cumplirse (se debe usar)
const valorPasaje=1000
if(valorPasaje == 1000)
{
    console.log(`el pasaje es correcto`);
}
const paisDestino="Ecuador";
const paisesDisponibles = ["Bolvia","ecuador","brasil","vanezuela","italia","francia"];

let edadPasaje=17;
let acompaniado=true;

console.log(`pasajes para ${paisesDisponibles}`);
if((paisesDisponibles.indexOf(paisDestino)> -1 && (edadPasaje >=18 || acompaniado)))
{
    console.log("pasaje disponible para venta");
}else
{
    console.log("no se puede vender el pasaje");
}

if(!(paisesDisponibles.indexOf(paisDestino)> -1 && (edadPasaje >=18 || acompaniado)))
{
    console.log("pasaje disponible para venta");
}else
{
    console.log("no se puede vender el pasaje");
}