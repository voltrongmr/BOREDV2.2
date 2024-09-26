document.addEventListener('DOMContentLoaded', () => {
  let barState = 'active'; // Active or collapsed
  let isMenuLocked = false;

  // Create the glowing bar
  const glowBar = document.createElement('div');
  glowBar.id = 'glowBar';
  document.body.appendChild(glowBar);

  // Create the dropdown menu
  const dropdownMenu = document.createElement('div');
  dropdownMenu.id = 'dropdownMenu';
  dropdownMenu.innerHTML = `
    <button id="gamesBtn">Games</button>
    <button id="hacksBtn">Hacks</button>
    <button id="aiBtn">AI</button>
  `;
  document.body.appendChild(dropdownMenu);

  // Create the overlay
  const overlay = document.createElement('div');
  overlay.id = 'overlay';
  overlay.innerHTML = `<h1></h1><button id="closeOverlay">Close</button>`;
  document.body.appendChild(overlay);

  // Function to show overlay content
  function showOverlay(content) {
    overlay.style.display = 'flex';
    overlay.querySelector('h1').textContent = content;
  }

  // Function to hide overlay
  function hideOverlay() {
    overlay.style.display = 'none';
  }

  // Hide overlay initially
  hideOverlay();

  // Add button event listeners
  document.getElementById('gamesBtn').addEventListener('click', () => showOverlay('Games Overlay'));
  document.getElementById('hacksBtn').addEventListener('click', () => showOverlay('Hacks Overlay'));
  document.getElementById('aiBtn').addEventListener('click', () => showOverlay('AI Overlay'));

  // Close overlay button
  document.getElementById('closeOverlay').addEventListener('click', hideOverlay);

  // Hover functionality for the bar and dropdown menu
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

  // Function to toggle the bar state (expand/collapse)
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

  // Keyboard shortcut handling
  document.addEventListener('keydown', (event) => {
    if (event.ctrlKey && event.key === ';') {
      toggleBar();
    } else if (event.ctrlKey && event.key === ':') {
      toggleBar();
    }
  });
});
