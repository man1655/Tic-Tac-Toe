let box = document.querySelectorAll(".box");
let rstbtn = document.querySelector("#rst");
let messageContainer = document.querySelector(".messagecon");
let messageParagraph = document.querySelector("#winnerMsg");
let drawMsgContainer = document.querySelector(".drawMsg");
let count = 0;
let turnO = true;

const WinPattern = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

const resetGame = () => {
    turnO = true;
    count = 0;
    enableBoxes();
    messageContainer.classList.add("hide");
    drawMsgContainer.classList.add("hide");
    messageParagraph.innerText = "";
    document.body.style.backgroundColor = ""; 
};

const checkDraw = () => {
    if (count === 9) {
        drawMsgContainer.classList.remove("hide");
        document.body.style.backgroundColor = "#FFD600"; 

        disableBoxes();
    }
};

const checkWinner = () => {
    for (let pattern of WinPattern) {
        let val1 = box[pattern[0]].innerText;
        let val2 = box[pattern[1]].innerText;
        let val3 = box[pattern[2]].innerText;

        if (val1 && val1 === val2 && val2 === val3) {
            showWinner(val1);
            return true; // Return true if there's a winner
        }
    }
    return false; // Return false if no winner
};

const showWinner = (winner) => {
    messageParagraph.innerText = `Congratulations! Winner is ${winner}`;
    messageContainer.classList.remove("hide");
    document.body.style.backgroundColor = "#4CAF50";
    disableBoxes();
};

const enableBoxes = () => {
    box.forEach((boxElement) => {
        boxElement.disabled = false;
        boxElement.innerText = "";
    });
};

const disableBoxes = () => {
    box.forEach((boxElement) => {
        boxElement.disabled = true;
    });
};

box.forEach((boxElement) => {
    boxElement.addEventListener("click", () => {
        if (boxElement.innerText === "") {
            boxElement.innerText = turnO ? "O" : "X";
            boxElement.disabled = true;
            count++;

            // Check for a winner first
            if (!checkWinner()) {
                // If no winner, check for a draw
                checkDraw();
            }

            turnO = !turnO; // Toggle turn
        }
    });
});

// Event listeners for buttons
document.querySelector("#newGameBtn").addEventListener("click", resetGame);
document.querySelector("#newDrawBtn").addEventListener("click", resetGame);
rstbtn.addEventListener("click", resetGame);
