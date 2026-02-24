const numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const DevolverArray = (pares, impares)=>({pares: pares , impares: impares}); 

const ParesImpares = (numeros) => {
    let pares = 0;
    let impares = 0;

    numeros.filter(numero => {
        if (numero % 2 === 0) {
            pares++;
        } else {
            impares++;
        }
    });

    return DevolverArray(pares, impares);
};

console.log(ParesImpares(numeros));