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

const suma = (array) => {
    let suma = 0;
    array.forEach( s => {
    suma += s.precio; 
    });
    return suma;
}

console.log(suma(datos));