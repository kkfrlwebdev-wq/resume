<script setup>
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { Braces, CodeXml, Globe2, Smartphone } from '@lucide/vue'
import { skills } from '@/data/skills'
import { useUiStore } from '@/stores/uiStore'

const capabilities = [
  { labelKey: 'home.capabilities.development', icon: Braces },
  { labelKey: 'home.capabilities.crossBrowser', icon: Globe2, yellow: true },
  { labelKey: 'home.capabilities.responsive', icon: Smartphone },
  { labelKey: 'home.capabilities.cleanCode', icon: CodeXml },
]

const ui = useUiStore()
const selectedSkill = ref(null)
const technologyField = ref(null)
const landedSkills = ref([])
const dropElements = new Map()
const physicsStates = new Map()
const skillSettings = new Map(skills.map((skill) => [skill.id, skill]))
const pointer = { active: false, x: 0, y: 0, vx: 0, vy: 0 }
let animationFrame = 0
let physicsEnabled = false
let rootUnitSize

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
    angle: 0,
    angularVelocity: 0,
    size: element.offsetWidth || 49,
  }

  physicsStates.set(skillId, state)
  if (ui.zeroGravityMode) launchInZeroGravity(skillId, state)
  applyPhysicsPosition(element, state)
  landedSkills.value = [...landedSkills.value, skillId]
  startPhysics()
}

function launchInZeroGravity(skillId, state) {
  const index = skills.findIndex((skill) => skill.id === skillId)
  const phase = Math.max(index, 0) * 1.73
  state.vx += Math.cos(phase) * 0.48
  state.vy -= 0.42 + (Math.max(index, 0) % 4) * 0.08
  state.angularVelocity += Math.sin(phase) * 0.055
}

function handlePointerMove(event) {
  if (event.pointerType && event.pointerType !== 'mouse') return

  const bounds = technologyField.value?.getBoundingClientRect()
  if (!bounds) return

  const nextX = event.clientX - bounds.left
  const nextY = event.clientY - bounds.top
  pointer.vx = pointer.active ? nextX - pointer.x : 0
  pointer.vy = pointer.active ? nextY - pointer.y : 0
  pointer.active = true
  pointer.x = nextX
  pointer.y = nextY
  startPhysics()
}

function handlePointerLeave() {
  pointer.active = false
  pointer.vx = 0
  pointer.vy = 0
  startPhysics()
}

function startPhysics() {
  if (physicsEnabled && !animationFrame && typeof globalThis.requestAnimationFrame === 'function') {
    animationFrame = globalThis.requestAnimationFrame(updatePhysics)
  }
}

function toRootUnit(value) {
  rootUnitSize ??= Number.parseFloat(globalThis.getComputedStyle?.(document.documentElement).fontSize) || 16
  return `${value / rootUnitSize}rem`
}

function applyPhysicsPosition(element, state) {
  element.style.setProperty('--physics-x', toRootUnit(state.x))
  element.style.setProperty('--physics-y', toRootUnit(state.y))
  element.style.setProperty('--physics-rotation', `${state.angle.toFixed(2)}deg`)
}

function resolveCollisions(states, zeroGravity) {
  let hadCollision = false

  for (let iteration = 0; iteration < 5; iteration += 1) {
    for (let firstIndex = 0; firstIndex < states.length; firstIndex += 1) {
      for (let secondIndex = firstIndex + 1; secondIndex < states.length; secondIndex += 1) {
        const first = states[firstIndex]
        const second = states[secondIndex]
        const deltaX = second.x + second.size / 2 - (first.x + first.size / 2)
        const deltaY = second.y + second.size / 2 - (first.y + first.size / 2)
        const collisionGap = 0.5
        const overlapX = (first.size + second.size) / 2 + collisionGap - Math.abs(deltaX)
        const overlapY = (first.size + second.size) / 2 + collisionGap - Math.abs(deltaY)

        if (overlapX <= 0.05 || overlapY <= 0.05) continue
        if (overlapX > 0.75 && overlapY > 0.75) hadCollision = true

        let normalX = 0
        let normalY = 0
        let overlap = overlapY

        if (overlapX < overlapY) {
          normalX = deltaX < 0 ? -1 : 1
          overlap = overlapX
        } else {
          normalY = deltaY < 0 ? -1 : 1
        }

        const correction = overlap * 0.52
        first.x -= normalX * correction
        first.y -= normalY * correction
        second.x += normalX * correction
        second.y += normalY * correction

        const relativeVelocity = (second.vx - first.vx) * normalX + (second.vy - first.vy) * normalY
        if (relativeVelocity < 0) {
          const restitution = zeroGravity ? 0.22 : 0
          const impulse = -((1 + restitution) * relativeVelocity) / 2
          first.vx -= impulse * normalX
          first.vy -= impulse * normalY
          second.vx += impulse * normalX
          second.vy += impulse * normalY

          const contactOffset = normalX ? deltaY : deltaX
          const torque = impulse * (contactOffset / Math.max(first.size, second.size)) * 0.12
          first.angularVelocity = Math.max(-2.2, Math.min(2.2, first.angularVelocity - torque))
          second.angularVelocity = Math.max(-2.2, Math.min(2.2, second.angularVelocity + torque))
        }
      }
    }
  }

  return hadCollision
}

