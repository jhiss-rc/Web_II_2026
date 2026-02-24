const numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11,13, 13];

function NumeroRepetido(array){
    let repetidos = 0;
    let valorMax = 0;
    let contador = 0;

    for(let i = 0; i < array.length; i++){
        contador = 0;
        for(let j = 0; j < array.length; j++){
            if(array[i] === array[j]){
                contador++;
            }
        }
        if(contador > valorMax ){
            valorMax = contador;
            repetidos= array[i];
        }
    }
    return repetidos;
}

console.log(NumeroRepetido(numeros));