var boton = document.getElementById("procesar");
var mensaje = document.getElementById("mensaje");

boton.addEventListener('click', function(){
    ejecutar();
});

function ejecutar(){
    traducirMensaje(mensaje.value);
}

//Funcion para traducir el mensaje DHCP
function traducirMensaje(mensaje){

    //Se crea un arreglo con las palabras que se van a traducir y se ignoran los espacios en blanco y saltos de linea

    let separacion = mensaje.trim().split(/[\s\n]+/);
    let direccionMacDestino = "La direccion mac destino es: "+opciones(separacion,0,5,"mac");
    let direccionMacOrigen = "La direccion mac origen es: "+opciones(separacion,6,11,"mac");
    let ipOrigen = "La direccion ip origen es: "+opciones(separacion,26,29,"ip");
    let ipDestino = "La direccion ip destino es: "+opciones(separacion,30,33,"ip");
    let puertoOrigen = "El puerto origen es: "+opciones(separacion,34,35,"puerto");
    let puertoDestino = "El puerto destino es: "+opciones(separacion,36,37,"puerto");
    let longitudUDP = "La longitud del segmento UDP es: "+opciones(separacion,0,0,"longitudUDP");
    let longitudDHCP = "La longitud del mensaje DHCP es: "+opciones(separacion,0,0,"longitudDHCP");
    let op = "El tipo de mensajes es: "+opciones(separacion,42,0,"op");
    let htype = "El tipo de hardware es: "+opciones(separacion,43,0,"htype");
    let hlen = "La longitud del hardware es: "+parseInt(separacion[44],16);

    console.log(direccionMacDestino);
    console.log(direccionMacOrigen);
    console.log(ipOrigen);
    console.log(ipDestino);
    console.log(puertoOrigen);
    console.log(puertoDestino);
    console.log(longitudUDP);
    console.log(longitudDHCP);
    console.log(op);
    console.log(htype);
    console.log(hlen);
}

function opciones(arreglo, posicion1, posicion2, opcion){
    let mensaje = "";
    let longitud = 0;
    switch (opcion) {
        case "mac":
            for(let i = posicion1; i < posicion2; i++){
                if(i === posicion2-1){
                    mensaje += arreglo[i];
                }else{
                    mensaje += arreglo[i] + "-";
                }
            }
            return mensaje.toUpperCase();
        case "ip":
            for(let i = posicion1; i <= posicion2; i++){
                if(i === posicion2){
                    mensaje += parseInt(arreglo[i], 16);
                }else{
                    mensaje += parseInt(arreglo[i], 16) + ".";
                }
            }
            return mensaje;
        case "puerto":
            for(let i = posicion1; i <= posicion2; i++){
                mensaje += parseInt(arreglo[i], 16);
            }
            return mensaje;

        case "longitudUDP":
            longitud = arreglo.length-34;
            return longitud;

        case "longitudDHCP":
            longitud = arreglo.length-46;
            return longitud;

        case "op":
            mensaje = parseInt(arreglo[posicion1], 16);
            if(mensaje === 1){
                return "Solicitud";
            }else if(mensaje === 2){
                return "respuesta";
            }

        case "htype":
            let numero = parseInt(arreglo[posicion1], 16);
            let cadena = ["Ethernet","Experimental Ethernet","Amateur Radio AX.25","Proteon ProNET Token Ring","Chaos",
                "IEEE 802","ARCNET","Hyperchannel","Lanstar","Autonet Short Address","LocalTalk",
                "LocalNet (IBM PCNet or SYTEK LocalNET)","Ultra link","SMDS","Frame Relay",
                "Asynchronous Transmission Mode (ATM)","HDLC","Fibre Channel","Asynchronous Transmission Mode (ATM)",
                "Serial Line","Asynchronous Transmission Mode (ATM)","MIL-STD-188-220","Metricom","IEEE 1394.1995",
                "MAPOS","Twinaxial","EUI-64","HIPARP","IP and ARP over ISO 7816-3","ARPSec","IPsec tunnel","InfiniBand (TM)",
                "TIA-102 Project 25 Common Air Interface (CAI)","Wiegand Interface","Pure IP"];
            return cadena[numero-1];

        default:
            return "";
    }
}


