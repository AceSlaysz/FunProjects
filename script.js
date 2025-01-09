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
}
