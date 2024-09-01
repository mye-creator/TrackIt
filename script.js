// Variables to manage game state
let score = 0;
let timeLeft = 30; // Initial time for each round
let timerInterval;
let currentSong;
const audio = document.getElementById('audio');
const feedback = document.getElementById('feedback');
const scoreDisplay = document.getElementById('score');
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

        // Check if time has run out
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            endGame();
        }
    }, 1000); // Timer updates every second
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
    const guess = document.getElementById('guess-input').value.trim().toLowerCase();

    if (guess === currentSong.title.toLowerCase()) {
        feedback.innerText = "Correct!";
        score += 10; // Increase score for a correct guess
        scoreDisplay.innerText = `Score: ${score}`;
        resetGame();
    } else {
        feedback.innerText = "Try again!";
    }
}

// Function to reset the game for the next round
function resetGame() {
    clearInterval(timerInterval);
    timeLeft = 30; // Reset the timer
    document.getElementById('guess-input').value = ''; // Clear the input field
    feedback.innerText = ''; // Clear feedback
    playRandomSong(); // Play a new song
    startTimer(); // Start the timer again
}

// Function to handle the end of the game
function endGame() {
    feedback.innerText = "Game Over!";
    audio.pause(); // Stop the audio
    // Optionally, disable input or show a "restart game" button
}

// Event listener for the "Submit Guess" button
document.getElementById('submit-btn').addEventListener('click', checkGuess);

// Start the game when the page loads
window.onload = function () {
    playRandomSong();
    startTimer();
};
