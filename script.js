const rose = document.getElementById('rose');
const message = document.getElementById('message');
const hiddenLine = document.getElementById('hiddenLine');
const closing = document.getElementById('closing');
let opened = false;

// Add event listeners for both click and touch on rose
rose.addEventListener('click', handleRoseClick);
rose.addEventListener('touchstart', handleRoseClick, { passive: true });

function handleRoseClick() {
  if (!opened) {
    message.classList.add('show');
    
    // Soft vibration (mobile only)
    if (navigator.vibrate) {
      navigator.vibrate([30, 20, 30]);
    }

    // Reveal closing text after 1.5 seconds
    setTimeout(() => {
      closing.style.animation = 'glowIn 3s ease forwards';
    }, 1500);

    // Reveal hidden line after 5–6 seconds
    setTimeout(() => {
      hiddenLine.classList.add('show');
    }, 5500);

    opened = true;
    
    // Remove tap hint after interaction
    const tapHint = document.querySelector('.tap-hint');
    tapHint.style.opacity = '0.5';
    tapHint.style.animation = 'none';
  }
}

function createParticle() {
  const particle = document.createElement('div');
  particle.classList.add('particle');
  particle.innerText = Math.random() > 0.5 ? '🌸' : '🤍';
  particle.style.left = Math.random() * 100 + 'vw';
  particle.style.animationDuration = 6 + Math.random() * 4 + 's';
  document.body.appendChild(particle);
  setTimeout(() => particle.remove(), 10000);
}

// Start particle animation
setInterval(createParticle, 700);

// Ensure page is properly scrolled on load
window.addEventListener('load', () => {
  window.scrollTo(0, 0);
  
  // Add a small delay for animations
  setTimeout(() => {
    document.body.style.overflowY = 'auto';
  }, 500);
});

// Fallback for missing photo
window.addEventListener('error', function(e) {
  if (e.target.tagName.toLowerCase() === 'img') {
    console.log('Image failed to load:', e.target.src);
  }
}, true);