function moveButton() {
  // Define the array of different URLs (YouTube videos or other links)
  var videoUrls = [
    "https://www.youtube.com/watch?v=BBJa32lCaaY",  // YouTube video 1 (Example: Rickroll)
    "https://www.youtube.com/watch?v=AEcmLCEk_iw",    // YouTube video 2 (kanye)
    "https://www.youtube.com/watch?v=QDXJHht80-4",    // YouTube video 3 (smurf)
    "https://www.youtube.com/watch?v=98o73stegwQ"    // YouTube video 4 (family guy)
  ];

  // Pick a random index from the array
  var randomIndex = Math.floor(Math.random() * videoUrls.length);

  // Get the random URL
  var randomUrl = videoUrls[randomIndex];

  // Redirect the browser to the randomly chosen URL
  window.location.href = randomUrl;

  // Get the button element
  var button = document.getElementById('moveButton');

  // Get the viewport size
  var maxX = window.innerWidth - button.offsetWidth;
  var maxY = window.innerHeight - button.offsetHeight;

  // Generate random positions within the window size
  var randomX = Math.floor(Math.random() * maxX);
  var randomY = Math.floor(Math.random() * maxY);

  // Move the button to the new position
  button.style.position = 'absolute';
  button.style.left = randomX + 'px';
  button.style.top = randomY + 'px';
}
