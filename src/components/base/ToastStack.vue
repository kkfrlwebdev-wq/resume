<script setup>
import { CircleCheck, Info, X } from '@lucide/vue'
import { useUiStore } from '@/stores/uiStore'

const ui = useUiStore()
</script>

<template>
  <div class="toast-stack" aria-live="polite" aria-atomic="true">
    <TransitionGroup name="toast">
      <div v-for="toast in ui.toasts" :key="toast.id" :class="['toast', `toast--${toast.type}`]">
        <CircleCheck v-if="toast.type === 'success'" aria-hidden="true" />
        <Info v-else aria-hidden="true" />
        <span>{{ toast.message }}</span>
        <button type="button" :aria-label="$t('accessibility.closeToast')" @click="ui.removeToast(toast.id)">
          <X aria-hidden="true" />
        </button>
      </div>
    </TransitionGroup>
  </div>
</template>

<style lang="scss" scoped>
.toast-stack {
  position: fixed;
  z-index: 300;
  right: 1.25rem;
  bottom: 1.375rem;
  display: grid;
  gap: .625rem;
  width: min(23.125rem, calc(100vw - 2.5rem));
}

.toast {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: .75rem;
  padding: .875rem .875rem .875rem 1rem;
  border: .0625rem solid var(--color-border-bright);
  border-radius: .75rem;
  background: rgba(5, 17, 23, 0.96);
  box-shadow: 0 1.125rem 3.75rem rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(.75rem);

  > svg { width: 1.1875rem; color: var(--color-primary); }
  span { font-size: 0.9rem; }

  button {
    display: grid;
    width: 2rem;
    height: 2rem;
    place-items: center;
    border: 0;
    border-radius: .4375rem;
    background: transparent;
    color: var(--color-muted);
    cursor: pointer;

    &:hover { background: rgba(255,255,255,.06); color: #fff; }
    svg { width: 1rem; }
  }
}

.toast-enter-active,
.toast-leave-active { transition: 200ms ease; }
.toast-enter-from,
.toast-leave-to { opacity: 0; transform: translateX(1.25rem); }
</style>
