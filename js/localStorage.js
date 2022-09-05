let htmlContentToAppend = "";
let nombre = "";

function visualizarUsuario() {
    let htmlContentToAppend = "";
    let nombre="";
    if (localStorage.getItem("usuario")) {
        nombre = localStorage.getItem("usuario");
        htmlContentToAppend += `<label>${nombre}</label>`
        document.getElementById("labelEmail").innerHTML = htmlContentToAppend;
    }
    else {
        htmlContentToAppend += `<label> Iniciar Sesion </label>`
        document.getElementById("labelEmail").innerHTML = htmlContentToAppend;
    }
}

visualizarUsuario();