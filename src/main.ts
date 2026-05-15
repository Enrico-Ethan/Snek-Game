// ============================================================
// SNAKE GAME — Vanilla JS + Canvas
// ============================================================

// ============================================================
// SECTION 1: CSS STYLES (injected dynamically)
// ============================================================
const styles = `
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background: #0a0a0a;
    color: #e0e0e0;
    font-family: 'Courier New', monospace;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    overflow: hidden;
  }

  #game-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    position: relative;
  }

  #score-panel {
    display: flex;
    gap: 48px;
    padding: 12px 24px;
    background: #1a1a1a;
    border: 2px solid #333;
    border-radius: 8px;
  }

  .score-item {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .score-label {
    font-size: 12px;
    color: #888;
    letter-spacing: 2px;
  }

  .score-item span:last-child {
    font-size: 28px;
    font-weight: bold;
    color: #4ade80;
  }

  #game-canvas {
    border: 3px solid #333;
    border-radius: 4px;
    box-shadow: 0 0 20px rgba(74, 222, 128, 0.1);
    background: #111;
  }

  .overlay {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 16px;
    padding: 40px 60px;
    background: rgba(0, 0, 0, 0.85);
    border: 2px solid #4ade80;
    border-radius: 12px;
    text-align: center;
    z-index: 10;
    animation: fadeIn 0.3s ease;
  }

  .overlay.hidden {
    display: none;
  }

  .overlay h1 {
    font-size: 48px;
    color: #4ade80;
    text-shadow: 0 0 10px rgba(74, 222, 128, 0.5);
  }

  .overlay p {
    font-size: 16px;
    color: #aaa;
  }

  .overlay .hint {
    font-size: 12px;
    color: #666;
  }

  #restart-btn {
    padding: 12px 32px;
    font-size: 18px;
    font-family: 'Courier New', monospace;
    background: #4ade80;
    color: #0a0a0a;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-weight: bold;
    transition: all 0.2s;
  }

  #restart-btn:hover {
    background: #22c55e;
    transform: scale(1.05);
  }

  #controls-info {
    display: flex;
    gap: 24px;
    font-size: 12px;
    color: #555;
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translate(-50%, -50%) scale(0.95); }
    to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
  }

  .dev-toggle {
    position: fixed;
    bottom: 12px;
    right: 12px;
    padding: 6px 14px;
    font-size: 11px;
    font-family: 'Courier New', monospace;
    background: #333;
    color: #888;
    border: 1px solid #555;
    border-radius: 4px;
    cursor: pointer;
    z-index: 100;
    transition: all 0.2s;
  }

  .dev-toggle:hover {
    background: #444;
    color: #aaa;
  }

  #dev-panel {
    width: 360px;
    padding: 20px;
    background: #0a0a0a;
    z-index: 20;
    top: 50%;
  }

  #dev-panel h2 {
    font-size: 18px;
    margin-bottom: 20px;
  }

  .dev-hint {
    font-size: 10px;
    color: #666;
    font-style: italic;
    margin-top: -8px;
    margin-bottom: 16px;
  }

  .dev-speed-hint {
    font-size: 9px;
    color: #555;
    font-style: italic;
    margin-top: 4px;
    margin-bottom: 0;
    width: 100%;
  }

  .dev-section {
    margin-bottom: 12px;
  }

  .dev-section label:first-child {
    display: block;
    font-size: 10px;
    color: #888;
    letter-spacing: 1px;
    margin-bottom: 8px;
  }

  .dev-row {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
  }

  .dev-row label {
    font-size: 12px;
    color: #ccc;
    cursor: pointer;
  }

  .dev-row input[type="number"] {
    width: 60px;
    padding: 4px 8px;
    font-family: 'Courier New', monospace;
    font-size: 12px;
    background: #222;
    color: #e0e0e0;
    border: 1px solid #444;
    border-radius: 4px;
  }

  .dev-row input[type="number"]:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  .dev-row button {
    padding: 3px 8px;
    font-family: 'Courier New', monospace;
    font-size: 11px;
    background: #4ade80;
    color: #0a0a0a;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-weight: bold;
  }

  .dev-row button:hover {
    background: #22c55e;
  }

  #dev-close {
    margin-top: 12px;
    padding: 6px 16px;
    font-family: 'Courier New', monospace;
    font-size: 12px;
    background: #333;
    color: #ccc;
    border: 1px solid #555;
    border-radius: 4px;
    cursor: pointer;
  }

  #dev-close:hover {
    background: #444;
  }
`;

