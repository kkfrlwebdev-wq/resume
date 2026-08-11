<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { Braces, CodeXml, Globe2, Smartphone } from '@lucide/vue'
import { skills } from '@/data/skills'

const capabilities = [
  { labelKey: 'home.capabilities.development', icon: Braces },
  { labelKey: 'home.capabilities.crossBrowser', icon: Globe2, yellow: true },
  { labelKey: 'home.capabilities.responsive', icon: Smartphone },
  { labelKey: 'home.capabilities.cleanCode', icon: CodeXml },
]

const selectedSkill = ref(null)
const technologyField = ref(null)
const landedSkills = ref([])
const dropElements = new Map()
const physicsStates = new Map()
const skillSettings = new Map(skills.map((skill) => [skill.id, skill]))
const pointer = { active: false, x: 0, y: 0 }
let animationFrame = 0
let physicsEnabled = false

function toggleSkill(skillId) {
  selectedSkill.value = selectedSkill.value === skillId ? null : skillId
}

function registerDrop(skillId, element) {
  if (element) dropElements.set(skillId, element)
  else dropElements.delete(skillId)
}

function landSkill(skillId) {
  const element = dropElements.get(skillId)
  const settings = skillSettings.get(skillId)
  if (!element || !settings || physicsStates.has(skillId)) return

  const state = {
    x: element.offsetLeft,
    y: element.offsetTop,
    vx: 0,
    vy: 0,
    size: element.offsetWidth || 49,
  }

  physicsStates.set(skillId, state)
  applyPhysicsPosition(element, state)
  landedSkills.value = [...landedSkills.value, skillId]
  startPhysics()
}

function handlePointerMove(event) {
  if (event.pointerType && event.pointerType !== 'mouse') return

  const bounds = technologyField.value?.getBoundingClientRect()
  if (!bounds) return

  pointer.active = true
  pointer.x = event.clientX - bounds.left
  pointer.y = event.clientY - bounds.top
  startPhysics()
}

function handlePointerLeave() {
  pointer.active = false
  startPhysics()
}

function startPhysics() {
  if (physicsEnabled && !animationFrame && typeof globalThis.requestAnimationFrame === 'function') {
    animationFrame = globalThis.requestAnimationFrame(updatePhysics)
  }
}

function applyPhysicsPosition(element, state) {
  element.style.setProperty('--physics-x', `${state.x.toFixed(2)}px`)
  element.style.setProperty('--physics-y', `${state.y.toFixed(2)}px`)
}

function resolveCollisions(states) {
  for (let firstIndex = 0; firstIndex < states.length; firstIndex += 1) {
    for (let secondIndex = firstIndex + 1; secondIndex < states.length; secondIndex += 1) {
      const first = states[firstIndex]
      const second = states[secondIndex]
      const deltaX = second.x + second.size / 2 - (first.x + first.size / 2)
      const deltaY = second.y + second.size / 2 - (first.y + first.size / 2)
      const overlapX = (first.size + second.size) / 2 - Math.abs(deltaX)
      const overlapY = (first.size + second.size) / 2 - Math.abs(deltaY)

      if (overlapX <= 0 || overlapY <= 0) continue

      let normalX = 0
      let normalY = 0
      let overlap = overlapY

      if (overlapX < overlapY) {
        normalX = deltaX < 0 ? -1 : 1
        overlap = overlapX
      } else {
        normalY = deltaY < 0 ? -1 : 1
      }

      const correction = overlap * 0.51
      first.x -= normalX * correction
      first.y -= normalY * correction
      second.x += normalX * correction
      second.y += normalY * correction

      const relativeVelocity = (second.vx - first.vx) * normalX + (second.vy - first.vy) * normalY
      if (relativeVelocity < 0) {
        const impulse = -(1.22 * relativeVelocity) / 2
        first.vx -= impulse * normalX
        first.vy -= impulse * normalY
        second.vx += impulse * normalX
        second.vy += impulse * normalY
      }
    }
  }
}

