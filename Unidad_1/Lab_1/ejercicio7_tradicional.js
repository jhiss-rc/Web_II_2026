const datos =[
    {
        'comida':'Milanesa',
        'precio': 50
    },
    {
        'comida':'Mondongo',
        'precio': 40
    },
    {
        'comida':'Salteñas',
        'precio': 10
    },
    {
        'comida':'Sopa de Mani',
        'precio': 15
    },
    {
        'comida':'Pique Macho',
        'precio': 200
    }
];

function suma(array){
    let suma = 0;
    for(let i = 0; i < datos.length; i++){
        suma += array[i].precio; //acceder a un valor del array de objetos
    }
    return suma;
}

console.log(suma(datos));