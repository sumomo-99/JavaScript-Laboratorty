let rgb = [0, 0, 0]; //RGB value
let inc = [1, 1, 1]; //increase(1) or decrease(-1)
let interval = 100; //interval

setTimer = (time) => {
    interval = time;
}

bgColor = (id) => {
    let color = Math.floor(Math.random() * 3); //Which color to change?
    let value = 1 + Math.floor(Math.random() * 3); //value of change

    rgb[color] += value * inc[color];
    
    if (rgb[color] < 0 || rgb[color] > 255) {
        inc[color] *= -1;
    }

    document.getElementById(id).style = 
        `background-color: rgb(${rgb[0]},${rgb[1]},${rgb[2]});`;
}

const src = document.getElementById("js");
setInterval(bgColor, interval, src.dataset.id);
