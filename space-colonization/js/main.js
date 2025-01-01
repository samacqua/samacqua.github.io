import Network from './Network.js';
import Node from './Node.js';
import Attractor from './Attractor.js';
// If you want pre-built patterns, import them too:
import { getGridOfAttractors } from './AttractorPatterns.js';
import { random } from './Utilities.js';
import defaults from './Defaults.js';

// Depending on how you structured them, you might need additional imports:
// import { setupKeyListeners } from './KeyboardInteractions.js';

// Add these variables at the top level
let canvas, ctx;
let network;
let showHelp = true;

// Replace the direct canvas setup with a setup function
function setup() {
  canvas = document.getElementById('myCanvas');
  ctx = canvas.getContext('2d');

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // Setup Network with initial conditions
  setupNetwork();

  // Begin animation loop
  requestAnimationFrame(animate);
}

// Add setupNetwork function
function setupNetwork() {
  // Initialize simulation object
  network = new Network(ctx, defaults);

  // Set up the attractors using grid pattern
  let gridAttractors = getGridOfAttractors(150, 100, ctx, 10);  // width, height, ctx, spacing
  network.attractors = gridAttractors;

  // Add a set of random root nodes throughout scene
  for(let i = 0; i < 10; i++) {  // Increased from 5 to 10 nodes
    network.addNode(
      new Node(
        null,
        {
          x: random(window.innerWidth),
          y: random(window.innerHeight)
        },
        true,
        ctx,
        defaults
      )
    );
  }
}

// Add help text drawing function
function drawText() {
  let text = [
    'Space = toggle pause',
    'r = reset',
    'c = toggle canalization',
    'a = toggle attractor visibility',
    'i = toggle influence lines',
    'h = toggle this help text'
  ];

  ctx.font = 'bold 24px sans-serif';
  ctx.fillStyle = 'rgba(255,255,255,1)';
  ctx.fillText('Controls:', 20, 40);

  ctx.font = '16px sans-serif';
  ctx.fillStyle = 'rgba(255,255,255,.5)';
  for(let i = 0; i < text.length; i++) {
    ctx.fillText(text[i], 20, 22*i + 80);
  }
}

// Modify animate function
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = defaults.Colors.BackgroundColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  if (network) {
    if (!defaults.IsPaused) {
      network.update();
    }
    network.draw();
  }

  if (showHelp) {
    drawText();
  }

  requestAnimationFrame(animate);
}

// Add keyboard event listeners
document.addEventListener('keypress', (e) => {
  switch(e.key) {
    case 'r':
      setupNetwork();
      break;
    case 'h':
      showHelp = !showHelp;
      break;
  }
});

// Replace window.load with setup call
window.addEventListener('load', setup);
