<script setup>
import { nextTick, ref } from 'vue'
import { Gamepad2, Heart, MoveLeft, MoveRight, Rocket, RotateCw, Target } from '@lucide/vue'
import InteractiveWindow from './InteractiveWindow.vue'
import { useMiniGame } from '@/composables/useMiniGame'

defineEmits(['close'])

const {
  boardColumns,
  boardRows,
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
} = useMiniGame()

const board = ref(null)

async function startGame() {
  start()
  await nextTick()
  board.value?.focus()
}
</script>

<template>
  <InteractiveWindow :title="$t('game.title')" size="medium" @close="$emit('close')">
    <template #icon>
      <Gamepad2 aria-hidden="true" />
    </template>

    <div class="mini-game">
      <header class="game-stats">
        <span><Target aria-hidden="true" /> {{ $t('game.score') }} <strong>{{ score }}</strong></span>
        <span><Heart aria-hidden="true" /> {{ $t('game.lives') }} <strong>{{ lives }}</strong></span>
      </header>

      <div
        ref="board"
        class="game-board"
        role="application"
        tabindex="0"
        :aria-label="$t('game.board')"
        aria-keyshortcuts="ArrowLeft ArrowRight Space"
        :style="{ '--game-columns': boardColumns, '--game-rows': boardRows }"
        @keydown="handleKeydown"
      >
        <span class="game-board__stars" aria-hidden="true"></span>

        <span
          v-for="enemy in enemies"
          :key="enemy.id"
          class="enemy"
          :style="{ gridColumn: enemy.column + 1, gridRow: enemy.row + 1 }"
          aria-hidden="true"
        >
          <span></span>
        </span>

        <span
          v-for="bullet in bullets"
          :key="bullet.id"
          class="bullet"
          :style="{ gridColumn: bullet.column + 1, gridRow: bullet.row + 1 }"
          aria-hidden="true"
        ></span>

        <span
          class="player"
          :style="{ gridColumn: playerColumn + 1, gridRow: boardRows }"
          aria-hidden="true"
        >
          <Rocket />
        </span>

        <div v-if="!isRunning" class="game-board__overlay">
          <Gamepad2 aria-hidden="true" />
          <strong v-if="state === 'won'">{{ $t('game.won') }}</strong>
          <strong v-else-if="state === 'lost'">{{ $t('game.lost') }}</strong>
          <strong v-else>{{ $t('game.ready') }}</strong>
          <button type="button" @click="startGame">
            <RotateCw v-if="state !== 'idle'" aria-hidden="true" />
            {{ state === 'idle' ? $t('game.start') : $t('game.again') }}
          </button>
        </div>
      </div>

      <p class="game-status" aria-live="polite">
        {{ statusMessage }}
      </p>

      <div class="touch-controls" :aria-label="$t('game.touch')">
        <button type="button" :disabled="!isRunning" :aria-label="$t('game.left')" @pointerdown.prevent="move(-1)">
          <MoveLeft aria-hidden="true" />
        </button>
        <button class="touch-controls__fire" type="button" :disabled="!isRunning" :aria-label="$t('game.fire')" @pointerdown.prevent="shoot">
          <span aria-hidden="true"></span>
          {{ $t('game.fire') }}
        </button>
        <button type="button" :disabled="!isRunning" :aria-label="$t('game.right')" @pointerdown.prevent="move(1)">
          <MoveRight aria-hidden="true" />
        </button>
      </div>

      <p class="game-help">
        {{ $t('game.keyboard') }} <kbd>←</kbd> <kbd>→</kbd> {{ $t('game.movement') }} <kbd>Space</kbd> {{ $t('game.shot') }}
      </p>
    </div>
  </InteractiveWindow>
</template>

<style lang="scss" scoped>
.mini-game {
  min-height: 520px;
  display: flex;
  flex-direction: column;
  padding: clamp(16px, 3vw, 26px);
  background:
    radial-gradient(circle at 50% 15%, rgba(78, 36, 170, 0.2), transparent 19rem),
    #020711;
}

