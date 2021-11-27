var boton = document.getElementById("procesar");
var mensaje = document.getElementById("mensaje");

boton.addEventListener('click', function(){
    ejecutar();
});

function ejecutar(){
    console.log(mensaje.value);
}