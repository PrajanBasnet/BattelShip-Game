let container = document.querySelector(".container");

function divDom() {
    for (let i = 0; i < 100; i++) {
        let newDiv = document.createElement("div");
        newDiv.setAttribute("class", "all");
        newDiv.id = i;
        container.appendChild(newDiv);
    }
}
divDom();

export default divDom;