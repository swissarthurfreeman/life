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

    createCanvas(canvasWidth, canvasHeight);
}

function updateCell(i, j, previousBoard) {
    let count = 0;
    //check neighbourgh cells, there must be cleaner...
    console.log("here", i, j)
    console.log(previousBoard[i-1][j-1], "hello");
    if (previousBoard[i-1][j-1] != undefined) {
        if(previousBoard[i-1][j-1].status === true)
            count++;
    } else if (previousBoard[i-1][j] != undefined) { 
        if (previousBoard[i-1][j].status === true) 
            count++;
    } else if(previousBoard[i-1][j+1] != undefined) { 
        if (previousBoard[i-1][j+1].status === true) 
            count++;
    } else if (previousBoard[i][j-1] != undefined) { 
        if (previousBoard[i][j-1].status === true) 
            count++;
    } else if(previousBoard[i][j+1] != undefined) {
        if(previousBoard[i][j+1].status === true) 
            count++;
    } else if (previousBoard[i+1][j-1] != undefined) {
        if(previousBoard[i+1][j-1].status === true) 
            count++;
    } else if(previousBoard[i+1][j] != undefined) {
        if(previousBoard[i+1][j].status === true) 
            count++;
    } else if(previousBoard[i+1][j+1] != undefined) {
        if(previousBoard[i+1][j+1].status === true) 
            count++;
    }
    console.log("Hajaisg")
    if((previousBoard[i][j].status === true) && (count < 2 || count > 3)) {
        board[i][j].status = false;
    } else if(count === 3) { //if dead but 3 alive neighbours.
        //alive
        board[i][j].status = true;
    }

}

function draw() {
    background(220);
    //slice copies previous array into a new reference, previousBoard and board are 
    //now independent.
    let previousBoard = board.slice()
    //update all cells based on previousBoard. (we'll modify board based on previous)
    for(let i=0; i < m; i++) {
        for(let j=0; j < n; j++) {
            updateCell(i, j, previousBoard);
        }
    }
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
}