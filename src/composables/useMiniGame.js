import { computed, onScopeDispose, ref } from 'vue'

const BOARD_COLUMNS = 9
const BOARD_ROWS = 10
const INITIAL_LIVES = 3
const INITIAL_ENEMIES = [
  { row: 1, column: 1 },
  { row: 1, column: 3 },
  { row: 1, column: 5 },
  { row: 1, column: 7 },
  { row: 2, column: 2 },
  { row: 2, column: 4 },
  { row: 2, column: 6 },
]

let entityId = 0

function createEnemies() {
  return INITIAL_ENEMIES.map((enemy) => ({ ...enemy, id: `enemy-${++entityId}` }))
}

export function useMiniGame() {
  const playerColumn = ref(4)
  const enemies = ref(createEnemies())
  const bullets = ref([])
  const score = ref(0)
  const lives = ref(INITIAL_LIVES)
  const state = ref('idle')
  const statusMessage = ref('Натисніть «Почати гру» та знищте всіх прибульців.')

  let loopId = null
  let enemyDirection = 1
  let tick = 0

  const isRunning = computed(() => state.value === 'running')

  function stopLoop() {
    if (loopId !== null) {
      window.clearInterval(loopId)
      loopId = null
    }
  }

  function resetRound() {
    playerColumn.value = 4
    enemies.value = createEnemies()
    bullets.value = []
    enemyDirection = 1
    tick = 0
  }

  function start() {
    stopLoop()
    score.value = 0
    lives.value = INITIAL_LIVES
    state.value = 'running'
    statusMessage.value = 'Гра триває. Стрілки — рух, пробіл — постріл.'
    resetRound()
    loopId = window.setInterval(step, 260)
  }

  function move(direction) {
    if (!isRunning.value) return
    playerColumn.value = Math.min(BOARD_COLUMNS - 1, Math.max(0, playerColumn.value + direction))
  }

  function shoot() {
    if (!isRunning.value) return

    const hasActiveBullet = bullets.value.some((bullet) => bullet.column === playerColumn.value)
    if (hasActiveBullet) return

    bullets.value.push({
      id: `bullet-${++entityId}`,
      row: BOARD_ROWS - 2,
      column: playerColumn.value,
    })
  }

  function resolveCollisions() {
    const enemyIds = new Set()
    const bulletIds = new Set()

    bullets.value.forEach((bullet) => {
      const enemy = enemies.value.find(
        (target) => target.row === bullet.row && target.column === bullet.column && !enemyIds.has(target.id),
      )

      if (enemy) {
        enemyIds.add(enemy.id)
        bulletIds.add(bullet.id)
      }
    })

    if (enemyIds.size > 0) {
      enemies.value = enemies.value.filter((enemy) => !enemyIds.has(enemy.id))
      bullets.value = bullets.value.filter((bullet) => !bulletIds.has(bullet.id))
      score.value += enemyIds.size * 100
    }

    if (enemies.value.length === 0) {
      state.value = 'won'
      statusMessage.value = `Перемога! Рахунок: ${score.value}.`
      stopLoop()
    }
  }

  function moveEnemies() {
    if (enemies.value.length === 0) return

    const nextColumns = enemies.value.map((enemy) => enemy.column + enemyDirection)
    const hitEdge = nextColumns.some((column) => column < 0 || column >= BOARD_COLUMNS)

    if (hitEdge) {
      enemyDirection *= -1
      enemies.value = enemies.value.map((enemy) => ({ ...enemy, row: enemy.row + 1 }))
    } else {
      enemies.value = enemies.value.map((enemy) => ({ ...enemy, column: enemy.column + enemyDirection }))
    }

    if (enemies.value.some((enemy) => enemy.row >= BOARD_ROWS - 1)) {
      lives.value -= 1

      if (lives.value <= 0) {
        state.value = 'lost'
        statusMessage.value = `Гру завершено. Ваш рахунок: ${score.value}.`
        stopLoop()
        return
      }

      statusMessage.value = `Прибульці прорвалися. Залишилось життів: ${lives.value}.`
      resetRound()
    }
  }

  function step() {
    if (!isRunning.value) return

    tick += 1
    bullets.value = bullets.value
      .map((bullet) => ({ ...bullet, row: bullet.row - 1 }))
      .filter((bullet) => bullet.row >= 0)

    resolveCollisions()
    if (!isRunning.value) return

    if (tick % 2 === 0) moveEnemies()
    resolveCollisions()
  }

  function handleKeydown(event) {
    if (event.key === 'ArrowLeft' || event.key.toLowerCase() === 'a') {
      event.preventDefault()
      move(-1)
    } else if (event.key === 'ArrowRight' || event.key.toLowerCase() === 'd') {
      event.preventDefault()
      move(1)
    } else if (event.code === 'Space') {
      event.preventDefault()
      shoot()
    }
  }

  onScopeDispose(stopLoop)

  return {
    boardColumns: BOARD_COLUMNS,
    boardRows: BOARD_ROWS,
    bullets,
    enemies,
    handleKeydown,
    isRunning,
    lives,
    move,
    playerColumn,
    score,
    shoot,
    start,
    state,
    statusMessage,
  }
}
