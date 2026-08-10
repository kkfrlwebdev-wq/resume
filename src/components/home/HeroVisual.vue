<script setup>
import { Braces, CodeXml, Globe2, Smartphone } from '@lucide/vue'

const capabilities = [
  { labelKey: 'home.capabilities.development', icon: Braces },
  { labelKey: 'home.capabilities.crossBrowser', icon: Globe2, yellow: true },
  { labelKey: 'home.capabilities.responsive', icon: Smartphone },
  { labelKey: 'home.capabilities.cleanCode', icon: CodeXml },
]
</script>

<template>
  <div class="hero-visual" :aria-label="$t('home.competencies')">
    <div class="wave-orb" aria-hidden="true">
      <i v-for="index in 9" :key="index" :style="{ '--index': index }"></i>
    </div>

    <div class="capability-grid">
      <div v-for="item in capabilities" :key="item.labelKey" class="capability">
        <component :is="item.icon" :class="{ yellow: item.yellow }" aria-hidden="true" />
        <span>{{ $t(item.labelKey) }}</span>
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
  gap: 12px;
}

.capability {
  min-height: 130px;
  display: grid;
  place-items: center;
  align-content: center;
  gap: 15px;
  padding: 16px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background: rgba(5, 14, 20, 0.9);
  box-shadow: 0 16px 45px rgba(0, 0, 0, 0.34);
  backdrop-filter: blur(14px);
  text-align: center;

  svg { width: 33px; color: var(--color-primary); }
  svg.yellow { color: var(--color-secondary); }
  span { font-size: 0.77rem; font-weight: 700; }
}

@keyframes orbit { to { transform: rotate(1turn); } }

@media (max-width: 1000px) {
  .hero-visual { min-height: 400px; }
}

@media (max-width: 820px) {
  .hero-visual {
    min-height: 420px;
    margin-top: 12px;
  }

  .wave-orb { width: min(390px, 78vw); }

  .capability-grid {
    top: 50%;
    right: auto;
    bottom: auto;
    left: 50%;
    width: min(430px, 88%);
    gap: 10px;
    transform: translate(-50%, -50%);
  }

  .capability { min-height: 120px; }
}

@media (max-width: 620px) {
  .hero-visual { min-height: 365px; }
  .wave-orb { width: 310px; }
  .capability-grid { width: min(340px, 94%); gap: 8px; }
  .capability { min-height: 105px; }
}
</style>