function updatePhysics(timestamp = 0) {
  animationFrame = 0
  let needsNextFrame = false
  const zeroGravity = ui.zeroGravityMode
  const fieldWidth = technologyField.value?.clientWidth ?? 0
  const fieldHeight = technologyField.value?.clientHeight ?? 0
  const maxAngle = fieldWidth <= 420 ? 8 : 16
  const states = [...physicsStates.values()]
  let stateIndex = 0

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

        const leverX = pointer.x - centerX
        const leverY = pointer.y - centerY
        const cursorTorque = (leverX * pointer.vy - leverY * pointer.vx) * force * 0.0009
        state.angularVelocity = Math.max(-2.2, Math.min(2.2, state.angularVelocity + cursorTorque))
        needsNextFrame = true
      }
    }

    if (zeroGravity) {
      const driftPhase = timestamp * 0.00055 + stateIndex * 1.37
      state.vx += Math.cos(driftPhase) * 0.004
      state.vy += Math.sin(driftPhase * 0.83) * 0.004
      state.vx *= 0.997
      state.vy *= 0.997
      state.angularVelocity *= 0.992
    } else {
      state.vy += 0.2
      state.vx *= 0.985
      state.vy *= 0.995
      state.angularVelocity *= 0.94
    }

    state.x += state.vx
    state.y += state.vy
    state.angle += state.angularVelocity
    stateIndex += 1

    if (state.angle < -maxAngle || state.angle > maxAngle) {
      state.angle = Math.max(-maxAngle, Math.min(maxAngle, state.angle))
      state.angularVelocity *= -0.28
    }

    if (state.x < 0) {
      state.x = 0
      state.vx = Math.abs(state.vx) * 0.42
      state.angularVelocity += state.vy * 0.018
    } else if (state.x + state.size > fieldWidth) {
      state.x = Math.max(0, fieldWidth - state.size)
      state.vx = -Math.abs(state.vx) * 0.42
      state.angularVelocity -= state.vy * 0.018
    }

    if (state.y < 0) {
      state.y = 0
      state.vy = Math.abs(state.vy) * 0.35
    } else if (state.y + state.size > fieldHeight) {
      state.y = Math.max(0, fieldHeight - state.size)
      state.vy = zeroGravity && Math.abs(state.vy) >= 0.42 ? -Math.abs(state.vy) * 0.24 : 0
      state.angularVelocity += state.vx * 0.035
      state.vx *= 0.9
      state.angularVelocity *= 0.78
    }
  }

  if (resolveCollisions(states, zeroGravity)) needsNextFrame = true

  for (const [skillId, state] of physicsStates) {
    const element = dropElements.get(skillId)
    if (!element) continue

    state.x = Math.max(0, Math.min(Math.max(0, fieldWidth - state.size), state.x))
    state.y = Math.max(0, Math.min(Math.max(0, fieldHeight - state.size), state.y))

    const onFloor = state.y + state.size >= fieldHeight - 0.5
    const isSupported = onFloor || states.some((other) => {
      if (other === state) return false
      const horizontalOverlap = Math.min(state.x + state.size, other.x + other.size) - Math.max(state.x, other.x)
      const verticalGap = other.y - (state.y + state.size)
      const supportGap = 1.5
      return horizontalOverlap > 5 && verticalGap >= -0.75 && verticalGap <= supportGap
    })

    if (!zeroGravity) {
      if (isSupported && Math.abs(state.vy) < 0.55) state.vy = 0
      if (isSupported && Math.abs(state.vx) < 0.025) state.vx = 0
      if (isSupported && Math.abs(state.angularVelocity) < 0.012) state.angularVelocity = 0
    }

    if (zeroGravity || Math.abs(state.vx) > 0.025 || Math.abs(state.vy) > 0.12 || Math.abs(state.angularVelocity) > 0.012) {
      needsNextFrame = true
    }

    applyPhysicsPosition(element, state)
  }

  pointer.vx *= 0.55
  pointer.vy *= 0.55

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

watch(
  () => ui.zeroGravityMode,
  (enabled) => {
    if (enabled) {
      physicsStates.forEach((state, skillId) => launchInZeroGravity(skillId, state))
    }
    startPhysics()
  },
)
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
          '--land-y': toRootUnit(item.landY),
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
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.hero-visual {
  position: relative;
  min-height: 33.75rem;
  overflow: visible;
}

.wave-orb {
  position: absolute;
  top: 61%;
  left: 50%;
  width: min(25.625rem, 85%);
  aspect-ratio: 1;
  border-radius: 50%;
  filter: drop-shadow(0 0 1.25rem rgba(0, 231, 240, 0.18));
  transform: translate(-50%, -50%) rotate(-16deg);

  &::after {
    position: absolute;
    inset: 24%;
    border-radius: 50%;
    background: rgba(0, 231, 240, 0.06);
    box-shadow: 0 0 3.75rem rgba(0, 231, 240, 0.16);
    content: '';
  }

  i {
    position: absolute;
    inset: calc(var(--index) * 2.5%);
    border: .0625rem solid rgba(0, 231, 240, calc(.15 + var(--index) * .025));
    border-radius: 48% 52% 60% 40% / 42% 48% 52% 58%;
    animation: orbit calc(12s + var(--index) * 1s) linear infinite;
  }
}

