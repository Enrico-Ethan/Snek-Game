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

  .hidden {
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

  .options-toggle {
    position: fixed;
    bottom: 12px;
    right: 64px;
    padding: 6px 10px;
    font-size: 13px;
    font-family: 'Courier New', monospace;
    background: #333;
    color: #888;
    border: 1px solid #555;
    border-radius: 4px;
    cursor: pointer;
    z-index: 100;
    transition: all 0.2s;
  }

  .options-toggle:hover {
    background: #444;
    color: #aaa;
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

  #options-panel {
    width: 320px;
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

  #options-panel .dev-row input[type="number"] {
    width: 72px;
  }

  .powerup-nuke {
    color: #eab308;
  }

  .powerup-double {
    color: #60a5fa;
  }

  .powerup-frenzy {
    color: #f59e0b;
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

  #options-close {
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

  #options-close:hover {
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
let devEnemySpawn: HTMLButtonElement;
let devClose: HTMLButtonElement;

let optionsToggle: HTMLButtonElement;
let optionsPanel: HTMLElement;
let optionsClose: HTMLButtonElement;
let portalsToggle: HTMLInputElement;
let enemiesToggle: HTMLInputElement;
let timeToggle: HTMLInputElement;
let timeLimitInput: HTMLInputElement;
let timePanel: HTMLElement;
let timeRemainingEl: HTMLElement;

let manualSpeedMode = false;
let manualSpeedValue = CONFIG.baseSpeed;
let devPanelPaused = false;
let optionsPanelPaused = false;

let portalsEnabled = false;
let portalActive = false;
let portals: { a: { x: number; y: number }; b: { x: number; y: number } } | null = null;
let nextPortalSpawnAt = 0;
let portalImmunityUntil = 0;
let portalCooldownUntil = 0;

let timeModeEnabled = false;
let timeLimitMs = 20000;
let timeRemainingMs = 20000;
let timeLastTick = 0;

let enemiesEnabled = false;
let enemies: { segments: { x: number; y: number }[]; dir: { x: number; y: number }; axis: 'h' | 'v' }[] = [];
let nextEnemySpawnAt = 0;

let powerups: { x: number; y: number; type: 'nuke' | 'double' | 'frenzy' }[] = [];
let doublePointsActive = false;
let doublePointsEndsAt = 0;
let growPending = 0;

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
  timePanel = document.getElementById('time-panel') as HTMLElement;
  timeRemainingEl = document.getElementById('time-remaining') as HTMLElement;

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
  devEnemySpawn = document.getElementById('dev-enemy-spawn') as HTMLButtonElement;
  devClose = document.getElementById('dev-close') as HTMLButtonElement;

  optionsToggle = document.getElementById('options-toggle') as HTMLButtonElement;
  optionsPanel = document.getElementById('options-panel') as HTMLElement;
  optionsClose = document.getElementById('options-close') as HTMLButtonElement;
  portalsToggle = document.getElementById('portals-toggle') as HTMLInputElement;
  enemiesToggle = document.getElementById('enemies-toggle') as HTMLInputElement;
  timeToggle = document.getElementById('time-toggle') as HTMLInputElement;
  timeLimitInput = document.getElementById('time-limit-input') as HTMLInputElement;

  // Bind dev panel handlers
  devToggle.addEventListener('click', toggleDevPanel);
  devClose.addEventListener('click', toggleDevPanel);
  devSpeedApply.addEventListener('click', applyManualSpeed);
  devScoreApply.addEventListener('click', applyDevScore);
  devEnemySpawn.addEventListener('click', spawnEnemyFromDev);
  document.querySelectorAll('input[name="speed-mode"]').forEach((radio) => {
    radio.addEventListener('change', handleSpeedModeChange);
  });

  optionsToggle.addEventListener('click', toggleOptionsPanel);
  optionsClose.addEventListener('click', toggleOptionsPanel);
  portalsToggle.addEventListener('change', handlePortalsToggle);
  enemiesToggle.addEventListener('change', handleEnemiesToggle);
  timeToggle.addEventListener('change', handleTimeToggle);
  timeLimitInput.addEventListener('change', handleTimeLimitChange);

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
  powerups = [];
  doublePointsActive = false;
  doublePointsEndsAt = 0;
  growPending = 0;

  if (portalsEnabled) {
    spawnPortals();
  } else {
    clearPortals();
  }

  if (enemiesEnabled) {
    enemies = [];
    nextEnemySpawnAt = performance.now() + getEnemySpawnInterval();
  } else {
    enemies = [];
    nextEnemySpawnAt = 0;
  }

  if (timeModeEnabled) {
    resetTimer();
  } else {
    timePanel.classList.add('hidden');
  }

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

function drawEnemies(): void {
  if (enemies.length === 0) return;

  enemies.forEach((enemy) => {
    enemy.segments.forEach((segment, index) => {
      const shade = index === 0 ? '#fb923c' : '#f97316';
      ctx.fillStyle = shade;
      ctx.fillRect(
        segment.x * CONFIG.gridSize + 1,
        segment.y * CONFIG.gridSize + 1,
        CONFIG.gridSize - 2,
        CONFIG.gridSize - 2
      );
    });
  });
}

function drawPowerups(): void {
  if (powerups.length === 0) return;

  powerups.forEach((powerup) => {
    const centerX = powerup.x * CONFIG.gridSize + CONFIG.gridSize / 2;
    const centerY = powerup.y * CONFIG.gridSize + CONFIG.gridSize / 2;
    ctx.fillStyle = '#fff';
    ctx.font = '14px Courier New, monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    if (powerup.type === 'nuke') {
      ctx.fillStyle = '#eab308';
      ctx.fillText('☢', centerX, centerY + 1);
    } else if (powerup.type === 'double') {
      ctx.fillStyle = '#60a5fa';
      ctx.fillText('2x', centerX, centerY + 1);
    } else {
      ctx.fillStyle = '#f59e0b';
      ctx.fillText('⚡', centerX, centerY + 1);
    }
  });
}

function drawPortals(): void {
  if (!portalActive || !portals) return;

  const drawPortal = (cell: { x: number; y: number }, color: string): void => {
    const pulse = 0.8 + Math.sin(Date.now() / 180) * 0.2;
    const radius = (CONFIG.gridSize / 2 - 2) * pulse;
    const centerX = cell.x * CONFIG.gridSize + CONFIG.gridSize / 2;
    const centerY = cell.y * CONFIG.gridSize + CONFIG.gridSize / 2;

    ctx.shadowColor = color;
    ctx.shadowBlur = 12;
    ctx.strokeStyle = color;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.stroke();

    ctx.shadowBlur = 0;
  };

  drawPortal(portals.a, '#a855f7');
  drawPortal(portals.b, '#f97316');
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
  const scoreDelta = doublePointsActive ? 2 : 1;
  score += scoreDelta;
  fruitsEaten += 1;
  scoreEl.textContent = String(score);

  if (timeModeEnabled) {
    timeRemainingMs = timeLimitMs;
    timeLastTick = performance.now();
    updateTimeDisplay();
  }

  growPending += 1;

  currentSpeed = Math.max(CONFIG.minSpeed, currentSpeed - CONFIG.speedIncrement);

  // Remove the eaten food
  foods.splice(eatenIndex, 1);

  // Maintain target food count based on progress (1 + every 20 fruits, capped at maxFoods)
  const targetFoodCount = Math.min(CONFIG.maxFoods, 1 + Math.floor(fruitsEaten / 20));
  while (foods.length < targetFoodCount) {
    spawnFood();
  }
}

function isNearSnake(cell: { x: number; y: number }): boolean {
  return snake.some(
    (segment) => Math.abs(segment.x - cell.x) <= 1 && Math.abs(segment.y - cell.y) <= 1
  );
}

function isCellFree(cell: { x: number; y: number }): boolean {
  if (cell.x < 0 || cell.x >= CELL_COUNT || cell.y < 0 || cell.y >= CELL_COUNT) return false;
  if (snake.some((segment) => segment.x === cell.x && segment.y === cell.y)) return false;
  if (foods.some((f) => f.x === cell.x && f.y === cell.y)) return false;
  if (isEnemyCellOccupied(cell)) return false;
  return true;
}

function isExitSafe(cell: { x: number; y: number }, dir: { x: number; y: number }): boolean {
  if (!isCellFree(cell)) return false;

  const forward = { x: cell.x + dir.x, y: cell.y + dir.y };
  if (!isCellFree(forward)) return false;

  const neighbors = [
    { x: cell.x + 1, y: cell.y },
    { x: cell.x - 1, y: cell.y },
    { x: cell.x, y: cell.y + 1 },
    { x: cell.x, y: cell.y - 1 },
  ];

  const hasAlternate = neighbors.some((n) => (n.x !== forward.x || n.y !== forward.y) && isCellFree(n));
  return hasAlternate;
}

function isPortalCellValid(cell: { x: number; y: number }, other?: { x: number; y: number }): boolean {
  if (other && cell.x === other.x && cell.y === other.y) return false;
  if (isNearSnake(cell)) return false;
  if (!isExitSafe(cell, direction)) return false;
  return true;
}

function randomCell(): { x: number; y: number } {
  return {
    x: Math.floor(Math.random() * CELL_COUNT),
    y: Math.floor(Math.random() * CELL_COUNT),
  };
}

function getPortalSpawnInterval(): number {
  return (30 + Math.random() * 30) * 1000;
}

function spawnPortals(): void {
  if (!portalsEnabled) return;

  let a: { x: number; y: number } | null = null;
  let b: { x: number; y: number } | null = null;
  let attempts = 0;

  while (!a && attempts < 500) {
    const candidate = randomCell();
    if (isPortalCellValid(candidate)) {
      a = candidate;
    }
    attempts += 1;
  }

  attempts = 0;
  while (!b && attempts < 500) {
    const candidate = randomCell();
    if (a && isPortalCellValid(candidate, a)) {
      b = candidate;
    }
    attempts += 1;
  }

  if (a && b) {
    portals = { a, b };
    portalActive = true;
    nextPortalSpawnAt = performance.now() + getPortalSpawnInterval();
    return;
  }

  portalActive = false;
  portals = null;
  nextPortalSpawnAt = performance.now() + getPortalSpawnInterval();
}

function clearPortals(): void {
  portalActive = false;
  portals = null;
  nextPortalSpawnAt = 0;
  portalImmunityUntil = 0;
  portalCooldownUntil = 0;
}

function handlePortalTeleport(): void {
  if (!portalActive || !portals) return;

  const now = performance.now();
  if (now < portalCooldownUntil) return;

  const head = snake[0];
  if (head.x === portals.a.x && head.y === portals.a.y && isExitSafe(portals.b, direction)) {
    snake[0] = { ...portals.b };
    portalImmunityUntil = now + 300;
    portalCooldownUntil = now + 150;
  } else if (head.x === portals.b.x && head.y === portals.b.y && isExitSafe(portals.a, direction)) {
    snake[0] = { ...portals.a };
    portalImmunityUntil = now + 300;
    portalCooldownUntil = now + 150;
  }
}

// Main game tick: move, check collisions, handle food
function updateGame(): void {
  moveSnake();

  handlePortalTeleport();

  moveEnemies();
  handleEnemyPortalTeleport();
  if (performance.now() >= portalImmunityUntil) {
    if (handleEnemyCollisions()) {
      handleGameOver();
      return;
    }

    if (collisionDetection()) {
      handleGameOver();
      return;
    }
  }

  if (handlePowerupPickup()) {
    // Powerup applied
  }

  const eatenIndex = checkFoodEaten();
  if (eatenIndex !== -1) {
    handleFoodEaten(eatenIndex);
  }

  if (growPending > 0) {
    growPending -= 1;
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
  drawPortals();
  drawPowerups();
  drawEnemies();
  drawSnake();
}

// ============================================================
// SECTION 8: GAME LOOP
// ============================================================
function gameLoop(timestamp: number): void {
  if (gameState !== 'running') return;

  if (timeModeEnabled) {
    const elapsed = timestamp - timeLastTick;
    timeRemainingMs = Math.max(0, timeRemainingMs - elapsed);
    updateTimeDisplay();
    if (timeRemainingMs <= 0) {
      handleGameOver();
      return;
    }
    timeLastTick = timestamp;
  }

  if (portalsEnabled && timestamp >= nextPortalSpawnAt) {
    spawnPortals();
  }

  if (enemiesEnabled && timestamp >= nextEnemySpawnAt) {
    spawnEnemyBatch();
    nextEnemySpawnAt = performance.now() + getEnemySpawnInterval();
  }

  if (doublePointsActive && timestamp >= doublePointsEndsAt) {
    doublePointsActive = false;
  }

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
  timeLastTick = lastTick;
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
  optionsPanel.classList.add('hidden');
  optionsPanelPaused = false;

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
    if (devPanelPaused && gameState === 'paused' && optionsPanel.classList.contains('hidden')) {
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

function toggleOptionsPanel(): void {
  const wasHidden = optionsPanel.classList.contains('hidden');
  optionsPanel.classList.toggle('hidden');

  if (wasHidden) {
    if (gameState === 'running') {
      optionsPanelPaused = true;
      gameState = 'paused';
      stopGameLoop();
      pauseScreen.classList.remove('hidden');
    }
  } else {
    if (optionsPanelPaused && gameState === 'paused' && devPanel.classList.contains('hidden')) {
      optionsPanelPaused = false;
      gameState = 'running';
      pauseScreen.classList.add('hidden');
      startGameLoop();
    }
  }
}

function handlePortalsToggle(e: Event): void {
  const target = e.target as HTMLInputElement;
  portalsEnabled = target.checked;

  if (portalsEnabled) {
    spawnPortals();
  } else {
    clearPortals();
  }
}

function handleEnemiesToggle(e: Event): void {
  const target = e.target as HTMLInputElement;
  enemiesEnabled = target.checked;
  if (!enemiesEnabled) {
    enemies = [];
    nextEnemySpawnAt = 0;
  } else {
    nextEnemySpawnAt = performance.now() + getEnemySpawnInterval();
  }
}

function resetTimer(): void {
  timeRemainingMs = timeLimitMs;
  updateTimeDisplay();
}

function updateTimeDisplay(): void {
  const seconds = Math.ceil(timeRemainingMs / 1000);
  timeRemainingEl.textContent = String(seconds);
}

function handleTimeToggle(e: Event): void {
  const target = e.target as HTMLInputElement;
  timeModeEnabled = target.checked;

  if (timeModeEnabled) {
    timePanel.classList.remove('hidden');
    resetTimer();
  } else {
    timePanel.classList.add('hidden');
  }
}

function handleTimeLimitChange(): void {
  const val = parseInt(timeLimitInput.value, 10);
  if (!isNaN(val) && val >= 5 && val <= 600) {
    timeLimitMs = val * 1000;
    if (gameState !== 'running') {
      resetTimer();
    }
  }
}

function spawnEnemyFromDev(): void {
  if (!enemiesEnabled) return;
  spawnEnemy();
}

function isEnemyCellOccupied(cell: { x: number; y: number }): boolean {
  return enemies.some((enemy) => enemy.segments.some((segment) => segment.x === cell.x && segment.y === cell.y));
}

function isSpawnCellFree(cell: { x: number; y: number }): boolean {
  return isCellFree(cell) && !isEnemyCellOccupied(cell) && !powerups.some((p) => p.x === cell.x && p.y === cell.y);
}

function getEnemySpawnInterval(): number {
  return (1 + Math.random() * 59) * 1000;
}

function spawnEnemyBatch(): void {
  if (!enemiesEnabled) return;
  const count = 1 + Math.floor(Math.random() * 3);
  for (let i = 0; i < count; i += 1) {
    spawnEnemy();
  }
}

function spawnEnemy(): void {
  const axis: 'h' | 'v' = Math.random() > 0.5 ? 'h' : 'v';
  const dir = axis === 'h'
    ? { x: Math.random() > 0.5 ? 1 : -1, y: 0 }
    : { x: 0, y: Math.random() > 0.5 ? 1 : -1 };

  const spawnEdge = axis === 'h'
    ? (dir.x === 1 ? 2 : CELL_COUNT - 3)
    : (dir.y === 1 ? 2 : CELL_COUNT - 3);

  let attempts = 0;
  while (attempts < 200) {
    const cell = axis === 'h'
      ? { x: spawnEdge, y: Math.floor(Math.random() * CELL_COUNT) }
      : { x: Math.floor(Math.random() * CELL_COUNT), y: spawnEdge };

    const segments = [
      cell,
      { x: cell.x - dir.x, y: cell.y - dir.y },
      { x: cell.x - dir.x * 2, y: cell.y - dir.y * 2 },
    ];

    if (segments.every((segment) => isSpawnCellFree(segment)) && isExitSafe(segments[0], dir)) {
      enemies.push({ segments, dir, axis });
      return;
    }

    attempts += 1;
  }
}

function moveEnemies(): void {
  if (!enemiesEnabled || enemies.length === 0) return;

  enemies = enemies
    .map((enemy) => {
      const head = enemy.segments[0];
      const next = { x: head.x + enemy.dir.x, y: head.y + enemy.dir.y };
      if (next.x < 0 || next.x >= CELL_COUNT || next.y < 0 || next.y >= CELL_COUNT) {
        return null;
      }
      const nextSegments = [next, ...enemy.segments.slice(0, 2)];
      return { ...enemy, segments: nextSegments };
    })
    .filter((enemy) => enemy !== null) as typeof enemies;
}

function handleEnemyPortalTeleport(): void {
  if (!portalActive || !portals || enemies.length === 0) return;

  const now = performance.now();
  if (now < portalCooldownUntil) return;

  enemies.forEach((enemy) => {
    const head = enemy.segments[0];
    if (head.x === portals.a.x && head.y === portals.a.y && isExitSafe(portals.b, enemy.dir)) {
      enemy.segments[0] = { ...portals.b };
    } else if (head.x === portals.b.x && head.y === portals.b.y && isExitSafe(portals.a, enemy.dir)) {
      enemy.segments[0] = { ...portals.a };
    }
  });
}

function handleEnemyCollisions(): boolean {
  if (enemies.length === 0) return false;
  const head = snake[0];

  let gameOver = false;
  const remainingEnemies: typeof enemies = [];

  enemies.forEach((enemy) => {
    const enemyHead = enemy.segments[0];
    const enemyBody = enemy.segments.slice(1);
    const headHitsBody = enemyBody.some((segment) => segment.x === head.x && segment.y === head.y);
    const headsCollide = enemyHead.x === head.x && enemyHead.y === head.y;
    const enemyHitsBody = snake.slice(1).some((segment) => segment.x === enemyHead.x && segment.y === enemyHead.y);

    if (headsCollide) {
      spawnPowerup(enemyHead);
      gameOver = true;
      return;
    }

    if (headHitsBody) {
      gameOver = true;
      return;
    }

    if (enemyHitsBody) {
      spawnPowerup(enemyHead);
      return;
    }

    remainingEnemies.push(enemy);
  });

  enemies = remainingEnemies;
  return gameOver;
}

function spawnPowerup(cell: { x: number; y: number }): void {
  if (cell.x < 0 || cell.x >= CELL_COUNT || cell.y < 0 || cell.y >= CELL_COUNT) return;
  if (powerups.some((p) => p.x === cell.x && p.y === cell.y)) return;
  const roll = Math.random();
  if (roll < 0.15) {
    powerups.push({ x: cell.x, y: cell.y, type: 'nuke' });
  } else if (roll < 0.5) {
    powerups.push({ x: cell.x, y: cell.y, type: 'double' });
  } else if (roll < 0.75) {
    powerups.push({ x: cell.x, y: cell.y, type: 'frenzy' });
  }
}

function handlePowerupPickup(): boolean {
  if (powerups.length === 0) return false;
  const head = snake[0];
  const index = powerups.findIndex((powerup) => powerup.x === head.x && powerup.y === head.y);
  if (index === -1) return false;

  const powerup = powerups[index];
  powerups.splice(index, 1);

  if (powerup.type === 'nuke') {
    const clearedCount = foods.length;
    foods = [];
    spawnFood();
    score += clearedCount;
    fruitsEaten += clearedCount;
    scoreEl.textContent = String(score);
    growPending += clearedCount;
  } else if (powerup.type === 'double') {
    doublePointsActive = true;
    doublePointsEndsAt = performance.now() + 20000;
  } else if (powerup.type === 'frenzy') {
    for (let i = 0; i < 5; i += 1) {
      spawnFood();
    }
  }

  return true;
}

// ============================================================
// SECTION 12: BOOT
// ============================================================
init();
