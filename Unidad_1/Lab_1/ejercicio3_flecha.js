let numero = -4546;

const InversoDeUnNumero = num =>{
    let negativo = false;
    if (num < 0) {
        num *= -1;
        negativo = true; 
    }
    
    let inverso = "";
    // convertir a una cadena 
    let num1 = num.toString();
    for(let i = num1.length - 1 ; i >= 0 ; i--){
        inverso += num1[i];

    }
    if (negativo){
        inverso = "-" + inverso;
    }
    return inverso;
}

console.log(InversoDeUnNumero(numero));