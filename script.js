// Variable to store the YouTube player object
var player;
var videoUrls = [
  "https://www.youtube.com/watch?v=BBJa32lCaaY",  // Example: Rickroll
  "https://www.youtube.com/watch?v=AEcmLCEk_iw",    // kanye
  "https://www.youtube.com/watch?v=QDXJHht80-4", //smurf
  "https://www.youtube.com/watch?v=98o73stegwQ"  // fam guy
];

// Function to handle button click (Move or Redirect)
function moveButton() {
  // Decide if the button should redirect or move
  var randomChoice = Math.random(); // Randomly decide

  if (randomChoice < 0.3) {
    // Pick a random video URL
    var randomIndex = Math.floor(Math.random() * videoUrls.length);
    var randomUrl = videoUrls[randomIndex];
    
    // Show the video iframe and load the video
    showVideo(randomUrl);
  } else {
    // Move the button to a random position
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

// Function to show the video player
function showVideo(videoUrl) {
  // Hide the button and show the video container
  document.getElementById('moveButton').style.display = 'none';
  document.getElementById('videoContainer').style.display = 'block';

  // Extract video ID from the URL
  var videoId = videoUrl.split('v=')[1];

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
    window.location.replace("index.html"); // Force a redirect to the original page
  }
}

// The API script will automatically call onYouTubeIframeAPIReady to load the player
function onYouTubeIframeAPIReady() {
  // Player is ready, but we'll handle the actual video load when moveButton() is called
}
