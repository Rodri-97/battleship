import * as DOM from "./dom.js";

const newGameBtn = document.getElementById("new-game-btn");
newGameBtn.addEventListener("click", () => {
    DOM.makeBoards();
});