
//Variable:

let total = 0;

//Llamada a objetos del DOM:

const mensaje = document.querySelector("#mensaje");
const carritoServicios = document.querySelector("#carrito-servicios");
const carritoPrecio = document.querySelector(".carrito-precio");
const carritoBotones = document.querySelector("#carrito-btns");
const btnContratar = document.querySelector("#contratar");

let numeroCarrito = JSON.parse(localStorage.getItem("nro-carrito"));
const serviciosContratados = JSON.parse(localStorage.getItem("carrito-servicios"));


//Funcion que recorre array de servicios contratados. para mostrarlos y asignarles el "eventListener" a los botones "ELIMINAR": 
function mostrarCarrito(){
    if (serviciosContratados){
        if(serviciosContratados.length==0){
            mensaje.innerText="No hay servicios seleccionados.";
            carritoBotones.classList.add("inactivo");
            carritoServicios.innerHTML="";
            crearHTMLCarrito(serviciosContratados);
            
        }else{ 
            carritoBotones.classList.remove("inactivo");
            carritoServicios.innerHTML="";
            crearHTMLCarrito(serviciosContratados);
            const btnEliminarServicio = document.querySelectorAll(".servicio-eliminar");
            
            btnEliminarServicio.forEach((boton) => {
            boton.addEventListener("click", quitarServicio);
            })   
            total = serviciosContratados.reduce((acc, servicio) => acc += servicio.precio, 0);    
            carritoPrecio.innerText = "Total: $" + total;
            btnContratar.addEventListener("click",contratar); 
        }  
               
    }else{
        mensaje.innerText="No hay servicios seleccionados.";
        carritoBotones.classList.add("inactivo");
    }
}

//Funcion que crea el contenido HTML del carrito, con sus respectivas tarjetas de producto:
function crearHTMLCarrito(arr){
    carritoServicios.innerHTML = "";
    let servicioHtml="";
    for (const servicio of arr) {
        const {id, descripcion, imagen, precio} = servicio;
        servicioHtml = `
        <div class="card-servicio">
            <div>
                <span>Servicio</span>
                <h3 class="">${descripcion.toUpperCase()}</h3>
            </div>
            <div class="servicio-total">
                <div>
                    <span>Precio</span>
                    <h3>$${precio} / mes </h3>
                </div>
                <button class="servicio-eliminar" id="${id}"><i class="bi bi-x-square-fill"></i></button>
            </div>
        </div>`;
    carritoServicios.innerHTML += servicioHtml;
    }
}


//Funcion que quita el servicio del array de servicios seleccionados, y actualiza el nro al lado del icono del carrito con la cant de servicios agregados: 
function quitarServicio(e) {
    const id = e.currentTarget.id;
    const servicioSeleccionado = serviciosContratados.find(servicio => servicio.id==id );
    
    serviciosContratados.splice(serviciosContratados.indexOf(servicioSeleccionado),1);
    
    numeroCarrito = serviciosContratados.length;
    
    localStorage.setItem("carrito-servicios", JSON.stringify(serviciosContratados));
    localStorage.setItem("nro-carrito", JSON.stringify(numeroCarrito));
    console.log(serviciosContratados.length);
    mostrarCarrito();
}

//Funcion que borra el array de servicios contratados del Local Storage, coloca el nro del carrito en =0 y muestra mensaje de agradecimiento con la contratacion de los servicios: 
function contratar() {
    serviciosContratados.length = 0;
    numeroCarrito = 0;
    localStorage.removeItem("carrito-servicios");
    localStorage.setItem("nro-carrito", JSON.stringify(numeroCarrito));
    
    mostrarCarrito();
    mensaje.innerText="Gracias por elegir nuestros servicios!";
    carritoBotones.classList.add("inactivo");
    

    Swal.fire({
        position: "center",
        icon: "success",
        title: "Gracias por elegir nuestros servicios! Nos pondremos en contacto a la brevedad.",
        showConfirmButton: false,
        timer: 3000
      });

}


mostrarCarrito();