function updatePhysics() {
  animationFrame = 0
  let needsNextFrame = false
  const fieldWidth = technologyField.value?.clientWidth ?? 0
  const fieldHeight = technologyField.value?.clientHeight ?? 0
  const states = [...physicsStates.values()]

  for (const [skillId, state] of physicsStates) {
    const element = dropElements.get(skillId)
    if (!element) continue

    state.size = element.offsetWidth || state.size

    if (pointer.active) {
      const centerX = state.x + state.size / 2
      const centerY = state.y + state.size / 2
      const deltaX = centerX - pointer.x
      const deltaY = centerY - pointer.y
      const distance = Math.max(Math.hypot(deltaX, deltaY), 1)
      const radius = 135

      if (distance < radius) {
        const force = (1 - distance / radius) * 1.15
        state.vx += (deltaX / distance) * force
        state.vy += (deltaY / distance) * force
        needsNextFrame = true
      }
    }

    state.vy += 0.2
    state.vx *= 0.985
    state.vy *= 0.995
    state.x += state.vx
    state.y += state.vy

    if (state.x < 0) {
      state.x = 0
      state.vx = Math.abs(state.vx) * 0.42
    } else if (state.x + state.size > fieldWidth) {
      state.x = Math.max(0, fieldWidth - state.size)
      state.vx = -Math.abs(state.vx) * 0.42
    }

    if (state.y < 0) {
      state.y = 0
      state.vy = Math.abs(state.vy) * 0.35
    } else if (state.y + state.size > fieldHeight) {
      state.y = Math.max(0, fieldHeight - state.size)
      state.vy = Math.abs(state.vy) < 0.42 ? 0 : -Math.abs(state.vy) * 0.24
      state.vx *= 0.9
    }
  }

  resolveCollisions(states)

  for (const [skillId, state] of physicsStates) {
    const element = dropElements.get(skillId)
    if (!element) continue

    state.x = Math.max(0, Math.min(Math.max(0, fieldWidth - state.size), state.x))
    state.y = Math.max(0, Math.min(Math.max(0, fieldHeight - state.size), state.y))

    const onFloor = state.y + state.size >= fieldHeight - 0.5
    const isSupported = onFloor || states.some((other) => {
      if (other === state) return false
      const horizontalOverlap = Math.min(state.x + state.size, other.x + other.size) - Math.max(state.x, other.x)
      const verticalGap = Math.abs(state.y + state.size - other.y)
      return horizontalOverlap > 5 && verticalGap < 2
    })

    if (isSupported && !pointer.active && Math.abs(state.vy) < 0.14) state.vy = 0
    if (isSupported && Math.abs(state.vx) < 0.025) state.vx = 0

    if (Math.abs(state.vx) > 0.025 || Math.abs(state.vy) > 0.12) {
      needsNextFrame = true
    }

    applyPhysicsPosition(element, state)
  }

  if (needsNextFrame) animationFrame = globalThis.requestAnimationFrame(updatePhysics)
}

onMounted(() => {
  const reducedMotion = globalThis.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  physicsEnabled = !reducedMotion
  globalThis.addEventListener?.('resize', startPhysics)
})

onBeforeUnmount(() => {
  if (animationFrame && typeof globalThis.cancelAnimationFrame === 'function') {
    globalThis.cancelAnimationFrame(animationFrame)
  }
  globalThis.removeEventListener?.('resize', startPhysics)
})
</script>

