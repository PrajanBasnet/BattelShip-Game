let count = 0; 
class Ship{
    constructor(coords,myLength){
        this.coords = coords;
        this.myLength = myLength;
        this.hits = [];
    }

    hit(position){
        if(this.hits.includes(position)){
            console.log("Try again");
            return;
        }
        this.hits.push(position);
        this.isSunk();
    }
    
    isSunk(){
        if(this.myLength.length === this.hits.length){
            console.log("The ship has been sunk!!");
            count += 1;
        }
        console.log("Sunk:", count);
        if(count == 3 ){
            alert("Congratulations you won");
        }
    }
}

class GameBoard{
    constructor(){
        this.boards = new Array(100).fill(null);
    }
    newShip(myLength, coords) {
        let myShip = new Ship(myLength, coords);
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
    
    receiveAttack(id,coords){
        let newCoords = coords.replace(id,"");
        let x = parseInt(newCoords);

        console.log(typeof(x),x)
        if(this.boards[x] === null){
            console.log("Missed:",this.boards);
        }else{
            console.log("Hit:",this.boards[x]);
            
            this.boards[x].hit(x)
        }
    }
    renderDom(pid){
        for (let x = 0; x < 100; x++) {
            let gaemboardSelect = document.getElementById(pid + x);
            if(this.boards[x] !== null){
                gaemboardSelect.style.backgroundColor = "green";
            }else{
                gaemboardSelect.style.backgroundColor = "gray";
            }
        }
        return this.boards;
    }
}

class Player{
    constructor(name){
        this.name = name;
        this.gameBoard = new GameBoard();

    }
    gameBoard(){
        let gameBoard = this.gameBoard;
        return gameBoard;

    }
    clearData(){
        this.gameBoard = new GameBoard();
    }
}

function randomCoords(player,pid){
    player.clearData();
    function myShip(size){ 
     
while(true){

    let coords = Math.random() < 0.5 ? "horizontal":"vertical";
    let newCoords  = [];
    let start = [];
    
    if(coords == "horizontal"){
        let col = Math.floor(Math.random() * 10);
        let row = Math.floor(Math.random() *  (10 - size));
        
        start = col * 10 + row;
            for (let i = 0; i < size; i++) {
                newCoords.push(start + i );
            }
            
            
            
        } else if(coords == "vertical"){
            let col = Math.floor(Math.random() * (10-size));
            let row = Math.floor(Math.random() *  10);
            
            start = col * 10 + row;
            for (let i = 0; i < size; i++) {
                newCoords.push(start +  i * 10 );
            }
            console.log(newCoords)
        }
        if(player.gameBoard.newShip(size,newCoords)) break;

    }
}
        myShip(2);
        myShip(3);
        myShip(4);
        player.gameBoard.renderDom(pid);

}
let playerOne = new Player("prajwal");
let computer  = new Player("Computer");

let coordsButton = document.querySelector("#coordsButton");
let start = document.querySelector("#start");


coordsButton.addEventListener("click",(e)=>{
    randomCoords(playerOne,'p')
    // playerOne.gameBoard.renderDom(0,100);

})

start.addEventListener("click",(e)=>{
    randomCoords(computer,'c')
    computer.gameBoard.renderDom('c');
    
})

let loadingScreen = document.querySelector("#loadingScreen")
let compX = document.querySelector(".comp");

document.addEventListener("click",(e)=>{
    e.preventDefault();
    if(e.target.classList.contains("compAll")){
        computer.gameBoard.receiveAttack("c",e.target.id);
    }
    if(e.target.classList.contains("all")){
        playerOne.gameBoard.receiveAttack("p",e.target.id);
    }
})



window.playerOne = playerOne;
window.computer = computer;
