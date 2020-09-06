/*
Archivo Js de 
Guardar un pensamiento
*/

let listaTweets = document.getElementById("lista-tweets");

//Event listeners

eventListeners()

function eventListeners() {
    //Cuando se envia el formulario, para agregar el pensamiento
    document.querySelector("#formulario").addEventListener("submit", agregarTweet);

    //Cuando se clickea la X, para borrar el pensamiento
    listaTweets.addEventListener("click", borrarTweet);

    //Contenido cargado
    document.addEventListener("DOMContentLoaded", localStorageListo);


    //document.querySelector("#agregar").addEventListener("click", limpiarTextarea);
}




//Funciones


//Añadir tweet del formulario
function agregarTweet(e) {
    e.preventDefault();
    //leer el valor del textarea
    let tweet = document.getElementById("tweet").value;

    //Crear elemento y añadirle el contenido de la lista

    let li = document.createElement("li");
    //Le damos al li el valor de la textarea
    li.innerText = tweet;


    //Creamos boton para eliminar

    let botonBorrar = document.createElement("a");
    botonBorrar.classList = "borrar-tweet";
    botonBorrar.innerText = "X";
    //Agregamos el boton borrar al tweet
    li.appendChild(botonBorrar);

    //Agregamos el tweet a la pantalla
    listaTweets.appendChild(li);

    /*
    Agregar a local Storage
    */
    agregarTweetLocalStorage(tweet);

}

function borrarTweet(e) {
    e.preventDefault();
    if (e.target.className == "borrar-tweet") {
        //Diste click en eliminar
        e.target.parentElement.remove();
        //La linea anterior elimina el li de el pensamiento

        //alert("Pensamiento eliminado");
        /*Mostramos un mensaje para que el usuario sepa que ya fue 
        eliminado el pensamiento*/
        /**/
        borrarTweetLocalStorage(e.target.parentElement.innerText);
    }
}

/*Mostrar datos guardados en local Storage en la lista, 
después de recargar*/

function localStorageListo() {
    let tweets;

    tweets = obtenerTweetsLocalStorage();

    tweets.forEach(function(tweet) {

        //Crear elemento y añadirle el contenido de la lista

        let li = document.createElement("li");
        //Le damos al li el valor de la textarea
        li.innerText = tweet;

        let botonBorrar = document.createElement("a");
        botonBorrar.classList = "borrar-tweet";
        botonBorrar.innerText = "X";

        //Agregamos el boton borrar al tweet
        li.appendChild(botonBorrar);

        //Agregamos el tweet a la pantalla
        listaTweets.appendChild(li);


    });

}

//Funcion para agregar a local storage
function agregarTweetLocalStorage(tweet) {
    let tweets;
    tweets = obtenerTweetsLocalStorage();
    //Añadir el nuevo tweet al arreglo
    tweets.push(tweet);
    //Convertir de string a arreglo
    localStorage.setItem("tweets", JSON.stringify(tweets));


}

/*Se encarga de comprobar si hay elementos en local Storage, 
y nos da un arreglo en la variable tweets, ya sea vacio si 
no hay ningun tweet, o con contenido de los tweets guardados 
en el localStorage*/
function obtenerTweetsLocalStorage() {
    let tweets;
    //Revisamos los valores de localStorage
    if (localStorage.getItem("tweets") === null) {
        /*Si se detecta que no hay tweets en el localStorage 
        entra 
        al if*/
        tweets = [];
        /* Si entra al if se inicializa los tweets como un 
        arreglo vacio 
        */
    } else {
        /* Si si hay tweets guardados en el localStorage, entrara 
        al else, y guarda en tweets los elementos que toma del 
        localStorage
        */
        tweets = JSON.parse(localStorage.getItem("tweets"));
    }
    /*Añadimos return tweets para poder exportar la variable 
    a otras funciones*/
    limpiarTextarea()
    return tweets;
}

//Eliminar pensamiento tweet de Local Storage

function borrarTweetLocalStorage(tweet) {
    let tweets, tweetBorrar;
    /*Elimina la X del texto del Tweet*/
    tweetBorrar = tweet.substring(0, tweet.length - 1);

    tweets = obtenerTweetsLocalStorage();

    tweets.forEach(function(tweet, index) {
        //
        if (tweetBorrar === tweet) {
            tweets.splice(index, 1);
        }
    });

    console.log("Los tweets almacenados ahora son: ")
    console.log(tweets);

    localStorage.setItem("tweets", JSON.stringify(tweets));
}


function limpiarTextarea() {
    /*Esta funcion limpia la textarea despues y se activa al 
    darle click*/
    let textarea;

    textarea = document.getElementById("tweet");
    textarea.value = "";
}