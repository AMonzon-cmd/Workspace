//array donde se cargarán los datos recibidos:
let categoryArray = [];
let productArray = [];

//Variables de orden 
const ORDER_ASC_BY_PRICE = "Barato";
const ORDER_DESC_BY_PRICE = "Caro";
const ORDER_BY_BUY = "Cant.";
const ORDER_ASC_BY_NAME = "AZ";
let currentSortCriteria = undefined;

//función que recibe un array con los datos, y los muestra en pantalla a través el uso del DOM
function showProductList(array) {

    /*variable donde se almacena el resultado*/
    let htmlContentToAppend = "";

    for (let i = 0; i < array.length; i++) {
        /*la variable producto pretende cargar el arreglo autos*/
        let producto = array[i];

        /*me esta faltando algo que sepa que tiene que buscar en el array productos*/
        /*tomo los datos del arreglo y los imprimo en codigo html*/
        htmlContentToAppend += `
        <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="${producto.image}" alt="product image" class="img-thumbnail"></img>
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <div class="mb-1">
                        <h4> ${producto.name}  ${producto.currency} ${producto.cost} </h4> 
                        <p>  ${producto.description} </p> 
                        </div>
                        <small class="text-muted"> ${producto.soldCount} vendidos</small> 
                    </div>

                </div>
            </div>
        </div>
        `
        /*imprime resultado de htmlcontent que es lo que esta arriba en el div con cat-list-container*/
        document.getElementById("cat-list-container").innerHTML = htmlContentToAppend;
    }
    document.getElementById("textoadicional").innerHTML = "Veras aqui todos los productos relacionados con la categoria " + `<b> ${categoryArray.catName} </b>`
}

//  -   Filtrado y limpieza    -

//Filtrado de productos segun un rango de precio
function filtrarPorPrecio() {
    let tempShow = productArray;
    console.log(tempShow);

    if (cantidadMinima.value != "") {
        console.log(cantidadMinima.value);
        tempShow = tempShow.filter(productos => productos.cost > cantidadMinima.value);
        console.log(tempShow);
    }

    if (cantidadMaxima.value != "") {
        console.log(cantidadMaxima.value);
        tempShow = tempShow.filter(productos => productos.cost < cantidadMaxima.value);
        console.log(tempShow);
    }

    console.log(tempShow);
    showProductList(tempShow);
    tempShow = productArray;
}
//Borrar precios de filtrado y cargar vista original
function limpiarFiltros() {
    document.getElementById("cantidadMinima").value = "";
    document.getElementById("cantidadMaxima").value = "";
    showProductList(productArray);
}

//  -   ORDENAR   -

function ordenarPorPrecioDescendente() {
    let tempShow = productArray.sort(function (a, b) {
        if (a.cost > b.cost) { return -1; }
        if (a.cost < b.cost) { return 1; }
        return 0;
    });
    showProductList(tempShow);
}

function ordenarPorPrecioAscendente() {
    let tempShow = productArray.sort(function (a, b) {
        if (a.cost < b.cost) { 
            return -1;
        }
        if (a.cost > b.cost) { 
            return 1; 
        }
        return 0;
    });
    showProductList(tempShow);
}

function ordenarPorRelevancia() {
    let tempShow = productArray.sort(function (a, b) {
        if (a.soldCount > b.soldCount) { return -1; }
        if (a.soldCount < b.soldCount) { return 1; }
        return 0;
    });
    showProductList(tempShow);
}

//  -   Desafio    -
function busqueda() {
    let tempShow;
    if(buscarPorNombre.value !=null || buscarPorNombre.value != ""){
        console.log(buscarPorNombre.value.toLowerCase());
        tempShow = productArray.filter(newArray => 
            (newArray.name.toLowerCase().indexOf(buscarPorNombre.value.toLowerCase()) !== -1) || (newArray.description.toLowerCase().indexOf(buscarPorNombre.value.toLowerCase()) !== -1));
    }
    if(tempShow.length != 0){
        showProductList(tempShow);
    }else{
        document.getElementById("cat-list-container").innerHTML = "Elemento no encontrado";
    }
}



/* 
EJECUCIÓN:
-Al cargar la página se llama a getJSONData() pasándole por parámetro la dirección para obtener el listado.
-Se verifica el estado del objeto que devuelve, y, si es correcto, se cargan los datos en productArray.
-Por último, se llama a showProductList() pasándole por parámetro productArray.

*/


document.addEventListener("DOMContentLoaded", function (e) {
    let categoria = PRODUCTS_URL + localStorage.getItem("catID") + ".json";
    console.log(categoria);
    getJSONData(categoria).then(function (resultObj) {
        if (resultObj.status === "ok") {
            categoryArray = resultObj.data;
            productArray = resultObj.data.products;
            console.log(categoryArray);
            console.log(productArray);
            showProductList(productArray);
        }
    });

    document.getElementById("filtradoXPrecio").addEventListener("click", function () {
        filtrarPorPrecio();
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function () {
        limpiarFiltros();
    });

    document.getElementById("ordenAscendente").addEventListener("click", function () {
        ordenarPorPrecioAscendente()
    });

    document.getElementById("ordenDescendente").addEventListener("click", function () {
        ordenarPorPrecioDescendente();
    });

    document.getElementById("relevanciaVendido").addEventListener("click", function () {
        ordenarPorRelevancia();
    });

    document.getElementById("buscarPorNombre").addEventListener('input', function () {
        busqueda();
    });
});