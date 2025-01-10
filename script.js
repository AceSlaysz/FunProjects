function moveButton() {
  // Define the array of different URLs (YouTube videos or other links)
  var videoUrls = [
      "https://www.youtube.com/watch?v=BBJa32lCaaY",  // Example: Rickroll
  "https://www.youtube.com/watch?v=AEcmLCEk_iw",    // kanye
  "https://www.youtube.com/watch?v=QDXJHht80-4", //smurf
  "https://www.youtube.com/watch?v=98o73stegwQ"  // fam guy
  ];

  // Generate a random number between 0 and 1
  var randomChoice = Math.random();

  // If randomChoice is less than 0.3 (30% chance), it will go to a random URL
  if (randomChoice < 0.3) {
    // Pick a random index from the array
    var randomIndex = Math.floor(Math.random() * videoUrls.length);
    var randomUrl = videoUrls[randomIndex];

    // Redirect the browser to the randomly chosen URL
    window.location.href = randomUrl;
  } else {
    // Otherwise, just move the button to a random position (70% chance)
    var button = document.getElementById('moveButton');

    // Get the viewport size (browser window size)
    var maxX = window.innerWidth - button.offsetWidth;
    var maxY = window.innerHeight - button.offsetHeight;

    // Generate random positions within the window size
    var randomX = Math.floor(Math.random() * maxX);
    var randomY = Math.floor(Math.random() * maxY);

    // Move the button to the new random position
    button.style.position = 'absolute';
    button.style.left = randomX + 'px';
    button.style.top = randomY + 'px';
  }
}
