var winVideo = "-8zDTsCirKU"; // Win video
var loseVideos = ["BBJa32lCaaY", "KZzc-tNJ5p8", "Z3J_MCbwaJ0"]; // Lose videos
var player;
var isVideoPlaying = false;
var clickCount = 0;
var currentLevel = 1;
var gameTimer; // Timer for lightning round
var timeLimit = 10000; // Default time limit (10 seconds for level 1)

// Sound effects
var moveSound = new Audio("move.mp3");
var clickSound = new Audio("click.mp3");
var winSound = new Audio("win-sound.mp3");
var loseSound = new Audio("lose-sound.mp3");

// Function to start the game
function startGame() {
    clickCount = 0;
    currentLevel = 1;
    isVideoPlaying = false;
    document.getElementById("moveButton").style.display = "block"; // Show button again
    document.getElementById("videoContainer").style.display = "none"; // Hide video container
    document.getElementById("endScreen").style.display = "none"; // Hide game over screen
    document.getElementById("winScreen").style.display = "none"; // Hide win screen
    document.getElementById("gameTitle").style.display = "block"; // Show game title
    document.getElementById("levelText").style.display = "block"; // Show level text
    moveButton(); // Start Level 1
    document.getElementById("levelText").innerText = "Level " + currentLevel;
}

// Function to handle button interaction
function moveButton() {
    if (isVideoPlaying) return; // Stop interaction if video is playing

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

    if (clickCount >= 9) {
        nextLevel();
    }

    // Set time limit for the next button click depending on the level
    clearTimeout(gameTimer);
    gameTimer = setTimeout(function() {
        // If the player runs out of time on level 3, only play the lose video
        if (currentLevel === 3) {
            playLoseVideo();
        }
    }, timeLimit);
}

// Function to progress through levels
function nextLevel() {
    if (currentLevel < 3) {
        currentLevel++;
        clickCount = 0; // Reset click count for the next level
        updateLevelSpeed();
        document.getElementById("levelText").innerText = "Level " + currentLevel;
    } else {
        // Level 3 - Lightning round: No win video, only play lose video if time is up
        clearTimeout(gameTimer); // Stop the timer once you move to Level 3
        playLoseVideo(); // Play lose video instead of win video in Level 3
    }
}

// Update time limit based on the level
function updateLevelSpeed() {
    if (currentLevel === 2) {
        timeLimit = 7000; // 7 seconds for level 2
    } else if (currentLevel === 3) {
        timeLimit = 5000; // 5 seconds for level 3 (lightning round)
    }
}

// Function to play a win video (won't be called in level 3)
function playWinVideo() {
    if (currentLevel !== 3) {
        playVideo(winVideo);
    }
}

// Function to play a random lose video
function playLoseVideo() {
    var randomLoseVideo = loseVideos[Math.floor(Math.random() * loseVideos.length)];
    playVideo(randomLoseVideo);
}

// Function to show YouTube video
function playVideo(videoId) {
    isVideoPlaying = true;
    document.getElementById("moveButton").style.display = "none"; // Hide the button
    document.getElementById("videoContainer").style.display = "block"; // Show video container

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
        // After losing or winning, no need to go further in Level 3
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
