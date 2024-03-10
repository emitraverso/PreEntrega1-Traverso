//Llamada a objetos del DOM:
const nombre = document.querySelector("#registro-nombre");
const mail = document.querySelector("#registro-mail");
const password = document.querySelector("#registro-password");
const formRegistro = document.querySelector("#form-registro");
const mensaje = document.querySelector("#mensaje");

let usuarios = JSON.parse(localStorage.getItem("usuarios-registrados")) || [];

function validarUsuario(informacion){
    const encontrado = usuarios.find((el) => el.mail == informacion.mail);
    return (encontrado??"no");
}


formRegistro.addEventListener("submit", (e) => {
    e.preventDefault();
    const informacion ={
        nombre : nombre.value,
        mail : mail.value,
        password : password.value
    }
    
    if(validarUsuario(informacion) != "no"){
        mensaje.innerText="Usuario ya registrado";
    }else{
        mensaje.innerText="";
        usuarios.push(informacion);
        localStorage.setItem("usuarios-registrados",JSON.stringify(usuarios));

        Toastify({
            text: "Se ha registrado correctamente",
            duration: 3000,
            destination: "./login.html",
            newWindow: true,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "center", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
              background: "linear-gradient(to right, #00b09b, #96c93d)",
            },
          }).showToast();
    }
    formRegistro.reset();
    
})