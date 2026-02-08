let currentLevel = 1;

const messages = {
  incorrect1: "No eres dramática, solo algo berrinchuda (y eso me encanta)",
  correct1: "Perdón, son las hormonas ♥️",
  incorrect2a: "¿Es en serio que no te acuerdas? 😡",
  incorrect2b: "Vuelve a leer la pregunta 😒",
  correct2: "100 puntos para Slytherin 🐍",
  incorrect3: "Si no eliges la B, me pondré muy tiste 🥺",
  correct3: "¡Yeii! ERES MI SAN VALENTÍN 💖"
};

function startGame() {
  document.getElementById('bgMusic').volume = 0.5;
  document.getElementById('bgMusic').play();
  document.getElementById('startSound').play();
  showScreen('q1');
}

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

function spawnParticles(type) {
  const container = document.getElementById('particles-container');
  const icons = type === 'love' ? ['💖', '🐱', '✨', '😻', '🍭'] : ['😡', '💢', '🙄', '😤'];
  for(let i=0; i<30; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.innerHTML = icons[Math.floor(Math.random() * icons.length)];
    p.style.left = Math.random() * 100 + 'vw';
    p.style.top = '-50px';
    p.style.animationDuration = (Math.random() * 2 + 1.5) + 's';
    container.appendChild(p);
    setTimeout(() => p.remove(), 3000);
  }
}

function processAnswer(isCorrect, msgKey) {
  const feedbackText = document.getElementById('feedback-text');
  const btnProceed = document.getElementById('btn-proceed');
  const catDiv = document.getElementById('gatito-pixel');
  
  feedbackText.innerText = messages[msgKey];
  catDiv.innerHTML = isCorrect ? '😻' : '🐱💢';

  if (isCorrect) {
    document.getElementById('plop').play();
    spawnParticles('love');
    btnProceed.innerText = "CONTINUAR";
    btnProceed.onclick = () => {
      currentLevel++;
      if (currentLevel > 3) {
        document.getElementById('winSound').play();
        showScreen('final');
        spawnParticles('love'); // Lluvia extra final
      } else {
        showScreen('q' + currentLevel);
      }
    };
  } else {
    document.getElementById('errorSound').play();
    spawnParticles('angry');
    btnProceed.innerText = "REINTENTAR";
    btnProceed.onclick = () => showScreen('q' + currentLevel);
  }
  showScreen('message-screen');
}