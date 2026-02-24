let numero = 5;

function DecimalABinario(num){
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
 console.log(DecimalABinario(numero));

