<script setup>
import { Braces, Paintbrush, Rocket, Smartphone } from '@lucide/vue'

const capabilities = [
  { label: 'Розробка', icon: Braces },
  { label: 'Дизайн', icon: Paintbrush, yellow: true },
  { label: 'Адаптивність', icon: Smartphone },
  { label: 'Продуктивність', icon: Rocket },
]
</script>

<template>
  <div class="hero-visual" aria-label="Ключові компетенції">
    <div class="wave-orb" aria-hidden="true">
      <i v-for="index in 9" :key="index" :style="{ '--index': index }"></i>
    </div>

    <div class="capability-grid">
      <div v-for="item in capabilities" :key="item.label" class="capability">
        <component :is="item.icon" :class="{ yellow: item.yellow }" aria-hidden="true" />
        <span>{{ item.label }}</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.hero-visual {
  position: relative;
  min-height: 450px;
  display: grid;
  place-items: center;
}

.wave-orb {
  position: absolute;
  width: min(410px, 85%);
  aspect-ratio: 1;
  border-radius: 50%;
  filter: drop-shadow(0 0 20px rgba(0, 231, 240, 0.18));
  transform: rotate(-16deg);

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
  right: 0;
  bottom: 38px;
  width: min(340px, 75%);
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background: rgba(5, 14, 20, 0.88);
  box-shadow: 0 24px 70px rgba(0, 0, 0, 0.46);
  backdrop-filter: blur(14px);
}

.capability {
  min-height: 130px;
  display: grid;
  place-items: center;
  align-content: center;
  gap: 15px;
  padding: 16px;
  border-right: 1px solid var(--color-border);
  border-bottom: 1px solid var(--color-border);
  text-align: center;

  &:nth-child(2n) { border-right: 0; }
  &:nth-child(n + 3) { border-bottom: 0; }
  svg { width: 33px; color: var(--color-primary); }
  svg.yellow { color: var(--color-secondary); }
  span { font-size: 0.77rem; font-weight: 700; }
}

@keyframes orbit { to { transform: rotate(1turn); } }

@media (max-width: 1000px) {
  .hero-visual { min-height: 400px; }
}

@media (max-width: 620px) {
  .hero-visual { min-height: 365px; }
  .wave-orb { width: 310px; }
  .capability-grid { right: 50%; bottom: 15px; width: min(320px, 94%); transform: translateX(50%); }
  .capability { min-height: 105px; }
}
</style>
