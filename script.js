function moveButton() {
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

  // Redirect to a YouTube video (replace with your desired video URL)
  var youtubeUrl = "https://www.youtube.com/watch?v=E4WlUXrJgy4"; // Example YouTube URL (Rickroll)
  window.location.href = youtubeUrl; // Redirect to the YouTube video
}
