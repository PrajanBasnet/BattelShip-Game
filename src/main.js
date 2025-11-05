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

    renderDom() {
        for (let i = 0; i < this.boards.length; i++) {
            const value = this.boards[i];

            // console.log(this.boards)
            if (value == null) {
                document.getElementById(i).style.backgroundColor = "black";
            } else if (value == "x") {
                // console.log(this.boards[41].hit, this.boards[41].coords)
                document.getElementById(i).style.backgroundColor = "green";
            } else if (this.boards[i].hits.includes(i)) {
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


window.Ship = Ship;
window.gameBoard = gameBoard;
window.Players = Players;
window.playerOne = playerOne;