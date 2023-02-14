const myDiv = document.getElementById("myDiv");
let timer;

window.addEventListener("wheel", event => {
    const direction = Math.sign(event.deltaY);
    let opacity = parseFloat(window.getComputedStyle(myDiv).opacity);

    if (direction > 0) {
        opacity -= 0.1;
    } else if (direction < 0) {
        opacity += 0.1;
    }

    if (opacity > 1) opacity = 1;
    if (opacity < 0) opacity = 0;

    clearTimeout(timer);
    timer = setTimeout(() => {
        if (opacity <= 0) {
            myDiv.classList.add("fade");
        } else {
            myDiv.classList.remove("fade");
        }
        myDiv.style.opacity = opacity;
    }, 50);
});
