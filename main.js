const pages = document.querySelectorAll('.page');
const sword = document.getElementById('sword');
const slash = document.getElementById('slash');
const ambient = document.getElementById('ambient');
const holdCircle = document.getElementById('holdCircle');

let pageIndex = 0;
let ambientStarted = false;

function startAmbient() {
  if (!ambientStarted) {
    ambient.volume = 0.5;
    ambient.play().catch(()=>{});
    ambientStarted = true;
  }
}

document.addEventListener('touchstart', startAmbient, { once: true });
document.addEventListener('mousedown', startAmbient, { once: true });

function cutPage() {
  sword.style.display = 'block';
  sword.animate([
    { top: '-150px' },
    { top: '120%' }
  ], { duration: 600, easing: 'ease-in' });

  slash.currentTime = 0;
  slash.play();

  setTimeout(() => {
    pages[pageIndex].classList.remove('active');
    pageIndex++;
    if (pages[pageIndex]) pages[pageIndex].classList.add('active');
    sword.style.display = 'none';
  }, 600);
}

let holdTimer;
holdCircle.addEventListener('touchstart', () => {
  holdTimer = setTimeout(cutPage, 1200);
});

holdCircle.addEventListener('touchend', () => clearTimeout(holdTimer));