// ============================================================
// SECTION 2: GAME CONFIGURATION
// ============================================================
const CONFIG = {
  canvasSize: 400,
  gridSize: 20,
  baseSpeed: 150,
  speedIncrement: 5,
  minSpeed: 60,
  maxFoods: 10,
};

const CELL_COUNT = CONFIG.canvasSize / CONFIG.gridSize;

// ============================================================
// SECTION 3: GAME STATE
// ============================================================
type GameState = 'start' | 'running' | 'paused' | 'gameover';
let gameState: GameState = 'start';

let canvas: HTMLCanvasElement;
let ctx: CanvasRenderingContext2D;

let snake: { x: number; y: number }[] = [];
let foods: { x: number; y: number }[] = [];

let direction: { x: number; y: number } = { x: 1, y: 0 };
let directionQueue: { x: number; y: number }[] = [];

let score = 0;
let fruitsEaten = 0;
let highScore = parseInt(localStorage.getItem('snakeHighScore') || '0', 10);

let gameLoopId: number | null = null;
let lastTick = 0;
let currentSpeed = CONFIG.baseSpeed;

let scoreEl: HTMLElement;
let highScoreEl: HTMLElement;
let finalScoreEl: HTMLElement;
let startScreen: HTMLElement;
let gameOverScreen: HTMLElement;
let pauseScreen: HTMLElement;
let restartBtn: HTMLButtonElement;

let devToggle: HTMLButtonElement;
let devPanel: HTMLElement;
let devSpeedInput: HTMLInputElement;
let devSpeedApply: HTMLButtonElement;
let devScoreInput: HTMLInputElement;
let devScoreApply: HTMLButtonElement;
let devClose: HTMLButtonElement;

let manualSpeedMode = false;
let manualSpeedValue = CONFIG.baseSpeed;
let devPanelPaused = false;

// ============================================================
// SECTION 4: INITIALIZATION
// ============================================================
function init(): void {
  // Inject CSS styles into the document
  const styleSheet = document.createElement('style');
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);

  // Cache DOM references
  canvas = document.getElementById('game-canvas') as HTMLCanvasElement;
  ctx = canvas.getContext('2d')!;
  canvas.width = CONFIG.canvasSize;
  canvas.height = CONFIG.canvasSize;

  scoreEl = document.getElementById('score')!;
  highScoreEl = document.getElementById('high-score')!;
  finalScoreEl = document.getElementById('final-score')!;
  startScreen = document.getElementById('start-screen')!;
  gameOverScreen = document.getElementById('game-over')!;
  pauseScreen = document.getElementById('pause-screen')!;
  restartBtn = document.getElementById('restart-btn') as HTMLButtonElement;

  // Display saved high score
  highScoreEl.textContent = String(highScore);

  // Bind input handlers
  document.addEventListener('keydown', handleKeyPress);
  restartBtn.addEventListener('click', restartGame);

  // Cache dev panel elements
  devToggle = document.getElementById('dev-toggle') as HTMLButtonElement;
  devPanel = document.getElementById('dev-panel') as HTMLElement;
  devSpeedInput = document.getElementById('dev-speed-input') as HTMLInputElement;
  devSpeedApply = document.getElementById('dev-speed-apply') as HTMLButtonElement;
  devScoreInput = document.getElementById('dev-score-input') as HTMLInputElement;
  devScoreApply = document.getElementById('dev-score-apply') as HTMLButtonElement;
  devClose = document.getElementById('dev-close') as HTMLButtonElement;

  // Bind dev panel handlers
  devToggle.addEventListener('click', toggleDevPanel);
  devClose.addEventListener('click', toggleDevPanel);
  devSpeedApply.addEventListener('click', applyManualSpeed);
  devScoreApply.addEventListener('click', applyDevScore);
  document.querySelectorAll('input[name="speed-mode"]').forEach((radio) => {
    radio.addEventListener('change', handleSpeedModeChange);
  });

  // Initialize game data and render first frame
  initGameData();
  draw();
}

