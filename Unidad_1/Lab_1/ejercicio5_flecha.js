let numero = 7;

const decimalABinario = num =>{
    let binario = "";
    if(num == 0) {
        return "0";
    }
    while (num > 0) {
        binario = (num % 2) + binario ;
        num = Math.floor(num / 2);
    }
    return binario;
}

console.log(decimalABinario(numero));    

