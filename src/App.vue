<script setup lang="ts">
import { ref, onMounted } from 'vue'

// =====================
// GAME STATE
// =====================

const score = ref(0)
const gameCanvas = ref<HTMLCanvasElement | null>(null)

// =====================
// RESTART GAME
// =====================

function restartGame() {
  score.value = 0
  console.log("Game restarted")
}

// =====================
// SETUP CANVAS
// =====================

onMounted(() => {
  const canvas = gameCanvas.value
  if (!canvas) return

  const ctx = canvas.getContext("2d")
  if (!ctx) return

  // test draw
  ctx.fillStyle = "red"
  ctx.fillRect(50, 50, 20, 20)
})
</script>

<template>
  <div class="game-container">

    <h1>Snake Game</h1>

    <div class="score-board">
      Score: {{ score }}
    </div>

    <canvas
      ref="gameCanvas"
      width="400"
      height="400"
    ></canvas>

    <button @click="restartGame">
      Restart Game
    </button>

  </div>
</template>

<style scoped>
.game-container {
  text-align: center;
}

canvas {
  background: black;
  border: 2px solid white;
}

button {
  margin-top: 10px;
  padding: 10px;
}
</style>