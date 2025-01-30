var winVideo = "-8zDTsCirKU"; // Win video (will play when player wins)
var loseVideos = ["BBJa32lCaaY", "KZzc-tNJ5p8", "Z3J_MCbwaJ0"]; // Lose videos (for when player loses)
var player;
var isVideoPlaying = false;
var clickCount = 0;
var currentLevel = 1;
var gameTimer;
var timeLimit = 10000; // 10 seconds per level (can adjust)
var requiredClicks = 9; // 9 to 10 clicks required to advance to the next round
var isLevelComplete = false; // Flag to check if the level is complete

var clickSound = new Audio("click.mp3"); // Click sound
var moveSound = new Audio("move.mp3"); // Movement sound
var winSound = new Audio("win-sound.mp3"); // Win sound
var loseSound = new Audio("lose-sound.mp3"); // Lose sound

// Function to start the game
function startGame() {
    clickCount = 0;
    currentLevel = 1;
    isLevelComplete = false;
    isVideoPlaying = false;
    document.getElementById("moveButton").style.display = "block";
    document.getElementById("videoContainer").style.display = "none";
    document.getElementById("endScreen").style.display = "none";
    document.getElementById("winScreen").style.display = "none";
    document.getElementById("gameTitle").style.display = "block";
    document.getElementById("levelText").style.display = "block";
    document.getElementById("levelText").innerText = "Level " + currentLevel;
    moveButton(); // Start Level 1
}

// Function to handle button interaction when clicked
function handleButtonClick() {
    if (isVideoPlaying || isLevelComplete) return; // Stop interaction if video is playing or level is complete

    clickSound.play(); // Play click sound
    clickCount++;

    var button = document.getElementById("moveButton");

    var maxX = window.innerWidth - button.offsetWidth;
    var maxY = window.innerHeight - button.offsetHeight;

    var randomX = Math.random() * maxX;
    var randomY = Math.random() * maxY;

    button.style.position = "absolute";
    button.style.left = `${randomX}px`;
    button.style.top = `${randomY}px`;

    var taunts = ["Too slow!", "Try again!", "You thought?!", "Almost had it!"];
    var randomTaunt = taunts[Math.floor(Math.random() * taunts.length)];
    button.innerText = randomTaunt;

    button.style.fontSize = `${20 + clickCount * 2}px`;
    button.style.padding = `${10 + clickCount}px`;

    // Update level text
    document.getElementById("levelText").innerText = "Level " + currentLevel;

    // Set time limit for the next button click
    clearTimeout(gameTimer);
    gameTimer = setTimeout(function() {
        if (!isLevelComplete) {
            playLoseVideo(); // If time is up or player didn't click enough times, play lose video
        }
    }, timeLimit);

    if (clickCount >= requiredClicks) {
        isLevelComplete = true; // Mark the level as complete
        nextLevel(); // Advance to the next level (only if clicked enough)
    }
}

// Function to progress through levels
function nextLevel() {
    if (currentLevel < 3) {
        currentLevel++;
        requiredClicks = 10; // Increase the number of required clicks for the next level
        isLevelComplete = false; // Reset level completion flag
        startNextLevel();
    } else {
        // Lightning round (level 3)
        clearTimeout(gameTimer);
        gameTimer = setTimeout(playLoseVideo, 5000); // 5 seconds for lightning round
    }
}

// Function to start the next level
function startNextLevel() {
    // Delay the next level start with some effect
    setTimeout(function() {
        moveButton(); // Start the button move for the next level
    }, 500); // You can adjust the delay
}

// Function to play a win video
function playWinVideo() {
    playVideo(winVideo);
}

// Function to play a random lose video
function playLoseVideo() {
    var randomLoseVideo = loseVideos[Math.floor(Math.random() * loseVideos.length)];
    playVideo(randomLoseVideo);
}

// Function to show YouTube video
function playVideo(videoId) {
    isVideoPlaying = true;
    document.getElementById("moveButton").style.display = "none";
    document.getElementById("videoContainer").style.display = "block";

    if (player) {
        player.destroy();
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
            winSound.play(); // Play win sound
            showWinScreen(); // Show "You Won!" screen
        } else {
            loseSound.play(); // Play lose sound
            showEndScreen(); // Show "Game Over" screen
        }
    }
}

// Function to show end title screen when you lose
function showEndScreen() {
    document.getElementById("videoContainer").style.display = "none";
    document.getElementById("endScreen").style.display = "block";
}

// Function to show "You Won!" screen
function showWinScreen() {
    document.getElementById("videoContainer").style.display = "none";
    document.getElementById("winScreen").style.display = "block";
}

// YouTube API function
function onYouTubeIframeAPIReady() {
    console.log("YouTube Iframe API is ready!");
}

// Start the game
startGame();
