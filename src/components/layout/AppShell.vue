<script setup>
import AppHeader from './AppHeader.vue'
import MobileNavigation from './MobileNavigation.vue'
</script>

<template>
  <div class="app-frame">
    <AppHeader />
    <main id="main-content" tabindex="-1">
      <div class="ambient-grid" aria-hidden="true"></div>
      <slot></slot>
    </main>
    <MobileNavigation />
  </div>
</template>

<style lang="scss" scoped>
.app-frame {
  width: min(calc(100% - 30px), var(--container));
  min-height: calc(100vh - 30px);
  min-height: calc(100dvh - 30px);
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  grid-template-rows: var(--header-height) minmax(0, 1fr);
  margin: 15px auto;
  overflow: clip;
  border: 1px solid var(--color-border);
  border-radius: 15px;
  background: rgba(2, 8, 12, 0.86);
  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.25);
}

:deep(.app-header) { grid-column: 1 / -1; }

main {
  position: relative;
  min-width: 0;
  min-height: 0;
  overflow: hidden;
  isolation: isolate;

  &:focus {
    outline: 0;
  }
}

.ambient-grid {
  position: absolute;
  z-index: -2;
  inset: 0;
  opacity: 0.22;
  pointer-events: none;
  background-image: radial-gradient(rgba(0, 231, 240, 0.19) 0.7px, transparent 0.8px);
  background-size: 28px 28px;
  mask-image: radial-gradient(circle at 70% 30%, #000, transparent 48%);
}

@media (max-width: 900px) {
  .app-frame {
    width: 100%;
    max-width: 100vw;
    min-height: 100vh;
    min-height: 100dvh;
    grid-template-columns: minmax(0, 1fr);
    margin: 0;
    border: 0;
    border-radius: 0;
  }

  main {
    width: 100%;
    max-width: 100vw;
    padding-bottom: 82px;
  }
}
</style>
