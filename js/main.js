//Declaración de variables:
const servicios = [
    { id: "1", descripcion: "Depósitos y Almacenamiento", precio: 10000 },
    { id: "2", descripcion: "Distibución y Transporte", precio: 8000 },
    { id: "3", descripcion: "Ruteo y Seguridad", precio: 10000 },
    { id: "4", descripcion: "Análisis de costos y diseño de indicadores", precio: 15000 },
    { id: "5", descripcion: "Capacitación de Equipos", precio: 15000 },
    { id: "6", descripcion: "Comercio Exterior", precio: 20000 },
];
const opcionesContratacion = [
    { id: "1", descripcion: "1 mes", descuento: 0 },
    { id: "2", descripcion: "3 meses", descuento: 0.1 },
    { id: "3", descripcion: "6 meses", descuento: 0.15 },
    { id: "4", descripcion: "12 meses", descuento: 0.2 },
];
let nombre;
let opcion;
let pago;
let cuota;
let total = 0;
const serviciosContratados = [];

//Funcion que busca dentro de un array el elemento de determinado id, ambos pasados como parametros: 
function buscarPorId(arr, id) {
    return arr.find((el) => el.id == id);
}

//Funcion que agrega al array que se pasa como parametro, el servicio que es el otro parámetro: 
function agregarServicio(arr, servicio) {
    arr.push(servicio);
}

//Funcion que recibe un monto y el descuento a aplicar, y devuelve el valor con el descuento aplicado: 
function calcularDto(abono, dto) {
    let cuota = abono - abono * dto;
    return cuota;
}

nombre = prompt("Ingrese su nombre");

alert("Bienvenido/a a INTEGRALOG " + nombre + " !");

opcion = prompt("Seleccione el servicio de asesoramiento que desea incluir: \n 1 - Depósitos y Almacenamiento \n 2 - Distibución y Transporte \n 3 - Ruteo y Seguridad \n 4 - Análisis de costos y diseño de indicadores  \n 5 - Capacitación de Equipos \n 6 - Comercio Exterior \n X para finalizar.");

while (opcion.toLowerCase() != "x") {

    const servicioSeleccionado = buscarPorId(servicios, opcion);

    if (servicioSeleccionado != null) {
        agregarServicio(serviciosContratados, servicioSeleccionado);
    } else {
        alert("El número ingresado no corresponde a una opción válida.");
    }
    opcion = prompt("Seleccione el servicio de asesoramiento que desea incluir: \n 1 - Depósitos y Almacenamiento \n 2 - Distibución y Transporte \n 3 - Ruteo y Seguridad \n 4 - Análisis de costos y diseño de indicadores  \n 5 - Capacitación de Equipos \n 6 - Comercio Exterior \n X para finalizar.");
}

/* console.log(serviciosContratados); */

total = serviciosContratados.reduce((acc, servicio) => acc += servicio.precio, 0);

alert("El costo total de los servicios seleccionados es: $ " + total);


if (total > 0) {
    pago = prompt("Seleccione el tiempo de contratación de los servicios: \n 1 - 1 Mes \n 2 - 3 Meses - 10 % dto. \n 3 - 6 Meses - 15% dto. \n 4 - 12 Meses - 20% dto. \n X para cancelar la contratación");
    let flag = true;
    while (flag) {
        const pagoSeleccionado = buscarPorId(opcionesContratacion, pago);

        if (pagoSeleccionado != null) {
            cuota = calcularDto(total, pagoSeleccionado.descuento);
            flag = false;
        }else if(pago.toLowerCase() == "x"){
            alert("Ha cancelado la contratación, esperamos que nos visite nuevamente para poder ofrecerle alguno de nuestros servicios.");
            flag = false;
        }else{
            alert("El número ingresado no corresponde a una opción válida.");
            pago = prompt("Seleccione el tiempo de contratación: \n 1 - 1 Mes \n 2 - 3 Meses - 10 % dto. \n 3 - 6 Meses - 15% dto. \n 4 - 12 Meses - 20% dto. \n X para cancelar la contratación");
        }                
    }
    if (cuota > 0) {
        alert("GRACIAS POR ELEGIRNOS! \nEl costo mensual a abonar por el total de los servicios contratados es de : $ " + cuota);
    }

}


