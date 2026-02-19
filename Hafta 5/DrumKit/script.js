const buttons = document.querySelectorAll(".btns");

buttons.forEach(button => {
    button.addEventListener("click", ()=>{
        const key = button.innerText;
        playSound(key);
    })

})

document.addEventListener("keydown",(event)=>{
    const pressedKey = event.key.toUpperCase();
    const validKeys = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];

    if (validKeys.includes(pressedKey)) {
        playSound(pressedKey);
    }
})

document.addEventListener("keydown", (event)=>{
    const key = event.key.toUpperCase();
    playSound(key);
})

function playSound (key){
    const audio = new Audio(`sounds/${key}.wav`);
    audio.currentTime = 0;
    audio.play()
}