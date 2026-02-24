const frase = "La marea sigue mareneando mucho"

function PalabraMasLarga(frase) {
    const palabras = frase.split(" ");
    let palabraLarga = "";
    for (let i = 0; i < palabras.length; i++) {
        if (palabras[i].length > palabraLarga.length) {
            palabraLarga = palabras[i];
        }
    }
    return palabraLarga;
}
console.log(PalabraMasLarga(frase));