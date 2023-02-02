const canvas = document.getElementById('board');
const toolbar = document.getElementById('toolbar');
const ctx = canvas.getContext('2d');
const canvasOffsetX =  canvas.offsetLeft;
const canvasOffsetY = canvas.offsetTop;

let malovani = false;
let lineWidth = 5;
let startX ;
let startY ;



toolbar.addEventListener('click', e => {
    if (e.target.id === 'clear') {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
});

toolbar.addEventListener('change', e => {
    if(e.target.id === 'stroke') {
        ctx.strokeStyle = e.target.value;
    }

    if(e.target.id === 'lineWidth') {
        lineWidth = e.target.value;
    }

});

function save() {
    localStorage.setItem(canvas, canvas.toDataURL());
}

function load() {
    let ulozene = new Image();
    ulozene.src = localStorage.getItem(canvas);
    ulozene.onload = function () {
        ctx.drawImage(ulozene, 0, 0);
    };
}

let saveU = document.querySelector(".save").addEventListener("click", save);
let loadu = document.querySelector(".load").addEventListener("click", load);

const draw = (e) => {
    if(!malovani) {
        return;
    }

    ctx.lineWidth = lineWidth;
    ctx.lineCap = 'round';

    ctx.lineTo(e.clientX - canvasOffsetX, e.clientY - canvasOffsetY);
    ctx.stroke();
}

canvas.addEventListener('mousedown', (e) => {
    malovani = true;
    startX = e.clientX;
    startY = e.clientY;
});

canvas.addEventListener('mouseup', e => {
    malovani = false;
    ctx.stroke();
    ctx.beginPath();
});

canvas.addEventListener('mousemove', draw);


