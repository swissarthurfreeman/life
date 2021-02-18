//size of cell in pixels.
const size = 20;
const canvasWidth = 400;
const canvasHeight = 400;
const n = canvasWidth / size;
const m = canvasHeight / size;

class Cell {
    constructor(status, position) {
        this.status = status;
        this.position = position;
    }
}

let board = [];

function setup() {
    
    
    createCanvas(canvasWidth, canvasHeight);
    frameRate( 10 )
    //initialise matrix.
    for(let i=0; i < m; i++) {
        board[i] = new Array(n);
    }
    //fill matrix of cells.
    for(let i=0; i < m; i++ ) {
        for(let j=0; j < n; j++ ) {
            board[i][j] = new Cell(false, [i*size, j*size]);
        }
    }
    
    //glider configuration.
    board[0][0].status = true;
    board[0][2].status = true;
    board[1][1].status = true;
    board[1][2].status = true;
    board[2][1].status = true;
    
}

function mousePressed() {
    mouseX = 
    mouseY
}

function updateCell(i, j, previousBoard) {
    let count = 0;
    for(let k=-1; k < 2; k++) {
        for(let p=-1; p < 2; p++) {
            if( !(i + k < 0 || j + p < 0 || j + p >= n || i + k >= m) ) {
                if(k != 0 || p != 0) {         
                    if(previousBoard[i+k][j+p].status === true) {
                        count++;
                    }
                }
            }
        }
    }
    if((previousBoard[i][j].status === true) && (count < 2 || count > 3)) {
        board[i][j].status = false;        
    } else if((count === 3) && (previousBoard[i][j].status === false)) { //if dead but 3 alive neighbours.
        board[i][j].status = true;
        
    } else if((previousBoard[i][j].status === true) && (count === 2 || count === 3)) {
        board[i][j].status = true;
    }
}

function copyMatrix() {
    let newMatrix = []
    for(let i=0; i < m; i++) {
        newMatrix[i] = [];
        for(let j=0; j < n; j++) {
            newMatrix[i][j] = new Cell(board[i][j].status, board[i][j].position);
        }
    }
    return newMatrix
} 

function draw() {
    background(220);

    //draw rectangles. 
    for(let i=0; i < m; i++) {
        for(let j=0; j < n; j++) {
            if (board[i][j].status === true) {
                fill('black');
            } else {
                fill('white');
            }
            rect(board[i][j].position[0], board[i][j].position[1], size, size);
        }
    }
    
    //slice copies previous array into a new reference, previousBoard and board are 
    //now independent.
    let previousBoard = copyMatrix();
    
    //update all cells based on previousBoard. (we'll modify board based on previous)
    for(let i=0; i < m; i++) {
        for(let j=0; j < n; j++) {
            updateCell(i, j, previousBoard);
        }
    }
}