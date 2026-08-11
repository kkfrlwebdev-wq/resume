<script setup>
import AppHeader from '@/components/layout/AppHeader.vue'
import MobileNavigation from '@/components/layout/MobileNavigation.vue'
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
  width: min(calc(100% - 1.875rem), var(--container));
  min-height: calc(100vh - 1.875rem);
  min-height: calc(100dvh - 1.875rem);
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  grid-template-rows: var(--header-height) minmax(0, 1fr);
  margin: .9375rem auto;
  overflow: clip;
  border: .0625rem solid var(--color-border);
  border-radius: .9375rem;
  background: rgba(2, 8, 12, 0.86);
  box-shadow: 0 1.5rem 5rem rgba(0, 0, 0, 0.25);
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
  background-image: radial-gradient(rgba(0, 231, 240, 0.19) .04375rem, transparent .05rem);
  background-size: 1.75rem 1.75rem;
  mask-image: radial-gradient(circle at 70% 30%, #000, transparent 48%);
}

@media (max-width: 56.25em) {
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
    padding-bottom: 5.125rem;
  }
}
</style>
