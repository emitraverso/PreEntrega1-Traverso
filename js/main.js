//Declaración de variables:

let serviciosContratados;

//Llamada a objetos del DOM:

const contenedorServicios = document.querySelector("#contenedor-servicios");
let botonAgregarServicio = document.querySelectorAll(".servicio-contratar");
let numeroCarrito = document.querySelector("#numero-carrito");


//Funcion que utiliza Fetch para traer array de servicios del archivo db.json 
async function serviciosFetch() {
  const response = await 
  fetch("../db/db.json")
  const data = await response.json()
  const {servicios} = data;
  return servicios;
}


//Funcion que recorre array de servicios para mostrarlos en el Index y asignarles el "eventListener" a los botones "CONTRATAR": 
async function mostrarServicios() {
  
    const servicios = await serviciosFetch(); 

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

//Funcion que agrega el servicio al array de servicios seleccionados, devuelve una alerta si el mismo ya se había agregado anteriormente, e incrementa el nro al aldo del icono del carrito con la cant de servicios agregados: 
async function agregarServicio(e) {
    const id = e.currentTarget.id;
    const servicios = await serviciosFetch();
    const servicioSeleccionado = servicios.find(servicio => servicio.id==id);
   
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

 

 