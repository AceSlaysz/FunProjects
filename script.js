// Array of YouTube video IDs (YouTube video IDs only)
const winVideo = "ca5-9EBrAZtT_1aH"; // McDonald's win video
const loseVideos = ["12qalpdhdD63SgBT", "V-bYZtIfkk3QPtwS"]; // Rick roll & Josh lose videos

let player;
let isVideoPlaying = false;
let clickCount = 0; // Tracks button clicks
let currentLevel = 1; // Level progression
let gameTimer; // Lightning round timer

// Sound effects
const moveSound = new Audio("move.mp3"); // Button movement sound
const clickSound = new Audio("click.mp3"); // Click sound

// Funny messages when the button moves
const taunts = [
    "Too slow!", "Try again!", "You thought?!", "Almost had it!",
    "Not today!", "You're Slow!", "Your mom is faster than this!"
];

// Function to start the game
function startGame() {
    clickCount = 0;
    currentLevel = 1;
    isVideoPlaying = false;
    document.getElementById("moveButton").style.display = "block";
    document.getElementById("videoContainer").style.display = "none";
    document.getElementById("endScreen").style.display = "none";
    moveButton(); // Start Level 1
}

// Function to handle button interaction
function moveButton() {
    if (isVideoPlaying) return; // Stop interaction if video is playing

    clickSound.play(); // Play click sound

    const randomChoice = Math.random();
    
    if (randomChoice < 0.3) { 
        // 30% chance: Play a random lose video
        playLoseVideo();
    } else {
        // 70% chance: Move the button
        moveSound.play(); // Play movement sound
        clickCount++;

        const button = document.getElementById("moveButton");
        const maxX = window.innerWidth - button.offsetWidth;
        const maxY = window.innerHeight - button.offsetHeight;

        const randomX = Math.random() * maxX;
        const randomY = Math.random() * maxY;

        button.style.position = "absolute";
        button.style.left = `${randomX}px`;
        button.style.top = `${randomY}px`;

        // Show a funny message
        const randomTaunt = taunts[Math.floor(Math.random() * taunts.length)];
        button.innerText = randomTaunt;

        // Make it harder each time by limiting the max size
        button.style.fontSize = `${Math.min(40, 20 + clickCount * 2)}px`; // Max font size 40px
        button.style.padding = `${Math.min(30, 10 + clickCount)}px`; // Max padding 30px

        if (clickCount >= 5) {
            nextLevel();
        }
    }
}

// Function to progress through levels
function nextLevel() {
    clearTimeout(gameTimer);  // Clear the previous timer
    if (currentLevel < 3) {
        currentLevel++;
    } else {
        // Lightning round: Must click within 5 seconds
        gameTimer = setTimeout(playLoseVideo, 5000);
    }
}

// Function to play a win video
function playWinVideo() {
    playVideo(winVideo);
}

// Function to play a random lose video
function playLoseVideo() {
    const randomLoseVideo = loseVideos[Math.floor(Math.random() * loseVideos.length)];
    playVideo(randomLoseVideo);
}

// Function to show YouTube video
function playVideo(videoId) {
    isVideoPlaying = true;
    document.getElementById("moveButton").style.display = "none";
    document.getElementById("videoContainer").style.display = "block";

    document.body.style.backgroundColor = "black"; // Flash effect
    setTimeout(() => { document.body.style.backgroundColor = ""; }, 500);

    if (player) {
        player.destroy();
        player = null; // Reset the player to prevent memory issues
    }

    player = new YT.Player("player", {
        height: "390",
        width: "640",
        videoId: videoId,
        events: {
            "onStateChange": onPlayerStateChange
        }
    });
}

// Function to handle when the video finishes
function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.ENDED) {
        if (event.target.getVideoData().video_id === winVideo) {
            alert("YOU WIN! 🎉");
            startGame(); // Restart the game
        } else {
            showEndScreen(); // Show "Game Over" screen
        }
        // Ensure the button reappears after the video ends
        document.getElementById("moveButton").style.display = "block";
    }
}


// Function to show end title screen when you lose
function showEndScreen() {
    document.getElementById("videoContainer").style.display = "none";
    document.getElementById("endScreen").style.display = "block";
}

// YouTube API function
function onYouTubeIframeAPIReady() {
    console.log("YouTube Iframe API is ready!");
}

// Start the game
startGame();
