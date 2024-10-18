
let buttons = document.querySelectorAll(".box");
let message = document.querySelector("#msg");
let newGameBtn = document.querySelector("#new-game");
let resetGameBtn = document.querySelector("#reset-game");
let msgContainer = document.querySelector(".msg-container");

let turnO = true; // playerX, playerO
let btnClicks = 0; // To Track Draw

const resetGame = () => {
    turnO = true;
    btnClicks = 0;
    enableButtons();
    msgContainer.classList.add("hide");
}

let winningPattern = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];


buttons.forEach((btn, idx) => {
    // btn.innerText = idx;
    btn.addEventListener("click", () => {
        if(turnO){
            btn.innerText = "O";
            btn.style.color = "brown";
            turnO = false;
        }else {
            btn.innerText = "X";
            btn.style.color = "blue";
            turnO = true;
        }
        btnClicks++
        console.log(btnClicks);
        btn.disabled = true;

        let isWinner = checkWinner();

        if(btnClicks === 9 && !isWinner){
            drawGameMessage();
        }
    })
})

const disableButtons = () => {
    for(btn of buttons){
        btn.disabled = true;
    }
}

const enableButtons = () => {
    for(btn of buttons){
        btn.disabled = false;
        btn.innerText = "";
        btn.classList.remove("winningClass");
    }
}

const winningMessage = (winner) => {
    message.innerText = `Congratulations ${winner}, You Won the game 🎊`
    msgContainer.classList.remove("hide");
    disableButtons();
}

const drawGameMessage = () => {
    message.innerText = `DRAW 🤔`;
    msgContainer.classList.remove("hide");
    disableButtons();
}

const checkWinner = () => {
    for (let pattern of winningPattern){
        // console.log(pattern[0],pattern[1],pattern[2]); //  here we extracted individual element from winning patterns
        // console.log(buttons[pattern[0]].innerText,buttons[pattern[1]].innerText,buttons[pattern[2]].innerText); 
        let posVal1 = buttons[pattern[0]].innerText;
        let posVal2 = buttons[pattern[1]].innerText;
        let posVal3 = buttons[pattern[2]].innerText;
        if(posVal1 !== "" && posVal2 !== "" && posVal3 !== ""){
            if (posVal1 === posVal2 && posVal2 === posVal3) {
                winningMessage(posVal1);
                // buttons[pattern[0]].style.border = "4px solid black";
                // buttons[pattern[1]].style.border = "4px solid black";
                // buttons[pattern[2]].style.border = "4px solid black";
                buttons[pattern[0]].classList.add("winningClass");
                buttons[pattern[1]].classList.add("winningClass");
                buttons[pattern[2]].classList.add("winningClass");
            }
        }
    }
}


newGameBtn.addEventListener("click", () => {
    console.log("New Game Button was clicked.")
    resetGame();
});
resetGameBtn.addEventListener("click", () => {
    console.log("Reset Game Button was clicked.")
    resetGame();
});

