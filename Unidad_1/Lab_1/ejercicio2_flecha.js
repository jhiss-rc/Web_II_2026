const frase = "La marea sigue mareneando"

const PalabraMasLarga = (frase) => {
    const palabras = frase.split(" ");
    let palabraLarga = "";
    palabras.forEach(palabra => {
        if (palabra.length > palabraLarga.length) {
            palabraLarga = palabra;
        }
});
    return palabraLarga;
}
console.log(PalabraMasLarga(frase));