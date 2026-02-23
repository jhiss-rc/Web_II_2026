const paisDestino = "Francia";
const paisesDisponibles = ["Bolivia", "Ecuador", "Brasil", "Italia", "Francia"];

let edadPasajero = 17;
let acompaniado = false;

console.log(`pasajes para ${paisDestino}`);

if (paisesDisponibles.indexOf(paisDestino) > -1 ){
    if(edadPasajero >=18)
    {
        console.log(`el pasaje disponible para venta`);

    }
    else{
        if(acompaniado)
        {
            console.log(`el pasaje disponible para venta`);
        }
        else{
            console.log(`usted no puede viajar, necesita la supervision de un adulto`)
        }
        
    }
    
}
else{
    console.log(`Pasaje no dispinible para ${paisDestino}`);
}