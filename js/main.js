//Declaración de variables:
const servicios = [
    { id: "1", descripcion: "Depósitos y Almacenamiento", imagen: "./img/deposito-almacenamiento.png", precio: 10000 },
    { id: "2", descripcion: "Distibución y Transporte", imagen: "./img/camion.png", precio: 8000 },
    { id: "3", descripcion: "Ruteo y Seguridad", imagen: "./img/tracking.png", precio: 10000 },
    { id: "4", descripcion: "Análisis de costos y diseño de indicadores", imagen: "./img/performance.png", precio: 15000 },
    { id: "5", descripcion: "Capacitación de Equipos", imagen: "./img/meeting.png", precio: 15000 },
    { id: "6", descripcion: "Comercio Exterior", imagen: "./img/comercio-ext.png", precio: 20000 },
];
const opcionesContratacion = [
    { id: "1", descripcion: "1 mes", descuento: 0 },
    { id: "2", descripcion: "3 meses", descuento: 0.1 },
    { id: "3", descripcion: "6 meses", descuento: 0.15 },
    { id: "4", descripcion: "12 meses", descuento: 0.2 },
];
let serviciosContratados;

//Llamada a objetos del DOM:

const contenedorServicios = document.querySelector("#contenedor-servicios");
let botonAgregarServicio = document.querySelectorAll(".servicio-contratar");
let numeroCarrito = document.querySelector("#numero-carrito")

//Funcion que recorre array de servicios para mostrarlos en el Index y asignarles el "eventListener" a los bootones "CONTRATAR": 

function mostrarServicios() {

    contenedorServicios.innerHTML="";
    for (const servicio of servicios) {
        const {id, descripcion, imagen, precio} = servicio;
        const div = document.createElement("div");
        div.classList.add("servicio");
        div.innerHTML = `
          <img class="servicio-imagen" src="${imagen}" alt="${descripcion}">
          <h3 class="servicio-titulo">${descripcion.toUpperCase()}</h3>
          <p class="servicio-precio">$${precio} / mes </p>
          <button class="servicio-contratar" id="${id}">CONTRATAR</button>
    `;
        contenedorServicios.append(div);
    }
    botonAgregarServicio = document.querySelectorAll(".servicio-contratar");
    botonAgregarServicio.forEach((boton) => {
    boton.addEventListener("click", agregarServicio);
    })      
    
    if(JSON.parse(localStorage.getItem("carrito-servicios"))){
        serviciosContratados = JSON.parse(localStorage.getItem("carrito-servicios")); 
        numeroCarrito.innerText = JSON.parse(localStorage.getItem("nro-carrito")); 
    }else{
        serviciosContratados = [];
    }
}
//Funcion que agrega el servicio al array de servicios seleccionados, devuelve un aviso si el mismo ya se había agregado anteriormente, e incrementa el nro al aldo del icono del carrito con la cant de servicios agregados: 
function agregarServicio(e) {
    const id = e.currentTarget.id;
    const servicioSeleccionado = servicios.find(servicio => servicio.id==id );
    
    if(serviciosContratados.some(servicio => servicio.id==id)){
        Swal.fire({
            icon: "warning",
            title: "Este servicio ya se encuentra agregado",
            showClass: {
              popup: `
                animate__animated
                animate__fadeInUp
                animate__faster
              `
            },
            hideClass: {
              popup: `
                animate__animated
                animate__fadeOutDown
                animate__faster
              `
            }
          });
    }else{
        serviciosContratados.push(servicioSeleccionado);

        Toastify({
            text: `Servicio agregado: ${servicioSeleccionado.descripcion.toUpperCase()}`,
            duration: 3000,
            gravity: "top", // `top` or `bottom`
            position: "left", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
              background: "linear-gradient(to right, #00b09b, #96c93d)",
            },
          }).showToast();

    }   
    
    
    let numero = serviciosContratados.length;
    numeroCarrito.innerText = numero;
    
    localStorage.setItem("carrito-servicios", JSON.stringify(serviciosContratados));
    localStorage.setItem("nro-carrito", JSON.stringify(numeroCarrito.innerText));
    
}


mostrarServicios();