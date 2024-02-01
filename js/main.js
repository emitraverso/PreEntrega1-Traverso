
function calcularDto(abono, dto){
    let cuota = abono - abono * dto;
    return cuota
}

let nombre = prompt("Ingrese su nombre");

alert("Bienvenido/a a INTEGRALOG " + nombre + " !");

let costoServicio1 = 10000;
let costoServicio2 = 10000;
let costoServicio3 = 10000;
let costoServicio4 = 10000;
let costoServicio5 = 10000;
let costoServicio6 = 10000;

let opcion = prompt("Seleccione el servicio de asesoramiento que desea incluir: \n 1 - Depósitos y Almacenamiento \n 2 - Distibución y Transporte \n 3 - Ruteo y Seguridad \n 4 - Análisis de costos y diseño de indicadores  \n 5 - Capacitación de Equipos \n 6 - Comercio Exterior \n X para finalizar.");

let total = 0;

while (opcion != "x" && opcion != "X") {

    if (opcion == "1") {
        total += costoServicio1;
    } else if (opcion == "2") {
        total += costoServicio2;
    } else if (opcion == "3") {
        total += costoServicio3;
    } else if (opcion == "4") {
        total += costoServicio4;
    } else if (opcion == "5") {
        total += costoServicio5;
    } else if (opcion == "6") {
        total += costoServicio6;
    } else {
        alert("El número ingresado no corresponde a una opción válida.");
    }

    opcion = prompt("Seleccione el servicio de asesoramiento que desea incluir: \n 1 - Distibución y Transporte \n 2 - Depósitos y Almacenamiento \n 3 - Ruteo y Seguridad \n 4 - Capacitación de Equipos \n 5 - Optimización de Costos \n X para finalizar.");
}

alert("El costo total de los servicios seleccionados es: $ " + total);


if (total > 0) {
    let pago = prompt("Seleccione el tiempo de contratación: \n 1 - 1 Mes \n 2 - 3 Meses - 10 % dto. \n 3 - 6 Meses - 15% dto. \n 4 - 12 Meses - 20% dto.");
    let cuota = 0;
    if (pago == "1") {
        cuota = calcularDto(total,0);
    } else if (pago == "2") {
        cuota = calcularDto(total,0.1);
    } else if (pago == "3") {
        cuota = calcularDto(total,0.15);
    } else if (pago == "4") {
        cuota = calcularDto(total,0.2);
    } else {
        alert("El número ingresado no corresponde a una opción válida.");
        pago = prompt("Seleccione el tiempo de contratación: \n 1 - 1 Mes \n 2 - 3 Meses - 10 % dto. \n 3 - 6 Meses - 15% dto. \n 4 - 12 Meses - 20% dto.");
    }

    console.log(cuota);

    alert("GRACIAS POR ELEGIRNOS! \nEl costo mensual a abonar por el total de los servicios contratados es de : $ " + cuota);

}