.capability-grid {
  position: absolute;
  z-index: 4;
  top: -4.5rem;
  right: 0;
  left: 0;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: .625rem;
}

.capability {
  min-height: 4.625rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: .5625rem;
  padding: .625rem;
  border: .0625rem solid var(--color-border);
  border-radius: var(--radius-md);
  background: rgba(5, 14, 20, 0.9);
  box-shadow: 0 1rem 2.8125rem rgba(0, 0, 0, 0.34);
  backdrop-filter: blur(.875rem);
  text-align: center;

  svg { width: 1.3125rem; flex: 0 0 auto; color: var(--color-primary); }
  svg.yellow { color: var(--color-secondary); }
  span { font-size: 0.68rem; font-weight: 750; }
}

.technology-field {
  position: absolute;
  z-index: 2;
  top: -1rem;
  right: 5%;
  bottom: 2.375rem;
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
    transform: translate3d(var(--physics-x, 0), var(--physics-y, 0), 0) rotate(var(--physics-rotation, 0deg));
  }

  &:hover,
  &:focus-within {
    z-index: 5;
  }
}

.tech-card {
  width: 3.0625rem;
  aspect-ratio: 1;
  display: grid;
  place-items: center;
  align-content: center;
  gap: .1875rem;
  padding: .3125rem;
  border: .0625rem solid rgba(0, 231, 240, 0.3);
  border-radius: .5rem;
  background: rgba(5, 14, 20, 0.92);
  box-shadow: 0 .75rem 1.875rem rgba(0, 0, 0, 0.34);
  color: var(--color-text);
  cursor: pointer;
  backdrop-filter: blur(.75rem);
  transition: border-color var(--transition), box-shadow var(--transition);

  &:hover,
  &:focus-visible,
  &[aria-pressed='true'] {
    border-color: var(--color-primary);
    box-shadow: 0 0 0 .0625rem rgba(0, 231, 240, 0.18), 0 0 1.75rem rgba(0, 231, 240, 0.22);
  }

  &__mark {
    max-width: 100%;
    color: var(--color-primary);
    font: 800 0.65rem/1 var(--font-mono);
    overflow-wrap: anywhere;
  }

  &__name {
    max-width: 100%;
    font-size: 0.43rem;
    font-weight: 750;
    line-height: 1.15;
    overflow-wrap: anywhere;
  }

}

.tech-drop--javascript .tech-card__mark { color: var(--color-secondary); }
.tech-drop--markup .tech-card__mark { color: #ff8b68; }
.tech-drop--workflow .tech-card__mark { color: var(--color-success); }
.tech-drop--database .tech-card__mark { color: #8aa8ff; }
.tech-drop--ecosystem .tech-card__mark { color: #8d7dff; }
.tech-drop--testing .tech-card__mark { color: #ff6f91; }
.tech-drop--packages .tech-card__mark { color: #ffb86b; }

@keyframes orbit { to { transform: rotate(1turn); } }

@keyframes technology-fall {
  0% {
    opacity: 0;
    transform: translate3d(0, -38.75rem, 0);
  }
  8% { opacity: 1; }
  100% {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}

@media (max-width: 62.5em) {
  .hero-visual { min-height: 31.875rem; }
  .capability-grid { top: -4.5rem; }
  .technology-field { top: 1.25rem; }
  .capability { flex-direction: column; gap: .3125rem; }
  .tech-card { width: 2.8125rem; }
}

@media (max-width: 51.25em) {
  .hero-visual {
    min-height: 31.875rem;
    margin-top: .75rem;
    overflow: hidden;
  }

  .wave-orb { top: 62%; width: min(24.375rem, 78vw); }

  .capability-grid {
    top: 0;
    right: 0;
    left: 0;
    width: auto;
    gap: .625rem;
  }

  .capability { min-height: 4.75rem; }
  .technology-field { top: 5.875rem; }
}

@media (max-width: 38.75em) {
  .hero-visual { min-height: 34.375rem; }
  .wave-orb { top: 67%; width: 19.375rem; }
  .capability-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: .5rem; }
  .capability { min-height: 4.25rem; flex-direction: row; }
  .technology-field { top: 9.625rem; right: 8%; left: 3%; }
  .tech-card { width: 2.5625rem; }
}

@media (prefers-reduced-motion: reduce) {
  .hero-visual { min-height: 32.5rem; }
  .technology-field {
    top: 7rem;
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    align-content: center;
    gap: .625rem;
  }
  .tech-drop {
    position: static;
    display: grid;
    place-items: center;
    animation: none;
  }
  .tech-card { width: min(3.0625rem, 100%); }
}
</style>