.game-stats {
  display: flex;
  justify-content: space-between;
  gap: 14px;
  margin-bottom: 13px;
  color: #83e8ff;
  font: 0.75rem var(--font-mono);

  span { display: flex; align-items: center; gap: 6px; }
  svg { width: 16px; color: #ff4f82; }
  span:first-child svg { color: #66f4ff; }
  strong { color: #fff; }
}

.game-board {
  position: relative;
  width: min(100%, 500px);
  aspect-ratio: 1.45;
  display: grid;
  grid-template-columns: repeat(var(--game-columns), 1fr);
  grid-template-rows: repeat(var(--game-rows), 1fr);
  align-self: center;
  overflow: hidden;
  border: 1px solid rgba(105, 221, 255, 0.22);
  border-radius: 10px;
  background:
    radial-gradient(circle at 20% 40%, rgba(43, 96, 195, 0.17), transparent 22%),
    linear-gradient(#01030b, #061225);
  box-shadow: inset 0 0 40px rgba(0, 0, 0, 0.7), 0 0 28px rgba(18, 134, 255, 0.08);

  &:focus-visible { outline-offset: 4px; }
}

.game-board__stars,
.game-board__stars::before,
.game-board__stars::after {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background-image:
    radial-gradient(circle at 15% 15%, #fff 0 1px, transparent 1.5px),
    radial-gradient(circle at 72% 30%, #7de8ff 0 1px, transparent 1.5px),
    radial-gradient(circle at 44% 72%, #fff 0 1px, transparent 1.5px),
    radial-gradient(circle at 88% 82%, #7de8ff 0 1px, transparent 1.5px);
  content: '';
}

.game-board__stars::before { transform: translate(8%, 22%); opacity: 0.6; }
.game-board__stars::after { transform: translate(-11%, 35%); opacity: 0.35; }

.enemy,
.bullet,
.player {
  z-index: 2;
  place-self: center;
}

.enemy {
  position: relative;
  width: clamp(17px, 4vw, 25px);
  height: clamp(11px, 2.7vw, 17px);
  border-radius: 45% 45% 25% 25%;
  background: #61ef77;
  box-shadow: 0 0 10px rgba(97, 239, 119, 0.55);
  transition: grid-column 150ms linear, grid-row 150ms linear;

  &::before,
  &::after {
    position: absolute;
    top: 55%;
    width: 4px;
    height: 7px;
    background: inherit;
    content: '';
  }

  &::before { left: 2px; transform: rotate(24deg); }
  &::after { right: 2px; transform: rotate(-24deg); }

  span::before,
  span::after {
    position: absolute;
    top: 5px;
    width: 3px;
    height: 3px;
    border-radius: 1px;
    background: #031407;
    content: '';
  }

  span::before { left: 6px; }
  span::after { right: 6px; }
}

.bullet {
  width: 3px;
  height: 12px;
  border-radius: 99px;
  background: #72efff;
  box-shadow: 0 0 8px #1ed7ff;
}

.player {
  width: 34px;
  height: 34px;
  display: grid;
  place-items: center;
  color: #e9faff;
  filter: drop-shadow(0 0 7px #25c6ff);
  transform: rotate(-45deg);
  transition: grid-column 90ms ease;

  svg { width: 28px; fill: rgba(40, 197, 255, 0.28); }
}

.game-board__overlay {
  position: absolute;
  z-index: 5;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background: rgba(1, 5, 15, 0.73);
  backdrop-filter: blur(3px);

  > svg { width: 36px; color: #69e5ff; }

  button {
    min-height: 40px;
    display: inline-flex;
    align-items: center;
    gap: 7px;
    margin-top: 4px;
    padding: 8px 15px;
    border: 1px solid rgba(105, 229, 255, 0.4);
    border-radius: 7px;
    background: linear-gradient(145deg, #1cbed4, #087a9c);
    color: #00151c;
    cursor: pointer;
    font-weight: 800;

    &:hover { filter: brightness(1.12); }
    svg { width: 16px; }
  }
}

.game-status {
  min-height: 22px;
  margin: 10px 0 8px;
  color: #9db6c7;
  font-size: 0.72rem;
  text-align: center;
}

.touch-controls {
  display: flex;
  justify-content: center;
  gap: 10px;

  button {
    min-width: 52px;
    min-height: 44px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 7px;
    border: 1px solid rgba(102, 228, 255, 0.24);
    border-radius: 8px;
    background: rgba(53, 135, 177, 0.12);
    color: #bfefff;
    cursor: pointer;
    touch-action: manipulation;

    &:hover:not(:disabled) { background: rgba(53, 190, 229, 0.2); }
    &:disabled { cursor: not-allowed; opacity: 0.35; }
    svg { width: 19px; }
  }
}

.touch-controls__fire {
  padding-inline: 18px;
  color: #ffcfdb !important;

  span {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #ff4978;
    box-shadow: 0 0 8px rgba(255, 73, 120, 0.7);
  }
}

.game-help {
  margin: 10px 0 0;
  color: #718795;
  font-size: 0.66rem;
  text-align: center;

  kbd {
    padding: 2px 5px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 4px;
    background: rgba(255, 255, 255, 0.06);
    color: #c8dae6;
    font-family: var(--font-mono);
  }
}

@media (max-width: 640px) {
  .mini-game { min-height: 100%; justify-content: center; }
  .game-board { aspect-ratio: 1.05; }
  .game-help { display: none; }
}
</style>