// ============================================================
// SECTION 5: GAME DATA INITIALIZATION
// ============================================================
function initGameData(): void {
  // Snake starts centered, 3 segments long, moving right
  const centerX = Math.floor(CELL_COUNT / 2);
  const centerY = Math.floor(CELL_COUNT / 2);

  snake = [
    { x: centerX, y: centerY },
    { x: centerX - 1, y: centerY },
    { x: centerX - 2, y: centerY },
  ];

  direction = { x: 1, y: 0 };
  directionQueue = [];
  score = 0;
  fruitsEaten = 0;
  currentSpeed = CONFIG.baseSpeed;
  scoreEl.textContent = '0';

  initFoods();
}

// ============================================================
// SECTION 6: GAME FUNCTIONS
// ============================================================

// Draw the snake with gradient coloring — head is brightest, tail fades
function drawSnake(): void {
  snake.forEach((segment, index) => {
    // Gradient: head at full brightness, tail at 40%
    const brightness = 1 - (index / snake.length) * 0.6;
    const green = Math.floor(222 * brightness);
    const color = `rgb(${Math.floor(30 * brightness)}, ${green}, ${Math.floor(80 * brightness)})`;

    ctx.fillStyle = color;
    ctx.fillRect(
      segment.x * CONFIG.gridSize + 1,
      segment.y * CONFIG.gridSize + 1,
      CONFIG.gridSize - 2,
      CONFIG.gridSize - 2
    );

    // Draw eyes on the head segment
    if (index === 0) {
      ctx.fillStyle = '#fff';
      const eyeSize = 3;

      if (direction.x === 1) {
        ctx.fillRect(segment.x * CONFIG.gridSize + 14, segment.y * CONFIG.gridSize + 5, eyeSize, eyeSize);
        ctx.fillRect(segment.x * CONFIG.gridSize + 14, segment.y * CONFIG.gridSize + 12, eyeSize, eyeSize);
      } else if (direction.x === -1) {
        ctx.fillRect(segment.x * CONFIG.gridSize + 3, segment.y * CONFIG.gridSize + 5, eyeSize, eyeSize);
        ctx.fillRect(segment.x * CONFIG.gridSize + 3, segment.y * CONFIG.gridSize + 12, eyeSize, eyeSize);
      } else if (direction.y === -1) {
        ctx.fillRect(segment.x * CONFIG.gridSize + 5, segment.y * CONFIG.gridSize + 3, eyeSize, eyeSize);
        ctx.fillRect(segment.x * CONFIG.gridSize + 12, segment.y * CONFIG.gridSize + 3, eyeSize, eyeSize);
      } else {
        ctx.fillRect(segment.x * CONFIG.gridSize + 5, segment.y * CONFIG.gridSize + 14, eyeSize, eyeSize);
        ctx.fillRect(segment.x * CONFIG.gridSize + 12, segment.y * CONFIG.gridSize + 14, eyeSize, eyeSize);
      }
    }
  });
}

// Draw food as a pulsing red circle with glow
function drawFood(): void {
  foods.forEach((f) => {
    const pulse = 0.8 + Math.sin(Date.now() / 200) * 0.2;
    const size = CONFIG.gridSize * pulse;

    ctx.shadowColor = '#ef4444';
    ctx.shadowBlur = 10;

    ctx.fillStyle = '#ef4444';
    ctx.beginPath();
    ctx.arc(
      f.x * CONFIG.gridSize + CONFIG.gridSize / 2,
      f.y * CONFIG.gridSize + CONFIG.gridSize / 2,
      size / 2 - 2,
      0,
      Math.PI * 2
    );
    ctx.fill();
  });

  ctx.shadowBlur = 0;
}

// Move the snake: add new head in current direction
function moveSnake(): void {
  if (directionQueue.length > 0) {
    direction = directionQueue.shift()!;
  }

  const head = { ...snake[0] };
  head.x += direction.x;
  head.y += direction.y;

  snake.unshift(head);
}

