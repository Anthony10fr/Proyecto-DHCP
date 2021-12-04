var boton = document.getElementById("procesar");
var mensaje = document.getElementById("mensaje");
const respuesta = document.querySelector('.respuesta');

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
    let direccionMacDestino = opciones(separacion,0,5,"mac");
    let direccionMacOrigen = opciones(separacion,6,11,"mac");
    let ipOrigen = opciones(separacion,26,29,"ip");
    let ipDestino = opciones(separacion,30,33,"ip");
    let puertoOrigen = opciones(separacion,34,35,"puerto");
    let puertoDestino = opciones(separacion,36,37,"puerto");
    let longitudUDP = opciones(separacion,0,0,"longitudUDP");
    let longitudDHCP = opciones(separacion,0,0,"longitudDHCP");
    let op = opciones(separacion,42,0,"op");
    let htype = opciones(separacion,43,0,"htype");
    let hlen = parseInt(separacion[44],16);
    let xid = opciones(separacion, 46, 50, "mac");
    let ipCliente = opciones(separacion, 54, 57, "ip");
    let suIp = opciones(separacion, 58, 61, "ip")
    let hdir = opciones(separacion, 70, 76, "mac");


    respuesta.innerHTML += `
    <div class="my-2" style="background: white; background-color: white;">
                <h1>Contenido del mensaje</h1>
           <br> 
          <label for="direccionDestino" class="form-label">La dirección mac destino es:</label>
          <input type="text" class="form-control" id="direccionDestino" placeholder="${direccionMacDestino}">
          <br>
          <label for="direccionOrigen" class="form-label">La dirección mac origen es:</label>
          <input type="text" class="form-control" id="direccionOrigen" placeholder="${direccionMacOrigen}">
          <br>
          <label for="ipOrigen" class="form-label">La dirección ip origen es:</label>
          <input type="text" class="form-control" id="ipOrigen" placeholder="${ipOrigen}">
          <br>
          <label for="ipDestino" class="form-label">La dirección ip destino es:</label>
          <input type="text" class="form-control" id="ipDestino" placeholder="${ipDestino}">
          <br>
          <label for="puertoOrigen" class="form-label">El puerto origen es:</label>
          <input type="text" class="form-control" id="puertoOrigen" placeholder="${puertoOrigen}">
          <br>
          <label for="puertoDestino" class="form-label">El puerto destino es:</label>
          <input type="text" class="form-control" id="puertoDestino" placeholder="${puertoDestino}">
          <br>
          <label for="longitudUDP" class="form-label">La longitud del segmento UDP es:</label>
          <input type="text" class="form-control" id="longitudUDP" placeholder="${longitudUDP}">
          <br>
          <label for="longitudDHCP" class="form-label">La longitud del mensaje DHCP es:</label>
          <input type="text" class="form-control" id="longitudDHCP" placeholder="${longitudDHCP}">
          <br>
          <label for="op" class="form-label">El tipo de mensajes es:</label>
          <input type="text" class="form-control" id="op" placeholder="${op}">
          <br>
          <label for="htype" class="form-label">El tipo de hardware es:</label>
          <input type="text" class="form-control" id="htype" placeholder="${htype}">
          <br>
          <label for="hlen" class="form-label">La longitud del hardware es:</label>
          <input type="text" class="form-control" id="hlen" placeholder="${hlen} bytes">
          <br>
          <label for="xid" class="form-label">El identificador de la transacción es:</label>
          <input type="text" class="form-control" id="xid" placeholder="${xid}">
          <br>
          <label for="ipCliente" class="form-label">La ip del cliente es:</label>
          <input type="text" class="form-control" id="ipCliente" placeholder="${ipCliente}">
          <br>
          <label for="suIp" class="form-label">Su dirección ip es:</label>
          <input type="text" class="form-control" id="suIp" placeholder="${suIp}">
          <br>
          <label for="hdir" class="form-label">La dirección del hardware del cliente es:</label>
          <input type="text" class="form-control" id="hdir" placeholder="${hdir}">

    `;
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


