let producto = [];
let imagenes;
let comentarios;


function showNameProduct() {
    let htmlContentToAppend = `
        <h1 >${producto.name}</h1>
        <hr>`;
    document.getElementById("titulo").innerHTML = htmlContentToAppend;
}

function showInfo() {
    let htmlContentToAppend =
        `
        <br><h4><b> US$ ${producto.cost}</b></h4>
        <br><h4><b>Detalle </b><br></h4><p>${producto.description}</p>
        <br><h4><b>Categoria</b><br></h4><p>${producto.category}</p>
        <br><h4><b>Vendidos</b><br></h4><p>${producto.soldCount}</p><br>
    `;
    document.getElementById("listInfoProduct").innerHTML = htmlContentToAppend;
}

function showPicture() {
    let htmlContentToAppend="";
    for (let i = 0; i < producto.images.length; i++) {
        //console.log(producto.images.slice(i).shift());
        if(i==1){ 
        htmlContentToAppend = `
            <div class="carousel-item active" data-bs-interval="3550">
                <img src="${producto.images.slice(i).shift()}"  alt="..." width="625" height="418">
            </div> `;
        }
        else{
            htmlContentToAppend = `
            <div class="carousel-item" data-bs-interval="3550">
                <img src="${producto.images.slice(i).shift()}"  alt="..." width="625" height="418">
            </div> `;
        }
        document.getElementById("productImage").innerHTML += htmlContentToAppend;
    }
}

function scoreToStar(score) {
    let htmlContentToAppend = "";
    for (let i = 0; i < 5; i++) {
        if (i < score) {
            console.log(i);
            htmlContentToAppend += `<span class="fa fa-star checked"></span>`;
        }
        else {
            console.log(i);
            htmlContentToAppend += `<span class="fa fa-star"></span>`;
        }
    }
    return htmlContentToAppend;
}

function showComentario() {
    document.getElementById("comentarios").innerHTML = null;
    let htmlContentToAppend = `<h3>Comentarios</h3>`;
    for (let i = 0; i < comentarios.length; i++) {
        htmlContentToAppend += `
            <b>${comentarios[i].user}</b>  -  ${comentarios[i].dateTime}  -  ` + scoreToStar(comentarios[i].score) + `
            <br>${comentarios[i].description} <br><hr>`;
    }
    document.getElementById("comentarios").innerHTML += htmlContentToAppend;
}

function agregarComentario() {
    comentarios.push({
        product: localStorage.getItem("productID"),
        score: document.getElementById("puntaje").value,
        description: document.getElementById("descripcion").value,
        user: localStorage.getItem("usuario"),
        dateTime: new Date().toLocaleString()
    });
    console.log(comentarios);
}

function redireccionamiento(id){
    localStorage.setItem("productID", id);
    window.location = "product-info.html";
}

function relaciones() {
    let allProducts = JSON.parse(localStorage.getItem('arrayProducts'));
    let htmlContentToAppend = "";
    //console.log(JSON.parse(localStorage.getItem('productID')));
    for (let i = 0; i < allProducts.length; i++) {
        if ((allProducts[i].id != JSON.parse(localStorage.getItem('productID')))) {
            //console.log("Productos relacionados " + allProducts[i].id);
            htmlContentToAppend += `          
                <div onclick="redireccionamiento(${allProducts[i].id})" class="col-md-2">
                    <div class="card mb-4 shadow-sm custom-card cursor-active" id="card">
                        <img class="bd-placeholder-img card-img-top" src="${allProducts[i].image}" alt="">
                        <div class="card-body">
                            <label class="card-text">${allProducts[i].name}</label>
                        </div>
                    </div>
                </div>  `;
            document.getElementById("relacionados").innerHTML = htmlContentToAppend;
        }
    }

}

document.addEventListener("DOMContentLoaded", function (e) {
    let prod = localStorage.getItem("productID") + ".json";
    let urlDetalleProd = PRODUCT_INFO_URL + prod;
    let urlComProd = PRODUCT_INFO_COMMENTS_URL + prod;
    console.log(urlDetalleProd);
    console.log(urlComProd);

    getJSONData(urlDetalleProd).then(function (resultObj) {
        if (resultObj.status === "ok") {
            producto = resultObj.data;
            imagenes = resultObj.data.images;
            console.log(producto);
            console.log(imagenes);
            showNameProduct();
            showInfo();
            showPicture();
            relaciones();
        }
    });

    getJSONData(urlComProd).then(function (resultObj) {
        if (resultObj.status === "ok") {
            comentarios = resultObj.data;
            console.log(comentarios);
            showComentario();

        }
    });

    document.getElementById("SendComentario").addEventListener("click", function () {
        agregarComentario();
        showComentario();
    });


});