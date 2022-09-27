let producto = [];
let imagenes;
let comentarios;

function showInfo() {
    let htmlContentToAppend = `
        <h1 class="mb-1">${producto.name}</h1>
        <hr>
        <h4><b>Precio</b><br></h4><p>${producto.cost}</p><br>
        <h4><b>Descripcion</b><br></h4><p>${producto.description}</p><br>
        <h4><b>Categoria</b><br></h4><p>${producto.category}</p><br>
        <h4><b>Cantidad de Vendidos</b><br></h4><p>${producto.soldCount}</p><br>
        <h4><b>Imagenes Ilustrativas</b><br></h4><br>

    `;
    document.getElementById("cat-list-container").innerHTML = htmlContentToAppend;
}

function showPicture() {
    for (let i = 0; i < producto.images.length; i++) {
        console.log(producto.images.slice(i).shift());
        let htmlContentToAppend = `
                <img src="${producto.images.slice(i).shift()}" alt="product image" class="img-thumbnail" width="24%" ></img> 
            `;
        document.getElementById("product-images").innerHTML += htmlContentToAppend;
    }
}

function scoreToStar(score) {
    let htmlContentToAppend="";
    for (let i = 0; i < 5; i++) {
        if (i < score) {
            console.log(i);
            htmlContentToAppend += `<span class="fa fa-star checked"></span>`;
        }
        else{
            console.log(i);
            htmlContentToAppend += `<span class="fa fa-star"></span>`;
        }
    }
    return htmlContentToAppend;
}

function showComentario() {
    document.getElementById("comentarios").innerHTML = null;
    let htmlContentToAppend = `<hr><br><h3>Comentarios</h3>`;
    for (let i = 0; i < comentarios.length; i++) {
        htmlContentToAppend += `
            <b>${comentarios[i].user}</b>  -  ${comentarios[i].dateTime}  -  ` + scoreToStar(comentarios[i].score) + `
            <br>${comentarios[i].description} <br><hr>`;
    }
    document.getElementById("comentarios").innerHTML += htmlContentToAppend;
}

function agregarComentario() {
    comentarios.push({  product: localStorage.getItem("productID"),
                        score: document.getElementById("puntaje").value, 
                        description: document.getElementById("descripcion").value, 
                        user: localStorage.getItem("usuario"), 
                        dateTime: new Date().toLocaleString() });
    console.log(comentarios);
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
            showInfo();
            showPicture();
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