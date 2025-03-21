let gameSeq = [];
let userSeq = [];

let btns = ["red", "yellow", "green", "purple"];
let sounds = {
    red: new Audio("sounds/red.mp3"),
    yellow: new Audio("sounds/yellow.mp3"),
    green: new Audio("sounds/green.mp3"),
    purple: new Audio("sounds/purple.mp3"),
    gameOver: new Audio("sounds/wrong.mp3"),
};

let started = false;
let level = 0;
let highScore = 0;

let h2 = document.querySelector("h2");
let highScoreDisplay = document.getElementById("high-score");


document.addEventListener("keypress", function () {
    if (!started) {
        started = true;
        levelUp();
    }
});


function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(() => btn.classList.remove("flash"), 300);
}


function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(() => btn.classList.remove("userflash"), 150);
}


function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random() * btns.length);
    let randColor = btns[randIdx];
    let randBtn = document.getElementById(randColor);

    gameSeq.push(randColor);

   
    setTimeout(() => {
        gameFlash(randBtn);
        sounds[randColor].play();
    }, 500);
}


function btnPress() {
    let btn = this;
    userFlash(btn);

    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);
    sounds[userColor].play(); 

   
    checkAnswer(userSeq.length - 1);
}


function checkAnswer(index) {
    if (userSeq[index] !== gameSeq[index]) {
        h2.innerText = "Game Over! Press Any Key to Restart.";
        document.body.classList.add("game-over");

       
        sounds.gameOver.play();

        
        if (level > highScore) {
            highScore = level - 1;
            highScoreDisplay.innerText = highScore;
        }

        setTimeout(() => {
            document.body.classList.remove("game-over");
        }, 500);

        resetGame();
        return;
    }


    if (userSeq.length === gameSeq.length) {
        setTimeout(levelUp, 1000);
    }
}


function resetGame() {
    gameSeq = [];
    userSeq = [];
    started = false;
    level = 0;
}


let allBtns = document.querySelectorAll(".btn");
allBtns.forEach(btn => btn.addEventListener("click", btnPress));
