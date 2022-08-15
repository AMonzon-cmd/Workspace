//array donde se cargarán los datos recibidos:
let categoriesArray = [];

//función que recibe un array con los datos, y los muestra en pantalla a través el uso del DOM
function showCategoriesList(array){
    
    /*variable donde se almacena el resultado*/
    let htmlContentToAppend = "";

    for(let i = 0; i < array.products.length; i++){ 
        /*la variable category pretende cargar el arreglo autos*/
        let category = array.products[i];

        /*me esta faltando algo que sepa que tiene que buscar en el array productos*/
        /*tomo los datos del arreglo y los imprimo en codigo html*/
        htmlContentToAppend += `
        <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="${category.image}" alt="product image" class="img-thumbnail"></img>
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <div class="mb-1">
                        <h4> ${category.name}  ${category.currency} ${category.cost} </h4> 
                        <p>  ${category.description} </p> 
                        </div>
                        <small class="text-muted"> ${category.soldCount} artículos</small> 
                    </div>

                </div>
            </div>
        </div>
        `
        /*imprime resultado de htmlcontent que es lo que esta arriba en el div con cat-list-container*/
        document.getElementById("cat-list-container").innerHTML = htmlContentToAppend; 
    }

  document.getElementById("textoadicional").innerHTML = "Veras aqui todos los productos relacionados con la categoria " + `<b> ${array.catName} </b>`

}


/* 
EJECUCIÓN:

-Al cargar la página se llama a getJSONData() pasándole por parámetro la dirección para obtener el listado.
-Se verifica el estado del objeto que devuelve, y, si es correcto, se cargan los datos en categoriesArray.
-Por último, se llama a showCategoriesList() pasándole por parámetro categoriesArray.

*/

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(List_Autos_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            categoriesArray = resultObj.data;
            showCategoriesList(categoriesArray);
        }
    });
});