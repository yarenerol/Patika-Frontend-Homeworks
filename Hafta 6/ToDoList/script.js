const inputDom = document.querySelector("#task");
const listDom = document.querySelector("#list");
const btnDom = document.querySelector("#liveToastBtn");
const currentList = document.getElementsByTagName("li");

for (let i = 0; i < currentList.length; i++) {
    let span = document.createElement("span");
    let txt = document.createTextNode("X");
    span.className = "close";
    span.appendChild(txt);
    currentList[i].appendChild(span);

    span.onclick = function(){
        this.parentElement.style.display = "none";
    }
    
    currentList[i].onclick = function(){
        this.classList.toggle("checked");
    }
}

function newElement(){
    const task = inputDom.value.trim();

    if (task === "") {
        console.log("boş kayıt yapılmaz.");
    } else {
        let li = document.createElement("li");
        li.textContent = task;

        li.onclick = function(){
            this.classList.toggle("checked");
        }

        let span = document.createElement("span");
        let txt = document.createTextNode("X");
        span.className = "close";
        span.appendChild(txt);
        li.appendChild(span);

        span.onclick = function(){
            this.parentElement.style.display = none;
        }

        li.appendChild(span);
        listDom.appendChild(li);

        inputDom.value = "";
    }
}

