// Función para crear los estilos
function addGameStyles() {
  const styleElement = document.createElement("style");
  styleElement.textContent = `
        #pacman {
            width: 90%;
            max-width: 500px;
            margin: 0 auto;
            position: relative;
        }
        #pacman canvas {
            width: 100% !important;
            height: auto !important;
        }
        #shim {
            font-family: BDCartoonShoutRegular;
            position: absolute;
            visibility: hidden;
        }
        .game-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 20px;
            background: #000;
            border-radius: 10px;
            max-width: 600px;
            margin: 20px auto;
        }
        .game-title {
            color: #fff;
            font-size: 1.5rem;
            font-weight: bold;
            margin-bottom: 1rem;
        }
        .game-instructions {
            color: #fff;
            font-size: 0.875rem;
            margin-top: 1rem;
            text-align: center;
        }
    `;
  document.head.appendChild(styleElement);
}

// Función para envolver el juego en el nuevo contenedor
function wrapGameElements() {
  const shimElement = document.getElementById("shim");
  const pacmanElement = document.getElementById("pacman");

  // Crear el contenedor del juego
  const gameContainer = document.createElement("div");
  gameContainer.className = "game-container";

  // Crear el título
  const title = document.createElement("h2");
  title.className = "game-title";
  title.textContent = "Pac-Man";

  // Crear las instrucciones
  const instructions = document.createElement("div");
  instructions.className = "game-instructions";
  instructions.innerHTML = `
        <p>Usa las flechas del teclado para moverte</p>
        <p>Presiona N para nuevo juego - P para pausar</p>
    `;

  // Obtener el elemento padre original de shim y pacman
  const originalParent = shimElement.parentNode;

  // Mover los elementos al nuevo contenedor
  gameContainer.appendChild(title);
  gameContainer.appendChild(shimElement);
  gameContainer.appendChild(pacmanElement);
  gameContainer.appendChild(instructions);

  // Insertar el nuevo contenedor en el lugar original
  originalParent.insertBefore(gameContainer, originalParent.children[1]);
}

// Función de inicialización
function initGameUI() {
  // Esperar a que el DOM esté completamente cargado
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      addGameStyles();
      wrapGameElements();
    });
  } else {
    addGameStyles();
    wrapGameElements();
  }
}

// Iniciar la UI del juego
initGameUI();

// Este archivo carga la interfaz del juego Pacman
// El juego se carga desde game.js

document.addEventListener('DOMContentLoaded', function() {
    // Crear el contenedor del juego si no existe
    const shimDiv = document.getElementById('shim');
    const pacmanDiv = document.getElementById('pacman');
    
    if (shimDiv && pacmanDiv) {
        shimDiv.innerHTML = '<div class="text-center py-8"><h2 class="text-3xl font-bold text-blue-600 mb-4">¡Juega Pacman!</h2><p class="text-gray-600">Usa las teclas de dirección para moverte</p></div>';
        
        // El juego se inicializará desde game.js
        console.log('Interfaz de juego cargada');
    }
});