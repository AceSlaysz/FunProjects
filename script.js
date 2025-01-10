// Array of YouTube video IDs (YouTube video IDs only)
var videoUrls = [
  "_bxyZ6Olp6g",  // Example: Rickroll video ID
  "7ItPZgomPyg",   // Replace with your own video IDs
  "45VDHUmLFWs",
  "BBJa32lCaaY"
];

// Function to handle button click (Move or Redirect)
function moveButton() {
  // Decide randomly if the button should redirect to a video or move on the screen
  var randomChoice = Math.random(); // Randomly decide (0 to 1)

  if (randomChoice < 0.3) {
    // 30% chance: Pick a random video URL and load it
    var randomIndex = Math.floor(Math.random() * videoUrls.length);
    var randomVideoId = videoUrls[randomIndex];
    
    // Hide the button and show the video container
    document.getElementById('moveButton').style.display = 'none';
    document.getElementById('videoContainer').style.display = 'block';

    // Show the video using YouTube Iframe API
    showVideo(randomVideoId);
  } else {
    // 70% chance: Move the button to a random position on the screen
    var button = document.getElementById('moveButton');
    var maxX = window.innerWidth - button.offsetWidth;
    var maxY = window.innerHeight - button.offsetHeight;
    var randomX = Math.floor(Math.random() * maxX);
    var randomY = Math.floor(Math.random() * maxY);

    button.style.position = 'absolute';
    button.style.left = randomX + 'px';
    button.style.top = randomY + 'px';
  }
}

// Function to show the YouTube video
function showVideo(videoId) {
  // Create a new YouTube player
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
    // Redirect back to the original page after the video ends
    window.location.replace("index.html"); // This will refresh the page and show the button again
  }
}

// The API script will automatically call onYouTubeIframeAPIReady to load the player
function onYouTubeIframeAPIReady() {
  // Player is ready, but we'll handle the actual video load when moveButton() is called
}
