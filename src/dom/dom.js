let container = document.querySelector(".container");
let start = document.querySelector("#start");
let reset = document.querySelector("#reset");
let computer = document.querySelector(".comp");
let loadingScreen = document.querySelector("#loadingScreen")
// visibility 

let won =document.querySelector("#won");
let game = document.querySelector("#game");
let gameStart = document.querySelector("#GameStart");


let coordsButton = document.querySelector("#coordsButton");
function divDom(element,className,pid) {
    for (let i = 0; i < 100; i++) {
        let newDiv = document.createElement("div");
        newDiv.setAttribute("class", className);
        newDiv.id = pid + i;
        element.appendChild(newDiv);
    }
}
export function Attack(id,condition){
    let Attackcoords = document.getElementById(id);
    if(condition == "missed"){

        Attackcoords.style.backgroundColor = "#79c7c5";
    }else if(condition == "hit"){
        Attackcoords.style.backgroundColor = "#ff0000";

    }

}

let computerContainer = document.querySelector(".computerContainer");

start.addEventListener("click",(e)=>{
    e.preventDefault();
    coordsButton.style.display = "none";
    reset.style.display=  "block";
    computerContainer.style.display = "block";
    start.style.visibility = "hidden";

})

reset.addEventListener("click",(e)=>{
    window.location.reload();
})
export function Ui(){
    won.innerHTML = "You Won";

}

divDom(container,"all" ,'p');
divDom(computer,"compAll" ,'c');

gameStart.addEventListener("click",(e)=>{
    console.log("working")
    loadingScreen.style.display = "none";
    game.style.display = "block";
    game.style.visibility = "visible";
})


// export default divDom;