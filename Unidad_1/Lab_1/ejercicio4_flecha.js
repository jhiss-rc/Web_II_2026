const numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11,13];

const NumPrimos = (array) => {
   return array.filter(num => {
        let esPrimo = true;
        if (num < 2) {
            esPrimo = false;
        }
        for (let j = 2; j < num; j++) {
            if (num % j === 0) {
                esPrimo = false;
                break;
            }
        }       
        return esPrimo;
    });
};

console.log(NumPrimos(numeros));