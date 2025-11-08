import { autoAttack } from "./autoAttack.js";
import { Attack ,Ui} from "./dom/dom.js";

class Ship {
    constructor(coords, myLength ,pid) {
        this.coords = coords;
        this.myLength = myLength;
        this.hits = [];
        this.pid = pid;
    }

    hit(position) {
        if (this.hits.includes(position)) {
            console.log("Try again");
            return;
        }
        this.hits.push(position);
        console.log("PIDS::", this.pid , this.myLength)
        this.isSunk();
    }

    isSunk() {
        if (this.myLength.length === this.hits.length) {
            console.log("The ship has been sunk!!");
            this.hits.forEach(element => {
                let elm = this.pid + element;
                let test = document.getElementById(elm);
                test.style.backgroundColor = "green";
                
            });

        }
    
    }
}

class GameBoard {
    constructor() {
        this.boards = new Array(100).fill(null);
        this.count = 0;
        this.missedAttack = [];
    }
    newShip(myLength, coords,pid) {
        let myShip = new Ship(myLength, coords ,pid);
        for (let coord of coords) {
            if (this.boards[coord] !== null) {
                console.error("Conflict of interest at", coord);
                return false;
            }
        }
        coords.forEach(coord => {
            this.boards[coord] = myShip;
        });
        return true;
    }

    receiveAttack(id, coords) {
        let newCoords = coords.replace(id, "");
        let x = parseInt(newCoords);
        console.log("iddddd---",id);

        for (let element of this.missedAttack) {
            if(element == x){
                console.error("Coords already been hit");
                return;
            }

        }

        if (this.boards[x] === null) {
            console.log(coords)
            Attack(coords,"missed");
            this.missedAttack.push(x);

        }else {
            this.count += 1;
            if (this.count == 9) {
                if(id == "p"){
                    alert("Computer won")
                    play = false;
                    Ui()
                  Ui()
                }else{
                    alert("YOU WON Congratulations!!!");
                    play = false;

                    Ui()
                        

                }
            }
            console.log("Hit:", this.boards[x]);
            Attack(coords,"hit");

            this.missedAttack.push(x);
            this.boards[x].hit(x)
        }
    }

    checkForTurn(e){
        let newCoords = e.replace("c", "");
        let x = parseInt(newCoords);
        console.log("This is E: ",e, this.missedAttack.includes(x));
        
        if(this.missedAttack.includes(x)){
            return false;
        }
        return true;
    
    }
    
    renderDom(pid) {
        for (let x = 0; x < 100; x++) {
            let gaemboardSelect = document.getElementById(pid + x);
   
            if(pid != "c"){
                if (this.boards[x] !== null) {
                    gaemboardSelect.style.backgroundColor = "#2bff00";
                } else {
                    gaemboardSelect.style.backgroundColor = "#101820";
                }
            }
        }
        return this.boards;
    }
}

class Player {
    constructor(name) {
        this.name = name;
        this.gameBoard = new GameBoard();

    }
    gameBoard() {
        let gameBoard = this.gameBoard;
        return gameBoard;

    }
    clearData() {
        this.gameBoard = new GameBoard();
    }
}

function randomCoords(player, pid) {
    player.clearData();
    function myShip(size) {

        while (true) {

            let coords = Math.random() < 0.5 ? "horizontal" : "vertical";
            let newCoords = [];
            let start = [];

            if (coords == "horizontal") {
                let col = Math.floor(Math.random() * 10);
                let row = Math.floor(Math.random() * (10 - size));

                start = col * 10 + row;
                for (let i = 0; i < size; i++) {
                    newCoords.push(start + i);
                }



            } else if (coords == "vertical") {
                let col = Math.floor(Math.random() * (10 - size));
                let row = Math.floor(Math.random() * 10);

                start = col * 10 + row;
                for (let i = 0; i < size; i++) {
                    newCoords.push(start + i * 10);
                }
            }
            if (player.gameBoard.newShip(size, newCoords,pid)) break;

        }
    }
    myShip(2 );
    myShip(3 );
    myShip(4);
    player.gameBoard.renderDom(pid);

}
let playerOne = new Player("prajwal");
let computer = new Player("Computer");

let coordsButton = document.querySelector("#coordsButton");
let start = document.querySelector("#start");


coordsButton.addEventListener("click", (e) => {
    randomCoords(playerOne, 'p')
    
})

let play = false;
let turn = false;
let turnId = document.querySelector(".turnId");
start.addEventListener("click", (e) => {
    play = true;
    randomCoords(computer, 'c')
    computer.gameBoard.renderDom('c');

})
document.addEventListener("click", (e) => {
    e.preventDefault();
    if(play == true){

        
        if (e.target.classList.contains("compAll")) {
            computer.gameBoard.checkForTurn(e.target.id)
            if( computer.gameBoard.checkForTurn(e.target.id) == true){
                playerOne.gameBoard.receiveAttack("p", autoAttack());
                
                computer.gameBoard.receiveAttack("c", e.target.id);
            }
        }
    }
    })
    


window.playerOne = playerOne;
window.computer = computer;
window.autoAttack = autoAttack;