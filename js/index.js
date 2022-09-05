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
        else if (email.includes('.com') === false) {
            document.getElementById("alertEmail").innerHTML = "El texto ingresado no es un correo";
        }
        else {
            document.getElementById("alertEmail").innerHTML = "";
        }
    }
    if (pass === '') {
        document.getElementById("alertPass").innerHTML = "Falta Contraseña";
    } else {
        document.getElementById("alertPass").innerHTML = "";
    }

    if (email != '' && pass != '' && email.includes('.com') === true && email.includes('@') === true) {
        localStorage.setItem("usuario", email);
        let emailCorreo = localStorage.getItem("usuario");
        console.log(emailCorreo);
        window.location.href = "main.html";
    }
}


function handleCredentialResponse(response) {
    const data = jwt_decode(response.credential);
    console.log(data);
    let correoUsuario = data.email;
    localStorage.setItem("usuario", correoUsuario);
    let email = localStorage.getItem("usuario");
    console.log(email);
    window.location.href = "main.html";
}


window.onload = function () {
    google.accounts.id.initialize({
        client_id: "561091558796-9h4an3d9eg9kvd7e6b4c3h4oo2krscu8.apps.googleusercontent.com",
        callback: handleCredentialResponse,
    });
    google.accounts.id.renderButton(
        document.getElementById("buttonDiv"),
        {
            theme: "outline",
            size: "large",
            type: "standard",
            shape: "pill",
            theme: "filled_black",
            text: "${button.text}",
            size: "large",
            logo_alignment: "left",
            width: "300",
        }  // customization attributes
    );
    google.accounts.id.prompt(); // also display the One Tap dialog
}