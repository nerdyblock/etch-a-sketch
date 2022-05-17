let container = document.querySelector('.container');
let gridSize = 0;
let slider = document.querySelector('.myslider');
let output = document.querySelector('#demo');
let grid;
let colorPicker = document.getElementById('color');
let ink = 'black';
let random = document.getElementById('random-color');
let randomFlag = false;
let eraseFlag = false;
let gridFlag = true;
let showGrid = document.querySelector('#grid');
showGrid.classList.add('btn-on');

showGrid.addEventListener('click', () => {
    if(gridFlag){
        gridFlag = false;
        showGrid.classList.remove('btn-on');
        removeGridBorder();
    }
    else {
        gridFlag = true;
        showGrid.classList.add('btn-on');
        addGridBorder();
    }
})

random.addEventListener('click', () =>  {
    if(randomFlag){
        randomFlag = false;
        random.classList.remove('btn-on');
    }
    else {
        randomFlag = true;
        eraseFlag = false;
        random.classList.add('btn-on');
        erase.classList.remove('btn-on');
    }
});

color.addEventListener('input', () => ink = colorPicker.value);

output.textContent = slider.value;

let erase = document.getElementById('erase');
erase.addEventListener('click', () => {
    if(eraseFlag){
        eraseFlag = false;
        erase.classList.remove('btn-on');
    }
    else {
        eraseFlag = true;
        randomFlag = false;
        random.classList.remove('btn-on');
        erase.classList.add('btn-on');
    }
});

slider.addEventListener('input', function() {
    output.textContent = this.value;
    gridSize = this.value;
    clearGrid();
    createGrid(gridSize);
});

function createGrid(gridSize=16) {
    for(let i=0; i<gridSize**2; i++) {
        let box = document.createElement('div');
        box.classList.add('box');
        box.setAttribute('id', 'box')
        box.style.width = (600/gridSize) + 'px';
        box.style.height = (600/gridSize) + 'px';
        container.appendChild(box);
    }

    grid = document.querySelectorAll('#box');
    grid.forEach(item => {
        item.addEventListener('mouseenter', colorGrid);
        item.addEventListener('mousedown', colorGrid);
    });
}

function colorGrid(e) {
    if(e.buttons > 0)
        
        if(eraseFlag) {
            this.style.backgroundColor = 'white';
        }
        else if(randomFlag) {
            this.style.backgroundColor = randomColor();
        }
        else {
            this.style.backgroundColor = ink;
        }
}

function clearGrid() {
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }      
}

function removeGridBorder() {
    if(gridFlag === false) {
        grid.forEach(item => 
            item.classList.remove('box'));
    }
}

function addGridBorder() {
    if(gridFlag === true) {
        grid.forEach(item => 
            item.classList.add('box'));
    }
}

function randomColor(){
 return 'rgb('+Math.floor(Math.random()*255)+','+Math.floor(Math.random()*255)+','+Math.floor(Math.random()*255)+')';
}

createGrid();

