let htmlContentToAppend = "";
let nombre = "";

function limpiarLocalStorage(){
    localStorage.clear();
    window.location="index.html";
}

function visualizarUsuario() {
    let htmlContentToAppend = "";
    let nombre = "";
    if (localStorage.getItem("usuario")) {
        nombre = localStorage.getItem("usuario");
        htmlContentToAppend +=
            `<div class="btn-group">
                <button class="btn btn-success dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                    ${nombre}
                </button>
                <ul class="dropdown-menu">
                    <li>
                        <a class="dropdown-item" href="cart.html">Mi carrito</a>
                    </li>
                    <li>
                        <a class="dropdown-item" href="my-profile.html">Mi perfil</a>
                    </li>
                    <li>
                        <a class="dropdown-item" onclick="limpiarLocalStorage()">Cerrar Sesion</a>
                    </li>
                </ul>
            </div>
            `
        document.getElementById("labelEmail").innerHTML = htmlContentToAppend;
    }
    else {
        htmlContentToAppend += `
            <button type="button" class="btn btn-info" onclick="limpiarLocalStorage()">
                Inicio Session
            </button>  
        
        `;
        document.getElementById("labelEmail").innerHTML = htmlContentToAppend;
    }
}

visualizarUsuario();