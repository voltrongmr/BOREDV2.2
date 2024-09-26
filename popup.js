document.addEventListener('DOMContentLoaded', () => {
  let barState = 'active'; // Active or collapsed
  const glowBar = document.getElementById('glowBar');
  const dropdownMenu = document.getElementById('dropdownMenu');
  const overlay = document.getElementById('overlay');
  let isMenuLocked = false;

  // Ensure overlays are hidden by default
  hideOverlay(); // Hide overlay initially

  // Button actions
  const gamesBtn = document.getElementById('gamesBtn');
  const hacksBtn = document.getElementById('hacksBtn');
  const aiBtn = document.getElementById('aiBtn');

  // Error handling in case buttons are not found
  if (!gamesBtn || !hacksBtn || !aiBtn) {
    console.error("One or more buttons were not found in the DOM.");
    return;
  }

  // Button click actions to show the appropriate overlay
  gamesBtn.onclick = () => showOverlay('Games Overlay');
  hacksBtn.onclick = () => showOverlay('Hacks Overlay');
  aiBtn.onclick = () => showOverlay('AI Overlay');

  // Hover functionality to keep dropdown visible when hovering over bar or dropdown
  glowBar.addEventListener('mouseover', () => {
    if (!isMenuLocked) {
      dropdownMenu.style.display = 'block';
    }
  });

  dropdownMenu.addEventListener('mouseover', () => {
    dropdownMenu.style.display = 'block';
  });

  // Hide the dropdown when mouse moves away from both bar and menu
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

  // Function to show overlay content
  function showOverlay(content) {
    overlay.style.display = 'flex';
    overlay.querySelector('h1').textContent = content;
  }

  // Function to hide overlays
  function hideOverlay() {
    overlay.style.display = 'none';
  }

  // Close overlay functionality
  document.getElementById('closeOverlay').onclick = hideOverlay;

  // Function to toggle the bar state (shrink or expand)
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

  // Keyboard shortcut to toggle bar visibility
  document.addEventListener('keydown', (event) => {
    if (event.ctrlKey && event.key === ';') {
      toggleBar();
    } else if (event.ctrlKey && event.key === ':') {
      toggleBar();
    }
  });
});
