// Variables to manage game state
let score = 0;
let timeLeft = 30;
let timerInterval;
let currentSong;
const audio = document.getElementById('audio');
const feedback = document.getElementById('feedback');
const scoreDisplay = document.getElementById('score');
const startBtn = document.getElementById('start-btn');
const gameInterface = document.getElementById('game-interface');
const guessInput = document.getElementById('guess-input');
const submitBtn = document.getElementById('submit-btn');

const songs = [
    { title: "Song Title 1", file: "audio/song1.mp3" },
    { title: "Song Title 2", file: "audio/song2.mp3" },
    // Add more songs as needed
];

// Function to start the timer
function startTimer() {
    timerInterval = setInterval(() => {
        timeLeft--;
        document.getElementById('timer').innerText = `Time Left: ${timeLeft}s`;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            endGame();
        }
    }, 1000);
}

// Function to play a random song
function playRandomSong() {
    const randomIndex = Math.floor(Math.random() * songs.length);
    currentSong = songs[randomIndex];
    audio.src = currentSong.file;
    audio.play();
}

// Function to check the player's guess
function checkGuess() {
    const guess = guessInput.value.trim().toLowerCase();

    if (guess === currentSong.title.toLowerCase()) {
        feedback.innerText = "Correct!";
        score += 10; 
        scoreDisplay.innerText = `Score: ${score}`;
        resetGame();
    } else {
        feedback.innerText = "Try again!";
    }
}

// Function to reset the game for the next round
function resetGame() {
    clearInterval(timerInterval);
    timeLeft = 30; 
    guessInput.value = ''; 
    feedback.innerText = ''; 
    playRandomSong(); 
    startTimer(); 
}

// Function to handle the end of the game
function endGame() {
    feedback.innerText = "Game Over!";
    audio.pause();
    guessInput.disabled = true;
    submitBtn.disabled = true;
}

// Function to start the game
function startGame() {
    startBtn.classList.add('hidden');
    gameInterface.classList.remove('hidden');
    guessInput.disabled = false;
    submitBtn.disabled = false;
    playRandomSong();
    startTimer();
}

// Event listener for the "Start Game" button
startBtn.addEventListener('click', startGame);

// Event listener for the "Submit Guess" button
submitBtn.addEventListener('click', checkGuess);