// Spawn food at a random grid cell not occupied by the snake
function spawnFood(): void {
  let newFood: { x: number; y: number };
  let validPosition = false;

  while (!validPosition) {
    newFood = {
      x: Math.floor(Math.random() * CELL_COUNT),
      y: Math.floor(Math.random() * CELL_COUNT),
    };

    validPosition = !snake.some(
      (segment) => segment.x === newFood.x && segment.y === newFood.y
    ) && !foods.some(
      (f) => f.x === newFood.x && f.y === newFood.y
    );
  }

  foods.push(newFood!);
}

// Initialize foods array with a single starting food
function initFoods(): void {
  foods = [];
  fruitsEaten = 0;
  spawnFood();
}

// Check for wall collision and self collision
function collisionDetection(): boolean {
  const head = snake[0];

  // Wall collision — outside grid bounds
  if (
    head.x < 0 ||
    head.x >= CELL_COUNT ||
    head.y < 0 ||
    head.y >= CELL_COUNT
  ) {
    return true;
  }

  // Self collision — head overlaps any body segment
  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      return true;
    }
  }

  return false;
}

// Check if the snake's head is on any food, returns index or -1
function checkFoodEaten(): number {
  const head = snake[0];
  return foods.findIndex((f) => f.x === head.x && f.y === head.y);
}

// Handle food eaten: score up, speed up, grow snake, remove eaten food
function handleFoodEaten(eatenIndex: number): void {
  score += 1;
  fruitsEaten += 1;
  scoreEl.textContent = String(score);

  currentSpeed = Math.max(CONFIG.minSpeed, currentSpeed - CONFIG.speedIncrement);

  // Remove the eaten food
  foods.splice(eatenIndex, 1);

  // Maintain target food count based on progress (1 + every 20 fruits, capped at maxFoods)
  const targetFoodCount = Math.min(CONFIG.maxFoods, 1 + Math.floor(fruitsEaten / 20));
  while (foods.length < targetFoodCount) {
    spawnFood();
  }
}

// Main game tick: move, check collisions, handle food
function updateGame(): void {
  moveSnake();

  if (collisionDetection()) {
    handleGameOver();
    return;
  }

  const eatenIndex = checkFoodEaten();
  if (eatenIndex !== -1) {
    handleFoodEaten(eatenIndex);
  } else {
    snake.pop();
  }
}

// ============================================================
// SECTION 7: RENDERING
// ============================================================
function draw(): void {
  // Clear canvas with dark background
  ctx.fillStyle = '#111';
  ctx.fillRect(0, 0, CONFIG.canvasSize, CONFIG.canvasSize);

  // Draw subtle grid lines
  ctx.strokeStyle = '#1a1a1a';
  ctx.lineWidth = 0.5;
  for (let i = 0; i <= CELL_COUNT; i++) {
    ctx.beginPath();
    ctx.moveTo(i * CONFIG.gridSize, 0);
    ctx.lineTo(i * CONFIG.gridSize, CONFIG.canvasSize);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, i * CONFIG.gridSize);
    ctx.lineTo(CONFIG.canvasSize, i * CONFIG.gridSize);
    ctx.stroke();
  }

  drawFood();
  drawSnake();
}

// ============================================================
// SECTION 8: GAME LOOP
// ============================================================
function gameLoop(timestamp: number): void {
  if (gameState !== 'running') return;

  // Throttle game logic to currentSpeed interval
  const activeSpeed = manualSpeedMode ? manualSpeedValue : currentSpeed;
  if (timestamp - lastTick >= activeSpeed) {
    updateGame();
    lastTick = timestamp;
  }

  // Redraw every frame (for food pulse animation)
  draw();

  gameLoopId = requestAnimationFrame(gameLoop);
}

function startGameLoop(): void {
  lastTick = performance.now();
  gameLoopId = requestAnimationFrame(gameLoop);
}

function stopGameLoop(): void {
  if (gameLoopId !== null) {
    cancelAnimationFrame(gameLoopId);
    gameLoopId = null;
  }
}

// ============================================================
// SECTION 9: GAME STATE MANAGEMENT
// ============================================================
function handleGameOver(): void {
  gameState = 'gameover';
  stopGameLoop();

  // Save high score if beaten
  if (score > highScore) {
    highScore = score;
    highScoreEl.textContent = String(highScore);
    localStorage.setItem('snakeHighScore', String(highScore));
  }

  finalScoreEl.textContent = String(score);
  gameOverScreen.classList.remove('hidden');
}

