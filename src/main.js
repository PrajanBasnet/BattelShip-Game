class Ship{
    constructor(myLength,coords){
        this.myLength = myLength;
        this.coords = coords;
        this.hits = [];
    }

    hit(position){
        if(!this.hits.includes(position)){
            this.hits.push(position);
            console.log("Hits: ", this.hits);
            this.isSunk()
        }
    }
    isSunk(){
        if(this.hits.length === this.myLength){
          console.log( "The ship Sunk",this.hits)
        }
    }
}
class gameBoard{
    constructor(){
        this.boards = new Array(100).fill(null);
        this.ships = [];
        this.missAttack = [];
    }

    newShip(size,coords){
        let myShip = new Ship(size,coords);

        for(let pos of coords){
            if(this.boards[pos] !== null){
                throw new Error("This coords already exists");
            }
        }

       coords.forEach(pos => this.boards[pos] = myShip);
       this.ships.push(myShip);
    }

    receiveAttack(position){
        let attack = this.boards;
        console.log("position: ", attack[position]);
        if(attack[position] == null) {
            this.missAttack.push(position);
            attack[position] = 'x';
            return "Missed";
        }else if(attack[position] == "x"){
            return null;
        }
        attack[position].hit(position)  
    }
    
}

class Players{
    constructor(name){
        this.name = name;
        this.gameBoard = new gameBoard();
    }

}

let playerOne = new Players("prajwal");
let playerTwo = new Players("Computer");




let container = document.querySelector(".container");
function divDom(){
    for (let i = 0; i < 100; i++) {
        let newDiv = document.createElement("div");
         newDiv.setAttribute("class","all");
         newDiv.setAttribute("id",i);
         dragFunction(newDiv);
         container.appendChild(newDiv);

    }
}
divDom();



// Ship one 
let shipOne = document.querySelector("#ship1");
let target = document.querySelector("#target");

function dragFunction(element){

    element.addEventListener("dragover",(e)=>{
        e.preventDefault();
    })
    
    element.addEventListener("drop",(e)=>{
        e.preventDefault();
        element.appendChild(shipOne);
        
    })
    
}

// Add this at the end of your file, after all your code

// Expose classes and instances to window for console access
window.Ship = Ship;
window.gameBoard = gameBoard;
window.Players = Players;
window.playerOne = playerOne;
window.playerTwo = playerTwo;