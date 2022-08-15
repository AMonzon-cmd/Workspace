function Login() {
    var email, pass;
    email = document.getElementById("email").value;
    pass = document.getElementById("pass").value;


    if (email === '') {
        document.getElementById("alertEmail").innerHTML = "Falta Email";
    } else {
        if (email.includes('@') === false) {
            document.getElementById("alertEmail").innerHTML = "El texto ingresado no es un correo";
        }
        else if(email.includes('.com') === false){
            document.getElementById("alertEmail").innerHTML = "El texto ingresado no es un correo";
        }
        else{ 
            document.getElementById("alertEmail").innerHTML = "";
        }
    }
    if (pass === '') {
        document.getElementById("alertPass").innerHTML = "Falta Contraseña";
    } else {
        document.getElementById("alertPass").innerHTML = "";
    }

    if(email != '' && pass != '' && email.includes('.com') === true && email.includes('@') === true){
        window.location.href="index.html";
    }


} 