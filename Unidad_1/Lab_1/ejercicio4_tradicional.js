const numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11,13, 2];

function NumPrimos (array){
    let primos = [];
    for (let i = 0; i < array.length; i++) {
        let esPrimo = true;
        if (array[i] < 2) {
            esPrimo = false;
        } else {
            for (let j = 2; j < array[i]; j++) {
                if (array[i] % j === 0) {
                    esPrimo = false;
                    break;
                }
            }
        }
        if (esPrimo) {
            primos.push(array[i]);
        }
    }
    return primos
}

console.log(NumPrimos(numeros));