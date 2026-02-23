const datos =[
    {
        'pais':'Bolivia',
        'precio': 200
    },
    {
        'pais':'Ecuador',
        'precio': 500
    },
    {
        'pais':'Brasil',
        'precio': 900
    },
    {
        'pais':'Venezuela',
        'precio': 100
    },
    {
        'pais':'Paraguay',
        'precio': 200
    }

];
const presupuesto = 500;
let paisSeleccionado='';


for (let i = 0; i < datos.length && paisSeleccionado == ''; i++) {
    if (datos[i].precio <= presupuesto) {
        paisSeleccionado = datos[i].pais;
    }
}

if(paisSeleccionado == ''){
    console.log(`no existe pasajes disponibles`)
}
else{
    console.log(`puedes comprar pasaje`)
}
