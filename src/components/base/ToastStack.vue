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
  right: 20px;
  bottom: 22px;
  display: grid;
  gap: 10px;
  width: min(370px, calc(100vw - 40px));
}

.toast {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 12px;
  padding: 14px 14px 14px 16px;
  border: 1px solid var(--color-border-bright);
  border-radius: 12px;
  background: rgba(5, 17, 23, 0.96);
  box-shadow: 0 18px 60px rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(12px);

  > svg { width: 19px; color: var(--color-primary); }
  span { font-size: 0.9rem; }

  button {
    display: grid;
    width: 32px;
    height: 32px;
    place-items: center;
    border: 0;
    border-radius: 7px;
    background: transparent;
    color: var(--color-muted);
    cursor: pointer;

    &:hover { background: rgba(255,255,255,.06); color: #fff; }
    svg { width: 16px; }
  }
}

.toast-enter-active,
.toast-leave-active { transition: 200ms ease; }
.toast-enter-from,
.toast-leave-to { opacity: 0; transform: translateX(20px); }
</style>
