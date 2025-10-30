class Ship {
    constructor(myLength, coords) {
        this.myLength = myLength;
        this.coords = coords;
        this.hits = [];
    }

    hit(position) {
        if (!this.hits.includes(position)) {
            this.hits.push(position);
            console.log("Hits: ", this.hits);
            this.isSunk()
        }
    }
    isSunk() {
        if (this.hits.length === this.myLength) {
            console.log("The ship Sunk", this.hits)
        }
    }
}
let start = document.querySelector("#start");
class gameBoard {
    constructor() {
        this.boards = new Array(100).fill(null);
        this.ships = [];
        this.missAttack = [];
    }

    newShip(size, coords) {
        let myShip = new Ship(size, coords);
        for (let pos of coords) {
            if (this.boards[pos] !== null) {
                throw new Error("This coords already exists");
            }
        }

        coords.forEach(pos => this.boards[pos] = myShip);
        this.ships.push(myShip);
    }

    receiveAttack(position) {
        let attack = this.boards;
        console.log("position: ", attack[position]);

        if (attack[position] == null) {
            this.missAttack.push(position);
            attack[position] = 'x';
            return "Missed";
        } else if (attack[position] == "x") {
            return null;
        }

        attack[position].hit(position)
    }

    renderDom(){
        for (let i = 0; i < this.boards.length; i++) {
            const value = this.boards[i];

            // console.log(this.boards)
            if(value == null){
                document.getElementById(i).style.backgroundColor = "black";
            }else if(value == "x"){
                console.log(this.boards[41].hits,this.boards[41].coords)
                document.getElementById(i).style.backgroundColor = "green";
            }else if (this.boards[i].hits.includes(i)){
                document.getElementById(i).style.backgroundColor = "red";

            }

        }
        console.log(this.boards[10])
    }

}

class Players {
    constructor(name) {
        this.name = name;
        this.gameBoard = new gameBoard();
    }

}

let playerOne = new Players("prajwal");




let container = document.querySelector(".container");
function divDom() {
    for (let i = 0; i < 100; i++) {
        let newDiv = document.createElement("div");
        newDiv.setAttribute("class", "all");
        newDiv.id = i;
        dragFunction(newDiv,i);

        container.appendChild(newDiv);
        
    }
}
divDom();


// Ship one 
let shipOne = document.querySelector("#ship1");
let shipTwo = document.querySelector("#ship2");


let target = document.querySelector("#target");
let all = document.querySelectorAll(".all");

function dragFunction(element,id) {
    element.addEventListener("dragover", (e) => {
        e.preventDefault();
        
    })
    
    element.addEventListener("drop", (e) => {
        e.preventDefault();
        console.log(id)
        document.getElementById(id+1).style.backgroundColor = "red";
        document.getElementById(id+2).style.backgroundColor = "red";
        document.getElementById(id).style.backgroundColor = "red";
        shipOne.id = id;
        
        element.appendChild(shipOne);
        
    })
    element.addEventListener("dragstart", (event) => { 
        document.getElementById(id+1).style.backgroundColor = "rgb(189, 189, 228)";
        document.getElementById(id+2).style.backgroundColor = "rgb(189, 189, 228)";
        document.getElementById(id).style.backgroundColor = "rgb(189, 189, 228)";
        
    })
}

start.addEventListener("click",(e)=>{
    e.preventDefault()
    console.log("Game started")
    let id = parseInt(shipOne.id)
    console.log(id+1)
    playerOne.gameBoard.newShip(3,[id,id+1,id+2])
})


window.Ship = Ship;
window.gameBoard = gameBoard;
window.Players = Players;
window.playerOne = playerOne;