function restartGame(): void {
  gameOverScreen.classList.add('hidden');
  pauseScreen.classList.add('hidden');
  startScreen.classList.add('hidden');
  devPanel.classList.add('hidden');
  devPanelPaused = false;

  initGameData();

  gameState = 'running';
  startGameLoop();
}

function togglePause(): void {
  if (gameState === 'running') {
    gameState = 'paused';
    stopGameLoop();
    pauseScreen.classList.remove('hidden');
  } else if (gameState === 'paused') {
    gameState = 'running';
    pauseScreen.classList.add('hidden');
    startGameLoop();
  }
}

// ============================================================
// SECTION 10: CONTROLS
// ============================================================
function handleKeyPress(e: KeyboardEvent): void {
  const key = e.key.toLowerCase();

  // Start game from start screen
  if (gameState === 'start') {
    if (['arrowup', 'arrowdown', 'arrowleft', 'arrowright', 'w', 'a', 's', 'd', ' '].includes(key)) {
      startScreen.classList.add('hidden');
      restartGame();
      return;
    }
  }

  // Restart from game over
  if (gameState === 'gameover' && key === 'enter') {
    restartGame();
    return;
  }

  // Pause / resume
  if (key === ' ') {
    e.preventDefault();
    if (gameState === 'running' || gameState === 'paused') {
      togglePause();
    }
    return;
  }

  // Direction input (only when running)
  if (gameState !== 'running') return;

  const keyMap: Record<string, { x: number; y: number }> = {
    arrowup: { x: 0, y: -1 },
    arrowdown: { x: 0, y: 1 },
    arrowleft: { x: -1, y: 0 },
    arrowright: { x: 1, y: 0 },
    w: { x: 0, y: -1 },
    s: { x: 0, y: 1 },
    a: { x: -1, y: 0 },
    d: { x: 1, y: 0 },
  };

  const newDir = keyMap[key];
  if (!newDir) return;

  e.preventDefault();

  // Prevent 180-degree reverse against the last queued direction
  const lastDir = directionQueue.length > 0
    ? directionQueue[directionQueue.length - 1]
    : direction;

  if (newDir.x === -lastDir.x && newDir.y === -lastDir.y) {
    return;
  }

  // Queue up to 2 inputs (one for next tick, one buffered)
  if (directionQueue.length < 2) {
    directionQueue.push(newDir);
  }
}

// ============================================================
// SECTION 11: DEV OPS PANEL
// ============================================================
function toggleDevPanel(): void {
  const wasHidden = devPanel.classList.contains('hidden');
  devPanel.classList.toggle('hidden');

  if (wasHidden) {
    // Opening — pause if game is running
    if (gameState === 'running') {
      devPanelPaused = true;
      gameState = 'paused';
      stopGameLoop();
      pauseScreen.classList.remove('hidden');
    }
  } else {
    // Closing — resume only if we paused it
    if (devPanelPaused && gameState === 'paused') {
      devPanelPaused = false;
      gameState = 'running';
      pauseScreen.classList.add('hidden');
      startGameLoop();
    }
  }
}

function handleSpeedModeChange(e: Event): void {
  const target = e.target as HTMLInputElement;
  if (target.value === 'manual') {
    manualSpeedMode = true;
    devSpeedInput.disabled = false;
    devSpeedInput.value = String(manualSpeedValue);
  } else {
    manualSpeedMode = false;
    devSpeedInput.disabled = true;
  }
}

function applyManualSpeed(): void {
  const val = parseInt(devSpeedInput.value, 10);
  if (!isNaN(val) && val >= 10 && val <= 1000) {
    manualSpeedValue = val;
  }
}

function applyDevScore(): void {
  const val = parseInt(devScoreInput.value, 10);
  if (!isNaN(val) && val >= 0) {
    score = val;
    fruitsEaten = val;
    scoreEl.textContent = String(score);
  }
}

// ============================================================
// SECTION 12: BOOT
// ============================================================
init();
