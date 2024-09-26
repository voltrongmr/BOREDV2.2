let barState = 'active'; // Active or collapsed
const glowBar = document.getElementById('glowBar');
const dropdownMenu = document.getElementById('dropdownMenu');
const overlay = document.getElementById('overlay');
let isMenuLocked = false;

// Keep dropdown visible when hovering over bar or dropdown
glowBar.addEventListener('mouseover', () => {
  if (!isMenuLocked) {
    dropdownMenu.style.display = 'block';
  }
});

dropdownMenu.addEventListener('mouseover', () => {
  dropdownMenu.style.display = 'block';
});

glowBar.addEventListener('mouseout', () => {
  setTimeout(() => {
    if (!dropdownMenu.matches(':hover')) {
      dropdownMenu.style.display = 'none';
    }
  }, 100);  // Slight delay to allow moving to the menu
});

dropdownMenu.addEventListener('mouseout', () => {
  dropdownMenu.style.display = 'none';
});

// Create overlay functionality
function showOverlay(content) {
  overlay.style.display = 'flex';
  overlay.querySelector('h1').textContent = content;
}

function hideOverlay() {
  overlay.style.display = 'none';
}

// Close overlay
document.getElementById('closeOverlay').onclick = hideOverlay;

// Button actions
document.getElementById('gamesBtn').onclick = () => showOverlay('Games Overlay');
document.getElementById('hacksBtn').onclick = () => showOverlay('Hacks Overlay');
document.getElementById('aiBtn').onclick = () => showOverlay('AI Overlay');

// Function to toggle the bar state
function toggleBar() {
  if (barState === 'active') {
    glowBar.style.width = '5px';
    glowBar.style.backgroundColor = 'red';
    hideOverlay();
    dropdownMenu.style.display = 'none';
    isMenuLocked = true;
    barState = 'collapsed';
  } else {
    glowBar.style.width = '30px';
    glowBar.style.backgroundColor = 'limegreen';
    isMenuLocked = false;
    barState = 'active';
  }
}

// Keyboard shortcuts to toggle bar
document.addEventListener('keydown', (event) => {
  if (event.ctrlKey && event.key === ';') {
    toggleBar();
  } else if (event.ctrlKey && event.key === ':') {
    toggleBar();
  }
});
