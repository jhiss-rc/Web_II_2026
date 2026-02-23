// temas asincronos, el renderizado o realiza de esa manera. 
// se trabaja con eventos con las funciones flecha
// es una constante(nombre de la funcion) const nombreFuncion
// flecha =>

const saludar = () =>{
    console.log("funcion flecha");
};
saludar();

// para introducir datos se los escribe dentro del parentesis
// const suma = (a, b) O const duplicar = numero
const duplicar = numero =>{
    return numero*2;
};
console.log(duplicar(5));

const suma = (a, b)=> {
    return a+b;
};
console.log(suma(5,10));

//mostar el resultado como un array (usar parentesis)
const crearUsuario = (nombre, edad)=>({nombre:nombre, edad:edad}); 
console.log(crearUsuario("Juan", "20"));

const numero=[3,2,4,5,6,20]

// funcion para filtrar 
// se puede usar saltos de lineas con .filter
const procesarNumeros=(numeros)=>{
    // filtrar numeros mayores a 10
    return numeros.filter(numero => numero > 10)
    .map(numero => numero *2)
}

const resultado = procesarNumeros(numero);
console.log(resultado);

//crear constante de datos ordenados
const usuarios = [
    {nombre:"Juan", edad:13},
    {nombre:"Luis", edad:23},
    {nombre:"Maria", edad:25},
    {nombre:"Santi", edad:90},
    {nombre:"Felipe", edad:43},
]
const procesarUsuarios=(usuarios) => {
    return usuarios
    .filter(usuario => usuario.edad > 18) //filtrar que la edad sea mayor de 18
    .map(usuario =>{// transformar datos
        const{nombre}= usuario; // restructurar para obtener el nombre
        return nombre.lenght > 5 ? nombre.toUpperCase() : nombre.toLowerCase(); //
    });

}
const result2 = procesarUsuarios(usuarios);
console.log(result2);