//Llamada a objetos del DOM:
const mail = document.querySelector("#login-mail");
const password = document.querySelector("#login-password");
const formLogin = document.querySelector("#form-login");
const mensaje = document.querySelector("#mensaje");


let usuarios = JSON.parse(localStorage.getItem("usuarios-registrados")) || [];

function validarUsuario(informacion){
    const encontrado = usuarios.find((el) => {
        return el.mail == informacion.mail && el.password == informacion.password;
    });

    return (encontrado??"no");
}


formLogin.addEventListener("submit", (e) => {
    e.preventDefault();
    const informacion ={
        mail : mail.value,
        password : password.value
    }
    
    if(validarUsuario(informacion) != "no"){
        location.href="./pages/inicio.html";
    }else{
        mensaje.innerText="Credenciales incorrectas";
    }
    formLogin.reset();
    
})


