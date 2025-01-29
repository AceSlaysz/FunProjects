// Array of YouTube video IDs (YouTube video IDs only)
var videoUrls = [
  "_bxyZ6Olp6g",  // Example: Rickroll video ID
  "7ItPZgomPyg",   // Replace with your own video IDs
  "45VDHUmLFWs",
  "BBJa32lCaaY"
];

var player;
var isVideoPlaying = false;
var clickCount = 0; // Tracks how many times the button is clicked

// Sound effects
var moveSound = new Audio("move.mp3"); // Sound when button moves
var clickSound = new Audio("click.mp3"); // Sound when button is clicked

// Funny messages when the button moves
var taunts = [
  "Too slow!",
  "Try again!",
  "You thought?!",
  "Almost had it!",
  "Not today!",
  " You're Slow!",
  "Your mom is faster than this!"
];

// Function to handle button interaction
function moveButton() {
  clickSound.play(); // Play click sound

  var randomChoice = Math.random();

  if (randomChoice < 0.3 && !isVideoPlaying) {
    // 30% chance: Play a random video
    var randomIndex = Math.floor(Math.random() * videoUrls.length);
    var randomVideoId = videoUrls[randomIndex];

    document.getElementById('moveButton').style.display = 'none';
    document.getElementById('videoContainer').style.display = 'block';

    document.body.style.backgroundColor = "black"; // Flash effect
    setTimeout(() => { document.body.style.backgroundColor = ""; }, 500);

    showVideo(randomVideoId);
    isVideoPlaying = true;
  } else {
    // 70% chance: Move the button
    moveSound.play(); // Play movement sound

    clickCount++; // Increase difficulty
    var button = document.getElementById('moveButton');
    var maxX = window.innerWidth - button.offsetWidth;
    var maxY = window.innerHeight - button.offsetHeight;

    var randomX = Math.random() * maxX;
    var randomY = Math.random() * maxY;

    button.style.position = 'absolute';
    button.style.left = `${randomX}px`;
    button.style.top = `${randomY}px`;

    // Show a funny message
    var randomTaunt = taunts[Math.floor(Math.random() * taunts.length)];
    button.innerText = randomTaunt;

    // Make it harder the more you try
    button.style.fontSize = `${20 + clickCount * 2}px`;
    button.style.padding = `${10 + clickCount}px`;
  }
}

// Function to show YouTube video
function showVideo(videoId) {
  if (player) {
    player.destroy();
  }

  player = new YT.Player('player', {
    height: '390',
    width: '640',
    videoId: videoId,
    events: {
      'onStateChange': onPlayerStateChange
    }
  });
}

// Function to handle when the video finishes
function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.ENDED) {
    setTimeout(() => { window.location.replace("index.html"); }, 3000);
  }
}

// YouTube API function
function onYouTubeIframeAPIReady() {
  console.log("YouTube Iframe API is ready!");
}
