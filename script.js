var winVideo = "BBJa32lCaaY"; // YouTube video ID for the win video
var loseVideos = ["Z3J_MCbwaJ0", "KZzc-tNJ5p8"]; // Lose video IDs (You can add more here)
var player;
var isVideoPlaying = false;
var clickCount = 0;
var currentLevel = 1;
var gameTimer; // Timer for lightning round

// Function to start the game
function startGame() {
    clickCount = 0;
    currentLevel = 1;
    isVideoPlaying = false;
    document.getElementById("moveButton").style.display = "block";
    document.getElementById("videoContainer").style.display = "none";
    document.getElementById("endScreen").style.display = "none";
    moveButton(); // Start Level 1
    document.getElementById("levelText").innerText = "Level " + currentLevel;
}

// Function to handle button interaction
function moveButton() {
    if (isVideoPlaying) return; // Stop interaction if video is playing

    var randomChoice = Math.random();
    
    if (randomChoice < 0.3) { 
        // 30% chance: Play a random lose video
        playLoseVideo();
    } else {
        // 70% chance: Move the button
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

        if (clickCount >= 5) {
            nextLevel();
        }
    }
}

// Function to progress through levels
function nextLevel() {
    if (currentLevel < 3) {
        currentLevel++;
    } else {
        // Lightning round: Must click within 5 seconds
        clearTimeout(gameTimer);
        gameTimer = setTimeout(playLoseVideo, 5000);
    }
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
            alert("YOU WIN! 🎉");
            startGame(); // Restart the game
        } else {
            showEndScreen(); // Show "Game Over" screen
        }
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