<template>
  <div
    class="hero-visual"
    :aria-label="$t('home.competencies')"
    @pointermove="handlePointerMove"
    @pointerleave="handlePointerLeave"
  >
    <div class="wave-orb" aria-hidden="true">
      <i v-for="index in 9" :key="index" :style="{ '--index': index }"></i>
    </div>

    <div class="capability-grid" :aria-label="$t('home.competencies')">
      <div v-for="item in capabilities" :key="item.labelKey" class="capability">
        <component :is="item.icon" :class="{ yellow: item.yellow }" aria-hidden="true" />
        <span>{{ $t(item.labelKey) }}</span>
      </div>
    </div>

    <div ref="technologyField" class="technology-field" :aria-label="$t('home.technologies')">
      <div
        v-for="item in skills"
        :key="item.id"
        :ref="(element) => registerDrop(item.id, element)"
        class="tech-drop"
        :class="[
          `tech-drop--${item.group}`,
          { 'has-landed': landedSkills.includes(item.id), 'is-selected': selectedSkill === item.id },
        ]"
        :style="{
          '--x': `${item.x}%`,
          '--land-y': `${item.landY}px`,
          '--delay': `${item.delay}s`,
          '--duration': `${item.duration}s`,
        }"
        @animationend.self="landSkill(item.id)"
      >
        <button
          class="tech-card"
          type="button"
          :aria-label="$t(selectedSkill === item.id ? 'home.deselectTechnology' : 'home.selectTechnology', { technology: item.name })"
          :aria-pressed="selectedSkill === item.id"
          @click="toggleSkill(item.id)"
        >
          <span class="tech-card__mark" aria-hidden="true">{{ item.shortName }}</span>
          <span class="tech-card__name">{{ item.name }}</span>
          <span v-if="selectedSkill === item.id" class="tech-card__status">{{ $t('home.selected') }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.hero-visual {
  position: relative;
  min-height: 540px;
  overflow: visible;
}

.wave-orb {
  position: absolute;
  top: 61%;
  left: 50%;
  width: min(410px, 85%);
  aspect-ratio: 1;
  border-radius: 50%;
  filter: drop-shadow(0 0 20px rgba(0, 231, 240, 0.18));
  transform: translate(-50%, -50%) rotate(-16deg);

  &::after {
    position: absolute;
    inset: 24%;
    border-radius: 50%;
    background: rgba(0, 231, 240, 0.06);
    box-shadow: 0 0 60px rgba(0, 231, 240, 0.16);
    content: '';
  }

  i {
    position: absolute;
    inset: calc(var(--index) * 2.5%);
    border: 1px solid rgba(0, 231, 240, calc(.15 + var(--index) * .025));
    border-radius: 48% 52% 60% 40% / 42% 48% 52% 58%;
    animation: orbit calc(12s + var(--index) * 1s) linear infinite;
  }
}

.capability-grid {
  position: absolute;
  z-index: 4;
  top: -120px;
  right: 0;
  left: 0;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 10px;
}

.capability {
  min-height: 74px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 9px;
  padding: 10px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background: rgba(5, 14, 20, 0.9);
  box-shadow: 0 16px 45px rgba(0, 0, 0, 0.34);
  backdrop-filter: blur(14px);
  text-align: center;

  svg { width: 21px; flex: 0 0 auto; color: var(--color-primary); }
  svg.yellow { color: var(--color-secondary); }
  span { font-size: 0.68rem; font-weight: 750; }
}

.technology-field {
  position: absolute;
  z-index: 2;
  top: -16px;
  right: 5%;
  bottom: 38px;
  left: 5%;
}

.tech-drop {
  position: absolute;
  bottom: var(--land-y);
  left: var(--x);
  z-index: 2;
  animation: technology-fall var(--duration) cubic-bezier(.2, .7, .25, 1) var(--delay) both;
  will-change: transform, opacity;

  &.has-landed {
    animation: none;
    top: 0;
    bottom: auto;
    left: 0;
    opacity: 1;
    transform: translate3d(var(--physics-x, 0), var(--physics-y, 0), 0);
  }

  &:hover,
  &:focus-within,
  &.is-selected {
    z-index: 5;
  }
}

.tech-card {
  width: 49px;
  aspect-ratio: 1;
  display: grid;
  place-items: center;
  align-content: center;
  gap: 3px;
  padding: 5px;
  border: 1px solid rgba(0, 231, 240, 0.3);
  border-radius: 8px;
  background: rgba(5, 14, 20, 0.92);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.34);
  color: var(--color-text);
  cursor: pointer;
  backdrop-filter: blur(12px);
  transition: border-color var(--transition), box-shadow var(--transition), scale var(--transition);

  &:hover,
  &:focus-visible,
  &[aria-pressed='true'] {
    border-color: var(--color-primary);
    box-shadow: 0 0 0 1px rgba(0, 231, 240, 0.18), 0 0 28px rgba(0, 231, 240, 0.22);
    translate: 0 -5px;
    scale: 1.08;
  }

  &__mark {
    color: var(--color-primary);
    font: 800 0.65rem/1 var(--font-mono);
  }

  &__name {
    font-size: 0.43rem;
    font-weight: 750;
  }

  &__status {
    color: var(--color-secondary);
    font-size: 0.4rem;
    font-weight: 750;
  }
}

.tech-drop--javascript .tech-card__mark { color: var(--color-secondary); }
.tech-drop--markup .tech-card__mark { color: #ff8b68; }
.tech-drop--workflow .tech-card__mark { color: var(--color-success); }
.tech-drop--database .tech-card__mark { color: #8aa8ff; }
.tech-drop--ecosystem .tech-card__mark { color: #8d7dff; }
.tech-drop--testing .tech-card__mark { color: #ff6f91; }

@keyframes orbit { to { transform: rotate(1turn); } }

@keyframes technology-fall {
  0% {
    opacity: 0;
    transform: translate3d(0, -620px, 0);
  }
  8% { opacity: 1; }
  68% { transform: translate3d(0, 0, 0); }
  78% { transform: translate3d(0, -18px, 0); }
  86% { transform: translate3d(0, 0, 0); }
  93% { transform: translate3d(0, -5px, 0); }
  100% {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}

@media (max-width: 1000px) {
  .hero-visual { min-height: 510px; }
  .capability-grid { top: -72px; }
  .technology-field { top: 20px; }
  .capability { flex-direction: column; gap: 5px; }
  .tech-card { width: 45px; }
}

@media (max-width: 820px) {
  .hero-visual {
    min-height: 510px;
    margin-top: 12px;
    overflow: hidden;
  }

  .wave-orb { top: 62%; width: min(390px, 78vw); }

  .capability-grid {
    top: 0;
    right: 0;
    left: 0;
    width: auto;
    gap: 10px;
  }

  .capability { min-height: 76px; }
  .technology-field { top: 94px; }
}

@media (max-width: 620px) {
  .hero-visual { min-height: 550px; }
  .wave-orb { top: 67%; width: 310px; }
  .capability-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 8px; }
  .capability { min-height: 68px; flex-direction: row; }
  .technology-field { top: 154px; right: 8%; left: 3%; }
  .tech-card { width: 41px; }
}

@media (prefers-reduced-motion: reduce) {
  .hero-visual { min-height: 520px; }
  .technology-field {
    top: 112px;
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    align-content: center;
    gap: 10px;
  }
  .tech-drop {
    position: static;
    display: grid;
    place-items: center;
    animation: none;
  }
  .tech-card { width: min(49px, 100%); }
}
</style>
