let container = document.querySelector('.container');
let gridSize = 0;
let grid;

let colorPicker = document.getElementById('color');
// default color of pen
let ink = 'black';

colorPicker.addEventListener('input', () => ink = colorPicker.value);

let showGrid = document.querySelector('#grid');
let gridFlag = true;

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
});

// hide grid lines
function removeGridBorder() {
    if(gridFlag === false) {
        grid.forEach(item => 
            item.classList.remove('box'));
    }
}

// show grid lines 
function addGridBorder() {
    if(gridFlag === true) {
        grid.forEach(item => 
            item.classList.add('box'));
    }
}


let random = document.getElementById('random-color');
let randomFlag = false;

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

// random color generater using rgb
function randomColor(){
    return 'rgb('+Math.floor(Math.random()*255)+','+Math.floor(Math.random()*255)+','+Math.floor(Math.random()*255)+')';
}

// for eraser button
let erase = document.getElementById('erase');
let eraseFlag = false;
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

// for slider input for grid size
let slider = document.querySelector('.myslider');
// for text output of slider value
let output = document.querySelector('#demo');

output.textContent = `${slider.value} x ${slider.value}`;

slider.addEventListener('input', function() {
    output.textContent = `${this.value} x ${this.value}`;
    gridSize = this.value;
    createGrid(gridSize);
});

let clear = document.querySelector('#clear');
// clear the screen 
clear.addEventListener('click', () =>  {
    grid.forEach(item => {
        item.style.backgroundColor = 'white';
    })
});

// create grid default size 16*16
function createGrid(gridSize=16) {
    // remove previously created grid(divs) 
    clearGrid();
    // make new grid(divs) according to new gridSize
    for(let i=0; i<gridSize**2; i++) {
        let box = document.createElement('div');
        gridFlag = true;
        showGrid.classList.add('btn-on');
        box.setAttribute('id', 'box');
        box.classList.add('box');
        // width and height of one grid
        box.style.width = (620/gridSize) + 'px';
        box.style.height = (620/gridSize) + 'px';
        container.appendChild(box);
    }

    grid = document.querySelectorAll('#box');
    grid.forEach(item => {
        // color the grid when mouse moves or mouse is pressed down
        item.addEventListener('mousemove', colorGrid);
        item.addEventListener('mousedown', colorGrid);
    });
}


function colorGrid(e) {
    // color only if a mouse button is pressed
    if(e.buttons > 0)
        if(eraseFlag) {
            // if eraseFlag is true make the pen color to white
            this.style.backgroundColor = 'white';
        }
        else if(randomFlag) {
            // if randomFlag is true generate random color every grid
            this.style.backgroundColor = randomColor();
        }
        else {
            // make the grid to whatever the color user has selected (default black)
            this.style.backgroundColor = ink;
        }
}

function clearGrid() {
    // clear grids, called when the grid size is changed
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }      
}


createGrid();

