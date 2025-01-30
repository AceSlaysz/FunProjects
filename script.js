var winVideo = "ca5-9EBrAZtT_1aH"; // McDonald's win video
var loseVideos = ["12qalpdhdD63SgBT", "V-bYZtIfkk3QPtwS"]; // Rick roll & Josh lose videos

var player;
var isVideoPlaying = false;
var clickCount = 0; // Tracks button clicks
var currentLevel = 1; // Level progression
var gameTimer; // Lightning round timer
var buttonTimeout; // Timer to check if clicked too slow
var buttonSpeed = 1000; // Initial speed of button movement in ms

// Sound effects
var moveSound = new Audio("move.mp3"); // Button movement sound
var clickSound = new Audio("click.mp3"); // Click sound

// Funny messages when the button moves
var taunts = [
    "Too slow!", "Try again!", "You thought?!", "Almost had it!",
    "Not today!", "You're Slow!", "Your mom is faster than this!"
];

// Function to start the game
function startGame() {
    clickCount = 0;
    currentLevel = 1;
    buttonSpeed = 1000; // Reset button speed
    document.getElementById("moveButton").style.display = "block"; // Ensure button is visible
    document.getElementById("videoContainer").style.display = "none";
    document.getElementById("endScreen").style.display = "none";
    document.getElementById("levelDisplay").innerText = "Level: 1"; // Show the level
    moveButton(); // Start Level 1
}

// Function to handle button interaction
function moveButton() {
    if (isVideoPlaying) return; // Stop interaction if video is playing

    clickSound.play(); // Play click sound
    var randomChoice = Math.random();
    
    if (randomChoice < 0.3) { 
        // 30% chance: Play a random lose video
        playLoseVideo();
    } else {
        // 70% chance: Move the button
        moveSound.play(); // Play movement sound
        clickCount++;

        var button = document.getElementById("moveButton");
        var maxX = window.innerWidth - button.offsetWidth;
        var maxY = window.innerHeight - button.offsetHeight;

        var randomX = Math.random() * maxX;
        var randomY = Math.random() * maxY;

        // Move the button to a random position on the screen
        button.style.position = "absolute";
        button.style.left = `${randomX}px`;
        button.style.top = `${randomY}px`;

        // Show a funny message if you are too slow
        var randomTaunt = taunts[Math.floor(Math.random() * taunts.length)];
        button.innerText = randomTaunt;  // Change the button text to a taunt

        // Make it harder each time (Increase speed and level)
        button.style.fontSize = `${20 + clickCount * 2}px`;
        button.style.padding = `${10 + clickCount}px`;

        // Increase button speed after every level (level 5 or higher)
        if (clickCount >= 5) {
            currentLevel++;
            document.getElementById("levelDisplay").innerText = `Level: ${currentLevel}`;
            buttonSpeed = Math.max(200, buttonSpeed - 100); // Decrease speed but keep above 200ms
            moveButton(); // Continue with the faster speed
        } else {
            // Make the button move again after the speed interval
            setTimeout(moveButton, buttonSpeed);
        }
    }
}

// Function to show a taunt if the button isn't clicked in time
function showTaunt() {
    var button = document.getElementById("moveButton");
    var randomTaunt = taunts[Math.floor(Math.random() * taunts.length)];
    button.innerText = randomTaunt;  // Display a random taunt after timeout
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

    document.body.style.backgroundColor = "black"; // Flash effect
    setTimeout(() => { document.body.style.backgroundColor = ""; }, 500);

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
