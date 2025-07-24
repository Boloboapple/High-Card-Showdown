// DOM Elements - These are now assumed to be globally accessible by onclick
const startScreen = document.getElementById('start-screen');
const gameScreen = document.getElementById('game-screen');
const playOfflineBtn = document.getElementById('play-offline');
const playOnlineBtn = document.getElementById('play-online');
const playerScoreSpan = document.getElementById('player-score');
const robotScoreSpan = document.getElementById('robot-score');
const cardsLeftSpan = document.getElementById('cards-left');
const playerCardDiv = document.getElementById('player-card');
const robotCardDiv = document.getElementById('robot-card');
const drawButton = document.getElementById('draw-button');
const resetButton = document.getElementById('reset-button');
const roundMessage = document.getElementById('round-message');

// Game Variables
let deck = [];
let playerScore = 0;
let robotScore = 0;
const TOTAL_CARDS = 24;

// --- Game Initialization ---
function createDeck() {
    deck = [];
    for (let i = -11; i <= 11; i++) {
        deck.push(i);
    }
    deck.push(100);

    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    console.log("Deck created with", deck.length, "cards.");
}

function startGame() {
    console.log("startGame() called.");
    createDeck();
    playerScore = 0;
    robotScore = 0;
    updateUI();
    showGameScreen();

    // Force display of draw button and hide reset button
    if (drawButton) {
        drawButton.style.setProperty('display', 'block', 'important');
        console.log("Draw button display set to 'block'. Current display:", drawButton.style.display);
    } else {
        console.error("Error: drawButton element not found!");
    }

    if (resetButton) {
        resetButton.style.setProperty('display', 'none', 'important');
        console.log("Reset button display set to 'none'. Current display:", resetButton.style.display);
    } else {
        console.error("Error: resetButton element not found!");
    }

    roundMessage.textContent = '';
    playerCardDiv.textContent = '?';
    robotCardDiv.textContent = '?';
    playerCardDiv.className = 'card empty';
    robotCardDiv.className = 'card empty';
}

function showStartScreen() {
    console.log("showStartScreen() called.");
    if (startScreen) {
        startScreen.classList.add('active');
        console.log("startScreen active class added.");
    } else {
        console.error("Error: startScreen element not found!");
    }
    if (gameScreen) {
        gameScreen.classList.remove('active');
        gameScreen.style.setProperty('display', 'none', 'important'); // Ensure it's forcefully hidden
        console.log("gameScreen active class removed & display set to none.");
    } else {
        console.error("Error: gameScreen element not found!");
    }
}

function showGameScreen() {
    console.log("showGameScreen() called.");
    if (startScreen) {
        startScreen.classList.remove('active');
        startScreen.style.setProperty('display', 'none', 'important'); // Ensure it's forcefully hidden
        console.log("startScreen active class removed & display set to none.");
    } else {
        console.error("Error: startScreen element not found!");
    }
    if (gameScreen) {
        gameScreen.classList.add('active');
        gameScreen.style.setProperty('display', 'flex', 'important'); // Forcefully display game screen
        console.log("gameScreen active class added & display set to flex.");
    } else {
        console.error("Error: gameScreen element not found!");
    }
}

// --- Game Logic ---
function drawCards() {
    console.log("drawCards() called.");
    if (deck.length <= 1) {
        console.log("Deck almost empty. Ending game.");
        endGame();
        return;
    }

    const playerCard = deck.pop();
    const robotCard = deck.pop();
    console.log("Player drew:", playerCard, "Robot drew:", robotCard);

    displayCard(playerCardDiv, playerCard);
    displayCard(robotCardDiv, robotCard);

    let message = '';
    let winner = null;

    if (playerCard > robotCard) {
        playerScore++;
        message = "You win this round!";
        winner = 'player';
    } else if (robotCard > playerCard) {
        robotScore++;
        message = "Robot wins this round!";
        winner = 'robot';
    } else {
        message = "It's a tie! No points awarded this round.";
    }

    roundMessage.textContent = message;
    roundMessage.classList.remove('winner', 'loser', 'tie');
    if (winner === 'player') {
        roundMessage.classList.add('winner');
    } else if (winner === 'robot') {
        roundMessage.classList.add('loser');
    } else {
        roundMessage.classList.add('tie');
    }

    updateUI();
}

function displayCard(cardElement, value) {
    if (!cardElement) {
        console.error("Error: cardElement is null for value", value);
        return;
    }
    cardElement.textContent = value;
    cardElement.classList.remove('empty', 'negative', 'positive', 'zero', 'mega');

    if (value === 100) {
        cardElement.classList.add('mega');
    } else if (value < 0) {
        cardElement.classList.add('negative');
    } else if (value > 0) {
        cardElement.classList.add('positive');
    } else if (value === 0) {
        cardElement.classList.add('zero');
    }
}

function updateUI() {
    if (playerScoreSpan) playerScoreSpan.textContent = playerScore; else console.error("playerScoreSpan not found!");
    if (robotScoreSpan) robotScoreSpan.textContent = robotScore; else console.error("robotScoreSpan not found!");
    if (cardsLeftSpan) cardsLeftSpan.textContent = deck.length; else console.error("cardsLeftSpan not found!");
}

function endGame() {
    console.log("endGame() called.");
    if (drawButton) drawButton.style.setProperty('display', 'none', 'important');
    if (resetButton) resetButton.style.setProperty('display', 'block', 'important');

    let finalMessage = "Game Over! ";
    if (playerScore > robotScore) {
        finalMessage += "You are the CHAMPION!";
        roundMessage.classList.add('winner');
    } else if (robotScore > playerScore) {
        finalMessage += "The Robot is the CHAMPION!";
        roundMessage.classList.add('loser');
    } else {
        finalMessage += "It's a DRAW!";
        roundMessage.classList.add('tie');
    }
    roundMessage.textContent = finalMessage;
}

// Initial setup to show start screen when the script loads
console.log("Script loaded. Calling showStartScreen().");
showStartScreen();
