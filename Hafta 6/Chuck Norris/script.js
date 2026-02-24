const joke = document.getElementById("joke");
const button = document.getElementById("next-joke");

function getJoke (){
//1. adım: öncelikle yükleniyor modunu kullanıcıya gösterelim.

    joke.innerHTML = "Loading...";

//2. adım: şimdi api'den şaka çekelim.

    fetch("https://api.chucknorris.io/jokes/random")
        .then(response => response.json())
        .then(data=>{
            joke.innerHTML = data.value;
        })
}

//Şimdi butona event listener ekleyelim.

button.addEventListener("click", getJoke)

//Son olarak sayfa ilk açıldığında boş kalmaması için sayfa açılır açılmaz bir şaka çekelim.
getJoke();